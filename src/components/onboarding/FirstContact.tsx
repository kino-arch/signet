import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useThemeStore } from "@/store/useThemeStore"
import { themes } from "@/themes"
import type { ThemeId } from "@/themes"

export function FirstContact({ onComplete }: { onComplete: () => void }) {
  const [act, setAct] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [progress, setProgress] = useState(0)
  const [showSkipHint, setShowSkipHint] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSkipHint(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowSkipHint(true), 8000)
    return () => clearTimeout(timer)
  }, [])

  if (act === 5) {
    return <ActV_Supernova onComplete={onComplete} />
  }

  return (
    <div className="cosmic-bg relative flex min-h-safe items-center justify-center overflow-hidden">
      <OnboardingAtmosphere act={act} />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-6">
        <CentralStar act={act} progress={progress} />

        <div className="mt-12 mb-8 flex h-24 w-full items-end justify-center text-center">
          <TerminalNarrative act={act} />
        </div>

        <div className="flex min-h-[8rem] w-full justify-center">
          <ActForm act={act} setAct={setAct} setProgress={setProgress} />
        </div>
      </div>

      {act >= 3 && <OrbitalProgress percentage={progress} act={act} />}

      <AnimatePresence>
        {showSkipHint && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
            className="absolute right-8 bottom-8 font-mono text-xs tracking-wider text-muted-foreground/50 transition-colors hover:text-[oklch(0.75_0.24_220)]"
          >
            [ESC] SKIP INTRO
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function OnboardingAtmosphere({ act }: { act: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 transition-all duration-1000">
      <div
        className={cn(
          "absolute inset-0 bg-background transition-opacity duration-1000",
          act >= 3 ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  )
}

function CentralStar({ act, progress }: { act: number; progress: number }) {
  const isCyan = act >= 2
  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      {isCyan && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.2 + progress * 0.005,
            scale: 1 + progress * 0.01,
          }}
          className="pointer-events-none absolute inset-0 rounded-full bg-cosmic-cyan blur-2xl"
        />
      )}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "h-3 w-3 rounded-full ring-2 ring-offset-2 ring-offset-background transition-colors duration-1000",
          isCyan
            ? "bg-cosmic-cyan shadow-[0_0_15px_oklch(0.75_0.24_220)] ring-[oklch(0.75_0.24_220)]"
            : "bg-muted-foreground shadow-[0_0_10px_gray] ring-muted"
        )}
      />
    </div>
  )
}

function TerminalNarrative({ act }: { act: number }) {
  const scripts: Record<number, string> = {
    1: "SIGNAL DETECTED. ORIGIN: UNKNOWN.",
    2: "IDENTITY CONFIRMED. TRANSMITTING...",
    3: "HORIZON EXPANDING. INTEGRITY STABILIZING.",
    4: "CONSTELLATION STABILIZED. UNIVERSE ESTABLISHED.",
  }

  return (
    <motion.div
      key={act}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-mono text-sm tracking-widest text-[oklch(0.75_0.24_220)]/80"
    >
      {scripts[act]}
      <span className="ml-2 inline-block h-4 w-2 animate-pulse bg-[oklch(0.75_0.24_220)] align-middle" />
    </motion.div>
  )
}

function ActForm({
  act,
  setAct,
  setProgress,
}: {
  act: number
  setAct: (act: 1 | 2 | 3 | 4 | 5) => void
  setProgress: (p: number) => void
}) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() && act !== 1 && act !== 4) return

    if (act === 1) {
      setAct(2)
    } else if (act === 2) {
      setAct(3)
      setInputValue("")
    } else if (act === 3) {
      setProgress(100)
      setTimeout(() => setAct(4), 1000)
    } else if (act === 4) {
      setAct(5)
    }
  }

  if (act === 1) {
    return (
      <div className="grid w-full animate-in grid-cols-1 gap-6 duration-700 fade-in slide-in-from-bottom-4 md:grid-cols-2">
        <ThemePreviewCard themeId="cosmic" onSelect={() => setAct(2)} />
        <ThemePreviewCard themeId="urban" onSelect={() => setAct(2)} />
      </div>
    )
  }

  if (act === 4) {
    return (
      <button
        onClick={handleSubmit}
        className="glow-border-iridescent rounded px-8 py-3 font-mono text-theme-primary transition-colors hover:bg-theme-primary/10"
      >
        ENTER UNIVERSE
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col items-center gap-4"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          if (act === 3) setProgress(Math.min(100, e.target.value.length * 10))
        }}
        placeholder={
          act === 2
            ? "ENTER DESIGNATION (NAME)"
            : "ENTER TARGET COORDINATES (ROLE)"
        }
        className="w-full border-b border-theme-primary/30 bg-transparent px-4 py-2 text-center font-mono text-theme-primary transition-colors outline-none focus:border-theme-primary"
        autoFocus
      />
      <button
        type="submit"
        disabled={!inputValue.trim()}
        className="font-mono text-xs tracking-widest text-theme-primary/50 uppercase transition-colors hover:text-theme-primary disabled:opacity-0"
      >
        TRANSMIT [ENTER]
      </button>
    </form>
  )
}

