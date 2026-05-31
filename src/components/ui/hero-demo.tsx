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
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="hud-grid absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)",
            height: "100%",
          }}
        />
      </div>

      {/* Hero Content Wrapper */}
      <div className="z-30 w-full max-w-4xl px-4 pt-28 pb-12 sm:px-6 md:pt-32 flex flex-col items-center justify-center text-center">
        <div className="space-y-5 sm:mx-auto">
          {/* Tactical Pill Badge utilizing Shadcn UI preset & Geist Mono */}
          <div className="flex justify-center">
            <Link to="#features">
              <Badge
                variant="outline"
                className="pl-3 pr-2.5 py-1.5 h-8 text-xs font-mono tracking-wider cursor-pointer transition-all duration-300 hover:bg-muted/70 hover:border-primary/50 flex items-center gap-2 group/badge rounded-md border-border/50 bg-background/50 backdrop-blur-sm"
              >
                <span className="animate-beskar-shimmer font-bold">BOOTING SIGNET</span>
                <span className="h-3 w-px bg-border" />
                <span className="text-primary font-semibold flex items-center group-hover/badge:text-primary/80">
                  LAUNCH <ArrowRight className="ml-1 size-3 transition-transform group-hover/badge:translate-x-0.5" />
                </span>
              </Badge>
            </Link>
          </div>

          {/* Heading - Perfectly balanced typographic hierarchy */}
          <h1 className="mx-auto flex flex-row flex-wrap justify-center items-center max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] drop-shadow-sm">
            <TextLoop 
              staticText="Elevate Your" 
              rotatingTexts={["Career", "Skills", "Potential", "Future"]}
              className="justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
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
            <Button asChild size="lg" className="px-6 text-sm font-medium shadow-md hover:shadow-primary/10 transition-all duration-300">
              <Link to="/editor">
                <span className="text-nowrap">Start Forging</span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-6 text-sm font-medium border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all duration-300"
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
            className="to-background absolute inset-0 z-30 bg-linear-to-b from-transparent from-60% to-background pointer-events-none"
          />
          <div className="group ring-background bg-background relative mx-auto aspect-[2700/1440] w-full overflow-hidden rounded-2xl border border-border/50 p-2 shadow-2xl transition-all duration-700 hover:border-primary/30">
            {/* Tactical Frame Glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            
            <img
              className="bg-background relative z-10 block w-full rounded-xl border border-border/40 shadow-inner h-full object-cover object-top"
              src="/hero-dashboard.png"
              alt="Signet Dashboard"
            />
            
            {/* Holographic Scanline Overlay */}
            <div className="absolute inset-2 z-20 pointer-events-none overflow-hidden rounded-xl mix-blend-screen opacity-70 group-hover:opacity-100 transition-opacity duration-500">
               <div className="absolute inset-0 bg-primary/5" />
               <div className="absolute -top-10 left-0 right-0 h-8 bg-gradient-to-b from-transparent via-primary/30 to-transparent shadow-[0_0_20px_var(--color-primary)] animate-scanline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
