export interface SlateMeta {
  id: string
  title: string
  updated_at: string
}

// Deterministic completeness based on existing fields
export function deriveCompleteness(slate: SlateMeta): number {
  let score = 0

  // Base score from title quality
  if (slate.title && slate.title.length > 5) score += 0.2
  if (slate.title && slate.title.length > 15) score += 0.1

  // Recency bonus (more recently updated = more "complete" in user's mind)
  const daysSinceUpdate =
    (Date.now() - new Date(slate.updated_at).getTime()) / (1000 * 60 * 60 * 24)
  if (daysSinceUpdate < 1) score += 0.3
  else if (daysSinceUpdate < 7) score += 0.2
  else if (daysSinceUpdate < 30) score += 0.1

  // Title specificity (generic titles = lower completeness)
  const genericWords = ["new", "untitled", "resume", "draft", "copy"]
  const isGeneric = genericWords.some((w) =>
    slate.title?.toLowerCase().includes(w)
  )
  if (!isGeneric && slate.title) score += 0.2

  // Ensure minimum visibility (so stars don't disappear) and max 0.95
  return Math.max(0.3, Math.min(0.95, score))
}
