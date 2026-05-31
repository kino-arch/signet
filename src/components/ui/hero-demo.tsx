"use client"

import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TextLoop from "@/components/text-loop"

export function HeroDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-start overflow-hidden bg-background">
      {/* Tactical HUD Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 hud-grid opacity-40 mix-blend-screen"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)",
            height: "100%",
          }}
        />
      </div>

      {/* Hero Content Wrapper */}
      <div className="z-30 flex w-full max-w-4xl flex-col items-center justify-center px-4 pt-28 pb-12 text-center sm:px-6 md:pt-32">
        <div className="space-y-5 sm:mx-auto">
          {/* Tactical Pill Badge utilizing Shadcn UI preset & Geist Mono */}
          <div className="flex justify-center">
            <Link to="#features">
              <Badge
                variant="outline"
                className="group/badge flex h-8 cursor-pointer items-center gap-2 rounded-md border-border/50 bg-background/50 py-1.5 pr-2.5 pl-3 font-mono text-xs tracking-wider backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-muted/70"
              >
                <span className="animate-beskar-shimmer font-bold">BOOTING SIGNET</span>
                <span className="h-3 w-px bg-border" />
                <span className="flex items-center font-semibold text-primary group-hover/badge:text-primary/80">
                  LAUNCH <ArrowRight className="ml-1 size-3 transition-transform group-hover/badge:translate-x-0.5" />
                </span>
              </Badge>
            </Link>
          </div>

          {/* Heading - Perfectly balanced typographic hierarchy */}
          <h1 className="mx-auto flex max-w-4xl flex-row flex-wrap items-center justify-center text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
            <TextLoop 
              staticText="Elevate Your" 
              rotatingTexts={["Career", "Skills", "Potential", "Future"]}
              className="justify-center text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              staticTextClassName="mr-2 sm:mr-3"
              rotatingTextClassName="bg-gradient-to-r from-primary to-primary/60 pr-0 sm:pr-1"
              backgroundClassName="dark:from-transparent dark:via-primary/10 dark:to-primary/20 bg-gradient-to-r from-transparent via-primary/10 to-primary/20"
              cursorClassName="bg-primary"
            />
          </h1>

          {/* Subheading - concise context and readability focus */}
          <p className="mx-auto max-w-xl text-sm text-muted-foreground/95 sm:text-base md:text-lg">
            Forge an indestructible, ATS-optimized professional identity. Built for operators who demand minimalist, high-conversion design.
          </p>

          {/* Action Callouts */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="px-6 text-sm font-medium shadow-md transition-all duration-300 hover:shadow-primary/10">
              <Link to="/editor">
                <span className="text-nowrap">Start Forging</span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border/50 bg-background/50 px-6 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-muted/50"
            >
              <Link to="/docs">
                <span className="text-nowrap">Explore Datacore</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Holographic Tactical Dashboard Showcase */}
        <div className="relative mt-12 w-full max-w-4xl overflow-hidden px-2 sm:mt-16 lg:mt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 bg-linear-to-b from-transparent from-60% to-background"
          />
          <div className="group relative mx-auto aspect-[2700/1440] w-full overflow-hidden rounded-2xl border border-border/50 bg-background p-2 shadow-2xl ring-background transition-all duration-700 hover:border-primary/30">
            {/* Tactical Frame Glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            
            <img
              className="relative z-10 block h-full w-full rounded-xl border border-border/40 bg-background object-cover object-top shadow-inner"
              src="/hero-dashboard.png"
              alt="Signet Dashboard"
            />
            
            {/* Holographic Scanline Overlay */}
            <div className="pointer-events-none absolute inset-2 z-20 overflow-hidden rounded-xl opacity-70 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100">
               <div className="absolute inset-0 bg-primary/5" />
               <div className="absolute -top-10 right-0 left-0 h-8 animate-scanline bg-gradient-to-b from-transparent via-primary/30 to-transparent shadow-[0_0_20px_var(--color-primary)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
