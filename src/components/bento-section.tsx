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
        <Badge variant="outline" className="animate-beskar-shimmer border-primary/30 bg-primary/5 font-mono tracking-wider text-primary">
          THE WAY OF THE PROFESSIONAL
        </Badge>
        <h2 className="max-w-xl text-center text-2xl font-semibold tracking-tight uppercase sm:text-3xl md:text-4xl">
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
          <BentoGridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 1, md: 2 }} className="group relative overflow-hidden border border-border/50 transition-colors duration-500 hover:border-primary/50">
            {/* Tactical Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between p-6 sm:p-8">
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
          <BentoGridItem className="group relative border border-border/50 transition-colors duration-500 hover:border-primary/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                [ SYS.CAPABILITIES ]
              </span>
              <ul className="mt-4 space-y-2 font-mono text-sm font-medium">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary/70" /> ATS Bypass Modules</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary/70" /> Structural Formatting</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary/70" /> Logic Cores (AI)</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary/70" /> Encrypted Datacore</li>
              </ul>
            </div>
          </BentoGridItem>

          {/* Approach Tile */}
          <BentoGridItem className="group relative border border-border/50 transition-colors duration-500 hover:border-primary/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                [ TACTICAL.APPROACH ]
              </span>
              <div className="mt-4">
                <p className="font-mono text-sm leading-relaxed font-medium text-foreground/90">
                  IMPORT <span className="text-primary/70">→</span> FORGE <span className="text-primary/70">→</span> CALIBRATE <span className="text-primary/70">→</span> EXPORT
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Intentional framing for high-value targets.
                </p>
              </div>
            </div>
          </BentoGridItem>

          {/* Highlighted Work Tile */}
          <BentoGridItem colSpan={{ base: 1, lg: 2 }} className="group relative overflow-hidden border border-border/50 transition-colors duration-500 hover:border-primary/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 hud-grid opacity-10 mix-blend-screen" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                [ SIGNATURE.ASSET ]
              </span>
              <div className="mt-4">
                <h4 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground">
                  The Beskar Blueprint <span className="flex h-2 w-2 animate-pulse rounded-full bg-primary" />
                </h4>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
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
