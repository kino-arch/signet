import { ChevronLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/login-form"
import { SignetMark } from "@/components/nordic/SignetMark"
import { Link } from "react-router-dom"
import { motion } from "motion/react"

export function LoginPage() {
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
          <Button asChild variant="ghost" size="sm" className="group text-nordic-text-secondary hover:text-nordic-text">
            <Link to="/">
              <ChevronLeftIcon className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Form centred */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">

            {/* Mobile logo */}
            <div className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
              <SignetMark size={24} />
              <span className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Signet
              </span>
            </div>

            <LoginForm />

            {/* Legal footer */}
            <p className="mt-8 text-center text-xs text-nordic-text-tertiary">
              By continuing, you agree to Signet&apos;s{" "}
              <Link to="/terms" className="text-nordic-text-secondary underline-offset-4 hover:underline hover:text-nordic-text transition-colors">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-nordic-text-secondary underline-offset-4 hover:underline hover:text-nordic-text transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
