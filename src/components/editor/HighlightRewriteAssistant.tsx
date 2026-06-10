import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Wand2, RefreshCw, Check, Target, Zap, Scissors, Briefcase } from "lucide-react"
import { useForgeStore } from "@/store/useForgeStore"
import { toast } from "sonner"

export interface RewritePrompt {
  id: string
  label: string
  icon: React.ReactNode
}

const PROMPTS: RewritePrompt[] = [
  { id: "metric", label: "Metric-Driven", icon: <Target className="h-3 w-3" /> },
  { id: "action", label: "Action-Oriented", icon: <Zap className="h-3 w-3" /> },
  { id: "concise", label: "Concise", icon: <Scissors className="h-3 w-3" /> },
  { id: "leadership", label: "Leadership", icon: <Briefcase className="h-3 w-3" /> },
]

interface HighlightRewriteAssistantProps {
  currentText: string
  onApply: (text: string) => void
}

export function HighlightRewriteAssistant({
  currentText,
  onApply,
}: HighlightRewriteAssistantProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("metric")
  const [generatedOptions, setGeneratedOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const targetLockBriefing = useForgeStore((s) => s.targetLockBriefing)

  const handleGenerate = async () => {
    if (!currentText.trim()) {
      toast.error("Please write a draft bullet first to rewrite it.")
      return
    }
    
    setIsLoading(true)
    setGeneratedOptions([])
    
    try {
      const userKey = localStorage.getItem("openrouter_api_key") || ""
      const response = await fetch("/ai/distill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-api-key": userKey,
        },
        body: JSON.stringify({
          mode: "rewrite_bullet",
          promptType: selectedPrompt,
          currentText,
          targetLock: targetLockBriefing,
        }),
      })
      
      if (!response.ok) throw new Error("Failed to generate rewrites")
      const result = await response.json()
      
      if (result.options && Array.isArray(result.options)) {
        setGeneratedOptions(result.options)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error generating rewrites")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-2 space-y-3 rounded-lg border border-primary/20 bg-primary/[0.02] p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
          AI Rewrite
        </span>
        {PROMPTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPrompt(p.id)}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all ${
              selectedPrompt === p.id
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                : "bg-background border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
        
        <Button
          onClick={handleGenerate}
          disabled={isLoading || !currentText.trim()}
          size="sm"
          className="ml-auto h-6 gap-1.5 px-3 text-[10px] font-bold tracking-wider uppercase"
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : generatedOptions.length > 0 ? (
            <RefreshCw className="h-3 w-3" />
          ) : (
            <Wand2 className="h-3 w-3" />
          )}
          {generatedOptions.length > 0 ? "Retry" : "Rewrite"}
        </Button>
      </div>

      {generatedOptions.length > 0 && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
          {generatedOptions.map((opt, i) => (
            <div
              key={i}
              className="group flex items-start justify-between gap-3 rounded-md border border-border/50 bg-background/50 p-2.5 transition-colors hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
              onClick={() => onApply(opt)}
            >
              <p className="text-xs text-foreground/90">{opt}</p>
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background text-primary opacity-0 transition-opacity group-hover:opacity-100">
                <Check className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
