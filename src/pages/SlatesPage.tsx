import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
import { supabase } from "@/lib/supabase"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, PlusCircle, ArrowRight } from "lucide-react"

interface SlateMeta {
  id: string
  title: string
  updated_at: string
}

import { Seo } from "@/components/seo/Seo"
import { ViewModeToggle } from "@/components/dashboard/ViewModeToggle"
import { ResumeConstellation } from "@/components/dashboard/ResumeConstellation"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { FirstContact } from "@/components/onboarding/FirstContact"

export function SlatesPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const [slates, setSlates] = useState<SlateMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useLocalStorage(
    "signet-onboarding-complete",
    false
  )
  const [viewMode, setViewMode] = useState<"grid" | "constellation">(() => {
    if (typeof window === "undefined") return "grid"
    return (
      (localStorage.getItem("slates-view-mode") as "grid" | "constellation") ||
      "grid"
    )
  })

  useEffect(() => {
    localStorage.setItem("slates-view-mode", viewMode)
  }, [viewMode])

  useEffect(() => {
    const abortController = new AbortController()

    async function fetchSlates() {
      if (!user) {
        // Guests only have a single in-memory slate; they don't have saved slates.
        setSlates([])
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("data_slates")
        .select("id, title, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .abortSignal(abortController.signal)

      if (abortController.signal.aborted) return

      if (!error && data) {
        setSlates(data)
      } else {
        if (error?.name !== "AbortError") {
          console.error("Failed to fetch slates", error)
        }
      }
      setLoading(false)
    }

    fetchSlates()

    return () => {
      abortController.abort()
    }
  }, [user])

  const showOnboarding =
    !loading && slates.length === 0 && !hasCompletedOnboarding

  if (showOnboarding) {
    return (
      <FirstContact
        onComplete={() => {
          setHasCompletedOnboarding(true)
        }}
      />
    )
  }

  return (
    <>
      <Seo
        title="Slates | Signet"
        description="Your signet resumes."
        noindex={true}
      />
      <main className="flex h-full flex-col">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-widest text-foreground uppercase">
              {"My Resumes"}
            </h1>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              {viewMode === "constellation"
                ? "NAVIGATE YOUR CAREER UNIVERSE"
                : "MANAGE YOUR RESUME VERSIONS"}
            </p>
          </div>
          {slates.length > 0 && !loading && (
            <div className="flex items-center gap-4">
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
              <Button
                onClick={() => navigate("/forge/new")}
                className="bg-primary font-mono tracking-widest text-primary-foreground hover:bg-primary/90"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> {"CREATE NEW"}
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="glass-panel flex flex-col border-0">
                <CardHeader>
                  <div className="skeleton-cosmic mb-2 h-6 w-3/4 rounded" />
                  <div className="skeleton-cosmic h-4 w-1/2 rounded" />
                </CardHeader>
                <CardContent className="flex flex-1 justify-center py-6">
                  <div className="skeleton-cosmic mt-4 h-28 w-24 rounded-lg" />
                </CardContent>
                <CardFooter>
                  <div className="skeleton-cosmic h-12 w-full rounded-lg" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : slates.length === 0 ? (
          <div className="pointer-events-auto absolute inset-0 mt-16 flex flex-col items-center justify-center">
            <div className="h-32 w-32 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-[oklch(0.75_0.24_220)]/20" />
            <div className="absolute h-24 w-24 animate-pulse rounded-full border border-[oklch(0.75_0.24_220)]/10" />
            <p className="mt-8 font-mono text-sm tracking-widest text-muted-foreground">
              NO SIGNAL DETECTED
            </p>
            <p className="mt-2 text-xs text-muted-foreground/60">
              Initialize your first data slate to begin mapping
            </p>
            <button
              onClick={() => navigate("/forge/new")}
              className="hover:glow-cyan group relative z-10 mt-8 overflow-hidden rounded-lg border border-[oklch(0.75_0.24_220)]/30 bg-[oklch(0.75_0.24_220)]/10 px-8 py-3 font-mono text-xs tracking-widest text-[oklch(0.75_0.24_220)] uppercase transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[oklch(0.75_0.24_220)]/10 to-transparent group-hover:animate-[shimmer_1s_infinite]" />
              <span className="relative z-10 flex items-center gap-2">
                INITIALIZE SLATE <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        ) : viewMode === "constellation" ? (
          <ResumeConstellation slates={slates} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {slates.map((slate) => {
              const formattedDate = new Date(
                slate.updated_at
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })

              return (
                <Card
                  key={slate.id}
                  className="glass-panel glow-border-iridescent group relative flex flex-col border-0"
                >
                  <CardHeader>
                    <CardTitle className="font-heading text-lg tracking-wider text-foreground">
                      {slate.title || "UNNAMED RESUME"}
                    </CardTitle>
                    <div className="mt-1 font-mono text-sm tracking-wide text-muted-foreground uppercase">
                      MODIFIED: {formattedDate}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 justify-center py-6">
                    <div className="mt-4 flex items-center justify-center rounded-lg border border-border/50 bg-background/50 p-8 transition-all group-hover:border-[oklch(0.75_0.24_220)]/30">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => navigate(`/forge/${slate.id}`)}
                      className="hover:text-glow-cyan h-auto w-full rounded-lg border border-border bg-secondary/80 py-6 font-mono text-sm tracking-wider text-[oklch(0.75_0.24_220)] transition-all hover:border-[oklch(0.75_0.24_220)]/50 hover:bg-[oklch(0.75_0.24_220)]/10"
                    >
                      {"OPEN EDITOR"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
