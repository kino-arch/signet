import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { useAuthStore } from "@/store/useAuthStore"
import { SignetMark } from "@/components/nordic/SignetMark"
import { Seo } from "@/components/seo/Seo"
import {
  Code2,
  Briefcase,
  Layers,
  Users,
  Sparkles,
  ArrowRight,
  RotateCcw,
  FileOutput,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Step 1: Role data ──────────────────────────────────────────────────────────
const roles = [
  { id: "engineering", label: "Engineering", icon: Code2, description: "Software, DevOps, Data" },
  { id: "product", label: "Product & Design", icon: Layers, description: "PM, UX, Research" },
  { id: "business", label: "Business", icon: Briefcase, description: "Sales, Ops, Finance" },
  { id: "other", label: "Other", icon: Users, description: "Any other field" },
]

// ── Step 2: Goal data ──────────────────────────────────────────────────────────
const goals = [
  {
    id: "pass_ats",
    label: "Pass ATS Filters",
    description: "I need my resume to get past automated screening systems.",
    icon: CheckCircle2,
  },
  {
    id: "career_change",
    label: "Change Careers",
    description: "I'm transitioning to a new industry and need to reframe my experience.",
    icon: RotateCcw,
  },
  {
    id: "format",
    label: "Format & Polish",
    description: "I have the content — I just need it to look and read professionally.",
    icon: FileOutput,
  },
  {
    id: "ai_power",
    label: "AI-Powered Optimization",
    description: "I want AI to rewrite my bullet points to match job descriptions.",
    icon: Sparkles,
  },
]

// ── Animation variants ─────────────────────────────────────────────────────────
const EASE_SPRING = [0.16, 1, 0.3, 1] as [number, number, number, number]

const pageVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_SPRING } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.25 } },
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function OnboardingPage() {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const { completeOnboarding } = useAuthStore()
  const navigate = useNavigate()

  async function handleFinish() {
    setStep(2)
    await completeOnboarding({ role: selectedRole ?? "other", goal: selectedGoal ?? "format" })
    setIsRedirecting(true)
    setTimeout(() => navigate("/dashboard"), 2200)
  }

  return (
    <>
      <Seo
        title="Get started | Signet"
        description="Set up your Signet workspace in 30 seconds."
        noindex={true}
      />
      <div className="flex min-h-screen flex-col bg-nordic-bg antialiased">

        {/* ── Top bar ── */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-nordic-border/50">
          <div className="flex items-center gap-2.5">
            <SignetMark className="text-nordic-accent" size={24} />
            <span className="text-base font-semibold tracking-tight text-nordic-text">Signet</span>
          </div>
          {step < 2 && (
            <p className="text-sm text-nordic-text-tertiary font-mono">
              Step {step + 1} <span className="text-nordic-border">/ 2</span>
            </p>
          )}
        </header>

        {/* ── Progress bar ── */}
        {step < 2 && (
          <div className="h-0.5 bg-nordic-border/50">
            <motion.div
              className="h-full bg-nordic-accent"
              initial={{ width: "0%" }}
              animate={{ width: step === 0 ? "50%" : "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        )}

        {/* ── Content area ── */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">

              {/* ── STEP 0: Role Selection ── */}
              {step === 0 && (
                <motion.div
                  key="step-role"
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <p className="text-xs font-mono font-medium uppercase tracking-widest text-nordic-accent mb-3">
                    Step 1 of 2
                  </p>
                  <h1 className="text-3xl font-display font-bold text-nordic-text mb-2">
                    What is your current field?
                  </h1>
                  <p className="text-base text-nordic-text-secondary mb-10">
                    We'll personalize your workspace and templates accordingly.
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
                    {roles.map((role) => {
                      const Icon = role.icon
                      const isSelected = selectedRole === role.id
                      return (
                        <button
                          key={role.id}
                          onClick={() => setSelectedRole(role.id)}
                          className={cn(
                            "group relative flex flex-col items-start gap-3 p-5 text-left",
                            "border transition-all duration-200 cursor-pointer",
                            "hover:border-nordic-accent/50 hover:bg-nordic-surface-hover",
                            "active:scale-[0.98]",
                            isSelected
                              ? "border-nordic-accent bg-nordic-accent-soft shadow-nordic-glow"
                              : "border-nordic-border bg-nordic-surface"
                          )}
                        >
                          <div className={cn(
                            "flex h-9 w-9 items-center justify-center border transition-colors duration-200",
                            isSelected
                              ? "border-nordic-accent bg-nordic-accent text-white"
                              : "border-nordic-border bg-nordic-surface-hover text-nordic-text-secondary group-hover:text-nordic-accent"
                          )}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className={cn(
                              "text-sm font-semibold leading-snug transition-colors",
                              isSelected ? "text-nordic-accent" : "text-nordic-text"
                            )}>
                              {role.label}
                            </p>
                            <p className="text-xs text-nordic-text-tertiary mt-0.5 leading-snug">
                              {role.description}
                            </p>
                          </div>
                          {isSelected && (
                            <motion.div
                              layoutId="role-indicator"
                              className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-nordic-accent"
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    disabled={!selectedRole}
                    className="nordic-btn-primary gap-2 px-8 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {/* ── STEP 1: Goal Selection ── */}
              {step === 1 && (
                <motion.div
                  key="step-goal"
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <p className="text-xs font-mono font-medium uppercase tracking-widest text-nordic-accent mb-3">
                    Step 2 of 2
                  </p>
                  <h1 className="text-3xl font-display font-bold text-nordic-text mb-2">
                    What's your primary goal?
                  </h1>
                  <p className="text-base text-nordic-text-secondary mb-10">
                    This helps us surface the most relevant AI tools for you.
                  </p>

                  <div className="flex flex-col gap-3 mb-10">
                    {goals.map((goal) => {
                      const Icon = goal.icon
                      const isSelected = selectedGoal === goal.id
                      return (
                        <button
                          key={goal.id}
                          onClick={() => setSelectedGoal(goal.id)}
                          className={cn(
                            "group relative flex items-start gap-4 p-5 text-left",
                            "border transition-all duration-200 cursor-pointer",
                            "hover:border-nordic-accent/50 hover:bg-nordic-surface-hover",
                            "active:scale-[0.99]",
                            isSelected
                              ? "border-nordic-accent bg-nordic-accent-soft shadow-nordic-glow"
                              : "border-nordic-border bg-nordic-surface"
                          )}
                        >
                          <div className={cn(
                            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-200",
                            isSelected
                              ? "border-nordic-accent bg-nordic-accent text-white"
                              : "border-nordic-border bg-nordic-surface-hover text-nordic-text-secondary group-hover:text-nordic-accent"
                          )}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className={cn(
                              "text-sm font-semibold leading-snug transition-colors",
                              isSelected ? "text-nordic-accent" : "text-nordic-text"
                            )}>
                              {goal.label}
                            </p>
                            <p className="text-xs text-nordic-text-secondary mt-1 leading-relaxed">
                              {goal.description}
                            </p>
                          </div>
                          {isSelected && (
                            <motion.div
                              layoutId="goal-indicator"
                              className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-nordic-accent"
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStep(0)}
                      className="nordic-btn-ghost text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleFinish}
                      disabled={!selectedGoal}
                      className="nordic-btn-primary gap-2 px-8 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Build my workspace
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Success / Reforging ── */}
              {step === 2 && (
                <motion.div
                  key="step-done"
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col items-center text-center py-12"
                >
                  {/* Animated signet mark */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1.4, ease: "linear", repeat: isRedirecting ? 0 : Infinity }}
                    className="mb-8"
                  >
                    <div className="flex h-16 w-16 items-center justify-center border border-nordic-accent/50 bg-nordic-accent-soft shadow-nordic-glow">
                      <SignetMark className="text-nordic-accent" size={32} />
                    </div>
                  </motion.div>

                  <h1 className="text-3xl font-display font-bold text-nordic-text mb-3">
                    Reforging your workspace
                  </h1>
                  <p className="text-base text-nordic-text-secondary max-w-sm leading-relaxed">
                    Personalizing your templates and AI tools for{" "}
                    <span className="text-nordic-accent font-medium">
                      {roles.find((r) => r.id === selectedRole)?.label ?? "your field"}
                    </span>
                    …
                  </p>

                  {/* Animated dots */}
                  <div className="mt-10 flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-nordic-accent"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}
