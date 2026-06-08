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

// ─── System Prompts ───────────────────────────────────────────────────────────

const EXTRACT_PROMPT = `You are an ATS (Applicant Tracking System) keyword extraction engine. 
The user will provide a raw, unstructured description of their skills, tools, and competencies.
Your job is to extract these into a JSON array of concise, industry-standard resume keywords.
Do NOT include explanations. Return ONLY a JSON array of strings.
Example output: ["React", "Node.js", "Project Management", "Agile Methodologies"]`

const INFER_PROMPT = `You are an expert career analyst. Given an array of work experience entries, 
analyze the technologies, methodologies, and soft skills implied by the role descriptions and highlights.
Return a JSON object with this exact structure:
{
  "categories": [
    { "name": "Programming Languages", "keywords": ["Python", "TypeScript"] },
    { "name": "Frameworks & Libraries", "keywords": ["React", "FastAPI"] },
    { "name": "Tools & Platforms", "keywords": ["Docker", "AWS", "Kubernetes"] },
    { "name": "Methodologies", "keywords": ["Agile", "CI/CD", "TDD"] }
  ]
}
Only include skills clearly evidenced by the work history. Do not fabricate skills.
Return ONLY valid JSON. No markdown. No explanations.`

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

  try {
    const body = await req.json()
    const { rawText, mode, workEntries } = body

    // ── Mode: Infer skills from work experience ──────────────────────────────
    if (mode === "infer_from_experience") {
      if (
        !workEntries ||
        !Array.isArray(workEntries) ||
        workEntries.length === 0
      ) {
        return new Response(
          JSON.stringify({
            error: "workEntries array is required for infer mode",
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        )
      }

      const result = await callAI({
        system: INFER_PROMPT,
        user: JSON.stringify(workEntries),
        temperature: 0.1,
        maxTokens: 1024,
        responseFormat: "json",
      })

      let categories
      try {
        let content = result.content.trim()
        // Strip markdown code blocks if present
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
        categories = parsed.categories || parsed
      } catch {
        throw new Error("AI returned invalid format for skill inference")
      }

      return new Response(
        JSON.stringify({
          categories,
          model_used: result.modelUsed,
          provider_used: result.providerUsed,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // ── Mode: Extract keywords from raw text (default) ────────────────────────
    if (!rawText) {
      return new Response(JSON.stringify({ error: "Missing rawText" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const result = await callAI({
      system: EXTRACT_PROMPT,
      user: rawText,
      temperature: 0.1,
      maxTokens: 1024,
    })

    let content = result.content.trim()
    // Strip markdown code blocks if present
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

    let keywords: string[] = []
    try {
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed)) {
        keywords = parsed
      } else if (parsed.keywords && Array.isArray(parsed.keywords)) {
        keywords = parsed.keywords
      }
    } catch {
      throw new Error("AI returned invalid format")
    }

    return new Response(
      JSON.stringify({
        keywords,
        model_used: result.modelUsed,
        provider_used: result.providerUsed,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal error"
    return new Response(JSON.stringify({ error: errorMsg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    })
  }
})
