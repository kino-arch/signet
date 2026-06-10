import React from "react"
import { Link } from "react-router-dom"
import { Target, Zap, SlidersHorizontal, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"


import { useForgeStore } from "@/store/useForgeStore"

interface SiteHeaderProps {
  /** Breadcrumb trail: array of { label, href? } */
  crumbs?: Array<{ label: string; href?: string }>
}

/**
 * Dashboard site header — command breadcrumb + primary actions.
 * Mirrors the dashboard-01 SiteHeader pattern but wired to Signet data.
 */
export function SiteHeader({ crumbs }: SiteHeaderProps) {
  const company = useForgeStore((s) => s.targetLockCompany)
  const jobTitle = useForgeStore((s) => s.targetLockJobTitle)

  const defaultCrumbs = [
    { label: "Slates", href: "/slates" },
    ...(company ? [{ label: `${company}${jobTitle ? ` / ${jobTitle}` : ""}` }] : []),
  ]

  const trail = crumbs ?? defaultCrumbs

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-sidebar-border bg-nordic-surface px-4 lg:px-6 z-30 relative">
      {/* Breadcrumb trail */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm min-w-0 flex-1">
        {trail.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-nordic-text-tertiary mx-1 shrink-0" />
            )}
            {crumb.href ? (
              <Link
                to={crumb.href}
                className="text-nordic-text-secondary hover:text-nordic-text transition-colors truncate"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-nordic-text font-medium truncate">
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {company ? (
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium">
            <Target className="w-3 h-3 shrink-0" />
            <span className="truncate max-w-[120px]">{company}</span>
          </div>
        ) : null}

        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-1.5"
          asChild
        >
          <Link to="/editor">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Editor</span>
          </Link>
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8" title="AI Quick Actions (⌘K)">
          <Zap className="w-3.5 h-3.5 text-nordic-accent" />
          <span className="sr-only">AI Quick Actions</span>
        </Button>
      </div>
    </header>
  )
}
