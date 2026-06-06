import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { GoogleIcon } from "@/components/google-icon"
import { useAuthStore } from "@/store/useAuthStore"
import { motion, AnimatePresence, type Variants } from "framer-motion"

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
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) navigate(redirectTo, { replace: true })
  }, [user, loading, navigate, redirectTo])

  useEffect(() => {
    clearError()
  }, [mode, clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
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
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <div
      className={cn("flex w-full max-w-80 flex-col gap-4", className)}
      {...props}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Card className="mx-auto max-w-sm">
          <CardHeader className="px-5 pt-5 pb-3 text-center">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
                {mode === "sign-in" ? "Welcome back" : "Create an account"}
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-muted-foreground">
                {mode === "sign-in"
                  ? "Enter your email to sign in to your account"
                  : "Enter your email below to create your account"}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="px-5 pb-5">
            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <p className="rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2 font-mono text-xs text-destructive">
                    [ERROR]: {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <FieldGroup className="gap-3">
                <motion.div variants={itemVariants}>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="email"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="h-9"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Field className="gap-1.5">
                    <div className="flex items-center justify-between">
                      <FieldLabel
                        htmlFor="password"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Password
                      </FieldLabel>
                      {mode === "sign-in" && (
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot password?
                        </a>
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
                      autoComplete={
                        mode === "sign-in" ? "current-password" : "new-password"
                      }
                      className="h-9"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting || !email || !password}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-pulse">Loading...</span>
                      </span>
                    ) : (
                      <>
                        <span>
                          {mode === "sign-in" ? "Sign In" : "Sign Up"}
                        </span>
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="py-1.5">
                  <div className="w-full border-t border-border/40" />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={submitting}
                  >
                    <GoogleIcon className="mr-2 h-4 w-4" />
                    Continue with Google
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    variant="ghost"
                    type="button"
                    className="w-full text-sm text-muted-foreground"
                    onClick={() => {
                      useAuthStore.getState().signInAsGuest()
                      navigate(redirectTo, { replace: true })
                    }}
                    disabled={submitting}
                  >
                    Continue as Guest
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FieldDescription className="mt-2 text-center">
                    {mode === "sign-in" ? (
                      <span className="text-[11px] text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <button
                          type="button"
                          className="font-medium text-primary underline-offset-4 hover:underline"
                          onClick={() => switchMode("sign-up")}
                        >
                          Sign up
                        </button>
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">
                        Already have an account?{" "}
                        <button
                          type="button"
                          className="font-medium text-primary underline-offset-4 hover:underline"
                          onClick={() => switchMode("sign-in")}
                        >
                          Sign in
                        </button>
                      </span>
                    )}
                  </FieldDescription>
                </motion.div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
