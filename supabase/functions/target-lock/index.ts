// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"
import { getCompanyIntel } from "./serpapi.ts"
import { generateStrategy } from "./nvidia-strategy.ts"
import { getCachedBriefing, setCachedBriefing } from "./cache.ts"

// ─── CORS Headers (Supabase-recommended, complete set) ────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

// ─── Helper: JSON response with CORS headers always attached ─────────────────
function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

// ─── Main handler ─────────────────────────────────────────────────────────────
// Using Deno.serve (modern API) instead of the deprecated std/http `serve`.
// The OPTIONS preflight MUST be the very first check — before any body parsing.
Deno.serve(async (req) => {
  // 1. Handle CORS preflight — always first, never inside try/catch
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders })
  }

  // 2. Only allow POST
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  try {
    // 3. Parse body
    let companyName: string
    let jobTitle: string | undefined
    try {
      const body = await req.json()
      companyName = body.companyName
      jobTitle = body.jobTitle
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400)
    }

    if (!companyName?.trim()) {
      return jsonResponse({ error: "Company name is required" }, 400)
    }

    // 4. Supabase client for caching
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    // 5. Cache lookup
    const cacheKey = `${companyName.toLowerCase().trim()}${
      jobTitle ? `-${jobTitle.toLowerCase().trim()}` : ""
    }`
    const cachedData = await getCachedBriefing(supabaseClient, cacheKey)

    if (cachedData) {
      return jsonResponse(cachedData)
    }

    // 6. Scrape company intel via SerpAPI
    const serpApiKey = Deno.env.get("SERPAPI_API_KEY")
    if (!serpApiKey) {
      return jsonResponse({ error: "SERPAPI_API_KEY not configured" }, 500)
    }
    const companyIntel = await getCompanyIntel(
      companyName,
      jobTitle,
      serpApiKey
    )

    // 7. Generate AI strategy via Nvidia NIM
    const nvidiaApiKey = Deno.env.get("NVIDIA_API_KEY")
    if (!nvidiaApiKey) {
      return jsonResponse({ error: "NVIDIA_API_KEY not configured" }, 500)
    }
    const briefing = await generateStrategy(companyIntel, nvidiaApiKey)

    // 8. Cache & return
    const responsePayload = { companyIntel, briefing }
    await setCachedBriefing(supabaseClient, cacheKey, responsePayload)

    return jsonResponse(responsePayload)
  } catch (error) {
    console.error("Target Lock Error:", error)
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      500
    )
  }
})
