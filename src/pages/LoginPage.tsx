import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/theme-switch";
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { TextScrambleEffect } from "@/components/text-scramble";
import { Logo } from "@/components/ui/logo";

export function LoginPage() {
  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-background">
      {/* ── Left decorative panel (Brand Side) ───────────────────────────── */}
      <div className="relative hidden w-full h-full overflow-hidden bg-zinc-950 border-r lg:flex">
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
        <div className="relative z-10 flex flex-col justify-between h-full p-12 w-full pointer-events-none">
          
          {/* Top: Animated Logo */}
          <div className="mr-auto flex items-center gap-3">
            <Logo size="lg" />
          </div>

          {/* Bottom: Decrypting Intel Quote */}
          <div className="max-w-md p-6 backdrop-blur-md bg-black/40 border border-white/10 rounded-lg shadow-2xl relative overflow-hidden pointer-events-auto">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            <div className="space-y-3">
              <TextScrambleEffect 
                text="Applicant Tracking Systems reject 43% of flashy resumes. We forge data-slates that bypass the filters." 
                className="text-xl leading-relaxed text-zinc-300 font-medium"
              />
              <footer className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
                [ The FAANG Executive Protocol ]
              </footer>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right auth panel (Functional Side) ────────────────────────────────── */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6">
        
        {/* Back link */}
        <Button asChild className="absolute top-5 left-5 z-20 group" variant="ghost" size="sm">
          <a href="/">
            <ChevronLeftIcon className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1 text-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Base Camp</span>
          </a>
        </Button>

        {/* Theme Toggle */}
        <div className="absolute top-5 right-5 z-20">
          <ModeToggle />
        </div>

        {/* Mobile brand (Only visible on small screens) */}
        <div className="flex justify-center mb-6 lg:hidden w-full max-w-[380px]">
          <Logo size="lg" />
        </div>

        {/* Render the refactored LoginForm */}
        <LoginForm />

      </div>
    </main>
  );
}
