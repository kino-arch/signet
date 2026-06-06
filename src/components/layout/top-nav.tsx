import { cn } from "@/lib/utils"
import { ProfileDropdown } from "@/components/ui/profile-dropdown"

export function TopNav({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        className,
        "relative after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-primary/30 after:to-transparent"
      )}
    >
      <div className="flex items-center gap-4">
        <span className="glow-text font-mono text-sm tracking-widest text-primary">
          SYSTEM / STATUS: ONLINE
        </span>
      </div>
      <div className="flex items-center gap-2">
        <ProfileDropdown />
      </div>
    </header>
  )
}
