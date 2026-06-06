import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Target, AlertTriangle, ArrowRight } from "lucide-react"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import type { WorkEntry } from "@/store/useDataSlateStore"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useForgeStore } from "@/store/useForgeStore"

interface ImpactScorePanelProps {
  entry: WorkEntry
}

interface ScoreResult {
  original: string
  score: number
  breakdown: {
    accomplishment_x: number
    metric_y: number
    method_z: number
  }
  verdict: "weak" | "needs_metrics" | "strong" | "faang_ready"
  issues: string[]
  rewrite: string
}

export function ImpactScorePanel({ entry }: ImpactScorePanelProps) {
  const [isScoring, setIsScoring] = useState(false)
  const [results, setResults] = useState<ScoreResult[] | null>(null)
  const [overallScore, setOverallScore] = useState<number | null>(null)
  const { updateWorkEntry } = useDataSlateStore()
  const targetLockBriefing = useForgeStore((s) => s.targetLockBriefing)

  const handleScore = async () => {
    if (!entry.highlights || entry.highlights.length === 0) {
      toast.error("Add some highlights first to analyze.")
      return
    }

    // Free action for now, but we could deduct credits
    setIsScoring(true)
    setResults(null)
    setOverallScore(null)

    try {
      const userKey = localStorage.getItem("openrouter_api_key") || ""

      const res = await fetch("/ai/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-api-key": userKey,
        },
        body: JSON.stringify({
          bullets: entry.highlights,
          targetRole: entry.position,
          targetLock: targetLockBriefing,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to reach scoring engine.")
      }

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setResults(data.scores)
      setOverallScore(data.overall_score)
    } catch (err: any) {
      toast.error(err.message || "Scoring failed.")
    } finally {
      setIsScoring(false)
    }
  }

  const applyRewrite = (index: number, newText: string) => {
    if (!entry.highlights) return
    const newHighlights = [...entry.highlights]
    newHighlights[index] = newText
    updateWorkEntry(entry.id, { highlights: newHighlights })

    // Optimistically update the result UI as well
    if (results) {
      const newResults = [...results]
      newResults[index] = {
        ...newResults[index],
        original: newText,
        score: 100,
        verdict: "faang_ready",
        issues: [],
      }
      setResults(newResults)
    }
    toast.success("Applied FAANG XYZ rewrite.")
  }

  return (
    <div className="mt-4 space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <h4 className="text-xs font-bold tracking-widest text-primary uppercase">
            XYZ Impact Scoring
          </h4>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleScore}
          disabled={
            isScoring || !entry.highlights || entry.highlights.length === 0
          }
          className="h-7 border-primary/40 bg-transparent text-[10px] text-primary hover:bg-primary/20 hover:text-primary-foreground"
        >
          {isScoring ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            "Run Analysis"
          )}
        </Button>
      </div>

      {overallScore !== null && (
        <div className="flex items-center gap-3 border-b border-primary/10 pb-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background font-mono text-sm font-bold text-primary shadow-inner">
            {overallScore}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {overallScore >= 90
              ? "Excellent. These bullets are metric-driven and highly effective."
              : overallScore >= 70
                ? "Good foundation, but needs more quantifiable metrics."
                : "Weak impact. Focus on outcomes and metrics (the Y in XYZ formula)."}
          </p>
        </div>
      )}

      {results && (
        <div className="space-y-4 pt-2">
          {results.map((res, idx) => (
            <div
              key={idx}
              className="space-y-2 rounded border border-border/50 bg-background/50 p-3"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="flex-1 text-[11px] leading-relaxed text-foreground italic">
                  "{res.original}"
                </p>
                <div
                  className={cn(
                    "shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase",
                    res.verdict === "faang_ready"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : res.verdict === "strong"
                        ? "bg-sky-500/10 text-sky-500"
                        : res.verdict === "needs_metrics"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-red-500/10 text-red-500"
                  )}
                >
                  {res.verdict.replace("_", " ")} ({res.score})
                </div>
              </div>

              {res.issues.length > 0 && (
                <ul className="space-y-1">
                  {res.issues.map((issue, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                    >
                      <AlertTriangle className="h-3 w-3 text-amber-500/70" />
                      {issue}
                    </li>
                  ))}
                </ul>
              )}

              {res.verdict !== "faang_ready" && res.rewrite && (
                <div className="mt-3 rounded border border-primary/20 bg-primary/10 p-2">
                  <p className="mb-2 flex items-center gap-1 text-[10px] font-semibold text-primary uppercase">
                    <ArrowRight className="h-3 w-3" /> Suggested XYZ Rewrite
                  </p>
                  <p className="text-[11px] leading-relaxed text-foreground">
                    {res.rewrite}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 h-6 w-full bg-primary/20 text-[10px] text-primary-foreground hover:bg-primary/40"
                    onClick={() => applyRewrite(idx, res.rewrite)}
                  >
                    Apply Rewrite
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
