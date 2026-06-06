import { useState } from "react"
import { Download, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function ExportRitualButton({
  onExport,
  disabled = false,
  className = "",
}: {
  onExport: () => Promise<void>
  disabled?: boolean
  className?: string
}) {
  const [phase, setPhase] = useState<"idle" | "forging" | "complete">("idle")

  const handleExport = async () => {
    if (disabled || phase !== "idle") return

    setPhase("forging")
    try {
      await onExport()
      setPhase("complete")
    } catch (e) {
      setPhase("idle")
    } finally {
      setTimeout(() => setPhase("idle"), 3000)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={disabled || phase !== "idle"}
      className={cn(
        "relative overflow-hidden rounded-full font-mono transition-all duration-500",
        phase === "idle" &&
          !disabled &&
          "hover:glow-cyan border border-[oklch(0.75_0.24_220)]/30 bg-[oklch(0.75_0.24_220)]/10 text-[oklch(0.75_0.24_220)]",
        phase === "idle" &&
          disabled &&
          "cursor-not-allowed border border-border/50 bg-muted/30 text-muted-foreground opacity-50",
        phase === "forging" &&
          "border border-[oklch(0.65_0.24_15)] bg-[oklch(0.65_0.24_15)]/20 text-[oklch(0.65_0.24_15)]",
        phase === "complete" &&
          "border border-[oklch(0.75_0.20_150)] bg-[oklch(0.75_0.20_150)]/20 text-[oklch(0.75_0.20_150)]",
        className
      )}
    >
      {/* Background animation during forging */}
      {phase === "forging" && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-[oklch(0.65_0.24_15)]/20 to-transparent" />
        </div>
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {phase === "idle" && (
          <>
            <Download className="h-4 w-4" />
            FORGE PDF
          </>
        )}
        {phase === "forging" && (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[oklch(0.65_0.24_15)] border-t-transparent" />
            TRANSMUTING...
          </>
        )}
        {phase === "complete" && (
          <>
            <Check className="h-4 w-4" />
            ARTIFACT READY
          </>
        )}
      </span>
    </button>
  )
}
