import React from "react"
import ReactDOM from "react-dom"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import * as Sentry from "@sentry/react"
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom"

const isProd = import.meta.env.PROD
const sentryIntegrations = [
  Sentry.reactRouterV7BrowserTracingIntegration({
    useEffect: React.useEffect,
    useLocation,
    useNavigationType,
    createRoutesFromChildren,
    matchRoutes,
  }),
]

if (isProd) {
  sentryIntegrations.push(
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] })
  )
}

Sentry.init({
  dsn: "https://922cd647efc30d02c620426427f831b0@o4511482474201088.ingest.de.sentry.io/4511482493206608",
  tunnel: import.meta.env.VITE_SUPABASE_URL
    ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sentry-tunnel`
    : undefined,
  sendDefaultPii: isProd,
  integrations: sentryIntegrations,
  tracesSampleRate: isProd ? 1.0 : 0.1,
  enableLogs: isProd,
})

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { HelmetProvider } from "react-helmet-async"
import { LazyMotion, domAnimation } from "framer-motion"

import { ThemeHydrationGuard } from "@/components/ThemeHydrationGuard"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
  <StrictMode>
    <HelmetProvider>
      <LazyMotion features={domAnimation} strict>
        <ThemeProvider defaultTheme="dark">
          <ThemeHydrationGuard>
            <App />
          </ThemeHydrationGuard>
        </ThemeProvider>
      </LazyMotion>
    </HelmetProvider>
  </StrictMode>
)

// Axe-core accessibility auditing — development only
if (import.meta.env.DEV) {
  import("@axe-core/react").then(({ default: axe }) => {
    axe(React, ReactDOM, 1000)
  })
}
