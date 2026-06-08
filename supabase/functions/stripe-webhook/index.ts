// deno-lint-ignore no-import-prefix no-unversioned-import
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

Deno.serve(async (req: Request) => {
  try {
    const signature = req.headers.get("stripe-signature")
    if (!signature) {
      return new Response("No signature", { status: 400 })
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY")
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")

    if (!stripeKey || !webhookSecret) {
      return new Response("Server misconfiguration", { status: 500 })
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    })

    const body = await req.text()
    let event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.error(`Webhook signature verification failed: ${errorMessage}`)
      return new Response(`Webhook Error: ${errorMessage}`, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      const credits = parseInt(session.metadata?.credits || "0", 10)

      if (userId && credits > 0) {
        // Update user credits in Supabase
        const supabaseUrl = Deno.env.get("SUPABASE_URL") || ""
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""

        const supabase = createClient(supabaseUrl, supabaseKey)

        // Fetch current credit balance
        const { data: profile, error: profileErr } = await supabase
          .from("profiles")
          .select("credits")
          .eq("id", userId)
          .single()

        if (profileErr) {
          console.error("Error fetching profile:", profileErr)
          throw profileErr
        }

        const newBalance = (profile?.credits || 0) + credits

        const { error: updateErr } = await supabase
          .from("profiles")
          .update({ credits: newBalance })
          .eq("id", userId)

        if (updateErr) {
          console.error("Error updating credits:", updateErr)
          throw updateErr
        }

        console.log(
          `Successfully credited ${credits} credits to user ${userId}. New balance: ${newBalance}`
        )
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error("Webhook error:", err)
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 })
  }
})
