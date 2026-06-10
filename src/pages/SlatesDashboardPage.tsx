import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Target, Activity, ChevronRight, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { validateATS } from "@/api/lib/ats-validator"
import { useForgeStore } from "@/store/useForgeStore"
import { runHumanizePipeline } from "@/api/lib/humanize-pipeline"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { GenesisPrompt } from "@/components/dashboard/GenesisPrompt"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { SiteHeader } from "@/components/dashboard/SiteHeader"
import { SectionCards } from "@/components/dashboard/SectionCards"
import { ChartAreaInteractive } from "@/components/dashboard/ChartAreaInteractive"
import { SlatesDataTable } from "@/components/dashboard/SlatesDataTable"


// ─── Hero Slate Card ───────────────────────────────────────────────────────────
function SlateHeroCard({ className }: { className?: string }) {
  const basics = useDataSlateStore((s) => s.basics)
  const work = useDataSlateStore((s) => s.work)
  const heroTitle = basics.label || (work[0]?.position ?? "Your Resume")
  const heroName = basics.name || "Your Name"
  const heroSubtitle = work[0]?.name ? `Targeting ${work[0].name}` : "Start editing to personalize"

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`nordic-surface p-6 flex flex-col justify-between ${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[10px] text-nordic-text-tertiary font-mono uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-nordic-success animate-pulse" />
            Active Slate
          </h3>
          <h1 className="text-2xl font-bold tracking-tight text-nordic-text mb-1">{heroTitle}</h1>
          <p className="text-nordic-text-secondary text-sm font-medium">{heroName}</p>
          <p className="text-nordic-text-tertiary text-xs mt-0.5">{heroSubtitle}</p>
        </div>
        <Link to="/editor" className="nordic-btn-secondary text-xs h-8 px-3 flex items-center gap-1.5 shrink-0 bg-nordic-bg hover:bg-nordic-surface border border-nordic-border/50">
          Edit <ChevronRight className="w-3.5 h-3.5 text-nordic-text-secondary" />
        </Link>
      </div>

      {/* Resume thumbnail */}
      <div className="w-full h-28 bg-[#050505] border border-nordic-border-subtle mt-5 relative overflow-hidden group rounded-md shadow-inner">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.15)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute top-3 left-4 right-4 flex gap-4">
          <div className="w-1/3 flex flex-col gap-1.5">
            <div className="h-5 w-20 rounded-sm bg-nordic-border group-hover:bg-nordic-accent-light transition-colors duration-500" />
            <div className="h-1.5 w-full rounded-sm bg-nordic-border-subtle" />
            <div className="h-1.5 w-3/4 rounded-sm bg-nordic-border-subtle" />
            <div className="h-1.5 w-full rounded-sm bg-nordic-border-subtle mt-1" />
            <div className="h-1.5 w-5/6 rounded-sm bg-nordic-border-subtle" />
          </div>
          <div className="w-2/3 flex flex-col gap-2">
            <div className="h-2.5 w-3/4 rounded-sm bg-nordic-border" />
            <div className="h-1.5 w-full rounded-sm bg-nordic-border-subtle" />
            <div className="h-1.5 w-11/12 rounded-sm bg-nordic-border-subtle" />
            <div className="h-1.5 w-full rounded-sm bg-nordic-border-subtle" />
            <div className="h-2.5 w-1/2 rounded-sm bg-nordic-border mt-1" />
            <div className="h-1.5 w-full rounded-sm bg-nordic-border-subtle" />
            <div className="h-1.5 w-10/12 rounded-sm bg-nordic-border-subtle" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="mt-5 flex gap-3">
        <Link to="/editor" className="nordic-btn-primary flex-1 text-center text-sm h-10 shadow-nordic-md transition-all hover:brightness-110">
          Continue Editing
        </Link>
        <Link to="/editor" className="nordic-btn-secondary w-10 h-10 px-0 flex items-center justify-center bg-nordic-bg hover:bg-nordic-surface border border-nordic-border/50">
          <Plus className="w-4 h-4 text-nordic-text" />
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Human Score Ring Card ─────────────────────────────────────────────────────
function HumanScoreRing({ className }: { className?: string }) {
  const work = useDataSlateStore((s) => s.work)
  const basics = useDataSlateStore((s) => s.basics)
  const [score, setScore] = useState<number | null>(null)
  const [label, setLabel] = useState("Computing...")
  const loading = score === null

  useEffect(() => {
    const lines: string[] = []
    if (basics.name) lines.push(basics.name)
    if (basics.summary) lines.push(basics.summary)
    for (const w of work) {
      if (w.summary) lines.push(w.summary)
      lines.push(...w.highlights)
    }
    const content = lines.join("\n") || "Experience Education Skills 2022 2023 2024"
    runHumanizePipeline(content, { scope: "full_resume" }).then((result) => {
      setScore(result.atsScore)
      setLabel(
        result.atsScore >= 90 ? "Excellent" : result.atsScore >= 70 ? "Good structure" : "Needs work"
      )
    })
  }, [work, basics])

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`nordic-surface p-5 flex flex-col items-center justify-center text-center gap-2 ${className}`}
    >
      <p className="text-[10px] text-nordic-accent-light font-bold uppercase tracking-widest">Humanizer</p>
      <div className="flex flex-col w-full gap-4 mt-2">
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-mono uppercase tracking-widest text-nordic-text-tertiary">{label}</span>
            <span className="text-xs font-semibold text-nordic-text">{loading ? "—" : `${score}%`}</span>
          </div>
          <div className="h-1.5 w-full bg-[#252A3A] rounded-full overflow-hidden">
            <div 
              className={`h-full ${loading ? "bg-nordic-border" : "bg-nordic-success"} rounded-full transition-all duration-1000`} 
              style={{ width: loading ? "0%" : `${score}%` }} 
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── ATS Match Card ────────────────────────────────────────────────────────────
function AtsMatchCard({
  className,
  isActive,
  structureScore,
}: {
  className?: string
  isActive?: boolean
  structureScore: number
}) {
  const targetBriefing = useForgeStore((s) => s.targetLockBriefing)
  const semanticScore = targetBriefing?.fit_radar
    ? Math.round(
        Object.values(targetBriefing.fit_radar).reduce((a, b) => a + (b as number), 0) /
          Object.values(targetBriefing.fit_radar).length
      )
    : null

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      animate={{
        scale: isActive ? 1.02 : 1,
        borderColor: isActive ? "rgba(52, 211, 153, 0.35)" : "rgba(255,255,255,0.05)",
        boxShadow: isActive ? "0 0 24px rgba(52, 211, 153, 0.08)" : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`nordic-surface p-5 flex flex-col justify-between border ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-nordic-success" />
        <h3 className="font-semibold text-sm">ATS Match</h3>
        {isActive && (
          <span className="ml-auto text-[9px] bg-nordic-success/20 text-nordic-success px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
            Live
          </span>
        )}
      </div>
      <div className="flex flex-col w-full gap-4 mt-2">
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-mono uppercase tracking-widest text-nordic-text-tertiary">Structure</span>
            <span className="text-xs font-semibold text-nordic-text">{structureScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#252A3A] rounded-full overflow-hidden">
            <div 
              className="h-full bg-nordic-success rounded-full transition-all duration-1000" 
              style={{ width: `${structureScore}%` }} 
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-mono uppercase tracking-widest text-nordic-text-tertiary flex items-center gap-1.5">
              Semantic
              {semanticScore === null && <span className="text-[8px] text-nordic-warning normal-case tracking-normal border border-nordic-warning/30 bg-nordic-warning/10 px-1 rounded-sm">No Target</span>}
            </span>
            <span className="text-xs font-semibold text-nordic-text">{semanticScore === null ? "—" : `${semanticScore}%`}</span>
          </div>
          <div className="h-1.5 w-full bg-[#252A3A] rounded-full overflow-hidden">
            <div 
              className={`h-full ${semanticScore === null ? "bg-nordic-border" : "bg-nordic-info"} rounded-full transition-all duration-1000`} 
              style={{ width: semanticScore === null ? "0%" : `${semanticScore}%` }} 
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Target Lock Briefing Card ─────────────────────────────────────────────────
function TargetLockBriefing({ className, isActive }: { className?: string; isActive?: boolean }) {
  const company = useForgeStore((s) => s.targetLockCompany)
  const jobTitle = useForgeStore((s) => s.targetLockJobTitle)
  const briefing = useForgeStore((s) => s.targetLockBriefing)

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.005 }}
      animate={{
        scale: isActive ? 1.01 : 1,
        borderColor: isActive ? "rgba(96, 165, 250, 0.35)" : "rgba(255,255,255,0.05)",
        boxShadow: isActive ? "0 0 32px rgba(96, 165, 250, 0.08)" : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`nordic-surface p-6 relative overflow-hidden border ${className} ${isActive ? "liquid-glass" : ""}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-nordic-accent-light" />
        <h3 className="font-semibold text-sm">Target Lock Briefing</h3>
      </div>

      {company ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-nordic-text-secondary text-xs">Company</span>
            <span className="font-semibold text-white">{company}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-nordic-text-secondary text-xs">Role</span>
            <span className="font-medium text-white">{jobTitle || "—"}</span>
          </div>
          {briefing?.company_dna?.culture_keywords && (
            <div className="mt-3 pt-3 border-t border-nordic-border-subtle">
              <p className="text-[10px] text-nordic-text-secondary mb-2 uppercase tracking-wider font-bold">
                Culture DNA
              </p>
              <div className="flex gap-2 flex-wrap">
                {briefing.company_dna.culture_keywords.slice(0, 4).map((kw, i) => (
                  <span
                    key={i}
                    className="nordic-tag text-[10px] px-2 py-0.5 rounded-full bg-nordic-accent/10 text-nordic-accent-light border border-nordic-accent/20"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
          {briefing?.resume_strategy?.summary_directive && (
            <p className="text-[11px] text-nordic-text-secondary mt-3 italic leading-relaxed line-clamp-2">
              "{briefing.resume_strategy.summary_directive}"
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-3 gap-3 text-center">
          <Lock className="w-7 h-7 text-nordic-text-tertiary opacity-50" />
          <p className="text-xs text-nordic-text-secondary">No target acquired yet.</p>
          <Link to="/editor" className="nordic-btn-secondary text-xs py-1.5 px-3">
            Engage Target Lock
          </Link>
        </div>
      )}
    </motion.div>
  )
}



// ─── Page ──────────────────────────────────────────────────────────────────────
export function SlatesDashboardPage() {
  const [isActivelyInterviewing, setIsActivelyInterviewing] = React.useState(true)
  const [structureScore, setStructureScore] = useState(0)
  const work = useDataSlateStore((s) => s.work)
  const basics = useDataSlateStore((s) => s.basics)
  const hasContent = basics.name || work.length > 0

  useEffect(() => {
    const lines: string[] = []
    if (basics.name) lines.push(basics.name)
    if (basics.label) lines.push(basics.label)
    if (basics.summary) lines.push("Summary", basics.summary)
    if (work.length > 0) lines.push("Experience")
    for (const w of work) {
      if (w.position) lines.push(w.position)
      if (w.name) lines.push(w.name)
      if (w.startDate) lines.push(w.startDate)
      if (w.summary) lines.push(w.summary)
      lines.push(...w.highlights)
    }
    if (basics.email || basics.phone) lines.push("Skills", "Education")
    const content = lines.join("\n") || "Experience Education Skills 2022 2023 2024"
    const result = validateATS(content, "full_resume")
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStructureScore(result.score)
  }, [work, basics])

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full relative">
      {/* Site Header */}
      <SiteHeader />

      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 py-6 max-w-7xl mx-auto w-full">

          {/* KPI Cards */}
          <SectionCards />

          {/* Hero Bento + Score Cards */}
          <section
            aria-label="Active slate overview"
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 px-4 lg:px-6"
          >
            <SlateHeroCard className="md:col-span-2 md:row-span-2" />
            <HumanScoreRing className="md:col-span-1 md:row-span-1" />
            <AtsMatchCard
              className="md:col-span-1 md:row-span-1"
              isActive={isActivelyInterviewing}
              structureScore={structureScore}
            />
            <TargetLockBriefing className="md:col-span-2 md:row-span-1" isActive={isActivelyInterviewing} />
          </section>

          {/* Charts + Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 lg:px-6">
            <div className="lg:col-span-2">
              <ChartAreaInteractive />
            </div>
            <ActivityFeed className="lg:col-span-1" />
          </div>

          {/* Slates DataTable */}
          <section aria-label="All slates" className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-4 lg:px-6">
              <h3 className="text-sm font-semibold text-nordic-text-secondary uppercase tracking-wider">
                All Slates
              </h3>
              <label className="flex items-center gap-2 text-xs text-nordic-text-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="interviewing-toggle"
                  checked={isActivelyInterviewing}
                  onChange={() => setIsActivelyInterviewing(!isActivelyInterviewing)}
                  className="accent-nordic-accent rounded"
                />
                Interviewing Mode
              </label>
            </div>
            <SlatesDataTable />
          </section>

        </div>
      </div>

      {/* Floating Action Button (FAB) for New Slate */}
      <button
        onClick={() => {
          // In a real app, this would trigger the new slate flow or open a modal
          console.log("New slate clicked from FAB");
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-nordic-primary text-nordic-bg rounded-full shadow-nordic-lg hover:bg-nordic-info transition-all hover:scale-105 active:scale-95 group"
        aria-label="Create New Slate"
      >
        <Plus className="w-6 h-6" />
        {/* Tooltip on hover (desktop only) */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-nordic-surface text-nordic-text text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-nordic-border/50 shadow-nordic-sm">
          New Slate
        </span>
      </button>

        {/* Genesis Prompt: shown when user has no real content yet */}
        {!hasContent && (
          <GenesisPrompt
            onSlateCreated={(role) => {
              void role
            }}
          />
        )}
    </div>
  )
}
