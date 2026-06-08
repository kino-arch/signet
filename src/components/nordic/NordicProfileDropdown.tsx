import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

export function NordicProfileDropdown({
  user,
}: {
  user: { name: string; email: string }
}) {
  const { signOut } = useAuthStore()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Open user menu"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-nordic-text-secondary hover:bg-nordic-surface-hover transition"
        >
          <div className="h-7 w-7 rounded-md bg-nordic-accent-soft flex items-center justify-center">
            <span className="text-xs font-bold text-nordic-accent">
              {user.name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] border border-nordic-border bg-nordic-surface shadow-nordic-lg p-1 z-50 animate-in fade-in zoom-in-95"
          sideOffset={8}
          align="end"
        >
          {/* User identity header */}
          <div className="px-3 py-2.5 border-b border-nordic-border-subtle mb-1">
            <p className="text-sm font-semibold text-nordic-text">{user.name}</p>
            <p className="text-xs text-nordic-text-tertiary mt-0.5">{user.email}</p>
          </div>

          {/* Profile → /settings (profile tab) */}
          <DropdownMenu.Item asChild>
            <Link
              to="/settings"
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-nordic-text-secondary hover:bg-nordic-surface-hover hover:text-nordic-text transition outline-none cursor-pointer"
            >
              <User className="h-4 w-4" /> Profile
            </Link>
          </DropdownMenu.Item>

          {/* Settings → /settings */}
          <DropdownMenu.Item asChild>
            <Link
              to="/settings"
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-nordic-text-secondary hover:bg-nordic-surface-hover hover:text-nordic-text transition outline-none cursor-pointer"
            >
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-nordic-border-subtle" />

          {/* Sign out */}
          <DropdownMenu.Item asChild>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-nordic-error hover:bg-nordic-error/10 hover:text-nordic-error transition outline-none cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
