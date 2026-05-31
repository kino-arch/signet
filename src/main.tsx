import React from "react"
import ReactDOM from "react-dom"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "https://922cd647efc30d02c620426427f831b0@o4511482474201088.ingest.de.sentry.io/4511482493206608",
  sendDefaultPii: true
});

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </StrictMode>
)

// Axe-core accessibility auditing — development only
if (import.meta.env.DEV) {
  import("@axe-core/react").then(({ default: axe }) => {
    axe(React, ReactDOM, 1000)
  })
}
