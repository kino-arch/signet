import { useMemo } from "react"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { calculateATSScore } from "@/lib/ats-validator"
import { calculateHumanScore } from "@/lib/human-score"
import type { GhostBullet } from "@/lib/ghost-schema"
import { AlertTriangle, CheckCircle2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function ResumeScoreDashboard() {
  const { basics, work, education, skills } = useDataSlateStore()

  const { atsResult, humanResult, provenanceStats } = useMemo(() => {
    // 1. Build fullText
    const textParts = [
      basics.name,
      basics.label,
      basics.email,
      basics.phone,
      basics.summary,
      ...work.map(
        (w) => `${w.name} ${w.position} ${w.summary} ${w.highlights.join(" ")}`
      ),
      ...education.map((e) => `${e.institution} ${e.area} ${e.studyType}`),
      ...skills.map((s) => `${s.name} ${s.keywords.join(" ")}`),
    ]
    const fullText = textParts.join("\n  // constellation-override: forge-bot-auto-migration\n")

    // 2. Extract ghostBullets
    const allBullets = work.flatMap((w) => w.highlights)
    const ghostBullets = work.flatMap((w) => w.ghostBullets || [])

    // For ATS, if ghostBullets is empty (legacy), build mock ones
    const atsBullets =
      ghostBullets.length > 0
        ? ghostBullets
        : allBullets.map(
            (text) =>
              ({
                text,
                provenance: "user_verified",
                confidence: 1.0,
                ghostNote: null,
                userAction: "none",
                suggestedRange: null,
                sourceFidelity: "faithful",
                originalClaim: text,
              }) as GhostBullet
          )

    const atsResult = calculateATSScore(fullText, atsBullets)
    const humanResult = calculateHumanScore(allBullets)

    const provenanceStats = {
      verified: ghostBullets.filter((b) => b.provenance === "user_verified")
        .length,
      estimated: ghostBullets.filter((b) => b.provenance === "estimated")
        .length,
      inferred: ghostBullets.filter((b) => b.provenance === "inferred").length,
      total: ghostBullets.length,
    }

    return { atsResult, humanResult, provenanceStats }
  }, [basics, work, education, skills])

  const ScoreRing = ({ score, label }: { score: number; label: string }) => (
    <div className="flex flex-col items-center justify-center space-y-1">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-muted bg-background">
        <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
          <circle
            className={cn(
              "transition-all duration-500",
              score >= 75
                ? "stroke-primary"
                : score >= 50
                  ? "stroke-amber-500"
                  : "stroke-destructive"
            )}
            strokeWidth="4"
            fill="transparent"
            r="26"
            cx="28"
            cy="28"
            style={{
              strokeDasharray: 163.36,
              strokeDashoffset: 163.36 - (163.36 * score) / 100,
            }}
          />
        </svg>
        <span className="font-mono text-sm font-bold">{score}</span>
      </div>
      <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )

  return (
    <div className="glow-border glass-panel mb-8 space-y-4 rounded-xl p-5">
      <div className="flex items-center justify-between border-b border-border/30 pb-4">
        <div className="space-y-1">
          <h2 className="text-sm font-bold tracking-widest text-foreground uppercase">
            Datacore Analytics
          </h2>
          <p className="text-xs text-muted-foreground">
            Real-time resume scoring telemetry.
          </p>
        </div>
        <div className="flex gap-6">
          <ScoreRing score={atsResult.total} label="ATS Match" />
          <ScoreRing score={humanResult.score} label="Human EQ" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
        {/* ATS Insights */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-[11px] font-bold tracking-widest text-primary uppercase">
              ATS Scan Results
            </h3>
          </div>
          <ul className="space-y-2">
            {atsResult.breakdown.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs leading-tight"
              >
                {b.score === b.max ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                ) : b.score > 0 ? (
                  <Info className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-destructive" />
                )}
                <div>
                  <span className="font-medium text-muted-foreground">
                    {b.rule}:{" "}
                  </span>
                  <span
                    className={cn(
                      "font-bold",
                      b.score === b.max ? "text-emerald-500" : "text-foreground"
                    )}
                  >
                    {b.score}/{b.max}
                  </span>
                  {b.message && (
                    <p className="mt-0.5 text-[10px] text-muted-foreground/80">
                      {b.message}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Provenance Scorecard */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-[11px] font-bold tracking-widest text-primary uppercase">
              Provenance Scorecard
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="font-medium">Verified Content</span>
              </div>
              <span className="font-mono text-sm font-bold text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">
                {provenanceStats.verified}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                <div className="ml-1 h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <span className="font-medium">Estimated Metrics</span>
              </div>
              <span className="font-mono text-sm font-bold text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                {provenanceStats.estimated}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                <div className="ml-1 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <span className="font-medium">Inferred Narrative</span>
              </div>
              <span className="font-mono text-sm font-bold text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]">
                {provenanceStats.inferred}
              </span>
            </div>

            {provenanceStats.inferred > 0 && (
              <div className="mt-4 rounded border border-red-500/20 bg-red-500/5 p-2">
                <p className="text-[10px] text-red-400">
                  <span className="font-bold tracking-wider uppercase">
                    Export Locked:
                  </span>{" "}
                  Resolve inferred narrative before exporting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
