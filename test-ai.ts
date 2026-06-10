import { generateObject } from "ai"
import { aiGateway } from "./src/lib/ai-gateway"
import { z } from "zod"

const TargetLockSchema = z.object({
  briefing: z.object({
    company_dna: z.object({
      personality: z.string(),
      tone_recommendation: z.string(),
      culture_keywords: z.array(z.string()),
      avoid_terms: z.array(z.string())
    }),
    resume_strategy: z.object({
      summary_directive: z.string(),
      summary_draft: z.string(),
      experience_framing: z.string(),
      skills_priority: z.array(z.string()),
      skills_to_add: z.array(z.string()),
      keyword_injection_targets: z.array(z.string()),
      metrics_emphasis: z.string()
    }),
    advantage_cards: z.array(z.object({ title: z.string(), insight: z.string(), action: z.string() })),
    fit_radar: z.object({
      technical_match: z.number(),
      culture_alignment: z.number(),
      experience_level: z.number(),
      industry_relevance: z.number(),
      keyword_coverage: z.number()
    }),
    interview_hooks: z.object({
      likely_questions: z.array(z.string()),
      talking_points: z.array(z.string()),
      company_challenges_to_reference: z.array(z.string())
    })
  })
})

async function run() {
  try {
    const { object } = await generateObject({
      model: aiGateway.route({ type: 'generateObject' }),
      schema: TargetLockSchema,
      system: "You are an elite career strategist. Return tactical briefing.",
      prompt: "Target Company: Acme\nTarget Role: Developer"
    })
    console.log("SUCCESS:", object)
  } catch (err: unknown) {
    console.error("FAILURE:", err)
  }
}

run()
