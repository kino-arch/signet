import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  FileText,
  Crosshair,
  BarChart2,
  Settings,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar({ className }: { className?: string }) {
  const links = [
    {
      mandoName: "Command Deck",
      civilianName: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      mandoName: "Data Slates",
      civilianName: "My Resumes",
      path: "/slates",
      icon: FileText,
    },
    {
      mandoName: "Target Matrix",
      civilianName: "Job Tracker",
      path: "/applications",
      icon: Crosshair,
    },
    {
      mandoName: "Analytics",
      civilianName: "Analytics",
      path: "/analytics",
      icon: BarChart2,
    },
  ]

  return (
    <aside
      className={cn("sidebar-glow-edge flex flex-col bg-sidebar", className)}
    >
      <div className="flex items-center gap-3 p-6">
        <div className="glow-cyan flex h-8 w-8 items-center justify-center rounded-lg bg-[oklch(0.75_0.24_220)]/20">
          <Sparkles className="h-5 w-5 text-[oklch(0.75_0.24_220)]" />
        </div>
        <span className="text-xl font-bold tracking-tight text-sidebar-foreground">
          Signet
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between px-3 pb-4">
        <nav className="space-y-1" aria-label="Primary Operations">
          <div className="mt-2 mb-4 px-3 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            {"Main Menu"}
          </div>
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "border border-[oklch(0.75_0.24_220)]/20 bg-[oklch(0.75_0.24_220)]/10 text-[oklch(0.75_0.24_220)]"
                      : "border border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )
                }
              >
                <Icon className="h-5 w-5" />
                {link.civilianName}
              </NavLink>
            )
          })}
        </nav>

        <div className="space-y-4">
          <nav className="space-y-1" aria-label="System">
            <div className="mb-4 px-3 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              {"Settings"}
            </div>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "border border-[oklch(0.75_0.24_220)]/20 bg-[oklch(0.75_0.24_220)]/10 text-[oklch(0.75_0.24_220)]"
                    : "border border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )
              }
            >
              <Settings className="h-5 w-5" />
              {"Account Settings"}
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  )
}