function ThemePreviewCard({
  themeId,
  onSelect,
}: {
  themeId: ThemeId
  onSelect: () => void
}) {
  const setTheme = useThemeStore((s) => s.setTheme)
  const currentTheme = useThemeStore((s) => s.activeThemeId)
  const [isHovered, setIsHovered] = useState(false)

  // Use a ref to track the officially selected theme before hover
  const [baseTheme] = useState(currentTheme)

  useEffect(() => {
    if (isHovered) {
      setTheme(themeId)
    } else {
      setTheme(baseTheme)
    }
  }, [isHovered, themeId, baseTheme, setTheme])

  const themeConfig = themes[themeId]

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setTheme(themeId)
        onSelect()
      }}
      className={cn(
        "group relative h-48 w-full overflow-hidden rounded-xl border-2 text-left transition-all md:h-64",
        isHovered
          ? "scale-[1.02] border-theme-primary shadow-[0_0_30px_var(--theme-primary)] shadow-theme-primary/20"
          : "border-border/30 hover:border-border/60"
      )}
    >
      <div className="absolute inset-0 bg-background/80" />

      {/* Miniature representation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 transition-opacity duration-500 group-hover:opacity-100">
        {themeId === "cosmic" ? (
          <div
            className="h-16 w-16 animate-pulse rounded-full blur-0.5"
            style={{
              backgroundColor: themeConfig.colors["--app-primary"],
              boxShadow: `0 0 40px ${themeConfig.colors["--app-primary"]}`,
            }}
          />
        ) : (
          <div className="flex h-20 items-end gap-2 opacity-80">
            <div
              className="h-full w-3 rounded-t-sm"
              style={{
                backgroundColor: themeConfig.colors["--app-secondary"],
                boxShadow: `0 -10px 20px ${themeConfig.colors["--app-secondary"]}`,
              }}
            />
            <div
              className="h-3/4 w-3 rounded-t-sm"
              style={{
                backgroundColor: themeConfig.colors["--app-primary"],
                boxShadow: `0 -10px 20px ${themeConfig.colors["--app-primary"]}`,
              }}
            />
            <div
              className="h-5/6 w-3 rounded-t-sm"
              style={{
                backgroundColor: themeConfig.colors["--app-violet"],
                boxShadow: `0 -10px 20px ${themeConfig.colors["--app-violet"]}`,
              }}
            />
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background/90 to-transparent p-6">
        <h3
          className="text-2xl font-bold tracking-widest uppercase transition-colors"
          style={{
            color: isHovered
              ? themeConfig.colors["--app-primary"]
              : "var(--foreground)",
          }}
        >
          {themeConfig.name}
        </h3>
        <p className="mt-3 font-mono text-xs tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          [ {themeConfig.description} ]
        </p>
      </div>
    </button>
  )
}

function OrbitalProgress({
  percentage,
  act,
}: {
  percentage: number
  act: number
}) {
  const isComplete = act >= 4
  const strokeColor = isComplete
    ? "oklch(0.75 0.24 220)"
    : "oklch(0.55 0.20 280)" // cyan vs violet

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg className="h-[300px] w-[300px] -rotate-90">
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="oklch(0.55 0.20 280 / 0.1)"
          strokeWidth="1"
        />
        <motion.circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeDasharray={140 * 2 * Math.PI}
          initial={{ strokeDashoffset: 140 * 2 * Math.PI }}
          animate={{
            strokeDashoffset: 140 * 2 * Math.PI * (1 - percentage / 100),
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  )
}

function ActV_Supernova({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"explosion" | "collapse" | "handoff">(
    "explosion"
  )

  useEffect(() => {
    const sequence = async () => {
      // 1. Supernova explosion (1.5s)
      await new Promise((r) => setTimeout(r, 1500))
      setPhase("collapse")

      // 2. Everything collapses to center (0.8s)
      await new Promise((r) => setTimeout(r, 800))
      setPhase("handoff")

      // 3. Handoff to real dashboard
      await new Promise((r) => setTimeout(r, 300))
      onComplete()
    }
    sequence()
  }, [onComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700",
        phase === "explosion" ? "bg-background" : "bg-transparent", // Fade the background during handoff
        phase === "collapse" && "scale-150 opacity-0",
        phase === "handoff" && "pointer-events-none opacity-0"
      )}
    >
      {/* Supernova particles (CSS) */}
      {phase === "explosion" && (
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          data-onboarding="particle-burst"
        >
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="particle absolute h-1 w-1 rounded-full bg-cosmic-cyan"
              style={
                {
                  "--angle": `${(i / 200) * 360}deg`,
                  // eslint-disable-next-line react-hooks/purity
                  "--delay": `${Math.random() * 0.5}s`,
                  // eslint-disable-next-line react-hooks/purity
                  "--speed": `${0.5 + Math.random() * 1}s`,
                } as React.CSSProperties
              }
            />
          ))}
          <div className="shockwave absolute h-[200vw] w-[200vw] rounded-full border border-cosmic-cyan opacity-0" />
        </div>
      )}

      {/* Collapsing light */}
      {phase === "collapse" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-0 w-0 animate-[collapse_0.8s_ease-in_forwards] rounded-full bg-cosmic-cyan" />
        </div>
      )}
    </div>
  )
}
