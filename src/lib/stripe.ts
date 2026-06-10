import Stripe from "stripe"
import { config } from "dotenv"

// Ensure env variables are loaded if used in a standalone script or Drizzle
config({ path: ".env.local" })

const secretKey =
  process.env.STRIPE_SECRET_KEY ||
  process.env.SECRET_KEY

if (!secretKey) {
  console.warn("Missing Stripe secret key. Stripe features will be disabled.")
}

// This module is server-side only. Never import from client code.
export const stripe = new Stripe(secretKey || "dummy-key", {
  apiVersion: "2026-05-27.dahlia",
  appInfo: {
    name: "Signet",
    version: "1.0.0",
  },
})
