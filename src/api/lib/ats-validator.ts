import { aiClient } from "./ai-client"

export interface ATSValidationResult {
  score: number
  warnings: string[]
}

export function validateATS(
  content: string,
  scope: "full_resume" | "section" = "full_resume"
): ATSValidationResult {
  let score = 100
  const warnings: string[] = []

  const contentLower = content.toLowerCase()

  if (scope === "full_resume") {
    // Check for standard section headers (case insensitive)
    const headers = ["experience", "education", "skills"]
    for (const header of headers) {
      if (!contentLower.includes(header)) {
        score -= 10
        warnings.push(
          `Missing standard section header: ${header.charAt(0).toUpperCase() + header.slice(1)}`
        )
      }
    }

    // Basic date formatting consistency check
    const dateRegex = /\b(19|20)\d{2}\b/g
    const yearMatches = content.match(dateRegex)
    if (!yearMatches || yearMatches.length === 0) {
      warnings.push(
        "No obvious dates found. Ensure consistent date formatting (e.g. MM/YYYY)."
      )
      score -= 5
    }
  }

  // Keyword density (simple check: are there too many repeated buzzwords?)
  const buzzwords = [
    "synergy",
    "synergies",
    "impactful",
    "thought leader",
    "ninja",
    "rockstar",
  ]
  for (const word of buzzwords) {
    if (contentLower.includes(word)) {
      score -= 5
      warnings.push(`Consider removing generic buzzword: "${word}"`)
    }
  }

  return {
    score: Math.max(0, score),
    warnings,
  }
}

// Helper to compute cosine similarity
function cosineSimilarity(vecA: number[], vecB: number[]) {
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }
  if (normA === 0 || normB === 0) return 0
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

export async function validateSemanticATS(
  content: string,
  jobDescription: string,
  userKey?: string
): Promise<ATSValidationResult> {
  const warnings: string[] = []
  
  if (!jobDescription || jobDescription.trim() === "") {
    return { score: 0, warnings: ["No Job Description provided for Semantic ATS matching."] }
  }

  try {
    const [contentEmbedding, jdEmbedding] = await Promise.all([
      aiClient.getEmbeddings(content, { userKey }),
      aiClient.getEmbeddings(jobDescription, { userKey })
    ])

    const similarity = cosineSimilarity(contentEmbedding, jdEmbedding)
    
    // Scale similarity (usually 0.6 to 0.9 for text) to a 0-100 score.
    // Assuming typical baseline similarity is ~0.65, we map 0.70-0.90 to 50-100.
    const normalizedScore = Math.max(0, Math.min(100, Math.round((similarity - 0.65) * 400)))
    
    if (normalizedScore < 60) {
      warnings.push("Semantic match is low. Your experience does not strongly align with the core themes of the job description.")
    }

    return { score: normalizedScore, warnings }
  } catch (err) {
    console.error("Semantic ATS failed:", err)
    return { score: 0, warnings: ["Failed to compute semantic ATS score due to an API error."] }
  }
}
