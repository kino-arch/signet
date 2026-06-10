import { useState, useEffect, useId, useMemo, useRef } from "react"
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react"
import {
  Check,
  Download,
  ShieldAlert,
  Sparkles,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrbitalLoader } from "@/components/ui/orbital-loader"
import { exportResumeToPDF } from "@/lib/export-pdf"
import { useAuthStore } from "@/store/useAuthStore"
import { useRewardsStore } from "@/store/useRewardsStore"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { LottieAnimation } from "@/components/ui/lottie-animation"
import laserScanData from "@/assets/animations/laser_scan.json"

// ============================================================================
// WEB AUDIO SCI-FI SOUND SYNTHESIS
// ============================================================================
let globalAudioCtx: AudioContext | null = null
const getAudioContext = () => {
  if (!globalAudioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (AudioCtx) globalAudioCtx = new AudioCtx()
  }
  return globalAudioCtx
}

const playSciFiSound = (type: "click" | "success" | "process") => {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    if (ctx.state === "suspended") ctx.resume()

    if (type === "click") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(1000, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.12)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.12)
    } else if (type === "process") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "triangle"
      osc.frequency.setValueAtTime(180, ctx.currentTime)
      osc.frequency.linearRampToValueAtTime(360, ctx.currentTime + 0.35)
      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.35)
    } else if (type === "success") {
      const now = ctx.currentTime
      ;[880, 1320].forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)
        gain.gain.setValueAtTime(0.08, now + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.3)
      })
    }
  } catch (e) {
    console.warn("AudioContext failed to initialize", e)
  }
}

type RetrievalState = "idle" | "extracting" | "downloaded"

