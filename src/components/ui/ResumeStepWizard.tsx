import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  label: string
}

interface ResumeStepWizardProps {
  steps: Step[]
  currentStep: number
  onStepClick: (step: number) => void
  children: React.ReactNode
}

/**
 * Nordic-themed multi-step wizard shell for the Resume Builder.
 * Uses square indicators (no border-radius per Nordic design system),
 * Framer Motion slide transitions, and a progress track between steps.
 */
export function ResumeStepWizard({
  steps,
  currentStep,
  onStepClick,
  children,
}: ResumeStepWizardProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Step Indicator Row — gradient shows through intentionally */}
      <div className="px-6 pt-5 pb-4 shrink-0 bg-nordic-bg/60 backdrop-blur-sm border-b border-nordic-border">
        <div className="flex items-center w-full">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id
            const isActive = currentStep === step.id
            const isLast = index === steps.length - 1

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                {/* Step bubble + label */}
                <button
                  onClick={() => onStepClick(step.id)}
                  aria-label={`Go to step ${step.id}: ${step.label}`}
                  aria-current={isActive ? "step" : undefined}
                  className="flex flex-col items-center gap-1.5 group shrink-0"
                >
                  <div
                    className={cn(
                      "w-8 h-8 flex items-center justify-center border text-sm font-bold transition-all duration-200",
                      isCompleted &&
                        "bg-nordic-accent/20 border-nordic-accent text-nordic-accent",
                      isActive &&
                        "bg-nordic-accent border-nordic-accent text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]",
                      !isActive &&
                        !isCompleted &&
                        "bg-transparent border-nordic-border text-nordic-text-tertiary group-hover:border-nordic-text-secondary group-hover:text-nordic-text-secondary"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap transition-colors duration-200",
                      isActive && "text-nordic-accent",
                      isCompleted && "text-nordic-text-secondary",
                      !isActive && !isCompleted && "text-nordic-text-tertiary"
                    )}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connector line */}
                {!isLast && (
                  <div className="flex-1 mx-3 h-px mt-[-12px] relative">
                    <div className="absolute inset-0 bg-nordic-border" />
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-nordic-accent"
                      initial={false}
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Thin progress track */}
      <div className="mx-6 h-px bg-nordic-border shrink-0 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-nordic-accent"
          initial={false}
          animate={{
            width: `${Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%`,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Animated Content Area — solid bg so cards contrast cleanly */}
      <div className="flex-1 overflow-y-auto bg-nordic-bg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-5 pb-16"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
