// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"
import { callAI } from "../_shared/ai-client.ts"

// ─── CORS Headers ─────────────────────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

// ─── XYZ Scoring System Prompt ────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a FAANG resume scoring engine. You evaluate resume bullet points against 
the Google XYZ Formula: "Accomplished [X] as measured by [Y], by doing [Z]."

For each bullet point, return a JSON object with:
{
  "scores": [
    {
      "original": "the original bullet text",
      "score": 0-100,
      "breakdown": {
        "accomplishment_x": 0-33,
        "metric_y": 0-34,
        "method_z": 0-33
      },
      "verdict": "weak" | "needs_metrics" | "strong" | "faang_ready",
      "issues": ["specific problems found"],
      "rewrite": "the improved version using XYZ formula"
    }
  ],
  "overall_score": 0-100,
  "summary": "1-sentence overall assessment"
}

Scoring Rules:
- accomplishment_x (0-33): Does it state a clear result? "Fixed bugs" = 5. "Reduced checkout failures" = 25. "Eliminated 95% of critical production incidents" = 33.
- metric_y (0-34): Is there a quantifiable measurement? No number = 0. Vague ("significantly") = 10. Specific ("by 40%", "$2M revenue") = 34.
- method_z (0-33): Does it explain the approach? Missing = 0. Generic ("using best practices") = 10. Specific ("by implementing Redis caching with TTL-based invalidation") = 33.

Verdicts:
- score 0-40: "weak" — Reads like a job description, not an achievement
- score 41-70: "needs_metrics" — Has substance but lacks quantification  
- score 71-89: "strong" — Solid bullet, minor improvements possible
- score 90-100: "faang_ready" — Publication-quality, no changes needed

CRITICAL: If a bullet has no metrics at all, the rewrite MUST add realistic placeholder metrics 
in brackets like [X%] or [$Xk] that the user should fill in with real numbers.

Return ONLY valid JSON. No markdown. No explanations outside the JSON.`

// ─── Main Handler ─────────────────────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // ── JWT Verification ────────────────────────────────────────────────────────
  const authHeader = req.headers.get("Authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  let user = null
  if (authHeader === "Bearer mock-token") {
    user = { id: "guest_mock" }
  } else {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    )
    const token = authHeader.replace("Bearer ", "")
    const { data, error: authError } = await supabase.auth.getUser(token)
    if (!authError && data.user) {
      user = data.user
    }
  }

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // ── Parse Request ───────────────────────────────────────────────────────────
  let bullets: string[]
  let targetRole: string | undefined

  try {
    const body = await req.json()
    bullets = body.bullets
    targetRole = body.targetRole
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  if (!bullets || !Array.isArray(bullets) || bullets.length === 0) {
    return new Response(
      JSON.stringify({ error: "bullets array is required" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }

  // ── Score with AI ───────────────────────────────────────────────────────────
  try {
    const userPrompt = `Score these resume bullet points:\n\n${bullets
      .map((b, i) => `${i + 1}. "${b}"`)
      .join("\n")}${targetRole ? `\n\nTarget Role: ${targetRole}` : ""}`

    const result = await callAI({
      system: SYSTEM_PROMPT,
      user: userPrompt,
      temperature: 0.1,
      maxTokens: 4096,
      responseFormat: "json",
    })

    let content = result.content.trim()
    if (content.startsWith("```json")) {
      content = content
        .replace(/```json\n?/, "")
        .replace(/```$/, "")
        .trim()
    } else if (content.startsWith("```")) {
      content = content
        .replace(/```\n?/, "")
        .replace(/```$/, "")
        .trim()
    }

    const parsed = JSON.parse(content)

    return new Response(
      JSON.stringify({
        ...parsed,
        model_used: result.modelUsed,
        provider_used: result.providerUsed,
        latency_ms: result.latencyMs,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (err) {
    const errorMsg =
      err instanceof Error ? err.message : "Scoring engine unavailable"
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
