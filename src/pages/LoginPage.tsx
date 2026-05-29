import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AuthDivider } from "@/components/auth-divider";
import { FloatingPaths } from "@/components/floating-paths";
import { ChevronLeftIcon, AtSignIcon, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
 
type AuthMode = "sign-in" | "sign-up";
 
export function LoginPage() {
  const { user, loading, error, signIn, signUp, signInWithGoogle, clearError } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/editor";
 
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
 
  useEffect(() => {
    if (!loading && user) navigate(redirectTo, { replace: true });
  }, [user, loading, navigate, redirectTo]);

  useEffect(() => { clearError(); }, [mode, clearError]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
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
    setShowPassword(false);
  };

  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      {/* ── Left decorative panel ───────────────────────────── */}
      <div className="relative hidden h-full flex-col border-r bg-secondary p-10 lg:flex dark:bg-secondary/20">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
        <div className="relative z-10 mr-auto">
          <span className="font-heading text-xl font-bold tracking-widest text-primary">SIGNET</span>
        </div>
        <div className="relative z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-xl leading-snug">
              &ldquo;43% of resumes never reach a human. Forge yours to survive any scanner.&rdquo;
            </p>
            <footer className="font-mono text-sm font-semibold text-muted-foreground">
              ~ The FAANG Executive Protocol
            </footer>
          </blockquote>
        </div>
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>

      {/* ── Right auth panel ────────────────────────────────── */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
        {/* Glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-0 top-0 h-96 w-72 -translate-y-1/3 translate-x-1/4 rounded-full bg-primary/5 blur-3xl" />
        </div>

        {/* Back link */}
        <Button asChild className="absolute top-5 left-5" variant="ghost" size="sm">
          <a href="/">
            <ChevronLeftIcon className="h-4 w-4" />
            Base Camp
          </a>
        </Button>

        {/* Card container */}
        <div className="w-full max-w-[340px] space-y-4">
          {/* Mobile brand */}
          <span className="block font-heading text-lg font-bold tracking-widest text-primary lg:hidden">
            SIGNET
          </span>

          {/* Heading */}
          <div className="space-y-0.5">
            <h1 className="font-bold text-xl tracking-tight">
              {mode === "sign-in" ? "Access the Forge" : "Join the Guild"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "sign-in"
                ? "Sign in to your account."
                : "Create your Signet account."}
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}

          {/* ── Email + Password form ── */}
          <form className="space-y-2.5" onSubmit={handleEmailSubmit}>
            {/* Email */}
            <InputGroup className="rounded-md">
              <InputGroupInput
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <InputGroupAddon align="inline-end">
                <AtSignIcon className="h-3.5 w-3.5 text-muted-foreground/60" />
              </InputGroupAddon>
            </InputGroup>

            {/* Password */}
            <InputGroup className="rounded-md">
              <InputGroupInput
                placeholder={mode === "sign-up" ? "Password (min. 6 chars)" : "Password"}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              />
              <InputGroupAddon align="inline-end">
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="flex items-center text-muted-foreground/60 transition-colors hover:text-foreground focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <EyeOffIcon className="h-3.5 w-3.5" />
                    : <EyeIcon className="h-3.5 w-3.5" />}
                </button>
              </InputGroupAddon>
            </InputGroup>

            {/* Forgot password */}
            {mode === "sign-in" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-[11px] text-muted-foreground/70 underline-offset-4 hover:text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <Button
              className="w-full"
              type="submit"
              size="sm"
              disabled={submitting || !email || !password}
            >
              {submitting
                ? <><Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />Processing…</>
                : mode === "sign-in" ? "Access the Forge" : "Join the Guild"}
            </Button>
          </form>

          {/* ── Divider then Google ── */}
          <AuthDivider>or continue with</AuthDivider>

          <Button
            className="w-full"
            size="sm"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={submitting}
          >
            {submitting
              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
              : <GoogleIcon className="h-4 w-4" />}
            Google
          </Button>

          {/* Mode toggle */}
          <p className="text-center text-xs text-muted-foreground">
            {mode === "sign-in" ? (
              <>No account?{" "}
                <button
                  type="button"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                  onClick={() => switchMode("sign-up")}
                >Join the Guild</button>
              </>
            ) : (
              <>Already a member?{" "}
                <button
                  type="button"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                  onClick={() => switchMode("sign-in")}
                >Sign In</button>
              </>
            )}
          </p>

          {/* Legal */}
          <p className="text-center text-[10px] text-muted-foreground/50 leading-relaxed">
            By continuing, you agree to the{" "}
            <a className="underline underline-offset-4 hover:text-primary" href="#">Creed of the Mandalore</a>
            {" "}and{" "}
            <a className="underline underline-offset-4 hover:text-primary" href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
