import { useState, useEffect } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { GoogleIcon } from "@/components/google-icon"
import { useAuthStore } from "@/store/useAuthStore"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Loader2 } from "lucide-react"

type AuthMode = "sign-in" | "sign-up"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { user, loading, error, signIn, signUp, signInWithGoogle, clearError } =
    useAuthStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/dashboard"

  const [mode, setMode] = useState<AuthMode>("sign-in")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [validationError, setValidationError] = useState("")

  useEffect(() => {
    if (!loading && user) navigate(redirectTo, { replace: true })
  }, [user, loading, navigate, redirectTo])

  useEffect(() => {
    clearError()
    setValidationError("")
  }, [mode, clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError("")
    if (!email || !password) {
      setValidationError("Please fill in both email and password.")
      return
    }
    setSubmitting(true)
    try {
      if (mode === "sign-in") await signIn(email, password)
      else await signUp(email, password)
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setSubmitting(true)
    try {
      await signInWithGoogle()
    } finally {
      setSubmitting(false)
    }
  }

  const switchMode = (next: AuthMode) => {
    setMode(next)
    setPassword("")
    setFirstName("")
    setLastName("")
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <motion.div variants={containerVariants} initial="hidden" animate="show">

        {/* Header */}
        <motion.div variants={itemVariants} className="mb-5">
          <h1 className="text-xl font-bold tracking-tight text-nordic-text">
            {mode === "sign-in" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-xs text-nordic-text-secondary">
            {mode === "sign-in"
              ? "Sign in to continue building your resume"
              : "Get started — it's free"}
          </p>
        </motion.div>

        {/* OAuth row */}
        <motion.div variants={itemVariants} className="mb-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting}
            className="nordic-btn-secondary flex w-full items-center justify-center gap-2 py-2"
            aria-label="Sign in with Google"
          >
            <GoogleIcon className="h-4 w-4" />
            <span className="text-sm">Continue with Google</span>
          </button>
        </motion.div>

        {/* Dashed divider */}
        <motion.div variants={itemVariants} className="mb-4 flex items-center gap-3">
          <div className="flex-1 border-t border-dashed border-nordic-border" />
          <span className="text-xs text-nordic-text-tertiary">or continue with email</span>
          <div className="flex-1 border-t border-dashed border-nordic-border" />
        </motion.div>

        {/* Error banner */}
        <AnimatePresence>
          {(error || validationError) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <p className="border border-red-500/30 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-400">
                [ERROR]: {error || validationError}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">

            {/* First / Last name — sign-up only */}
            <AnimatePresence initial={false}>
              {mode === "sign-up" && (
                <motion.div
                  key="name-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 gap-3 overflow-hidden"
                >
                  <div>
                    <label htmlFor="firstName" className="nordic-input-label">First name</label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Ada"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      className="nordic-input h-9"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="nordic-input-label">Last name</label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Lovelace"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      className="nordic-input h-9"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label htmlFor="email" className="nordic-input-label">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="nordic-input h-9"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-medium text-nordic-text-secondary">
                  Password
                </label>
                {mode === "sign-in" && (
                  <Link
                    to="/forgot-password"
                    className="text-xs text-nordic-accent underline-offset-4 hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                className="nordic-input h-9"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="nordic-btn-primary w-full justify-center py-2.5"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Please wait…</span>
                </span>
              ) : mode === "sign-in" ? "Sign In" : "Create Account"}
            </button>
          </div>
        </form>



        {/* Mode switch */}
        <motion.div variants={itemVariants} className="mt-5 border-t border-nordic-border pt-4 text-center">
          <p className="text-xs text-nordic-text-secondary">
            {mode === "sign-in" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-nordic-accent underline-offset-4 hover:underline transition-colors"
                  onClick={() => switchMode("sign-up")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-nordic-accent underline-offset-4 hover:underline transition-colors"
                  onClick={() => switchMode("sign-in")}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
