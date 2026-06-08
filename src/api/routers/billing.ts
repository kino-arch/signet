import { router, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { stripe } from "../../lib/stripe"
import { logger } from "../../lib/logger"

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

      // 1. Try to find existing Stripe customer by email
      const existingCustomers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      })

      if (existingCustomers.data.length > 0) {
        customerId = existingCustomers.data[0].id
      }

      // 2. If no stripe customer id, create one lazily
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: {
            supabase_uid: userId,
          },
        })

        customerId = customer.id
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
