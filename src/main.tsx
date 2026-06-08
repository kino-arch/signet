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

// Nordic Typography Stack
import "@fontsource-variable/syne"
import "@fontsource-variable/schibsted-grotesk"
import "@fontsource-variable/onest"
import "@fontsource-variable/spline-sans-mono"
// Nordic design system — single CSS entry point
import "./index.css"
import App from "./App.tsx"
import { HelmetProvider } from "react-helmet-async"
import { LazyMotion, domAnimation } from "framer-motion"

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
