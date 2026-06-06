import { m, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ExportPulseOverlayProps {
  isExporting: boolean
  isSuccess?: boolean
}

export function ExportPulseOverlay({
  isExporting,
  isSuccess,
}: ExportPulseOverlayProps) {
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {(isExporting || isSuccess) && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-primary/5 backdrop-blur-0.5"
        >
          {isSuccess ? (
            <m.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              <m.div
                animate={{
                  scale: [1, 5],
                  opacity: [1, 0],
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute h-32 w-32 rounded-full bg-primary"
              />
              <span className="relative z-10 font-mono text-sm font-bold tracking-widest text-primary uppercase drop-shadow-md">
                SUCCESS
              </span>
            </m.div>
          ) : (
            <m.div
              initial={reducedMotion ? undefined : { scale: 0.8, opacity: 0 }}
              animate={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
              exit={reducedMotion ? undefined : { scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              {/* Outer expanding pulse */}
              <m.div
                animate={{
                  scale: [1, 2, 3],
                  opacity: [0.8, 0.4, 0],
                  borderWidth: ["2px", "1px", "0px"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-32 w-32 rounded-full border-primary shadow-[0_0_20px_rgba(var(--color-primary),0.5)]"
              />

              {/* Inner stable pulse */}
              <div className="h-24 w-24 animate-pulse rounded-full bg-primary/20 blur-xl" />

              {/* Text indicator */}
              <span className="absolute font-mono text-xs font-bold tracking-widest text-primary uppercase drop-shadow-md">
                EXPORTING
              </span>
            </m.div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  )
}
