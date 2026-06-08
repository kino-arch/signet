// @ts-nocheck: Deno edge function — esm.sh URLs are the established pattern in this repo; strict TS conflicts with Deno's runtime globals.
/**
 * delete-account edge function
 *
 * Why this exists on the server: Supabase Admin API (`admin.deleteUser`) requires
 * the SERVICE_ROLE key — which must NEVER be shipped to the client. This function
 * verifies the caller's JWT, confirms the requested user ID matches the token
 * owner, then permanently removes the user from auth.users (cascade deletes
 * all profiles/data via FK constraints) and wipes all related tables.
 *
 * Global standard followed:
 * - JWT verification before any destructive action
 * - User can only delete themselves (no IDOR)
 * - Hard-delete from auth.users so OAuth re-login creates a fresh identity
 */
// deno-lint-ignore no-import-prefix
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // ── 1. Verify caller JWT ────────────────────────────────────────────────────
  const authHeader = req.headers.get("Authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized — missing bearer token" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  const token = authHeader.replace("Bearer ", "")

  // Use anon client to verify the user's own JWT
  const anonClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } }
  )

  const { data: { user }, error: userError } = await anonClient.auth.getUser(token)
  if (userError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized — invalid session" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // Prevent guest accounts from calling this endpoint
  if (user.id.startsWith("guest_")) {
    return new Response(JSON.stringify({ error: "Guest accounts cannot be deleted via this endpoint" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // ── 2. Use service-role admin client to hard-delete ─────────────────────────
  // Service role is required — NEVER expose this key on the client.
  const adminClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // First, delete all user-owned data from public tables.
  // FK cascade should handle most of this, but explicit deletion is belt-and-suspenders.
  await adminClient.from("profiles").delete().eq("id", user.id)

  // Hard-delete from auth.users — this is the critical step.
  // After this, any OAuth provider (Google, GitHub, etc.) will create a brand
  // new user record on next login, with onboarding_completed = null.
  const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id)

  if (deleteError) {
    return new Response(JSON.stringify({ error: `Failed to delete account: ${deleteError.message}` }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  return new Response(JSON.stringify({ success: true, message: "Account permanently deleted." }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
})
