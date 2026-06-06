import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Target, Zap, AlertTriangle } from "lucide-react"
import { useTargetMatrixStore } from "@/store/useTargetMatrixStore"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import type { Application } from "@/store/useTargetMatrixStore"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface MatchAnalysisDialogProps {
  application: Application
}

export function MatchAnalysisDialog({ application }: MatchAnalysisDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [jobDescription, setJobDescription] = useState(
    application.jobDescription || ""
  )
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const { updateApplication } = useTargetMatrixStore()
  const dataSlate = useDataSlateStore()

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste the job description first.")
      return
    }

    setIsAnalyzing(true)

    // Save JD
    updateApplication(application.id, { jobDescription })

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const token = session?.access_token || "mock-token"

      // Build resume payload
      const resumeData = {
        summary: dataSlate.basics.summary,
        experience: dataSlate.work.map((w) => ({
          title: w.position,
          company: w.name,
          duration: `${w.startDate} - ${w.endDate}`,
          highlights: w.highlights,
        })),
        skills: dataSlate.skills.map((s) => s.keywords).flat(),
      }

      const res = await fetch(
        "https://vslbiwubtcynvfytwcbr.supabase.co/functions/v1/match-score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resume_data: resumeData,
            job_description: jobDescription,
          }),
        }
      )

      if (!res.ok) throw new Error("Failed to reach matching engine.")

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      updateApplication(application.id, {
        matchScore: {
          overall_match: data.overall_match,
          gap_analysis: data.gap_analysis,
          missing_keywords: data.missing_keywords || [],
        },
      })

      toast.success("Target Lock analysis complete.")
    } catch (err: any) {
      toast.error(err.message || "Analysis failed.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 h-7 w-full gap-1.5 border-primary/20 bg-primary/5 text-[10px] font-bold tracking-widest text-primary uppercase hover:bg-primary/20 hover:text-primary-foreground"
        >
          <Target className="size-3" />
          {application.matchScore
            ? `Match: ${application.matchScore.overall_match}%`
            : "Analyze Fit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl border-border/40 bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading tracking-widest text-primary uppercase">
            <Target className="size-4" /> Target Lock Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4 md:grid-cols-2">
          {/* Left Column: Job Description Input */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Job Description
            </label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="min-h-[250px] resize-none bg-background/50 font-mono text-sm"
            />
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jobDescription}
              className="w-full gap-2 font-mono text-[10px] tracking-widest uppercase"
            >
              {isAnalyzing ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Zap className="size-3.5" />
              )}
              {isAnalyzing ? "Processing..." : "Run Match Engine"}
            </Button>
          </div>

          {/* Right Column: Results */}
          <div className="flex flex-col gap-4 rounded-md border border-border/40 bg-background/30 p-4">
            {!application.matchScore ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground opacity-60">
                <Target className="size-10" />
                <p className="text-xs">
                  Paste the job description and run the engine to calculate your
                  match score.
                </p>
              </div>
            ) : (
              <div className="animate-in space-y-4 fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    Match Score
                  </span>
                  <span
                    className={cn(
                      "font-mono text-2xl font-bold",
                      application.matchScore.overall_match >= 80
                        ? "text-emerald-500"
                        : application.matchScore.overall_match >= 60
                          ? "text-amber-500"
                          : "text-destructive"
                    )}
                  >
                    {application.matchScore.overall_match}%
                  </span>
                </div>

                <div>
                  <h4 className="mb-1 text-[10px] font-bold tracking-widest text-primary uppercase">
                    Strategic Assessment
                  </h4>
                  <p className="text-xs leading-relaxed text-foreground">
                    {application.matchScore.gap_analysis}
                  </p>
                </div>

                {application.matchScore.missing_keywords &&
                  application.matchScore.missing_keywords.length > 0 && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-amber-500 uppercase">
                        <AlertTriangle className="size-3" /> Missing Keywords
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {application.matchScore.missing_keywords.map(
                          (kw, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-500"
                            >
                              {kw.keyword}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
