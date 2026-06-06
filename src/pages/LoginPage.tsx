import { ChevronLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/login-form"
import { Logo } from "@/components/ui/logo"

export function LoginPage() {
  return (
    <div className="grid min-h-svh bg-background text-foreground lg:grid-cols-2">
      {/* Left side: Image / Pattern */}
      <div className="relative hidden overflow-hidden border-r border-border/40 bg-zinc-950 lg:block">
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-10">
          <div className="flex items-center gap-2">
            <Logo size="md" showText={false} />
            <span className="font-heading text-xl font-bold tracking-widest text-primary">
              SIGNET
            </span>
          </div>
          <div className="max-w-md">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white">
              Forge Your Identity
            </h2>
            <p className="text-lg text-zinc-400">
              A minimalist, sci-fi-themed resume builder with a sleek datapad
              UI. Strip away the clutter and forge your career data into a
              professional emblem.
            </p>
          </div>
        </div>

        {/* Hexagonal / Sci-fi Pattern Background */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(30deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)), linear-gradient(150deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)), linear-gradient(30deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)), linear-gradient(150deg, var(--primary) 12%, transparent 12.5%, transparent 87%, var(--primary) 87.5%, var(--primary)), linear-gradient(60deg, color-mix(in srgb, var(--primary) 77%, transparent) 25%, transparent 25.5%, transparent 75%, color-mix(in srgb, var(--primary) 77%, transparent) 75%, color-mix(in srgb, var(--primary) 77%, transparent)), linear-gradient(60deg, color-mix(in srgb, var(--primary) 77%, transparent) 25%, transparent 25.5%, transparent 75%, color-mix(in srgb, var(--primary) 77%, transparent) 75%, color-mix(in srgb, var(--primary) 77%, transparent))",
            backgroundPosition:
              "0 0, 0 0, 30px 53px, 30px 53px, 0 0, 30px 53px",
            backgroundSize: "60px 106px",
          }}
        />
        {/* Gradient overlay to make text readable */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
      </div>

      {/* Right side: Login Form */}
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <div className="flex w-full justify-start lg:justify-end">
          <Button asChild className="group" variant="ghost" size="sm">
            <a href="/">
              <ChevronLeftIcon className="mr-1 h-4 w-4 text-primary transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                Back to Home
              </span>
            </a>
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-sm flex-col items-center">
            {/* Logo is visible on small screens since left side is hidden */}
            <div className="mb-8 flex w-full justify-center lg:hidden">
              <Logo size="md" />
            </div>

            <div className="w-full">
              <LoginForm />

              <div className="mt-8 w-full">
                <div className="relative block overflow-hidden rounded-lg border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-colors">
                  <div className="text-center text-sm">
                    <p className="mb-2 text-muted-foreground">
                      Want to learn more?
                    </p>
                    <a
                      href="/docs"
                      className="font-semibold text-primary hover:underline"
                    >
                      Read our documentation
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 w-full">
                <p className="text-center text-xs font-medium text-muted-foreground">
                  By continuing, you agree to Signet&apos;s{" "}
                  <a
                    href="/terms"
                    className="font-semibold text-primary hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="font-semibold text-primary hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
