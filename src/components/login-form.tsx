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
        <Card className="bg-zinc-950/60 backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-primary/20 blur-sm" />

          <CardHeader className="text-center pt-6 pb-4 px-6">
            <motion.div variants={itemVariants}>
              <CardTitle className="font-heading font-bold text-lg tracking-tight text-white">
                {mode === "sign-in" ? "Access the Forge" : "Join the Guild"}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
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
                  className="overflow-hidden mb-4"
                >
                  <p className="border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive rounded-sm font-mono">
                    [ERROR]: {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <FieldGroup className="gap-4">
                <motion.div variants={itemVariants}>
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
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
                      className="bg-black/40 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/50 h-8 text-xs rounded-sm transition-all"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Field className="gap-1.5">
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Password
                      </FieldLabel>
                      {mode === "sign-in" && (
                        <a
                          href="#"
                          className="text-[10px] font-mono tracking-tight text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
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
                      className="bg-black/40 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/50 h-8 text-xs rounded-sm transition-all"
                    />
                  </Field>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-8 text-[11px] relative overflow-hidden group border border-primary/50 text-primary-foreground font-mono font-bold tracking-widest uppercase rounded-sm bg-primary hover:bg-primary/90 transition-all"
                    disabled={submitting || !email || !password}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-pulse">[ AUTHENTICATING_ ]</span>
                      </span>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-primary/20 animate-beskar-shimmer" />
                        <span className="relative z-10 group-hover:scale-[1.02] transition-transform">
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
                    className="w-full h-8 text-xs bg-zinc-900/50 hover:bg-zinc-800 border border-white/5 hover:border-primary/30 transition-all text-white rounded-sm font-sans"
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
                    className="w-full h-8 text-xs text-muted-foreground hover:text-white hover:bg-white/5 rounded-sm font-mono tracking-widest uppercase"
                    onClick={() => useAuthStore.getState().signInAsGuest()}
                    disabled={submitting}
                  >
                    Enter as Guest / Demo Mode
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FieldDescription className="text-center mt-2">
                    {mode === "sign-in" ? (
                      <span className="text-muted-foreground text-[11px]">
                        Don&apos;t have an account?{" "}
                        <button
                          type="button"
                          className="font-medium text-primary hover:underline underline-offset-4"
                          onClick={() => switchMode("sign-up")}
                        >
                          Sign up
                        </button>
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-[11px]">
                        Already have an account?{" "}
                        <button
                          type="button"
                          className="font-medium text-primary hover:underline underline-offset-4"
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
