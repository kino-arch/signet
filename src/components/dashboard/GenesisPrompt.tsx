/**
 * GenesisPrompt — the generative onboarding component.
 *
 * Why: Empty states are conversion dead-ends. This turns the first visit into
 * a guided, 30-second onboarding flow that creates the user's first slate
 * without navigating away. The card morphs via Framer Motion layout animations
 * from a prompt into a real, populated slate card.
 */
import React, { useState, useId } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useRespectfulMotion } from "@/hooks/useRespectfulMotion"

type GenesisPhase = "idle" | "typing" | "creating" | "done"

interface GenesisPromptProps {
  /** Called once the user has committed to a role so the parent can navigate or refresh. */
  onSlateCreated?: (role: string) => void
}

export function GenesisPrompt({ onSlateCreated }: GenesisPromptProps) {
  const [phase, setPhase] = useState<GenesisPhase>("idle")
  const [role, setRole] = useState("")
  const { transition } = useRespectfulMotion()
  const inputId = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = role.trim()
    if (!trimmed) return

    setPhase("creating")

    // Simulate a brief creation pause so the user feels the genesis happening
    await new Promise<void>((resolve) => setTimeout(resolve, 1200))

    setPhase("done")
    onSlateCreated?.(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") void handleSubmit(e as unknown as React.FormEvent)
  }

  return (
    <motion.div
      layoutId="genesis-slate"
      layout
      transition={transition}
      className="relative flex flex-col items-center justify-center gap-8 py-24 text-center"
    >
      <AnimatePresence mode="wait">
        {phase !== "done" ? (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={transition}
            className="flex flex-col items-center gap-6 max-w-md w-full"
          >
            {/* Icon halo */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
              <Sparkles className="h-7 w-7 text-primary" aria-hidden="true" />
              <span
                className="absolute inset-0 animate-ping rounded-full bg-primary/10 opacity-60"
                aria-hidden="true"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-fluid-subtitle font-bold tracking-tight">
                Create your first Slate
              </h2>
              <p className="text-sm text-muted-foreground">
                What role are you targeting? We'll forge your first tailored
                resume in seconds.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full space-y-3"
              aria-label="Create your first slate"
            >
              <label
                htmlFor={inputId}
                className="sr-only"
              >
                Target role (e.g. Senior Frontend Engineer at Spotify)
              </label>
              <input
                id={inputId}
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value)
                  if (phase === "idle" && e.target.value) setPhase("typing")
                  if (!e.target.value) setPhase("idle")
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Senior Frontend Engineer at Spotify"
                disabled={phase === "creating"}
                autoFocus
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60"
                aria-describedby="genesis-hint"
              />
              <p id="genesis-hint" className="text-[11px] text-muted-foreground/60">
                Press <kbd className="rounded px-1 py-0.5 bg-muted text-muted-foreground text-[10px] font-mono">Enter</kbd> or click Forge to begin.
              </p>

              <button
                type="submit"
                disabled={!role.trim() || phase === "creating"}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {phase === "creating" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Forging your Slate…
                  </>
                ) : (
                  <>
                    Forge Slate
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition}
            className="flex flex-col items-center gap-4 max-w-sm"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/30">
              <Sparkles className="h-7 w-7 text-green-400" aria-hidden="true" />
            </div>
            <h2 className="text-fluid-subtitle font-bold tracking-tight">
              Slate forged.
            </h2>
            <p className="text-sm text-muted-foreground">
              Your slate for{" "}
              <span className="font-semibold text-foreground">{role}</span>{" "}
              is ready. Open the editor to start building.
            </p>
            <Link
              to="/editor"
              className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Open Editor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
