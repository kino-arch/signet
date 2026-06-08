import { NavLink } from "react-router-dom"
import { FileText, LayoutTemplate, Palette, Settings2 } from "lucide-react"

export function NordicEditorSidebar() {
  const menuItems = [
    { name: "Content", icon: FileText, path: "/forge/content" },
    { name: "Templates", icon: LayoutTemplate, path: "/forge/templates" },
    { name: "Design", icon: Palette, path: "/forge/design" },
    { name: "Settings", icon: Settings2, path: "/forge/settings" },
  ]

  // If the user is just on /forge/:id without sub-paths, we'd need to adapt,
  // but for now we provide the UI shell.

  return (
    <aside className="w-64 shrink-0 border-r border-nordic-border bg-nordic-surface min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-nordic-text-tertiary mb-3 px-2">
          Document Editor
        </h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-nordic-accent-soft text-nordic-accent"
                    : "text-nordic-text-secondary hover:bg-nordic-surface-hover hover:text-nordic-text"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
