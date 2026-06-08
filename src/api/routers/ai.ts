import { Hono, type Context } from "hono"
import { aiClient } from "../lib/ai-client"
import { createClient } from "@supabase/supabase-js"
import { db } from "../../db"
import { profiles } from "../../db/schema"
import { eq, and, sql } from "drizzle-orm"

const supabaseUrl =
  (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://dummy.supabase.co"
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY ||
  "dummy-key"
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
})

export const aiRouter = new Hono()

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute

aiRouter.use("*", async (c, next) => {
  const authHeader = c.req.header("authorization")
  if (!authHeader) {
    return c.json({ error: "Unauthorized: Missing Authorization header" }, 401)
  }
  const token = authHeader.replace("Bearer ", "")
  if (!token) {
    return c.json({ error: "Unauthorized: Missing Token" }, 401)
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user) {
    return c.json({ error: "Unauthorized: Invalid Token" }, 401)
  }

  // Rate Limiting Logic
  const now = Date.now()
  const rlState = rateLimitMap.get(user.id) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }
  if (now > rlState.resetAt) {
    rlState.count = 0
    rlState.resetAt = now + RATE_LIMIT_WINDOW_MS
  }
  rlState.count++
  rateLimitMap.set(user.id, rlState)

  if (rlState.count > RATE_LIMIT_MAX) {
    return c.json({ error: "Rate limit exceeded. Try again later." }, 429)
  }

  c.set("user", user)
  await next()
})

async function deductCreditAtomic(userId: string) {
  const [updatedProfile] = await db
    .update(profiles)
    .set({ credits: sql`${profiles.credits} - 1` })
    .where(and(eq(profiles.id, userId), sql`${profiles.credits} > 0`))
    .returning()

  if (!updatedProfile) {
    throw new Error("Insufficient credits.")
  }
}

import { ReforgeResponseSchema } from "../../lib/ghost-schema"
import type { ImmutableFacts } from "../../lib/ghost-schema"

