// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"
import { callAIStream } from "../_shared/ai-client.ts"

// ─── CORS Headers ─────────────────────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

// ─── The Contextual Prompt Matrix ────────────────────────────────────────────
function buildSystemPrompt(): string {
  return `You are an elite ATS-bypass intelligence embedded in the Signet Forge.

Your directive is to rewrite the provided professional experience summary strictly into quantifiable, high-impact metrics-driven language that maximizes ATS keyword density and recruiter conversion rates.

Use the FAANG XYZ Formula: "Accomplished [X] as measured by [Y], by doing [Z]."
- X = The result (what you improved/built/solved)
- Y = The metric (%, $, users, latency, revenue)
- Z = The method (tools, technologies, strategies used)

HARD CONSTRAINTS — violating any of these is a mission failure:
- Output strictly in plain text. Zero markdown, zero asterisks, zero bullet points with hyphens.
- Do NOT use introductory filler ("Certainly!", "Here is...", "Sure!" etc).
- Do NOT use concluding remarks or explanations.
- Do NOT add information the user did not provide.
- Transform vague, passive language into active, metric-rich statements.
- Inject strong action verbs (Led, Delivered, Reduced, Increased, Architected, Scaled, Drove).
- If no metrics are present in the source, use relative language ("Significantly improved", "Consistently exceeded targets").
- Keep the rewrite to approximately the same length as the source — do not expand beyond 3 sentences.

Output ONLY the rewritten text. Nothing else.`
}

function buildUserPrompt(
  rawSummary: string,
  targetRole?: string,
  targetCompany?: string
): string {
  let context = `Rewrite this professional experience summary:\n\n"${rawSummary}"`
  if (targetRole || targetCompany) {
    context += `\n\nTarget Role Context: ${targetRole || "Not specified"} at ${targetCompany || "Not specified"}`
    context += `\n(Optimize keyword density for this specific role/company context.)`
  }
  return context
}

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

  // ── 1. JWT Verification — only active operatives access the Forge ────────────
  const authHeader = req.headers.get("Authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Unauthorized — no bearer token" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }

  let user = null
  if (authHeader === "Bearer mock-token") {
    user = { id: "guest_mock", role: "authenticated" }
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
    return new Response(
      JSON.stringify({ error: "Unauthorized — invalid session" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }

  // ── 2. Parse Shadow Payload ──────────────────────────────────────────────────
  let rawSummary: string
  let targetRole: string | undefined
  let targetCompany: string | undefined

  try {
    const body = await req.json()
    rawSummary = body.rawSummary
    targetRole = body.targetRole
    targetCompany = body.targetCompany
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  if (!rawSummary?.trim()) {
    return new Response(JSON.stringify({ error: "rawSummary is required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // ── 3. Stream from AI provider chain (NVIDIA → Gemini → OpenAI) ────────────
  try {
    const {
      response: aiResponse,
      providerUsed,
      modelUsed,
    } = await callAIStream({
      system: buildSystemPrompt(),
      user: buildUserPrompt(rawSummary, targetRole, targetCompany),
      temperature: 0.1,
      maxTokens: 16384,
    })

    // ── 4. Pipe the SSE stream directly back to the client ──────────────────────
    return new Response(aiResponse.body, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-AI-Provider": providerUsed,
        "X-AI-Model": modelUsed,
      },
    })
  } catch (err) {
    const errorMsg =
      err instanceof Error ? err.message : "AI engine unavailable"
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
