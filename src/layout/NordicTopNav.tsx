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
    <header className="sticky top-0 z-40 w-full border-b border-nordic-border bg-nordic-surface/90 backdrop-blur-md">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 mr-8" aria-label="Signet home">
          <SignetMark className="text-nordic-accent" size={24} />
          <span className="text-lg font-semibold tracking-tight text-nordic-text">
            Signet
          </span>
        </Link>

        {/* Primary Navigation */}
        <nav className="flex items-center gap-6" aria-label="Main navigation">
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
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-nordic-text"
                    : "text-nordic-text-secondary hover:text-nordic-text"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Profile / Actions */}
        <div className="ml-auto flex items-center gap-4">
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
    </header>
  )
}
