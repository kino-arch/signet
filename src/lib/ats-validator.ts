import type { GhostBullet } from "./ghost-schema"

interface ATSRule {
  name: string
  weight: number
  test: (
    text: string,
    bullets: GhostBullet[]
  ) => { pass: boolean; score: number; message?: string }
}

const BUZZWORD_DENYLIST = [
  "robust",
  "seamless",
  "seamlessly",
  "dynamic",
  "leverage",
  "leveraged",
  "leveraging",
  "synergy",
  "synergies",
  "cutting-edge",
  "transformational",
  "transformation",
  "paradigm",
  "holistic",
  "scalable",
  "next-generation",
  "best-in-class",
  "world-class",
  "thought leader",
  "passionate",
  "passion",
  "driven",
  "results-driven",
  "utilized",
  "spearheaded",
]

const SECTION_HEADERS = [
  "experience",
  "work experience",
  "employment",
  "education",
  "skills",
  "projects",
  "certifications",
  "summary",
  "contact",
]

export const atsRules: ATSRule[] = [
  // 1. Buzzword Penalty (-20 max)
  {
    name: "buzzwordPenalty",
    weight: 20,
    test: (text) => {
      const found = BUZZWORD_DENYLIST.filter((word) =>
        new RegExp(`\\b${word}\\b`, "i").test(text)
      )
      const score = Math.max(0, 20 - found.length * 5)
      return {
        pass: found.length === 0,
        score,
        message:
          found.length > 0
            ? `Banned buzzwords found: ${found.join(", ")}`
            : undefined,
      }
    },
  },

  // 2. Paragraph Penalty (-15 max)
  {
    name: "paragraphPenalty",
    weight: 15,
    test: (_text, bullets) => {
      const longBlocks = bullets.filter((b) => {
        const noBreaks =
          !b.text.includes("\n") &&
          !b.text.includes("•") &&
          !b.text.includes("-")
        return b.text.length > 150 && noBreaks
      })
      const score = longBlocks.length > 0 ? 0 : 15
      return {
        pass: longBlocks.length === 0,
        score,
        message:
          longBlocks.length > 0
            ? "Paragraph blocks detected. Use bullets."
            : undefined,
      }
    },
  },

  // 3. Metric Reward (+25 max)
  {
    name: "metricReward",
    weight: 25,
    test: (_text, bullets) => {
      const metricCount = bullets.filter((b) =>
        /\d|%|\$|£|€/.test(b.text)
      ).length
      const ratio = bullets.length > 0 ? metricCount / bullets.length : 0
      const score = Math.round(ratio * 25)
      return {
        pass: ratio >= 0.8,
        score,
        message:
          ratio < 0.8
            ? `Only ${Math.round(ratio * 100)}% of bullets have metrics. Target: 80%+`
            : undefined,
      }
    },
  },

  // 4. Active Voice Check (+15 max)
  {
    name: "activeVoice",
    weight: 15,
    test: (_text, bullets) => {
      const weakStarters = [
        "was",
        "were",
        "had been",
        "have been",
        "is responsible for",
        "assisted with",
        "helped to",
      ]
      const violations = bullets.filter((b) =>
        weakStarters.some((w) => b.text.toLowerCase().startsWith(w))
      )
      const score = Math.max(0, 15 - violations.length * 5)
      return {
        pass: violations.length === 0,
        score,
        message:
          violations.length > 0
            ? "Weak passive voice detected in opening words."
            : undefined,
      }
    },
  },

  // 5. Section Header Detection (+10 max)
  {
    name: "sectionHeaders",
    weight: 10,
    test: (text) => {
      const normalized = text.toLowerCase()
      const found = SECTION_HEADERS.filter((h) => normalized.includes(h))
      const score = Math.min(10, found.length * 2.5)
      return {
        pass: found.length >= 3,
        score,
        message:
          found.length < 3
            ? "Add standard section headers (Experience, Education, Skills)."
            : undefined,
      }
    },
  },

  // 6. Date Format Normalization (+10 max)
  {
    name: "dateFormat",
    weight: 10,
    test: (text) => {
      // Penalize vague ranges without months, or non-standard formats
      const badPatterns = [
        /\d{4}\s*–\s*Present/i, // "2020–Present" without months
        /\d{4}\s*to\s*\d{4}/i, // "2020 to 2022"
      ]
      const violations = badPatterns.filter((p) => p.test(text))
      const score = violations.length > 0 ? 0 : 10
      return {
        pass: violations.length === 0,
        score,
        message:
          violations.length > 0
            ? "Use standard date formats: MM/YYYY – MM/YYYY or Month YYYY – Month YYYY."
            : undefined,
      }
    },
  },

  // 7. Contact Info Parsability (+5 max)
  {
    name: "contactParseable",
    weight: 5,
    test: (text) => {
      const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(
        text
      )
      const hasPhone =
        /\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)
      const score = (hasEmail ? 2.5 : 0) + (hasPhone ? 2.5 : 0)
      return {
        pass: hasEmail && hasPhone,
        score,
        message: !hasEmail
          ? "Add a parseable email address."
          : !hasPhone
            ? "Add a parseable phone number."
            : undefined,
      }
    },
  },
]

export function calculateATSScore(
  fullText: string,
  bullets: GhostBullet[]
): {
  total: number
  breakdown: Array<{
    rule: string
    score: number
    max: number
    message?: string
  }>
  passed: boolean
} {
  const breakdown = atsRules.map((rule) => {
    const result = rule.test(fullText, bullets)
    return {
      rule: rule.name,
      score: result.score,
      max: rule.weight,
      message: result.message,
    }
  })

  const total = breakdown.reduce((sum, b) => sum + b.score, 0)
  const passed = total >= 75 // Minimum viable score

  return { total, breakdown, passed }
}
