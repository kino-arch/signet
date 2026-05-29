import type { Preview } from "@storybook/react-vite"
import React from "react"
import "../src/index.css"
import { ThemeProvider } from "../src/components/theme-provider"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#090b0c" },
        { name: "light", value: "#ffffff" },
      ],
    },
    a11y: {
      // 'error' - fail on a11y violations in Vitest/CI
      test: "error",
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <div className="min-h-screen bg-background p-6 font-sans text-foreground antialiased">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default preview
