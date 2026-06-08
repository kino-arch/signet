# Security Model (Signet v2.0)

## Overview
Signet v2.0 is built on a Zero-Trust architecture. Client-side applications are treated as untrusted execution environments. All critical operations—data access, API communication, and financial transactions—are enforced exclusively at the backend/edge layer using Supabase Row Level Security (RLS) and secure Edge Functions.

## 1. Authentication & Session Management
- **Provider:** Supabase Auth (JWT-based).
- **Session Handling:** Tokens are securely managed by the Supabase client SDK.
- **Edge Verification:** Every Edge Function verifies the Bearer token in the request headers using `supabase.auth.getUser(token)` before executing any logic. If verification fails, the request is rejected immediately with a 401 Unauthorized.

## 2. Row Level Security (RLS)
The database operates under strict RLS policies. No table can be read or mutated without satisfying a policy.

### Data Slates (`data_slates`, `slate_sections`)
- **Policy:** `user_id = auth.uid()`
- **Enforcement:** Users can only `SELECT`, `INSERT`, `UPDATE`, or `DELETE` rows where the `user_id` matches their authenticated JWT payload. It is mathematically impossible for User A to query User B's resume data.

### Profiles (`profiles`)
- **Policy:** Users can read/update their own profile data (e.g., name, onboarding status).
- **Protected Columns:** The `credit_balance` column is explicitly protected. While users can *read* their balance, they cannot *update* it directly from the client.

## 3. Financial & Token Security
The Beskar Token economy relies on secure server-side mutation.

- **Deduction:** The `deduct-credit` Edge Function decrements the token balance. It uses a Service Role Key to bypass RLS, allowing it to safely decrement the `credit_balance` integer. The function ensures the user has a balance > 0 before proceeding to prevent negative balances.
- **Granting (Stripe):** Tokens are only granted via a secure Stripe Webhook endpoint. The webhook verifies the Stripe cryptographic signature (`Stripe-Signature` header) against a trusted endpoint secret to ensure the payload is genuinely from Stripe before crediting the user's account.

## 4. AI Secrets Management (The Hardening)
A critical vulnerability in v1.0 was the exposure of AI API keys (NVIDIA, SerpAPI, OpenAI) in the client bundle.

- **V2.0 Fix:** All API keys have been completely removed from client-side code and `.env` files.
- **Storage:** Keys are stored as encrypted secrets in the Supabase Edge environment (`supabase secrets set`).
- **Execution:** When the client requests an AI generation, it hits an Edge Function (e.g., `reforge-datacore`). The Edge Function retrieves the secret (`Deno.env.get("NVIDIA_API_KEY")`) and executes the server-to-server HTTP request to the LLM provider. The keys are never exposed over the network to the client browser.
