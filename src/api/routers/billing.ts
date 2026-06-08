import { router, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { stripe } from "../../lib/stripe"
import { logger } from "../../lib/logger"
import { db } from "../../db"
import { profiles } from "../../db/schema"
import { eq } from "drizzle-orm"

export const billingRouter = router({
  createPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId
    const user = ctx.user

    if (!user || !user.email) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User email is required for billing",
      })
    }

    try {
      let customerId: string | undefined

      // 1. Check DB for existing stripe_customer_id
      const [profile] = await db
        .select({ stripeCustomerId: profiles.stripeCustomerId })
        .from(profiles)
        .where(eq(profiles.id, userId))
        .limit(1)

      if (profile?.stripeCustomerId) {
        customerId = profile.stripeCustomerId
      } else {
        // Fallback: try email or create new
        const existingCustomers = await stripe.customers.list({
          email: user.email,
          limit: 1,
        })

        if (existingCustomers.data.length > 0) {
          customerId = existingCustomers.data[0].id
        } else {
          const customer = await stripe.customers.create({
            email: user.email,
            metadata: {
              supabase_uid: userId,
            },
          })
          customerId = customer.id
        }

        // Save back to DB
        if (customerId) {
          await db
            .update(profiles)
            .set({ stripeCustomerId: customerId })
            .where(eq(profiles.id, userId))
        }
      }

      // 3. Create Stripe Customer Portal session
      const baseUrl =
        process.env.VITE_SITE_URL ||
        (typeof window !== "undefined" ? window.location.origin : "http://localhost:5173")

      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${baseUrl}/settings`,
      })

      return {
        url: session.url,
      }
    } catch (error: unknown) {
      logger.error("Failed to create Stripe portal session", error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to create billing session: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    }
  }),
})
