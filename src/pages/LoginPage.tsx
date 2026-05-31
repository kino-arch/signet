import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/theme-switch";
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { TextScrambleEffect } from "@/components/text-scramble";
import { Logo } from "@/components/ui/logo";

export function LoginPage() {
  return (
    <main className="relative bg-background md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      {/* ── Left decorative panel (Brand Side) ───────────────────────────── */}
      <div className="relative hidden h-full w-full overflow-hidden border-r bg-zinc-950 lg:flex">
        {/* Layer 0: The Tactical Depth (Hole Background) */}
        <div className="absolute inset-0 z-0 opacity-80">
          <HoleBackground 
            strokeColor="#27272a" 
            particleRGBColor={[6, 182, 212]} 
            numberOfLines={60}
            numberOfDiscs={40}
          />
        </div>

        {/* Layer 1: Foreground Content (Brand Side) */}
        <div className="pointer-events-none relative z-10 flex h-full w-full flex-col justify-between p-12">
          
          {/* Top: Animated Logo */}
          <div className="mr-auto flex items-center gap-3">
            <Logo size="lg" />
          </div>

          {/* Bottom: Decrypting Intel Quote */}
          <div className="pointer-events-auto relative max-w-md overflow-hidden rounded-lg border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary" />
            <div className="space-y-3">
              <TextScrambleEffect 
                text="Applicant Tracking Systems reject 43% of flashy resumes. We forge data-slates that bypass the filters." 
                className="text-xl leading-relaxed font-medium text-zinc-300"
              />
              <footer className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                [ The FAANG Executive Protocol ]
              </footer>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right auth panel (Functional Side) ────────────────────────────────── */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6">
        
        {/* Back link */}
        <Button asChild className="group absolute top-5 left-5 z-20" variant="ghost" size="sm">
          <a href="/">
            <ChevronLeftIcon className="mr-1 h-4 w-4 text-primary transition-transform group-hover:-translate-x-1" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase group-hover:text-foreground">Base Camp</span>
          </a>
        </Button>

        {/* Theme Toggle */}
        <div className="absolute top-5 right-5 z-20">
          <ModeToggle />
        </div>

        {/* Mobile brand (Only visible on small screens) */}
        <div className="mb-6 flex w-full max-w-[380px] justify-center lg:hidden">
          <Logo size="lg" />
        </div>

        {/* Render the refactored LoginForm */}
        <LoginForm />

      </div>
    </main>
  );
}
