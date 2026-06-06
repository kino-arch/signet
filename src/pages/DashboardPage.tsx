import { useEffect, useState } from "react"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { HolographicDisplay } from "@/components/ui/holographic-display"
import { useAuthStore } from "@/store/useAuthStore"
import { supabase } from "@/lib/supabase"
import type { DataSlate } from "@/components/data-table"
import { DotPattern } from "@/components/dot-pattern"
import { cn } from "@/lib/utils"

import { Seo } from "@/components/seo/Seo"
import { Button } from "@/components/ui/button"

export function DashboardPage() {
  const { user } = useAuthStore()
  const [slates, setSlates] = useState<DataSlate[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSlates = async () => {
    if (!user) {
      setSlates([])
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from("data_slates")
      .select("id, title, target_role, status, latest_ats_score, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })

    if (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch slates:", error)
      }
    } else if (data) {
      const mappedSlates: DataSlate[] = data.map((slate) => ({
        id: slate.id,
        title: slate.title,
        targetRole: slate.target_role || "General",
        atsScore: slate.latest_ats_score || 0,
        status: slate.status || "Draft",
        lastUpdated: new Date(slate.updated_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }))
      setSlates(mappedSlates)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSlates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <Seo
        title="Dashboard | Signet"
        description="Your signet dashboard."
        noindex={true}
      />
      <main className="flex w-full flex-col gap-8 pt-2">
        {/* Command Deck Hero Section */}
        <div className="relative w-full overflow-hidden rounded-xl border border-border/40 bg-card p-6 shadow-sm transition-all sm:p-8 md:p-12">
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] text-primary/10"
            )}
          />
          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* TEXT ZONE: 5 columns */}
            <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left xl:col-span-5">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] tracking-widest text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                SYSTEM / STATUS: ONLINE
              </div>

              <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {"Dashboard"}
              </h1>

              <p className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">
                {
                  "Welcome to your dashboard. Build ATS-optimized resumes with AI and track your job applications."
                }
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button size="lg" className="rounded-md font-semibold">
                  Deploy Module
                </Button>
                <Button variant="outline" size="lg" className="rounded-md">
                  Diagnostics
                </Button>
              </div>
            </div>

            {/* DISPLAY UNIT: 7 columns */}
            <div className="flex justify-center lg:col-span-6 lg:justify-end xl:col-span-7">
              <HolographicDisplay />
            </div>
          </div>
        </div>
        <SectionCards slates={slates} />
        <div className="w-full">
          {loading ? (
            <div className="flex h-32 items-center justify-center rounded-lg border border-border/40 bg-card/40 backdrop-blur-sm">
              <span className="animate-pulse font-mono text-sm tracking-widest text-muted-foreground uppercase">
                Loading Slates...
              </span>
            </div>
          ) : (
            <DataTable data={slates} refreshData={fetchSlates} />
          )}
        </div>
      </main>
    </>
  )
}
