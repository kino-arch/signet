
import { ProfileDropdown } from "@/components/ui/profile-dropdown"

export function TopNav({ className }: { className?: string }) {
  return (
    <header className={className}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm tracking-widest text-cyan-400">SYSTEM / STATUS: ONLINE</span>
      </div>
      <div className="flex items-center gap-4">
        <ProfileDropdown />
      </div>
    </header>
  )
}
