import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const ThemeProviderContext = createContext<{
  theme: "dark"
  setTheme: (theme: Theme) => void
}>({
  theme: "dark",
  setTheme: () => {}, // Intentionally no-op
})

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme] = useState<"dark">("dark")

  useEffect(() => {
    const root = window.document.documentElement

    // Remove any lingering light classes from previous sessions
    root.classList.remove("light")
    root.classList.add("dark")
    root.setAttribute("data-theme", "dark")

    // Clear any stored light preference to prevent future confusion
    localStorage.removeItem(storageKey)

    // Disable the "D" keyboard shortcut entirely
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "d" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        // Check if user is in an editable field
        const target = e.target as HTMLElement
        const isEditable =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.contentEditable === "true" ||
          target.getAttribute("role") === "textbox"

        if (!isEditable) {
          e.preventDefault()
          // We can optionally show a toast here later
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [storageKey])

  return (
    <ThemeProviderContext.Provider
      value={{ theme, setTheme: () => {} }}
      {...props}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
