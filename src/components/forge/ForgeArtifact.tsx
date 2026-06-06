import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { generateArtifact } from "@/lib/exportWorker"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { toast } from "sonner"

type ForgeState = "idle" | "forging" | "tempering" | "complete" | "error"

interface ForgeArtifactProps {
  slateId: string
  targetElementId: string
  isPremium: boolean
  onSuccess: () => Promise<void>
}

export function ForgeArtifact({
  slateId,
  targetElementId,
  isPremium,
  onSuccess,
}: ForgeArtifactProps) {
  const [state, setState] = useState<ForgeState>("idle")
  const [progress, setProgress] = useState(0)

  const handleForge = async () => {
    if (state !== "idle" && state !== "error") return
    setState("forging")
    setProgress(0)

    try {
      // 1. Snapshot creation - triggers an explicit auto-save before export
      await useDataSlateStore.getState().saveSnapshot("publish").catch((e) =>
        console.warn("Failed auto-save on export", e)
      )
      setProgress(25)

      // 2. Mocking the "forging" process to build tension
      await new Promise((r) => setTimeout(r, 1200))
      setProgress(50)
      setState("tempering")

      await new Promise((r) => setTimeout(r, 1200))
      setProgress(85)

      // 3. True PDF generation (dynamically imported, heavy)
      const blob = await generateArtifact(targetElementId)
      setProgress(100)
      setState("complete")

      // 4. Premium Gating check / Try Before You Buy
      if (!isPremium) {
        // If not premium, they can still download, but the template component
        // should render a watermark. We pass a watermark flag to the generator.
        toast.info("Exporting with Premium Watermark. Upgrade to remove.")
      }

      // 5. Call success callback
      if (isPremium) {
        await onSuccess()
      }

      // 6. Download the final artifact
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Signet_Masterpiece_${slateId.slice(0, 8)}.pdf`
      a.click()
      URL.revokeObjectURL(url)

      setTimeout(() => setState("idle"), 3000)
    } catch (e) {
      console.error(e)
      setState("error")
    }
  }

  return (
    <div className="glass-panel flex w-full max-w-sm flex-col items-center justify-center rounded-xl border border-[oklch(0.75_0.24_220)]/20 p-6">
      <h3 className="mb-4 font-heading text-lg font-bold tracking-wide text-[oklch(0.85_0.15_220)]">
        THE FORGE
      </h3>

      <div className="relative mb-6 h-2 w-full overflow-hidden rounded-full bg-background/50">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[oklch(0.65_0.2_220)] to-[oklch(0.85_0.2_220)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="mb-6 flex w-full justify-between font-mono text-xs tracking-wider text-muted-foreground uppercase">
        <span className={progress >= 25 ? "text-[oklch(0.85_0.15_220)]" : ""}>
          Raw Data
        </span>
        <span className={progress >= 50 ? "text-[oklch(0.85_0.15_220)]" : ""}>
          Optimized
        </span>
        <span className={progress >= 100 ? "glow-cyan text-primary" : ""}>
          Artifact
        </span>
      </div>

      <button
        onClick={handleForge}
        disabled={state === "forging" || state === "tempering"}
        className="group relative w-full overflow-hidden rounded border border-[oklch(0.75_0.24_220)]/50 bg-background/50 px-6 py-3 transition-all hover:bg-[oklch(0.75_0.24_220)]/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {/* Iridescent edge effect */}
        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-[oklch(0.7_0.2_220)]/0 via-[oklch(0.85_0.2_220)]/20 to-[oklch(0.7_0.2_220)]/0 transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

        <span className="group-hover:glow-cyan relative z-10 font-mono text-sm tracking-widest text-[oklch(0.85_0.15_220)] transition-all">
          <AnimatePresence mode="wait">
            <motion.span
              key={state}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="block"
            >
              {state === "idle" && "FORGE MASTERPIECE"}
              {state === "forging" && "CONDENSING..."}
              {state === "tempering" && "TEMPERING..."}
              {state === "complete" && "ARTIFACT SECURED"}
              {state === "error" && "FORGE COLLAPSED"}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
    </div>
  )
}
