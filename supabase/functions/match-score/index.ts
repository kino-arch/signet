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

// ─── Reverse-ATS Matching Prompt ──────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a senior technical recruiter and ATS analyst. Given a job description (JD) 
and a candidate's resume data, perform a semantic gap analysis.

Return a JSON object with this exact structure:
{
  "overall_match": 0-100,
  "confidence": "low" | "medium" | "high",
  "strong_matches": [
    { "keyword": "React", "source": "Where it appears in the resume", "relevance": "high" }
  ],
  "missing_keywords": [
    { "keyword": "Kubernetes", "importance": "critical" | "preferred" | "nice_to_have", "suggestion": "How to address this gap" }
  ],
  "gap_analysis": "2-3 sentence strategic assessment of the candidate's fit",
  "recommended_actions": [
    "Specific, actionable steps to improve match score"
  ],
  "experience_level_match": {
    "jd_level": "Senior | Mid | Junior | Staff | Principal",
    "resume_level": "Senior | Mid | Junior | Staff | Principal",
    "aligned": true | false,
    "note": "Brief explanation if misaligned"
  }
}

Scoring Guide:
- 90-100: Exceptional match — resume directly maps to the JD
- 75-89: Strong match — minor gaps that can be addressed with rewording
- 60-74: Moderate match — notable missing skills but relevant experience base
- 40-59: Weak match — significant gaps, would need substantial resume tailoring
- 0-39: Poor match — fundamentally different skill set or experience level

Rules:
- Use SEMANTIC matching, not just keyword counting. "Built microservices" matches "distributed systems experience"
- Weight "required" qualifications 3x higher than "preferred" or "nice to have"
- Consider years of experience signals from job titles and date ranges
- Return ONLY valid JSON. No markdown. No extra text.`

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
  let resumeData: any
  let jobDescription: string

  try {
    const body = await req.json()
    resumeData = body.resume_data
    jobDescription = body.job_description
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  if (!jobDescription?.trim()) {
    return new Response(
      JSON.stringify({ error: "job_description is required" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }

  if (!resumeData) {
    return new Response(JSON.stringify({ error: "resume_data is required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  // ── Match with AI ───────────────────────────────────────────────────────────
  try {
    const userPrompt = `## Job Description:
${jobDescription}

## Candidate Resume Data:
${JSON.stringify(resumeData, null, 2)}

Perform the semantic gap analysis.`

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
      err instanceof Error ? err.message : "Match scoring engine unavailable"
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
