import { create } from "zustand"
import { persist } from "zustand/middleware"
import { themes } from "@/themes"
import type { ThemeId } from "@/themes"

interface ThemeStore {
  activeThemeId: ThemeId
  setTheme: (id: ThemeId) => void
  _hasHydrated: boolean
  setHasHydrated: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      activeThemeId: "cosmic",
      _hasHydrated: false,
      setTheme: (id: ThemeId) => {
        const theme = themes[id]
        if (!theme || !theme.colors) return

        set({ activeThemeId: id })

        // Dynamic injection of theme variables
        if (typeof window !== "undefined") {
          const root = document.documentElement
          Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(key, value)
          })
          root.setAttribute("data-theme", id)

          // Legacy class-based scoping
          document.body.className = document.body.className.replace(
            /theme-\w+/g,
            ""
          )
          document.body.classList.add(`theme-${id}`)
        }
      },
      setHasHydrated: () => set({ _hasHydrated: true }),
    }),
    {
      name: "signet-theme",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated()
      },
    }
  )
)