const GHOST_PROTOCOL_PROMPT = `You are a forensic resume distillation engine. Your output is a complete, polished resume bullet, but you must invisibly tag every claim with its truth-state.

## ABSOLUTE RULES:
1. OUTPUT FORMAT: Return a single valid JSON object. No markdown fences, no preamble.
2. SCHEMA:
   {
     "bullets": [
       {
         "text": "string", // Complete, polished, ready-to-read bullet (80-150 chars)
         "provenance": "user_verified" | "estimated" | "inferred",
         "confidence": number, // 0.0 to 1.0
         "ghostNote": "string" | null, // Explain why you estimated or inferred
         "userAction": "none" | "confirm_or_replace" | "verify_or_delete",
         "suggestedRange": "string" | null, // e.g., "15-30%" or "$50k-$100k"
         "sourceFidelity": "faithful" | "amplified" | "fabricated",
         "originalClaim": "string" // The user's exact input, preserved
       }
     ],
     "humanScoreNotes": ["string"],
     "immutableFacts": {
       "fullName": "string",
       "email": "string",
       "phone": "string",
       "companies": ["string"],
       "jobTitles": ["string"],
       "schools": ["string"]
     }
   }

3. WRITE THE FULL BULLET. Never use placeholders like [METRIC REQUIRED]. The user must see a complete sentence.
4. PROVENANCE RULES:
   - "user_verified": The user explicitly gave you a hard number, name, or fact. Confidence must be 1.0.
   - "estimated": The user gave you a vague accomplishment and you added a conservative, plausible metric. Default to the LOW end of typical ranges (e.g., ~10%, not ~40%). Confidence 0.5-0.8.
   - "inferred": You added generic narrative language the user never mentioned (e.g., "collaborated cross-functionally," "drove strategic alignment"). Confidence < 0.5.
5. SOURCE FIDELITY:
   - "faithful": The rewrite preserves the exact scope of the user's claim.
   - "amplified": The user said "helped" and you wrote "led." Downgrade provenance to "estimated" even if they gave a number.
   - "fabricated": You invented a company name, team size, or technology the user never mentioned. This is a critical failure. Never do this.
6. CONSERVATIVE BIAS: When estimating metrics, guess the lowest plausible number. Use the "~" prefix in the text (e.g., "~10%") to signal softness.
7. AGGRESSIVE INFERRED FLAGGING: Any bullet containing generic corporate language the user did not explicitly state MUST be marked "inferred." Be ruthless.
8. BUZZWORD DENYLIST: Never use: robust, seamless, dynamic, leverage, synergy, cutting-edge, transformational, paradigm, holistic, scalable (unless literal), next-generation, best-in-class, world-class, thought leader, passionate, driven, results-driven, utilized, spearheaded.
9. IMMUTABLE FACTS: You must echo the user's fullName, email, phone, companies, jobTitles, and schools exactly in the immutableFacts object. Never alter, abbreviate, or misspell them. If the user says "Helio Corp," do not change it to "Helio Corporation."
10. ACTIVE VOICE: Start with strong past-tense verbs. No passive voice.
11. NO HALLUCINATED PERSONAL DETAILS: Do not invent team sizes, budgets, or company names. If the user didn't mention it, either estimate conservatively (with provenance="estimated") or flag as inferred.

## EXAMPLES:
User Input: "I worked on the checkout and made it faster"
Output:
{
  "bullets": [
    {
      "text": "Reduced checkout latency by ~15% through refactoring legacy payment gateway logic",
      "provenance": "estimated",
      "confidence": 0.65,
      "ghostNote": "Estimated 15% based on typical latency gains from payment gateway refactoring at mid-size e-commerce companies. Conservative end of 10-25% range.",
      "userAction": "confirm_or_replace",
      "suggestedRange": "10-25%",
      "sourceFidelity": "faithful",
      "originalClaim": "I worked on the checkout and made it faster"
    }
  ],
  "humanScoreNotes": ["Names specific system component", "Uses engineering verb 'refactoring'"],
  "immutableFacts": { ... }
}

User Input: "Led a team of 4 to rebuild checkout, cut load time from 4.2s to 800ms"
Output:
{
  "bullets": [
    {
      "text": "Led a team of 4 engineers to rebuild checkout flow, cutting page load time from 4.2s to 800ms",
      "provenance": "user_verified",
      "confidence": 1.0,
      "ghostNote": null,
      "userAction": "none",
      "suggestedRange": null,
      "sourceFidelity": "faithful",
      "originalClaim": "Led a team of 4 to rebuild checkout, cut load time from 4.2s to 800ms"
    }
  ],
  "humanScoreNotes": ["Hard numbers present", "Specific team size", "Time measurement"],
  "immutableFacts": { ... }
}`

export async function reforgeAccomplishment(
  userInput: string,
  immutableFacts: ImmutableFacts,
  userKey: string | undefined,
  contextAddition: string = ""
) {
  const systemPrompt = `${GHOST_PROTOCOL_PROMPT}\n\n${contextAddition}`
  const userPrompt = `Reforge this accomplishment into Ghost Protocol format.\n\nUser Input: "${userInput}"\n\nImmutable Facts: ${JSON.stringify(immutableFacts)}`

  const rawResult = await aiClient.getChatCompletionJSON(
    systemPrompt,
    userPrompt,
    "gpt-4o-mini",
    { userKey, temperature: 0.2 }
  )

  // Validate with Zod
  const validated = ReforgeResponseSchema.safeParse(rawResult)
  if (!validated.success) {
    console.error("Ghost Protocol schema violation:", validated.error)
    throw new Error("AI output failed structured validation.")
  }

  const reforgeData = validated.data

  // Post-hoc immutable fact guard
  const returnedFacts = reforgeData.immutableFacts
  for (const key of ["fullName", "email", "phone"] as const) {
    if (returnedFacts[key] !== immutableFacts[key]) {
      throw new Error(`Immutable fact mutated: ${key}`)
    }
  }

  return reforgeData
}

