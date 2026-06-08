import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import Stripe from "stripe"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-stripe-secret-key",
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const {
      tierId,
      credits,
      priceCents,
      successUrl,
      cancelUrl,
      userId,
      email,
    } = await req.json()

    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      throw new Error("Missing Authorization header")
    }

    // In a production environment, we should retrieve Stripe Secret Key from Deno.env.
    // Deno.env.get("STRIPE_SECRET_KEY")
    // But since the frontend was passing it via x-stripe-secret-key for local testing, we'll try that first, falling back to env.
    const stripeKey =
      req.headers.get("x-stripe-secret-key") ||
      Deno.env.get("STRIPE_SECRET_KEY")

    if (!stripeKey) {
      throw new Error("Stripe secret key not configured")
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16", // fallback for types, we omit in production calls usually
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Create Checkout Sessions API call. Force card and bank account only.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'us_bank_account'],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${credits} Signet Credits`,
              description: `Purchase of ${credits} credits for Signet Dossier generation.`,
            },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      // Include metadata to identify the user and package for the webhook
      metadata: {
        userId: userId,
        credits: credits.toString(),
        tierId: tierId,
      },
      ...(email ? { customer_email: email } : {}),
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("Error creating stripe checkout:", error)
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
