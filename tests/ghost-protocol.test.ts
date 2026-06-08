import { describe, it, expect } from "vitest"
import type { GhostBullet } from "../src/lib/ghost-schema"

// Fixture: immutable facts that Ghost Protocol is not allowed to modify.
// Kept here for future integration tests that verify identity fidelity.

describe("Ghost Protocol — Luminescent Manuscript", () => {
  it("blocks export if inferred bullets exist", async () => {
    const { checkExportStatus } = await import("../src/lib/export-guard")
    const bullets = [
      {
        text: "Led a team of 4 to rebuild checkout",
        provenance: "user_verified",
        confidence: 1.0,
        ghostNote: null,
        userAction: "none",
        suggestedRange: null,
        sourceFidelity: "faithful",
        originalClaim: "Led a team of 4 to rebuild checkout",
      },
      {
        text: "Collaborated cross-functionally to drive alignment",
        provenance: "inferred",
        confidence: 0.3,
        ghostNote: "User did not mention collaboration",
        userAction: "verify_or_delete",
        suggestedRange: null,
        sourceFidelity: "fabricated",
        originalClaim: "Helped with the project",
      },
    ] as const
    const status = checkExportStatus(bullets as unknown as GhostBullet[])
    expect(status.allowed).toBe(false)
    expect(status.blockers.length).toBeGreaterThan(0)
    expect(status.inferredCount).toBe(1)
  })
})
