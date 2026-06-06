import { LayoutGrid, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ViewModeToggleProps {
  viewMode: "grid" | "constellation"
  setViewMode: (mode: "grid" | "constellation") => void
}

export function ViewModeToggle({ viewMode, setViewMode }: ViewModeToggleProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-1">
      <button
        onClick={() => setViewMode("grid")}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-sm transition-all",
          viewMode === "grid"
            ? "border border-[oklch(0.75_0.24_220)]/20 bg-[oklch(0.75_0.24_220)]/10 text-[oklch(0.75_0.24_220)] shadow-[0_0_10px_oklch(0.75_0.24_220_/_0.2)]"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        GRID
      </button>
      <button
        onClick={() => setViewMode("constellation")}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-sm transition-all",
          viewMode === "constellation"
            ? "border border-[oklch(0.75_0.24_220)]/20 bg-[oklch(0.75_0.24_220)]/10 text-[oklch(0.75_0.24_220)] shadow-[0_0_10px_oklch(0.75_0.24_220_/_0.2)]"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )}
      >
        <Sparkles className="h-4 w-4" />
        NEBULA
      </button>
    </div>
  )
}
