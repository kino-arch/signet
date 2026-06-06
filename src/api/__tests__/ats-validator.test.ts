import { validateATS } from "../lib/ats-validator"
import { describe, it, expect } from "vitest"

describe("ATS Validator", () => {
  it("should deduct points for missing headers", () => {
    const result = validateATS("This is a resume without headers.")
    expect(result.score).toBeLessThan(100)
    expect(
      result.warnings.some((w) =>
        w.includes("Missing standard section header: Experience")
      )
    ).toBe(true)
  })

  it("should find dates and not warn if dates exist", () => {
    const result = validateATS(
      "Experience\nEducation\nSkills\nWorked from 2020 to 2022"
    )
    expect(
      result.warnings.some((w) => w.includes("No obvious dates found"))
    ).toBe(false)
  })

  it("should penalize buzzwords", () => {
    const result = validateATS(
      "Experience Education Skills 2020. I am a thought leader who loves synergies and is an impactful ninja."
    )
    expect(result.score).toBeLessThan(100)
    expect(result.warnings.some((w) => w.includes("synergies"))).toBe(true)
    expect(result.warnings.some((w) => w.includes("thought leader"))).toBe(true)
  })

  it("should return 100 for a perfect small snippet", () => {
    const result = validateATS(
      "Experience: Software Engineer (2020 - 2024)\nEducation: BS Computer Science (2016 - 2020)\nSkills: JavaScript, TypeScript, React\nDeveloped scalable web applications."
    )
    expect(result.score).toBe(100)
    expect(result.warnings.length).toBe(0)
  })
})
