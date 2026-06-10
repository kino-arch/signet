import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeftIcon, CheckCircle2 } from "lucide-react"
import { SignetMark } from "@/components/nordic/SignetMark"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "motion/react"

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email) {
      setError("Please enter your email address.")
      return
    }
    setSubmitting(true)
    try {
      const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: `${window.location.origin}/reset-password` }
      )
      if (supabaseError) throw supabaseError
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-nordic-bg text-nordic-text lg:grid-cols-2">

      {/* ── Left panel (Image) ─────────────────────────────────── */}
      <div className="relative hidden overflow-hidden border-r border-nordic-border lg:flex lg:flex-col lg:p-8">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/illustrations/hero_02_landscape.png"
            alt="Signet Nordic Minimalist Landscape"
            className="h-full w-full object-cover object-center opacity-80"
          />
          {/* Subtle gradient overlay to ensure the logo is readable and to blend edges if needed */}
          <div className="absolute inset-0 bg-nordic-bg/20 bg-gradient-to-t from-nordic-bg/60 via-transparent to-nordic-bg/40" />
        </div>

        {/* Logo overlay */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-2.5"
        >
          <SignetMark size={28} />
          <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            Signet
          </span>
        </motion.div>
      </div>

      {/* ── Right panel ─────────────────────────────────────────── */}
      <div className="relative flex flex-col bg-nordic-bg p-4 md:p-6 lg:p-8">

        {/* Back link */}
        <div className="flex w-full justify-start lg:justify-end">
          <Link
            to="/login"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-nordic-text-secondary transition-colors hover:text-nordic-text"
          >
            <ChevronLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Sign In
          </Link>
        </div>

        {/* Content centred */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">

            {/* Mobile logo */}
            <div className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
              <SignetMark size={24} />
              <span className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Signet
              </span>
            </div>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h1 className="mb-1.5 text-2xl font-bold tracking-tight text-nordic-text">
                    Recover Password
                  </h1>
                  <p className="mb-7 text-sm text-nordic-text-secondary">
                    Enter your email to receive a reset link.
                  </p>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden border border-red-500/30 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-400"
                      >
                        [ERROR]: {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <label htmlFor="email" className="nordic-input-label">Email address</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="nordic-input h-10"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="nordic-btn-primary w-full justify-center py-2.5"
                    >
                      {submitting ? "Sending…" : "Send Reset Link"}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-nordic-accent/30 bg-nordic-accent/10">
                    <CheckCircle2 className="h-7 w-7 text-nordic-accent" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-nordic-text">Check your inbox</h2>
                  <p className="mb-6 text-sm text-nordic-text-secondary">
                    We sent a password reset link to <span className="font-medium text-nordic-text">{email}</span>.
                    It expires in 1 hour.
                  </p>
                  <Link
                    to="/login"
                    className="nordic-btn-secondary inline-flex items-center gap-2"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                    Back to Sign In
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
