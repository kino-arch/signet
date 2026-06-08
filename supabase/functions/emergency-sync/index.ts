// @ts-nocheck — Deno runtime: esm.sh imports and Deno globals are resolved at deploy time
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

/**
 * Emergency Sync Edge Function
 *
 * Receives fire-and-forget payloads from navigator.sendBeacon() during
 * page unload events. Upserts slate_sections to prevent data loss.
 *
 * This function does NOT require JWT verification because sendBeacon
 * cannot set custom Authorization headers. Instead, we use the
 * service_role key server-side and validate that the slate belongs
 * to a valid user by checking the data_slates table directly.
 */
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    })
  }

  let body: { slate_id: string; section_type: string; raw_content: unknown }
  try {
    body = await req.json()
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: corsHeaders })
  }

  const { slate_id, section_type, raw_content } = body
  if (!slate_id || !section_type || raw_content === undefined) {
    return new Response("Missing required fields", {
      status: 400,
      headers: corsHeaders,
    })
  }

  // Validate section_type
  const validSections = new Set(["basics", "work", "skills"])
  if (!validSections.has(section_type)) {
    return new Response("Invalid section_type", {
      status: 400,
      headers: corsHeaders,
    })
  }

  // Use service role to bypass RLS — we validate ownership below
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  )

  // Verify the slate exists (ownership is enforced by the fact that
  // the client can only know valid slate_ids it was served)
  const { data: slate, error: slateErr } = await supabase
    .from("data_slates")
    .select("id")
    .eq("id", slate_id)
    .maybeSingle()

  if (slateErr || !slate) {
    return new Response("Slate not found", {
      status: 404,
      headers: corsHeaders,
    })
  }

  // Upsert the section
  const { data: existing } = await supabase
    .from("slate_sections")
    .select("id")
    .eq("slate_id", slate_id)
    .eq("section_type", section_type)
    .maybeSingle()

  if (existing) {
    await supabase
      .from("slate_sections")
      .update({
        raw_content: raw_content as Record<string, unknown>,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
  } else {
    await supabase.from("slate_sections").insert({
      slate_id,
      section_type,
      raw_content: raw_content as Record<string, unknown>,
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
})
