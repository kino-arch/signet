# Beskar Paywall (Signet Token Economy)

## Overview
Signet rejects the standard SaaS monthly subscription model in favor of a **transactional token economy**. Users purchase "Beskar Tokens" upfront, which act as credits to perform high-value actions within the application (e.g., exporting a finalized resume PDF).

## The Flow

### 1. The Gateway (`LandingPage` / `PricingCard`)
Unauthenticated users or users with 0 credits are routed to the pricing tier selection.
- **Foundling Pack:** 3 Credits ($5)
- **Hunter Bounty:** 7 Credits ($10)
- **Clan Chieftain:** 15 Credits ($20)

Clicking a tier triggers a Stripe Checkout Session via the client-side Stripe SDK or a redirect to a hosted Stripe Checkout URL.

### 2. The Transaction (Stripe Webhook)
When a user successfully completes payment, Stripe fires a `checkout.session.completed` event to a Supabase Edge Function (`stripe-webhook`).
- The Edge Function verifies the `Stripe-Signature` header against the `STRIPE_WEBHOOK_SECRET`.
- If valid, the function extracts the user ID from the `client_reference_id` or `metadata`.
- It executes a secure database update via a Service Role Key, adding the purchased amount to the `credit_balance` integer in the user's `profiles` row.

### 3. The Execution (`deduct-credit` Edge Function)
When a user clicks "Export PDF" in the Forge Editor:
- The client dispatches a POST request to the `deduct-credit` Edge Function with their Bearer token.
- The Edge Function verifies the user's identity.
- It checks the user's `credit_balance` in the `profiles` table.
- If `credit_balance > 0`, it decrements the balance by 1 and returns `{ success: true }`.
- If `credit_balance <= 0`, it returns a 402 Payment Required error.
- The client receives the `{ success: true }` response and proceeds to render the PDF.

## Security Considerations
- **No Client-Side Decrement:** The client is fundamentally untrusted. It can never say `update profiles set credit_balance = credit_balance - 1`. This logic is strictly bound to the Edge Function, which runs outside RLS constraints using a Service Role Key.
- **Atomic Operations:** The token deduction uses Postgres RPC or atomic update queries (`update profiles set credit_balance = credit_balance - 1 where id = auth.uid()`) to prevent race conditions if a user clicks export rapidly.
