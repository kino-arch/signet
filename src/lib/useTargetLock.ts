import { useState } from "react"
import { useForgeStore } from "../store/useForgeStore"

export type TargetLockStatus =
  | "idle"
  | "scanning"
  | "analyzing"
  | "complete"
  | "error"

export interface CompanyIntel {
  company: {
    name: string
    description: string
    industry: string
    culture_signals: string[]
    recent_news?: string[]
  }
  job: {
    title: string
    description: string
    requirements: string[]
    detected_keywords: string[]
  }
  interview_insights: string[]
}

export interface TargetLockBriefing {
  company_dna: {
    personality: string
    tone_recommendation: string
    culture_keywords: string[]
    avoid_terms: string[]
  }
  resume_strategy: {
    summary_directive: string
    summary_draft: string
    experience_framing: string
    skills_priority: string[]
    skills_to_add: string[]
    keyword_injection_targets: string[]
    metrics_emphasis: string
  }
  advantage_cards: {
    title: string
    insight: string
    action: string
  }[]
  fit_radar: {
    technical_match: number
    culture_alignment: number
    experience_level: number
    industry_relevance: number
    keyword_coverage: number
  }
  interview_hooks: {
    likely_questions: string[]
    talking_points: string[]
    company_challenges_to_reference: string[]
  }
}

// ─── Retry helper ─────────────────────────────────────────────────────────────
// FunctionsFetchError is a transient network-level error (CORS preflight race,
// Cloudflare 502, etc.). We retry up to 3 times with exponential backoff.
async function invokeWithRetry(
  url: string,
  body: Record<string, unknown>,
  maxRetries = 3
): Promise<{ data: Record<string, unknown> | null; error: unknown }> {
  let lastError: unknown = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, 800 * Math.pow(2, attempt - 1)))
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        lastError = new Error(`HTTP error! status: ${res.status}`)
        if (res.status >= 500) {
          console.warn(
            `[Target Lock] Attempt ${attempt + 1}/${maxRetries} — HTTP 5xx, retrying…`
          )
          continue
        }
        return { data: null, error: lastError }
      }

      const data = await res.json()
      return { data, error: null }
    } catch (error) {
      lastError = error
      console.warn(
        `[Target Lock] Attempt ${attempt + 1}/${maxRetries} — Fetch error, retrying…`,
        error
      )
      continue
    }
  }

  return { data: null, error: lastError }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTargetLock() {
  const [status, setStatus] = useState<TargetLockStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [progressLabel, setProgressLabel] = useState("")
  const [error, setError] = useState<string | null>(null)

  const setBriefing = useForgeStore((state) => state.setTargetLockBriefing)
  const setCompany = useForgeStore((state) => state.setTargetLockCompany)

  const activateTargetLock = async (
    companyName: string,
    jobTitle?: string,
    autoDeploy: boolean = false
  ) => {
    setStatus("scanning")
    setError(null)
    setProgress(10)
    setProgressLabel("ESTABLISHING SECURE LINK...")

    // Animate progress phases while waiting for the edge function
    const phases = [
      { progress: 30, label: "SCANNING COMPANY REGISTRY..." },
      { progress: 55, label: "ANALYZING CULTURE SIGNALS..." },
      { progress: 72, label: "BUILDING STRATEGY MATRIX..." },
    ]
    let phaseIndex = 0
    const progressInterval = setInterval(() => {
      if (phaseIndex < phases.length) {
        const phase = phases[phaseIndex]
        setProgress(phase.progress)
        setProgressLabel(phase.label)
        if (phase.progress >= 55) setStatus("analyzing")
        phaseIndex++
      }
    }, 1800)

    try {
      const { data, error: invokeError } = await invokeWithRetry(
        "/ai/target-lock",
        { companyName, jobTitle }
      )

      clearInterval(progressInterval)

      // ── Error discrimination ───────────────────────────────────────────────
      if (invokeError) {
        throw new Error(
          (invokeError as Error)?.message || "An unexpected error occurred."
        )
      }

      if (data && typeof data.error === "string") {
        throw new Error(data.error)
      }

      setProgress(100)
      setProgressLabel("TARGET ACQUIRED")
      setStatus("complete")
      setBriefing(data?.briefing as TargetLockBriefing)
      setCompany(companyName, jobTitle)

      if (autoDeploy) {
        return { ...data, autoDeployed: true }
      }

      return data
    } catch (err: unknown) {
      clearInterval(progressInterval)
      console.error("[Target Lock] Final error:", err)
      setStatus("error")
      const e = err as Error
      setError(e.message || "Failed to engage Target Lock. Please try again.")
    }
  }

  const reset = () => {
    setStatus("idle")
    setProgress(0)
    setProgressLabel("")
    setError(null)
  }

  return { status, progress, progressLabel, error, activateTargetLock, reset }
}
