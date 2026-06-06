import { m, AnimatePresence } from "framer-motion"
import { GeometricSeal } from "@/components/ui/geometric-seal"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface AIProcessingOverlayProps {
  isVisible: boolean
  text?: string
}

export function AIProcessingOverlay({
  isVisible,
  text = "Reforging Datacore...",
}: AIProcessingOverlayProps) {
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          {/* Important: Single wrapper child for AnimatePresence to ensure exit animations work */}
          <m.div
            initial={reducedMotion ? undefined : { scale: 0.95, opacity: 0 }}
            animate={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
            exit={reducedMotion ? undefined : { scale: 0.95, opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <GeometricSeal
              size={80}
              animate={!reducedMotion}
              glowIntensity="strong"
              variant="gradient"
            />

            <div className="flex flex-col items-center gap-2">
              <span className="animate-pulse font-mono text-sm tracking-widest text-primary uppercase">
                {text}
              </span>

              <div className="relative h-1 w-48 overflow-hidden rounded-full bg-primary/20">
                <m.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 w-1/2 bg-primary"
                />
              </div>
            </div>

            {/* Holographic Scanline Overlay on the whole screen */}
            <div className="pointer-events-none fixed inset-0 z-[-1] opacity-20 mix-blend-screen">
              <div className="animate-scanline h-8 w-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
