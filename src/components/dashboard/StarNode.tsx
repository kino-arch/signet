import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import type { SlateMeta } from "./deriveCompleteness"
import type { DecayState } from "./ConstellationLines"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, Building } from "lucide-react"

interface StarNodeProps {
  slate: SlateMeta
  x: number
  y: number
  glowSize: number
  completeness: number
  decay: DecayState
  index: number
  onOpenEditor: (id: string) => void
}

export function StarNode({
  slate,
  x,
  y,
  glowSize,
  completeness,
  decay,
  index,
  onOpenEditor,
}: StarNodeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const colorMap = {
    cyan: "oklch(0.75 0.24 220)",
    coral: "oklch(0.65 0.24 15)",
    violet: "oklch(0.55 0.20 280)",
    gray: "oklch(0.60 0.05 250)",
    ghost: "oklch(0.95 0.02 250)",
  }

  const baseColor = colorMap[decay.color]
  const formattedDate = new Date(slate.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setIsHovered(true), 300) // 300ms delay to prevent accidental triggers
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsHovered(false)
  }

  // Adjust glow based on decay.glow
  let finalGlowSize = glowSize
  let finalGlowOpacity = 0.6 * decay.opacity
  if (decay.glow === "medium") {
    finalGlowSize *= 0.8
    finalGlowOpacity *= 0.8
  } else if (decay.glow === "faint") {
    finalGlowSize *= 0.5
    finalGlowOpacity *= 0.5
  } else if (decay.glow === "none") {
    finalGlowSize = 0
    finalGlowOpacity = 0
  }

  return (
    <button
      role="button"
      aria-label={`${slate.title || "Unnamed Resume"}, ${Math.round(completeness * 100)}% complete, last modified ${formattedDate}`}
      tabIndex={0}
      data-star-index={index}
      data-star-id={slate.id}
      onClick={() => onOpenEditor(slate.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpenEditor(slate.id)
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group absolute rounded-full focus:outline-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isHovered ? 50 : 10,
      }}
    >
      {/* Star glow */}
      {finalGlowSize > 0 && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full blur-xl transition-all duration-500 group-hover:scale-150 group-focus-visible:scale-150"
          style={{
            background: `radial-gradient(circle, ${baseColor} ${completeness * 100}%, transparent 70%)`,
            width: `${finalGlowSize}px`,
            height: `${finalGlowSize}px`,
            left: `-${finalGlowSize / 2}px`,
            top: `-${finalGlowSize / 2}px`,
            opacity: finalGlowOpacity,
          }}
        />
      )}

      {/* Star core */}
      <div
        className={cn(
          "relative z-10 rounded-full ring-offset-2 ring-offset-background transition-all duration-500 group-hover:scale-150 group-hover:ring-2 group-focus-visible:scale-150 group-focus-visible:ring-2",
          decay.color === "cyan"
            ? "h-4 w-4 ring-[oklch(0.75_0.24_220)]"
            : "h-3 w-3 ring-muted-foreground"
        )}
        style={{ opacity: decay.opacity }}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            decay.color === "cyan" && "animate-pulse bg-cosmic-cyan",
            decay.color === "coral" && "bg-cosmic-coral",
            decay.color === "violet" && "bg-cosmic-violet",
            decay.color === "gray" && "bg-[oklch(0.60_0.05_250)]",
            decay.color === "ghost" && "bg-[oklch(0.95_0.02_250)]"
          )}
          style={{
            backgroundColor:
              decay.color !== "cyan" &&
              decay.color !== "coral" &&
              decay.color !== "violet"
                ? baseColor
                : undefined,
            boxShadow: `0 0 10px ${baseColor}`,
          }}
        />
      </div>

      {/* Deep Scan Preview (Holographic Hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)", y: -10 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)", y: -5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-panel glow-border-iridescent pointer-events-none absolute top-1/2 left-8 z-50 w-72 -translate-y-1/2 p-5 text-left shadow-2xl"
            style={{ pointerEvents: "none" }} // Ensure click passes through to button
          >
            {/* Holographic flicker effect */}
            <div className="pointer-events-none absolute inset-0 animate-[pulse_4s_ease-in-out_infinite] bg-gradient-to-b from-[oklch(0.75_0.24_220)]/20 to-transparent opacity-10" />

            <h4 className="mb-3 truncate text-lg leading-tight font-bold text-[oklch(0.75_0.24_220)]">
              {slate.title || "UNNAMED RESUME"}
            </h4>

            {/* Mocked Deep Data (Since our DB schema only has id, title, updated_at currently) */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{"Role specified in builder"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building className="h-3.5 w-3.5" />
                <span>{"Companies mapped internally"}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/50 pt-3">
              <span className="font-mono text-[10px] text-muted-foreground">
                {Math.round(completeness * 100)}% COMPLETE
              </span>
              <span className="animate-pulse font-mono text-[10px] text-[oklch(0.75_0.24_220)]">
                ■ LIVE / {formattedDate}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
