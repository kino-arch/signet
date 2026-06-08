export interface HumanScoreResult {
  score: number // 0–100
  flags: string[]
  suggestions: string[]
}

export function calculateHumanScore(bullets: string[]): HumanScoreResult {
  const flags: string[] = []
  const suggestions: string[] = []

  // 1. Lexical Diversity (Type-Token Ratio)
  const allWords =
    bullets
      .join(" ")
      .toLowerCase()
      .match(/\b[a-z]{4,}\b/g) || []
  const uniqueWords = new Set(allWords)
  const ttr = allWords.length > 0 ? uniqueWords.size / allWords.length : 0
  if (ttr < 0.45) {
    flags.push("Low lexical diversity")
    suggestions.push(
      "Vary your vocabulary. Avoid repeating 'developed' or 'managed' in every bullet."
    )
  }

  // 2. Sentence Length Variation
  const lengths = bullets.map((b) => b.length)
  const avg = lengths.reduce((a, b) => a + b, 0) / (lengths.length || 1)
  const variance =
    lengths.reduce((sum, len) => sum + Math.pow(len - avg, 2), 0) /
    (lengths.length || 1)
  if (variance < 200 && bullets.length > 1) {
    flags.push("Uniform bullet length")
    suggestions.push(
      "Mix short impact bullets (80 chars) with detailed ones (130 chars)."
    )
  }

  // 3. Starting Verb Diversity
  const starters = bullets.map((b) => {
    const match = b.match(/^\s*([A-Za-z]+)/)
    return match ? match[1].toLowerCase() : ""
  })
  const uniqueStarters = new Set(starters)
  if (starters.length > 0 && uniqueStarters.size / starters.length < 0.6) {
    flags.push("Repetitive opening verbs")
    suggestions.push(
      "Rotate verbs: Built, Designed, Led, Cut, Automated, Refactored, Negotiated."
    )
  }

  // 4. Passive Voice Detection
  const passiveIndicators = ["was", "were", "been", "by", "had been"]
  const passiveCount = bullets.filter((b) =>
    passiveIndicators.some((p) => b.toLowerCase().includes(` ${p} `))
  ).length
  if (bullets.length > 0 && passiveCount / bullets.length > 0.3) {
    flags.push("High passive voice ratio")
    suggestions.push(
      "Rewrite in active voice: 'System was built by me' → 'Built the system'."
    )
  }

  // 5. Adjective Density (Penalize > 2 adjectives per 100 words)
  const adjectives =
    /\b(robust|seamless|dynamic|efficient|significant|substantial|considerable)\b/gi
  const adjCount = (bullets.join(" ").match(adjectives) || []).length
  const wordCount = bullets.join(" ").split(/\s+/).length || 1
  if (adjCount / wordCount > 0.02) {
    flags.push("High adjective density")
    suggestions.push("Remove filler adjectives. Let the metric speak.")
  }

  // Calculate final score
  const baseScore = 100
  const penalty = flags.length * 15
  const score = Math.max(0, baseScore - penalty)

  return { score, flags, suggestions }
}