export function SigilRetrieval({
  onComplete,
  onNoTokens,
}: {
  onComplete: () => void
  onNoTokens?: () => void
}) {
  const [state, setState] = useState<RetrievalState>("idle")
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  // Prevents triggering download more than once even if progress briefly
  // overshoots 100 before the interval is cleared.
  const downloadTriggered = useRef(false)

  const { profile, deductCredit } = useAuthStore()
  const { basics } = useDataSlateStore()

  const { forgeFirstSigil } = useRewardsStore()
  const shouldReduceMotion = useReducedMotion()

  const previewId = useId()
  const descriptionId = useMemo(() => `${previewId}-description`, [previewId])

  const creditBalance = profile?.credits ?? 0

  const handleActivate = () => setIsActive(true)
  const handleDeactivate = () => setIsActive(false)

  const handleExtract = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (state !== "idle") return
    if (creditBalance <= 0) {
      onNoTokens?.()
      return
    }
    playSciFiSound("click")
    downloadTriggered.current = false
    setProgress(0)
    // Defer setState one frame so React can commit + paint the
    // "extracting" state BEFORE the interval starts.
    requestAnimationFrame(() => {
      setState("extracting")
    })
  }

  const triggerDownload = async () => {
    try {
      const filename = `${basics.name ? basics.name.replace(/\s+/g, "-") : "Operative-Dossier"}-Resume.pdf`
      await exportResumeToPDF("resume-preview", filename)
      // Deduct one credit for a successful forge
      const deducted = await deductCredit()
      if (!deducted) {
        onNoTokens?.()
        setState("idle")
      } else {
        // Award gamification shields for their first export
        forgeFirstSigil()
        playSciFiSound("success")
        setState("downloaded")
      }
    } catch (error) {
      console.error("PDF generation failed during retrieval", error)
      setState("idle")
    }
  }

  // Tick the fake progress bar forward while in "extracting" state.
  // triggerDownload is intentionally NOT called here — state updaters must be pure.
  useEffect(() => {
    if (state !== "extracting") return
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 3
        const current = Math.min(next, 100)
        if (current % 25 < 5) playSciFiSound("process")
        return current
      })
    }, 220)
    return () => clearInterval(interval)
  }, [state])

  // Watch `progress` in a separate effect. When it hits 100, defer the
  // heavy PDF work via rAF+setTimeout so React finishes painting the
  // 100% bar before generatePDF blocks the main thread.
  useEffect(() => {
    if (progress < 100 || state !== "extracting" || downloadTriggered.current)
      return
    downloadTriggered.current = true
    requestAnimationFrame(() => {
      setTimeout(() => {
        triggerDownload()
      }, 120) // extra 120ms breathing room for the repaint to flush
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, state])

  const flyoutVariants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 12,
        scale: shouldReduceMotion ? 1 : 0.96,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.28, ease: [0.19, 1, 0.22, 1] },
      },
      exit: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 8,
        scale: shouldReduceMotion ? 1 : 0.95,
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
      },
    }),
    [shouldReduceMotion]
  )

  const hoverMotion = shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }
  const hoverTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 420, damping: 34, mass: 0.7 }

  return (
    <div className="flex min-h-96 w-full flex-col items-center justify-center py-4">
      <div className="mb-10 space-y-1 text-center">
        <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">
          Crucible Chamber Section 09
        </span>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground uppercase md:text-3xl">
          The Armory Cache
        </h1>
        <p className="mx-auto max-w-sm text-xs text-muted-foreground">
          Your credentials have been forged in pure Beskar. Secure the digital
          sigil to complete your covert profile.
        </p>
      </div>

      <section
        aria-labelledby={`${previewId}-title`}
        aria-describedby={descriptionId}
        className="w-full max-w-md"
      >
        <div className="relative w-full">
          <motion.div
            onMouseEnter={handleActivate}
            onMouseLeave={handleDeactivate}
            className={`group relative inline-flex w-full flex-col gap-4 border border-border/60 px-7 py-6 text-muted-foreground backdrop-blur-2xl transition-colors duration-300 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${
              state === "extracting" ? "bg-primary/5" : "bg-card/80"
            }`}
            layout
            whileHover={state === "idle" ? hoverMotion : undefined}
            transition={hoverTransition as Transition}
          >
            {/* Pulsing Extraction Glow */}
            {state === "extracting" && (
              <div className="absolute inset-0 -z-10 animate-pulse bg-primary/10 blur-xl" />
            )}

            <div className="flex items-center justify-between text-xs tracking-[0.32em] uppercase">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${state === "extracting" ? "animate-pulse bg-primary text-primary-foreground" : "bg-primary/15 text-primary"}`}
                >
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                {state === "idle" && "Ready for extraction"}
                {state === "extracting" && "Tempering Beskar"}
                {state === "downloaded" && "Secured"}
              </span>

              {state === "idle" && (
                <div className="flex items-center gap-1 font-mono text-[9px] font-bold">
                  {creditBalance > 0 ? (
                    <span className="text-primary">
                      {creditBalance} Credits
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-destructive">
                      <AlertCircle className="h-3 w-3" /> 0 Credits
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="z-10 space-y-2 text-left">
              <h2
                id={`${previewId}-title`}
                className="text-xl font-semibold text-foreground sm:text-2xl"
              >
                {basics.name ? basics.name.split(" ")[0] : "Operative"} Dossier
              </h2>
              <p
                id={descriptionId}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {state === "idle" &&
                  "Hover to reveal extraction protocols. This action will consume 1 Credit."}
                {state === "extracting" &&
                  `Extracting sigil coordinates... ${progress}%`}
                {state === "downloaded" &&
                  "The sigil has been successfully extracted to your local system."}
              </p>
            </div>

            {/* OrbitalLoader Animation + Extraction Progress Line */}
            <AnimatePresence>
              {state === "extracting" && (
                <motion.div
                  key="extracting-anim"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-3 flex flex-col items-center gap-5"
                >
                  <OrbitalLoader color="primary" messagePlacement="bottom" />
                  <div className="w-full space-y-1.5">
                    <div className="flex justify-between font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                      <span>Tempering Beskar</span>
                      <span className="text-primary">{progress}%</span>
                    </div>
                    <div className="pointer-events-none h-1 w-full overflow-hidden opacity-80 mix-blend-screen">
                      {!shouldReduceMotion ? (
                        <LottieAnimation
                          animationData={laserScanData}
                          className="h-full w-full"
                          rendererSettings={{ preserveAspectRatio: "none" }}
                        />
                      ) : (
                        <div className="h-full w-full bg-primary/20" />
                      )}
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-border/40">
                      <motion.div
                        className="h-full bg-primary shadow-[0_0_8px_rgba(var(--color-primary),0.7)]"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Flyout */}
            <AnimatePresence initial={false}>
              {isActive && state === "idle" && (
                <motion.div
                  key="preview"
                  id={previewId}
                  variants={flyoutVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative z-20 mt-2 overflow-hidden border border-primary/20 bg-card/95 p-4 shadow-[0_25px_70px_-20px_rgba(var(--color-primary),0.3)]"
                  role="region"
                  aria-live="polite"
                >
                  <div className="mb-4 flex items-center justify-between text-[11px] tracking-[0.36em] text-muted-foreground uppercase">
                    Action Required
                  </div>

                  {creditBalance <= 0 ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onNoTokens?.()
                      }}
                      variant="destructive"
                      className="w-full gap-2 text-xs font-bold tracking-widest uppercase shadow-md transition-all hover:scale-[1.02]"
                    >
                      <ShieldAlert className="h-4 w-4" />
                      Replenish Credits
                    </Button>
                  ) : (
                    <Button
                      onClick={handleExtract}
                      className="w-full gap-2 text-xs font-bold tracking-widest uppercase shadow-md transition-all hover:scale-[1.02]"
                    >
                      <Download className="h-4 w-4" />
                      Extract Sigil (-1 Credit)
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Completion state button */}
            <AnimatePresence>
              {state === "downloaded" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 border-t border-border/40 pt-4"
                >
                  <Button
                    onClick={onComplete}
                    variant="default"
                    className="w-full gap-2 bg-emerald-500/10 text-xs font-bold tracking-widest text-emerald-500 uppercase shadow-md transition-all hover:scale-[1.02] hover:bg-emerald-500/20"
                  >
                    <Check className="h-4 w-4" />
                    Return to Covert
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
