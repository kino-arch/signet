import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Target, Activity, ChevronRight, X, Radar } from "lucide-react"
import { TargetLockPanel } from "./TargetLockPanel"
import { useTargetLock } from "@/lib/useTargetLock"
import { useForgeStore } from "@/store/useForgeStore"

export function CommandCenterSlideOver() {
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useTargetLock()
  const company = useForgeStore((state) => state.targetLockCompany)

  // Listen for keyboard shortcut (Cmd+K or similar) or provide a toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      {/* Mini Widget for the Sidebar */}
      <div className="p-4 flex flex-col gap-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-nordic-text-tertiary">
          Command Center
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center justify-between p-3 border rounded-md transition-all ${
            status === "complete"
              ? "border-primary/50 bg-primary/5 hover:bg-primary/10"
              : "border-nordic-border bg-nordic-bg hover:border-nordic-accent/30"
          }`}
        >
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <Target className={`w-4 h-4 ${status === "complete" ? "text-primary" : "text-nordic-text-tertiary"}`} />
              <span className="text-sm font-semibold text-nordic-text">
                Target Lock
              </span>
            </div>
            <span className="text-xs text-nordic-text-tertiary font-medium">
              {company ? `Active: ${company}` : "Not Engaged"}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-nordic-text-tertiary" />
        </button>
      </div>

      {/* Slide-Over Modal using React Portal to escape sidebar z-index stacking context */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              />
              
              {/* Centered Modal Panel */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="command-center-title"
                initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-1/2 top-1/2 w-full max-w-[800px] max-h-[85vh] bg-nordic-surface border border-nordic-border rounded-xl z-50 shadow-2xl flex flex-col liquid-glass overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-nordic-border/50 bg-nordic-bg/50 backdrop-blur-md sticky top-0 z-10">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Radar className="w-5 h-5 text-primary" />
                      {status === "complete" && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <h1 id="command-center-title" className="font-bold tracking-widest uppercase text-sm text-nordic-text">
                      Command Center
                    </h1>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-md text-nordic-text-tertiary hover:text-nordic-text hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide text-nordic-text">
                  <TargetLockPanel onComplete={() => setIsOpen(false)} />
                  
                  {status === "complete" && (
                    <div className="mt-8 space-y-6 opacity-60 hover:opacity-100 transition-opacity">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-nordic-text-secondary flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Live Market Feed
                      </h3>
                      <div className="p-4 rounded-md border border-nordic-border bg-nordic-bg/50 text-sm text-nordic-text-tertiary italic text-center">
                        Market Intelligence Stream connecting...
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
