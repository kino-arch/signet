import type { GhostBullet } from "./ghost-schema"

export interface ExportStatus {
  allowed: boolean
  warnings: string[]
  blockers: string[]
  inferredCount: number
  estimatedCount: number
  verifiedCount: number
}

export function checkExportStatus(bullets: GhostBullet[]): ExportStatus {
  const inferred = bullets.filter((b) => b.provenance === "inferred")
  const estimated = bullets.filter((b) => b.provenance === "estimated")
  const verified = bullets.filter((b) => b.provenance === "user_verified")

  const warnings: string[] = []
  const blockers: string[] = []

  if (estimated.length > 0) {
    warnings.push(
      `${estimated.length} estimated metric(s) detected. Consider verifying before applying to senior roles.`
    )
  }

  if (inferred.length > 0) {
    blockers.push(
      `${inferred.length} bullet(s) contain inferred narrative. Replace with your real experience before export.`
    )
  }

  return {
    allowed: inferred.length === 0,
    warnings,
    blockers,
    inferredCount: inferred.length,
    estimatedCount: estimated.length,
    verifiedCount: verified.length,
  }
}