aiRouter.post("/reforge", async (c: Context) => {
  const body = await c.req.json()
  const user = c.get("user")
  const {
    rawSummary,
    targetRole,
    targetCompany,
    targetLock,
    userId,
    slateId,
    immutableFacts,
  } = body
  const userKey = c.req.header("x-user-api-key")

  let contextAddition = ""
  if (targetLock) {
    contextAddition = `\nTARGET COMPANY INTELLIGENCE:\nExperience Framing Recommendation: ${targetLock.resume_strategy?.experience_framing || "None"}\nCulture Keywords: ${targetLock.company_dna?.culture_keywords?.join(", ") || "None"}`
  }
  contextAddition += `\n\nTARGET ROLE: ${targetRole || "general"}\nTARGET COMPANY: ${targetCompany || "general"}`

  try {
    const safeFacts = immutableFacts || {
      fullName: "Unknown",
      email: "unknown@example.com",
      phone: "000",
      companies: [],
      jobTitles: [],
      schools: [],
    }

    try {
      await deductCreditAtomic(user.id)
    } catch (e: any) {
      return c.json({ error: e.message }, 402)
    }

    const reforgeData = await reforgeAccomplishment(
      rawSummary,
      safeFacts,
      userKey,
      contextAddition
    )

    if (userId) {
      try {
        const inputHash = rawSummary ? rawSummary.slice(0, 32) : "empty"

        let inferredCount = 0
        let estimatedCount = 0
        let verifiedCount = 0

        if (reforgeData.bullets) {
          reforgeData.bullets.forEach((b) => {
            if (b.provenance === "inferred") inferredCount++
            if (b.provenance === "estimated") estimatedCount++
            if (b.provenance === "user_verified") verifiedCount++
          })
        }

        await supabaseAdmin.from("generation_audits").insert({
          user_id: userId,
          input_hash: inputHash,
          model_used: "gpt-4o-mini",
          humanization_steps: {
            ghost_protocol: true,
            luminescent_manuscript: true,
            inferredCount,
            estimatedCount,
            verifiedCount,
          },
          final_score: 100, // We'll compute the real ATS score on the client side
        })

        if (slateId) {
          await supabaseAdmin
            .from("data_slates")
            .update({ target_role: targetRole || "General" })
            .eq("id", slateId)
        }
      } catch (telemetryErr) {
        console.warn("Failed to log generation audit:", telemetryErr)
      }
    }

    return c.json(reforgeData)
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err))
    return c.json(
      { error: error.message || "Failed to generate AI response." },
      500
    )
  }
})

aiRouter.post("/distill", async (c: Context) => {
  const body = await c.req.json()
  const { rawText, mode, workEntries, targetLock } = body
  const userKey = c.req.header("x-user-api-key")

  const user = c.get("user")

  let contextAddition = ""
  if (targetLock) {
    contextAddition = `
TARGET COMPANY INTELLIGENCE:
Priority Skills to Highlight: ${targetLock.resume_strategy?.skills_priority?.join(", ") || "None"}
Metrics Emphasis: ${targetLock.resume_strategy?.metrics_emphasis || "None"}`
  }

  let systemPrompt: string
  let userPrompt: string

  if (mode === "infer_from_experience") {
    systemPrompt = `You are an expert resume ATS optimizer. Infer the core competencies and skills from the following work experience entries.\n${contextAddition}\nGroup them into logical categories (e.g. "Frontend Development", "Cloud & DevOps", "Leadership"). Return a JSON object with a 'categories' array, where each category has a 'name' (string) and 'keywords' (array of strings). Return 3-6 categories with 3-8 keywords each.`
    userPrompt = JSON.stringify(workEntries)
  } else {
    systemPrompt = `You are an expert resume ATS optimizer. Extract or generate highly relevant, industry-standard ATS keywords from the provided text.\n${contextAddition}\nGroup them into logical categories (e.g. "Programming Languages", "Frameworks", "Soft Skills"). Return a JSON object with a 'categories' array, where each category has a 'name' (string) and 'keywords' (array of strings). Return 2-5 categories with 3-8 keywords each.`
    userPrompt = rawText || ""
  }

  try {
    await deductCreditAtomic(user.id)
    const result = await aiClient.getChatCompletionJSON(
      systemPrompt,
      userPrompt,
      "gpt-4o-mini",
      { userKey }
    )
    return c.json(result)
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err))
    return c.json({ error: error.message || "Failed to generate skills." }, 500)
  }
})

