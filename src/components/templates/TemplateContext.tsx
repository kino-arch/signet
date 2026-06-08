import React, { createContext, useContext } from "react"

export type TemplateTheme = "light" | "dark"

export const templateTokens = {
  light: {
    pageBg: "var(--color-nordic-text)",
    textPrimary: "var(--color-nordic-surface)",
    textSecondary: "var(--color-nordic-text-tertiary)",
    accent: "var(--color-nordic-accent-hover)",
    border: "var(--color-nordic-border)",
  },
  dark: {
    pageBg: "var(--color-nordic-surface-hover)",
    textPrimary: "var(--color-nordic-text)",
    textSecondary: "var(--color-nordic-text-secondary)",
    accent: "var(--color-nordic-accent)",
    border: "var(--color-nordic-surface-hover)",
  },
}

const TemplateContext = createContext<{
  theme: TemplateTheme
  colors: typeof templateTokens.light
}>({
  theme: "light",
  colors: templateTokens.light,
})

export function TemplateProvider({
  theme = "light",
  children,
}: {
  theme?: TemplateTheme
  children: React.ReactNode
}) {
  const colors = templateTokens[theme]
  return (
    <TemplateContext.Provider value={{ theme, colors }}>
      {children}
    </TemplateContext.Provider>
  )
}

export function useTemplateTheme() {
  return useContext(TemplateContext)
}
