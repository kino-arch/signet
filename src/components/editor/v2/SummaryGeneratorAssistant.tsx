import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Wand2, RefreshCw, Copy, Check } from "lucide-react"
import { useForgeStore } from "@/store/useForgeStore"
import { toast } from "sonner"

export interface SummaryTone {
  id: string
  label: string
  icon: string
}

export interface SummaryLength {
  id: string
  label: string
}

const TONES: SummaryTone[] = [
  { id: "executive", label: "Executive", icon: "👔" },
  { id: "technical", label: "Technical", icon: "💻" },
  { id: "creative", label: "Creative", icon: "🎨" },
  { id: "direct", label: "Direct", icon: "⚡" },
]

const LENGTHS: SummaryLength[] = [
  { id: "punchy", label: "Punchy (~50 words)" },
  { id: "standard", label: "Standard (~100 words)" },
]

interface SummaryGeneratorAssistantProps {
  currentSummary: string
  onApply: (text: string) => void
  onCancel: () => void
}

export function SummaryGeneratorAssistant({
  currentSummary,
  onApply,
  onCancel,
}: SummaryGeneratorAssistantProps) {
  const [tone, setTone] = useState<string>("executive")
  const [length, setLength] = useState<string>("standard")
  const [generatedText, setGeneratedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const targetLockBriefing = useForgeStore((s) => s.targetLockBriefing)

  const handleGenerate = async () => {
    setIsLoading(true)
    setGeneratedText("")
    
    try {
      // Hit our existing server-side AI endpoint
      const userKey = localStorage.getItem("openrouter_api_key") || ""
      const response = await fetch("/ai/distill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-api-key": userKey,
        },
        body: JSON.stringify({
          mode: "generate_summary",
          tone,
          length,
          currentSummary,
          targetLock: targetLockBriefing,
        }),
      })
      
      if (!response.ok) throw new Error("Failed to generate summary")
      const result = await response.json()
      
      if (result.summary) {
        setGeneratedText(result.summary)
      } else {
        throw new Error("No summary returned")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error generating summary")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300 rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-4 mb-4">
      <div className="flex items-center justify-between border-b border-primary/10 pb-3">
        <div className="flex items-center gap-2 text-primary">
          <Wand2 className="h-4 w-4" />
          <h4 className="text-sm font-bold tracking-widest uppercase">Summary Architect</h4>
        </div>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground text-xs uppercase tracking-wider font-semibold">
          Close
        </button>
      </div>

      <div className="space-y-4">
        {/* Tone Selection */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Tone</p>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  tone === t.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-background border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Length Selection */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Length</p>
          <div className="flex flex-wrap gap-2">
            {LENGTHS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLength(l.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  length === l.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-background border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full gap-2 font-bold tracking-wider uppercase text-xs h-10 shadow-lg shadow-primary/10"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Drafting Summary...
            </>
          ) : generatedText ? (
            <>
              <RefreshCw className="h-4 w-4" />
              Regenerate Draft
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              Generate Draft
            </>
          )}
        </Button>
      </div>

      {/* Result Card */}
      {generatedText && (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="rounded-lg border border-primary/30 bg-background/80 backdrop-blur-sm overflow-hidden">
            <div className="p-4">
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {generatedText}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border/50 bg-muted/20 px-4 py-2">
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onApply(generatedText)} className="h-8 text-xs font-semibold uppercase tracking-wider gap-1.5">
                  <Check className="h-3.5 w-3.5" /> Apply to Resume
                </Button>
              </div>
              <Button size="sm" variant="ghost" onClick={handleCopy} className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground">
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                Copy
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
