import { Target, Activity, FileText, Zap } from "lucide-react"
import type { DataSlate } from "@/components/data-table"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuthStore } from "@/store/useAuthStore"
import { m } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { CounterNumber } from "@/components/counter-number"
import { GridPattern } from "@/components/grid-pattern"
import { BentoGrid, BentoGridItem } from "@/components/bento"

export function SectionCards({ slates = [] }: { slates?: DataSlate[] }) {
  const { user } = useAuthStore()
  const [generationsCount, setGenerationsCount] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!user) return
    const fetchGenerations = async () => {
      const { count } = await supabase
        .from("generation_audits")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
      setGenerationsCount(count || 0)
    }
    fetchGenerations()
  }, [user])

  const activeSlates = slates.filter((s) => s.status !== "Archived")
  const numActive = activeSlates.length

  // Calculate average ATS score of active slates
  const validScores = activeSlates
    .filter((s) => s.atsScore > 0)
    .map((s) => s.atsScore)
  const avgScore =
    validScores.length > 0
      ? Math.round(
          validScores.reduce((sum, score) => sum + score, 0) /
            validScores.length
        )
      : 0

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <m.div
      variants={reducedMotion ? {} : container}
      initial="hidden"
      animate="show"
      className="w-full px-4 lg:px-6"
    >
      <BentoGrid
        cols={{ base: 1, sm: 2, lg: 4 }}
        gap={4}
        rowHeight={{ base: "140px", md: "160px" }}
      >
        {/* Active Modules Card */}
        <BentoGridItem
          colSpan={1}
          className="group relative flex flex-col justify-between overflow-hidden border-border/40 bg-card/50 p-0 shadow-sm backdrop-blur-sm hover:shadow-md"
        >
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
          <GridPattern
            variant="small"
            className="absolute inset-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] text-primary opacity-10"
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                Active Slates
              </h3>
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CounterNumber
                value={numActive}
                size="lg"
                className="font-bold text-foreground"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {numActive === 1
                  ? "1 active module"
                  : `${numActive} active modules`}
              </p>
            </div>
          </div>
        </BentoGridItem>

        {/* Average Match Score Card */}
        <BentoGridItem
          colSpan={1}
          className="group relative flex flex-col justify-between overflow-hidden border-border/40 bg-card/50 p-0 shadow-sm backdrop-blur-sm hover:shadow-md"
        >
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
          <GridPattern
            variant="small"
            className="absolute inset-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] text-primary opacity-10"
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                Avg. ATS Match
              </h3>
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="flex items-end gap-1">
                <CounterNumber
                  value={avgScore}
                  size="lg"
                  className="font-bold text-primary"
                />
                <span className="mb-1 text-lg font-bold text-primary">%</span>
              </div>
              <p className="mt-1 text-xs text-primary/80">
                Across active slates
              </p>
            </div>
          </div>
        </BentoGridItem>

        {/* Total Audits Card */}
        <BentoGridItem
          colSpan={1}
          className="group relative flex flex-col justify-between overflow-hidden border-border/40 bg-card/50 p-0 shadow-sm backdrop-blur-sm hover:shadow-md"
        >
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
          <GridPattern
            variant="small"
            className="absolute inset-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] text-primary opacity-10"
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                Generations
              </h3>
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CounterNumber
                value={generationsCount}
                size="lg"
                className="font-bold text-foreground"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Audits performed
              </p>
            </div>
          </div>
        </BentoGridItem>

        {/* System Status Card */}
        <BentoGridItem
          colSpan={1}
          className="group relative flex flex-col justify-between overflow-hidden border-border/40 bg-card/50 p-0 shadow-sm backdrop-blur-sm hover:shadow-md"
        >
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
          <GridPattern
            variant="small"
            className="absolute inset-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] text-primary opacity-10"
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                System Status
              </h3>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
                <div className="font-mono text-xl font-bold tracking-widest text-primary md:text-2xl">
                  OPTIMAL
                </div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                All nodes online
              </p>
            </div>
          </div>
        </BentoGridItem>
      </BentoGrid>
    </m.div>
  )
}
