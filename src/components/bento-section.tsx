import { BentoGrid, BentoGridItem } from "@/components/bento"
import { GridPattern } from "@/components/grid-pattern"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function BentoSection() {
  return (
    <section id="manifesto" className="w-full py-16 md:py-24">
      {/* Header */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-4 sm:px-6">
        <Badge variant="outline" className="font-mono tracking-wider border-primary/30 text-primary bg-primary/5 animate-beskar-shimmer">
          THE WAY OF THE PROFESSIONAL
        </Badge>
        <h2 className="max-w-xl text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl uppercase">
          Armament for the Modern Career
        </h2>
        <p className="max-w-lg text-center text-sm leading-6 text-muted-foreground">
          We forge thoughtful professional narratives
          <br className="hidden sm:block" />
          that blend strategy, clarity, and visual impact.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6">
        <BentoGrid
          cols={{ base: 1, md: 2, lg: 4 }}
          rowHeight={{ base: "minmax(200px, auto)", md: "240px", lg: "280px" }}
          className="gap-4"
        >
          {/* Main Hero Tile */}
          <BentoGridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 1, md: 2 }} className="overflow-hidden group border border-border/50 transition-colors duration-500 hover:border-primary/50 relative">
            {/* Tactical Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex h-full min-h-[300px] flex-col justify-between p-6 sm:p-8 z-10">
              <div className="absolute inset-0 -z-10 bg-muted/30">
                <GridPattern
                  width={40}
                  height={40}
                  squares={[
                    [4, 2],
                    [2, 3],
                    [8, 4],
                  ]}
                  className="fill-primary/5"
                />
              </div>
              <div className="z-10">
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Forged for <br className="hidden sm:block" /> Ambitious Careers.
                </h3>
                <p className="mt-4 max-w-md text-base text-muted-foreground">
                  From data import to PDF export, we build resumes that feel
                  intuitive, refined, and built to bypass ATS filters.
                </p>
              </div>
              <div className="z-10 mt-8 flex flex-wrap gap-3">
                <Button size="default" asChild>
                  <Link to="/auth">Start Forging</Link>
                </Button>
                <Button variant="outline" size="default" asChild>
                  <Link to="/docs">View Datacore</Link>
                </Button>
              </div>
            </div>
          </BentoGridItem>

          {/* Capabilities Tile */}
          <BentoGridItem className="group border border-border/50 transition-colors duration-500 hover:border-primary/50 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex h-full flex-col justify-between p-6 z-10">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                [ SYS.CAPABILITIES ]
              </span>
              <ul className="mt-4 space-y-2 text-sm font-medium font-mono">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/70" /> ATS Bypass Modules</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/70" /> Structural Formatting</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/70" /> Logic Cores (AI)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/70" /> Encrypted Datacore</li>
              </ul>
            </div>
          </BentoGridItem>

          {/* Approach Tile */}
          <BentoGridItem className="group border border-border/50 transition-colors duration-500 hover:border-primary/50 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex h-full flex-col justify-between p-6 z-10">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                [ TACTICAL.APPROACH ]
              </span>
              <div className="mt-4">
                <p className="text-sm font-medium font-mono text-foreground/90 leading-relaxed">
                  IMPORT <span className="text-primary/70">→</span> FORGE <span className="text-primary/70">→</span> CALIBRATE <span className="text-primary/70">→</span> EXPORT
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Intentional framing for high-value targets.
                </p>
              </div>
            </div>
          </BentoGridItem>

          {/* Highlighted Work Tile */}
          <BentoGridItem colSpan={{ base: 1, lg: 2 }} className="group border border-border/50 transition-colors duration-500 hover:border-primary/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="hud-grid absolute inset-0 opacity-10 mix-blend-screen pointer-events-none" />
            <div className="relative flex h-full flex-col justify-between p-6 z-10">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                [ SIGNATURE.ASSET ]
              </span>
              <div className="mt-4">
                <h4 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                  The Beskar Blueprint <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                </h4>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                  Redesigned core resume architectures to improve cognitive parsing and guarantee 
                  system bypass rates across enterprise ATS filters.
                </p>
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </section>
  )
}
