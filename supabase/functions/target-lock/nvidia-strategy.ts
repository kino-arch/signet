// @ts-nocheck
import { callAI } from "../_shared/ai-client.ts"

/**
 * Generates a strategic Target Lock Briefing using the shared AI client.
 * Uses the cascading model chain (NVIDIA → Gemini → OpenAI).
 */
export async function generateStrategy(companyIntel: any, _apiKey?: string) {
  const systemPrompt = `You are an elite career strategist and executive resume writer. 
Your task is to analyze intelligence gathered about a target company and a specific job role, and output a highly strategic "Target Lock Briefing" to help a candidate tailor their resume perfectly.

Analyze the provided company culture signals, interview insights, and job details.

You must return a valid JSON object matching this structure EXACTLY:
{
  "company_dna": {
    "personality": "A 2-4 word description of the company's vibe (e.g., 'Innovative disruptor', 'Enterprise-grade stability')",
    "tone_recommendation": "1 sentence on how the resume tone should sound",
    "culture_keywords": ["3-5 words they use to describe their culture"],
    "avoid_terms": ["2-3 terms that clash with their culture"]
  },
  "resume_strategy": {
    "summary_directive": "Instruction on how to frame the summary",
    "summary_draft": "A tailored 2-3 sentence professional summary draft",
    "experience_framing": "How to frame past experience to appeal to them",
    "skills_priority": ["Top 5-7 skills they care most about, ordered"],
    "skills_to_add": ["2-3 skills to make sure they include if applicable"],
    "keyword_injection_targets": ["5 exact phrases to weave into bullet points"],
    "metrics_emphasis": "What kind of metrics this company values most"
  },
  "advantage_cards": [
    {
      "title": "Short catchy title",
      "insight": "A non-obvious insight based on the data",
      "action": "What the candidate should do about it"
    }
  ],
  "fit_radar": {
    "technical_match": 85,
    "culture_alignment": 90,
    "experience_level": 80,
    "industry_relevance": 75,
    "keyword_coverage": 85
  },
  "interview_hooks": {
    "likely_questions": ["3 likely behavioral/cultural questions"],
    "talking_points": ["3 points the candidate should bring up"],
    "company_challenges_to_reference": ["1-2 things to show they researched the company"]
  }
}

Important Rules:
- Return ONLY valid JSON. No markdown formatting blocks around the JSON.
- Base your analysis entirely on the provided intelligence.
- The tone should be authoritative, strategic, and tactical.
`

  const userPrompt = `Here is the intelligence gathered:
${JSON.stringify(companyIntel, null, 2)}

Generate the Target Lock Briefing JSON.`

  const result = await callAI({
    system: systemPrompt,
    user: userPrompt,
    temperature: 0.2,
    maxTokens: 2000,
    responseFormat: "json",
  })

  try {
    // Strip markdown code blocks if the model included them despite instructions
    const cleanContent = result.content
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/, "")
      .trim()
    return JSON.parse(cleanContent)
  } catch {
    throw new Error("AI returned invalid JSON strategy")
  }
}
