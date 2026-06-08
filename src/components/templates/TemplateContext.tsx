import React, { createContext, useContext } from "react"

export type TemplateTheme = "light" | "dark"

export const templateTokens = {
  light: {
    pageBg: "#FFFFFF",
    textPrimary: "#18181B",
    textSecondary: "#52525B",
    accent: "#2563EB",
    border: "#E4E4E7",
  },
  dark: {
    pageBg: "#0F172A",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    accent: "#3B82F6",
    border: "#1E293B",
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
