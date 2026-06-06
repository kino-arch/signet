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
