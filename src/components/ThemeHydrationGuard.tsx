import React, { useEffect } from "react"
import { useThemeStore } from "@/store/useThemeStore"

export function ThemeHydrationGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const hasHydrated = useThemeStore((state) => state._hasHydrated)
  const activeThemeId = useThemeStore((state) => state.activeThemeId)
  const setTheme = useThemeStore((state) => state.setTheme)

  useEffect(() => {
    if (hasHydrated) {
      setTheme(activeThemeId) // Re-inject after hydration
    }
  }, [hasHydrated, activeThemeId, setTheme])

  // Before hydration, we return a completely transparent div or children safely
  // Since the inline script in index.html already applied the correct theme variables,
  // rendering children here is actually safe from FOUC because the CSS variables are correct.
  // However, we wait for hydration to ensure React tree doesn't mismatch server if we ever use SSR.
  if (!hasHydrated) {
    // For pure client-side SPA, we can just return null or a loader,
    // but returning children is fine if we aren't doing SSR.
    // If SSR, returning null prevents hydration mismatch.
    return <div className="min-h-safe bg-background" />
  }

  return <>{children}</>
}
