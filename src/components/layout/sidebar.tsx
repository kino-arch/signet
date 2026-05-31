
import { NavLink } from "react-router-dom"
import { LayoutDashboard, FileText, Crosshair, BarChart2, Settings } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Sidebar({ className }: { className?: string }) {
  const links = [
    { name: "Command Deck", path: "/dashboard", icon: LayoutDashboard },
    { name: "Data Slates", path: "/slates", icon: FileText },
    { name: "Target Matrix", path: "/applications", icon: Crosshair },
    { name: "Analytics", path: "/analytics", icon: BarChart2 },
  ]

  return (
    <aside className={className}>
      <div className="flex h-16 items-center border-b border-zinc-800 px-6">
        <Logo size="md" />
      </div>
      <div className="flex h-[calc(100vh-4rem)] flex-col justify-between p-4">
        <nav className="space-y-2">
          <div className="mb-4 px-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">Primary Operations</div>
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </NavLink>
            )
          })}
        </nav>
        
        <nav className="space-y-2">
          <div className="mb-4 px-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">System</div>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
              }`
            }
          >
            <Settings className="h-4 w-4" />
            Settings
          </NavLink>
        </nav>
      </div>
    </aside>
  )
}
