import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://dummy.supabase.co"
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY ||
  "dummy-key"

// WARNING: This client uses the Service Role Key and bypasses RLS.
// All queries using this client MUST perform application-level authorization.
// See: src/api/routers/slate.ts for the ownership verification pattern.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
})
