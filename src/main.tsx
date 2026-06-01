import React from "react"
import ReactDOM from "react-dom"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import * as Sentry from "@sentry/react"
import { useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from "react-router-dom"

Sentry.init({
  dsn: "https://922cd647efc30d02c620426427f831b0@o4511482474201088.ingest.de.sentry.io/4511482493206608",
  tunnel: import.meta.env.VITE_SUPABASE_URL ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sentry-tunnel` : undefined,
  sendDefaultPii: true,
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  tracesSampleRate: 1.0,
  enableLogs: true,
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
