import { validateATS } from "./ats-validator"

export interface HumanizeOptions {
  enableLanguageTool?: boolean
  scope?: "full_resume" | "section"
}

export interface HumanizeResult {
  finalContent: string
  atsScore: number
  warnings: string[]
  grammarErrors: number
}

export async function runHumanizePipeline(
  content: string,
  options?: HumanizeOptions
): Promise<HumanizeResult> {
  const atsResult = validateATS(content, options?.scope || "full_resume")
  let grammarErrors = 0
  const finalContent = content // For now we won't auto-correct grammar, just score/flag it or we could fix it if we wanted.

  if (options?.enableLanguageTool) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 1500) // 1.5s timeout

      const url = process.env.VITE_LANGUAGE_TOOL_URL || process.env.LANGUAGE_TOOL_URL || "http://localhost:8010/v2/check"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: content,
          language: "en-US",
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        // data.matches contains grammar/spelling errors
        grammarErrors = data.matches?.length || 0
        if (grammarErrors > 0) {
          atsResult.warnings.push(
            `LanguageTool found ${grammarErrors} grammar/spelling issues.`
          )
          // Adjust score slightly
          atsResult.score = Math.max(0, atsResult.score - grammarErrors * 2)
        }
      }
    } catch {
      console.warn(
        "LanguageTool sidecar unavailable or timed out. Skipping grammar check."
      )
    }
  }

  return {
    finalContent,
    atsScore: atsResult.score,
    warnings: atsResult.warnings,
    grammarErrors,
  }
}
