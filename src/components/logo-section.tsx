import {
  Cpu,
  Database,
  Code,
  Cloud,
  Shield,
  Zap,
  Activity,
  Layers,
  Box,
  Hexagon,
  Globe,
  Workflow
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

const logos = [
  { icon: Cpu, name: "Compute" },
  { icon: Database, name: "Storage" },
  { icon: Code, name: "Logic" },
  { icon: Cloud, name: "Network" },
  { icon: Shield, name: "Security" },
  { icon: Zap, name: "Performance" },
  { icon: Activity, name: "Metrics" },
  { icon: Layers, name: "Stack" },
  { icon: Box, name: "Containers" },
  { icon: Hexagon, name: "Architecture" },
  { icon: Globe, name: "Edge" },
  { icon: Workflow, name: "Pipelines" },
]

export function LogoSection() {
  return (
    <section id="factions" className="w-full py-16 md:py-24">
      {/* Header */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-4 sm:px-6">
        <Badge variant="secondary">Trusted by Top Recruits & Guilds</Badge>
        <h2 className="max-w-xl text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Forging world-class careers
        </h2>
        <p className="max-w-lg text-center text-sm leading-6 text-muted-foreground">
          Job seekers and professionals rely on our tools
          <br className="hidden sm:block" />
          to craft ATS-compliant, scalable, and beautiful resumes.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-12 w-full max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((logo) => {
            const Icon = logo.icon
            return (
              <div
                key={logo.name}
                className="group flex flex-col items-center justify-center gap-2 rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-muted/50"
              >
                <Icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {logo.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
