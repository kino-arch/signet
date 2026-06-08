import Stripe from "stripe"
import { config } from "dotenv"

// Ensure env variables are loaded if used in a standalone script or Drizzle
config({ path: ".env.local" })

const secretKey =
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_STRIPE_SECRET_KEY ||
  process.env.VITE_STRIPE_SECRET_KEY ||
  process.env.SECRET_KEY

if (!secretKey) {
  console.warn("Missing Stripe secret key. Stripe features will be disabled.")
}

export const stripe = new Stripe(secretKey || "dummy-key", {
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Signet",
    version: "1.0.0",
  },
})
