import { describe, it, expect } from "vitest"

const TEST_FACTS = {
  fullName: "Javier Kito",
  email: "jkito@mail.com",
  phone: "+17709898902",
  companies: ["Helio Corp", "Nexus LLC"],
  jobTitles: ["Full Stack Engineer"],
  schools: ["King University", "Morris University"],
}

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
    const status = checkExportStatus(bullets as any)
    expect(status.allowed).toBe(false)
    expect(status.blockers.length).toBeGreaterThan(0)
    expect(status.inferredCount).toBe(1)
  })
})