aiRouter.post("/target-lock", async (c: Context) => {
  const body = await c.req.json()
  const { companyName, jobTitle } = body
  const userKey = c.req.header("x-user-api-key")

  const systemPrompt = `You are an elite career strategist. The user is targeting a role at a specific company. Provide a tactical briefing. 
Return a JSON object matching this schema exactly:
{
  "briefing": {
    "company_dna": {
      "personality": "string",
      "tone_recommendation": "string",
      "culture_keywords": ["string"],
      "avoid_terms": ["string"]
    },
    "resume_strategy": {
      "summary_directive": "string",
      "summary_draft": "string",
      "experience_framing": "string",
      "skills_priority": ["string"],
      "skills_to_add": ["string"],
      "keyword_injection_targets": ["string"],
      "metrics_emphasis": "string"
    },
    "advantage_cards": [
      { "title": "string", "insight": "string", "action": "string" }
    ],
    "fit_radar": {
      "technical_match": 80,
      "culture_alignment": 80,
      "experience_level": 80,
      "industry_relevance": 80,
      "keyword_coverage": 80
    },
    "interview_hooks": {
      "likely_questions": ["string"],
      "talking_points": ["string"],
      "company_challenges_to_reference": ["string"]
    }
  }
}`

  const userPrompt = `Target Company: ${companyName}\nTarget Role: ${jobTitle || "General"}`
  const user = c.get("user")

  try {
    await deductCreditAtomic(user.id)
    const result = await aiClient.getChatCompletionJSON(
      systemPrompt,
      userPrompt,
      "gpt-4o-mini",
      { userKey }
    )
    return c.json(result)
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err))
    return c.json(
      { error: error.message || "Failed to acquire target lock." },
      500
    )
  }
})

aiRouter.post("/score", async (c: Context) => {
  const body = await c.req.json()
  const { bullets, targetRole, targetLock } = body
  const userKey = c.req.header("x-user-api-key")

  let contextAddition = ""
  if (targetLock) {
    contextAddition = `
TARGET COMPANY INTELLIGENCE:
Metrics Emphasis: ${targetLock.resume_strategy?.metrics_emphasis || "None"}
Experience Framing: ${targetLock.resume_strategy?.experience_framing || "None"}`
  }

  const systemPrompt = `You are an elite FAANG Resume Evaluator. Analyze the provided resume bullet points using the "XYZ Formula" (Accomplished [X] as measured by [Y], by doing [Z]).
${contextAddition}

Return a strict JSON object matching this schema exactly:
{
  "overall_score": 85,
  "scores": [
    {
      "original": "string",
      "score": 80,
      "breakdown": {
        "accomplishment_x": 10,
        "metric_y": 10,
        "method_z": 10
      },
      "verdict": "weak" | "needs_metrics" | "strong" | "faang_ready",
      "issues": ["string"],
      "rewrite": "string"
    }
  ]
}`

  const userPrompt = `Target Role: ${targetRole || "General"}\n\nBullets to analyze:\n${JSON.stringify(bullets)}`
  const user = c.get("user")

  try {
    await deductCreditAtomic(user.id)
    const result = await aiClient.getChatCompletionJSON(
      systemPrompt,
      userPrompt,
      "gpt-4o-mini",
      { userKey }
    )
    return c.json(result)
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err))
    return c.json({ error: error.message || "Failed to score bullets." }, 500)
  }
})
