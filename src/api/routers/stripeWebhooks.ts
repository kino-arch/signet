import { Hono } from "hono"
import { stripe } from "../../lib/stripe"
import { db } from "../../db"
import { profiles } from "../../db/schema"
import { eq, sql } from "drizzle-orm"
import { logger } from "../../lib/logger"
import Stripe from "stripe"

export const stripeWebhooks = new Hono()

stripeWebhooks.post("/stripe", async (c) => {
  const signature = c.req.header("stripe-signature")

  if (!signature) {
    return c.json({ error: "Missing stripe-signature header" }, 400)
  }

  const rawBody = await c.req.text()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    logger.error("Missing STRIPE_WEBHOOK_SECRET environment variable")
    return c.json({ error: "Server misconfiguration" }, 500)
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err: any) {
    logger.error(`Webhook signature verification failed: ${err.message}`)
    return c.json({ error: "Invalid signature" }, 400)
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const creditsToAdd = 10
      const customerId = session.customer as string

      if (customerId) {
        try {
          // Fetch the customer from Stripe to retrieve the supabase_uid from metadata
          const customer = await stripe.customers.retrieve(customerId)

          if (customer.deleted) {
            logger.warn(`Stripe customer ${customerId} was deleted. Cannot process checkout.`)
            break
          }

          const userId = customer.metadata?.supabase_uid

          if (userId) {
            // Increment credits for the user
            const result = await db
              .update(profiles)
              .set({ credits: sql`${profiles.credits} + ${creditsToAdd}` })
              .where(eq(profiles.id, userId))
              .returning()

            if (result.length > 0) {
              logger.info(`Successfully added ${creditsToAdd} credits to user: ${userId}`)
            } else {
              logger.warn(`No DB profile found for user ID: ${userId}`)
            }
          } else {
            logger.warn(`No supabase_uid found in metadata for Stripe Customer: ${customerId}`)
          }
        } catch (error) {
          logger.error("Failed processing checkout.session.completed webhook", error)
          return c.json({ error: "Processing failed" }, 500)
        }
      } else {
        logger.warn("Checkout session completed, but no customer ID was attached.")
      }
      break
    }

    // Add other event types here (e.g. invoice.payment_succeeded for recurring subscriptions)

    default:
      logger.info(`Unhandled Stripe event type: ${event.type}`)
  }

  return c.json({ received: true })
})
