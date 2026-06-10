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
import { ErrorBoundary } from "./components/error-boundary"

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

if (import.meta.env.VITE_SENTRY_ENABLE_LOGS === "true") {
  sentryIntegrations.push(
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] })
  )
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT ?? (isProd ? "production" : "development"),
  release: import.meta.env.VITE_SENTRY_RELEASE,
  tunnel: import.meta.env.VITE_SUPABASE_URL
    ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sentry-tunnel`
    : undefined,
  sendDefaultPii: import.meta.env.VITE_SENTRY_ENABLE_PII === "true",
  integrations: sentryIntegrations,
  tracesSampleRate: isProd ? 1.0 : 0.1,
  enableLogs: import.meta.env.VITE_SENTRY_ENABLE_LOGS === "true",
})

// Nordic design system — single CSS entry point (fonts loaded via CSS @import)
import "./index.css"
import App from "./App.tsx"
import { HelmetProvider } from "react-helmet-async"
import { LazyMotion, domAnimation } from "motion/react"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
  <StrictMode>
    <HelmetProvider>
      <Sentry.ErrorBoundary fallback={<div className="p-8 text-center text-nordic-text bg-nordic-bg h-screen flex items-center justify-center">An unexpected crash occurred.</div>}>
        <ErrorBoundary>
          <LazyMotion features={domAnimation} strict>
            <App />
          </LazyMotion>
        </ErrorBoundary>
      </Sentry.ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
)

// Axe-core accessibility auditing — development only
if (import.meta.env.DEV) {
  import("@axe-core/react").then(({ default: axe }) => {
    axe(React, ReactDOM, 1000)
  })
}
