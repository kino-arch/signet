import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GoogleIcon } from "@/components/google-icon";
import { useAuthStore } from "@/store/useAuthStore";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type AuthMode = "sign-in" | "sign-up";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { user, loading, error, signIn, signUp, signInWithGoogle, clearError } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate(redirectTo, { replace: true });
  }, [user, loading, navigate, redirectTo]);

  useEffect(() => { clearError(); }, [mode, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    try {
      if (mode === "sign-in") await signIn(email, password);
      else await signUp(email, password);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setPassword("");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className={cn("flex flex-col gap-4 w-full max-w-[320px]", className)} {...props}>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Card className="relative overflow-hidden border-white/10 bg-zinc-950/60 shadow-2xl backdrop-blur-xl">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 h-1 w-3/4 -translate-x-1/2 bg-primary/20 blur-sm" />

          <CardHeader className="px-6 pt-6 pb-4 text-center">
            <motion.div variants={itemVariants}>
              <CardTitle className="font-heading text-lg font-bold tracking-tight text-white">
                {mode === "sign-in" ? "Access the Forge" : "Join the Guild"}
              </CardTitle>
              <CardDescription className="mt-1 text-xs">
                {mode === "sign-in"
                  ? "Enter your credentials to command the market."
                  : "Create your Signet account."}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
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
              <FieldGroup className="gap-4">
                <motion.div variants={itemVariants}>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="email" className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="operative@signet.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="h-8 rounded-sm border-white/10 bg-black/40 text-xs text-white transition-all placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/50"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Field className="gap-1.5">
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password" className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                        Password
                      </FieldLabel>
                      {mode === "sign-in" && (
                        <a
                          href="#"
                          className="font-mono text-[10px] tracking-tight text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                        >
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder={mode === "sign-up" ? "min. 6 characters" : "••••••••"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                      className="h-8 rounded-sm border-white/10 bg-black/40 text-xs text-white transition-all placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/50"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <Button
                    type="submit"
                    className="group relative h-8 w-full overflow-hidden rounded-sm border border-primary/50 bg-primary font-mono text-[11px] font-bold tracking-widest text-primary-foreground uppercase transition-all hover:bg-primary/90"
                    disabled={submitting || !email || !password}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-pulse">[ AUTHENTICATING_ ]</span>
                      </span>
                    ) : (
                      <>
                        <div className="absolute inset-0 animate-beskar-shimmer bg-primary/20" />
                        <span className="relative z-10 transition-transform group-hover:scale-[1.02]">
                          {mode === "sign-in" ? "[ INITIALIZE ]" : "[ ACCESS DATACORE ]"}
                        </span>
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="py-2">
                  <div className="w-full border-t border-border/40" />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    variant="outline"
                    type="button"
                    className="h-8 w-full rounded-sm border border-white/5 bg-zinc-900/50 font-sans text-xs text-white transition-all hover:border-primary/30 hover:bg-zinc-800"
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
                    className="h-8 w-full rounded-sm font-mono text-xs tracking-widest text-muted-foreground uppercase hover:bg-white/5 hover:text-white"
                    onClick={() => useAuthStore.getState().signInAsGuest()}
                    disabled={submitting}
                  >
                    Enter as Guest / Demo Mode
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
  );
}
