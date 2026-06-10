import { Link, useLocation } from "react-router-dom"
import { SignetMark } from "@/components/nordic/SignetMark"
import { NordicProfileDropdown } from "@/components/nordic/NordicProfileDropdown"
import { NativeNotificationBell } from "@/components/ui/native-notification-bell"
import { useAuthStore } from "@/store/useAuthStore"

export function NordicTopNav() {
  const location = useLocation()
  const { user } = useAuthStore()

  const navLinks = [
    { name: "Forge", path: "/dashboard", ariaLabel: "Resume Forge editor" },
    { name: "Job Tracker", path: "/applications", ariaLabel: "Job application tracker" },
    { name: "Analytics", path: "/analytics", ariaLabel: "Application analytics" },
    { name: "Settings", path: "/settings", ariaLabel: "Account settings" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full command-bar">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 mr-8" aria-label="Signet home">
          <SignetMark className="text-nordic-accent" size={32} />
          <span className="text-lg font-normal tracking-tight text-nordic-text">
            Signet
          </span>
        </Link>

        {/* Primary Navigation */}
        <nav className="flex items-center gap-2 h-16" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === "/dashboard" &&
                location.pathname.startsWith("/forge"))

            return (
              <Link
                key={link.name}
                to={link.path}
                aria-label={link.ariaLabel}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center h-full px-4 text-sm font-medium transition-colors rounded-t-md ${
                  isActive
                    ? "text-nordic-text bg-nordic-surface before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-nordic-primary"
                    : "text-nordic-text-secondary hover:text-nordic-text hover:bg-nordic-surface/50"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Secondary Actions / Segmented Control */}
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex items-center bg-nordic-bg rounded-md p-1 border border-nordic-border/50">
            <Link 
              to="/slates" 
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                location.pathname === '/slates' || location.pathname === '/dashboard'
                  ? 'bg-nordic-surface text-nordic-text shadow-sm' 
                  : 'text-nordic-text-secondary hover:text-nordic-text'
              }`}
            >
              Slates
            </Link>
            <Link 
              to="/editor" 
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                location.pathname === '/editor' 
                  ? 'bg-nordic-surface text-nordic-text shadow-sm' 
                  : 'text-nordic-text-secondary hover:text-nordic-text'
              }`}
            >
              Editor
            </Link>
          </div>

          {/* Profile / Actions (Command Cluster) */}
          <div className="flex items-center gap-2 bg-nordic-surface p-1.5 rounded-full border border-nordic-border shadow-sm">
            <NativeNotificationBell />
            {user ? (
              <NordicProfileDropdown
                user={{
                  name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
                  email: user.email ?? "",
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
