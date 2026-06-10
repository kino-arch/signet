import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Minus, Target, Zap, Activity } from "lucide-react"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { useForgeStore } from "@/store/useForgeStore"
import { useTargetMatrixStore } from "@/store/useTargetMatrixStore"
import { validateATS } from "@/api/lib/ats-validator"

interface KpiCardProps {
  label: string
  value: string
  sublabel: string
  delta?: number | null
  icon: React.ElementType
  accent?: "emerald" | "blue" | "amber" | "violet"
  loading?: boolean
}

const accentMap = {
  emerald: "text-nordic-success",
  blue: "text-nordic-info",
  amber: "text-nordic-warning",
  violet: "text-nordic-primary",
}

/**
 * Single KPI tile with optional trend delta badge.
 * Mirrors the dashboard-01 SectionCards pattern with Signet-specific data.
 */
function KpiCard({ label, value, sublabel, delta, icon: Icon, accent = "emerald", loading }: KpiCardProps) {
  const accentClass = accentMap[accent]

  return (
    <div className="bg-nordic-surface border border-nordic-border rounded-lg p-4 flex flex-col justify-between hover:border-nordic-border-subtle transition-colors @container/card">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-nordic-text-tertiary flex items-center gap-1.5">
          <Icon className={`w-3.5 h-3.5 ${accentClass}`} aria-hidden />
          {label}
        </span>
        {delta !== null && delta !== undefined && (
          <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${
            delta > 0 ? "text-nordic-success" : delta < 0 ? "text-red-400" : "text-nordic-text-tertiary"
          }`}>
            {delta > 0 ? <TrendingUp className="w-3 h-3" /> : delta < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <div className={`text-2xl font-bold tracking-tight text-nordic-text ${loading ? "animate-pulse text-nordic-text-tertiary" : ""}`}>
          {loading ? "—" : value}
        </div>
        <p className="text-[11px] text-nordic-text-secondary mt-0.5">{sublabel}</p>
      </div>

      {/* Horizontal Micro-Sparkline (Phase 3 Design) */}
      <div className="h-1 w-full bg-nordic-border rounded-full overflow-hidden mt-auto">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            accent === "emerald" ? "bg-nordic-success" : 
            accent === "blue" ? "bg-nordic-info" : 
            accent === "amber" ? "bg-nordic-warning" : "bg-nordic-primary"
          }`}
          style={{ width: loading ? '0%' : delta ? `${Math.min(100, Math.max(10, 50 + delta))}%` : '50%' }}
        />
      </div>
    </div>
  )
}

/**
 * Row of 4 live KPI cards:
 * - ATS Score (from current slate content)
 * - Interview Rate (from applications store)
 * - Reforge Velocity (AI enhancements this session)
 * - Target Status (active / not set)
 */
export function SectionCards() {
  const work = useDataSlateStore((s) => s.work)
  const basics = useDataSlateStore((s) => s.basics)
  const applications = useTargetMatrixStore((s) => s.applications)
  const company = useForgeStore((s) => s.targetLockCompany)

  const [atsScore, setAtsScore] = useState<number | null>(null)

  useEffect(() => {
    const lines: string[] = []
    if (basics.name) lines.push(basics.name)
    if (basics.label) lines.push(basics.label)
    if (basics.summary) lines.push("Summary", basics.summary)
    for (const w of work) {
      if (w.position) lines.push(w.position)
      if (w.summary) lines.push(w.summary)
      lines.push(...w.highlights)
    }
    const content = lines.join("\n") || "Experience Education Skills"
    const result = validateATS(content, "full_resume")
    setAtsScore(result.score)
  }, [work, basics])

  const totalApps = applications.length
  const interviews = applications.filter((a) => a.status === "interviewing" || a.status === "offer").length
  const interviewRate = totalApps > 0 ? Math.round((interviews / totalApps) * 100) : 0

  // Reforge velocity: count of non-empty highlights added across all work entries (proxy for AI activity)
  const reforgeProxy = work.reduce((acc, w) => acc + w.highlights.filter(Boolean).length, 0)

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-6"
      aria-label="Key performance indicators"
    >
      <KpiCard
        label="ATS Score"
        value={atsScore !== null ? `${atsScore}%` : "—"}
        sublabel={
          atsScore === null
            ? "Calculating…"
            : atsScore >= 90
            ? "Excellent structure"
            : atsScore >= 70
            ? "Good — room to improve"
            : "Needs optimization"
        }
        delta={atsScore !== null ? (atsScore >= 80 ? 12 : -5) : null}
        icon={Activity}
        accent="emerald"
        loading={atsScore === null}
      />
      <KpiCard
        label="Interview Rate"
        value={`${interviewRate}%`}
        sublabel={
          totalApps === 0
            ? "No applications yet"
            : `${interviews} of ${totalApps} applications`
        }
        delta={interviewRate > 0 ? 8 : 0}
        icon={TrendingUp}
        accent="blue"
      />
      <KpiCard
        label="Reforge Velocity"
        value={String(reforgeProxy)}
        sublabel="Bullets refined this session"
        delta={reforgeProxy > 0 ? 24 : null}
        icon={Zap}
        accent="amber"
      />
      <KpiCard
        label="Target Lock"
        value={company ? company : "Not set"}
        sublabel={
          company
            ? "Active target acquired"
            : "Set a target to unlock intelligence"
        }
        delta={company ? 100 : 0}
        icon={Target}
        accent={company ? "violet" : "blue"}
      />
    </div>
  )
}
