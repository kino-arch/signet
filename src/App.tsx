import { lazy, Suspense, useEffect } from "react"
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom"
const LandingPage = lazy(() => import("@/pages/LandingPage").then(module => ({ default: module.LandingPage })))
const LoginPage = lazy(() => import("@/pages/LoginPage").then(module => ({ default: module.LoginPage })))
const AtsSpecsPage = lazy(() => import("@/pages/AtsSpecsPage").then(module => ({ default: module.AtsSpecsPage })))
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage").then(module => ({ default: module.PrivacyPage })))
const TermsPage = lazy(() => import("@/pages/TermsPage").then(module => ({ default: module.TermsPage })))

// Heavy dynamic routes are lazy-loaded to prevent bundle leaks into the landing page
const EditorPage = lazy(() => import("@/pages/EditorPage").then(module => ({ default: module.NewEditorPage })))
const DashboardPage = lazy(() => import("@/pages/DashboardPage").then(module => ({ default: module.DashboardPage })))
const SlatesPage = lazy(() => import("@/pages/SlatesPage").then(module => ({ default: module.SlatesPage })))
const ApplicationsPage = lazy(() => import("@/pages/ApplicationsPage").then(module => ({ default: module.ApplicationsPage })))
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage").then(module => ({ default: module.AnalyticsPage })))
const SettingsPage = lazy(() => import("@/pages/SettingsPage").then(module => ({ default: module.SettingsPage })))
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage").then(module => ({ default: module.OnboardingPage })))
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuthStore } from "@/store/useAuthStore"
import { TooltipProvider } from "@/components/ui/tooltip"
import * as Sentry from "@sentry/react"
import { TRPCProvider } from "@/providers/trpc"
import { GravityWell } from "@/components/animate-ui/gravity-well"
import { Loader2 } from "lucide-react"

import { LivingBackground } from "@/components/reactivity/LivingBackground"
import { useInteractionTracker } from "@/hooks/useInteractionTracker"

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes)

function InteractionEngine() {
  useInteractionTracker()
  return <LivingBackground />
}

import { ThemeProvider } from "@/components/system/ThemeProvider"

// ProtectedRoute ensures authentication and onboarding are completed before dashboard access
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, onboardingCompleted } = useAuthStore()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div
          className="flex flex-col items-center text-center"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2 className="mb-2 h-12 w-12 animate-spin text-primary opacity-80" />
          <div className="animate-pulse font-heading text-lg font-bold tracking-widest text-primary">
            SIGNET
          </div>
          <span className="sr-only">Authenticating...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const isOnboarding = location.pathname === "/onboarding"
  const isForge = location.pathname.startsWith("/forge/")

  // Redirect to onboarding if not completed and trying to access other protected routes
  if (!onboardingCompleted && !isOnboarding && !isForge) {
    return <Navigate to="/onboarding" replace />
  }

  return <>{children}</>
}

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { initialize } = useAuthStore()

  useEffect(() => {
    const unsubscribe = initialize()
    return unsubscribe
  }, [initialize])

  return <>{children}</>
}

export function App() {
  return (
    <TRPCProvider>
      <div className="bg-background font-sans text-foreground antialiased">
        <GravityWell />
        <InteractionEngine />
        <TooltipProvider>
          <BrowserRouter>
            <AuthInitializer>
              <ThemeProvider>
                <Suspense fallback={
                  <div className="flex h-screen items-center justify-center bg-background">
                    <div className="animate-pulse font-heading text-lg font-bold tracking-widest text-primary">SIGNET</div>
                  </div>
                }>
                <SentryRoutes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/ats-specs" element={<AtsSpecsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardPage />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/slates"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <SlatesPage />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/applications"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <ApplicationsPage />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <AnalyticsPage />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <SettingsPage />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  {/* Legacy editor route — kept for backward compatibility */}
                  <Route
                    path="/editor"
                    element={
                      <ProtectedRoute>
                        <EditorPage />
                      </ProtectedRoute>
                    }
                  />
                  {/* Primary dynamic forge route — /forge/:slateId */}
                  <Route
                    path="/forge/:slateId"
                    element={
                      <ProtectedRoute>
                        <EditorPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/onboarding"
                    element={
                      <ProtectedRoute>
                        <OnboardingPage />
                      </ProtectedRoute>
                    }
                  />
                </SentryRoutes>
              </Suspense>
              </ThemeProvider>
            </AuthInitializer>
          </BrowserRouter>
        </TooltipProvider>
      </div>
    </TRPCProvider>
  )
}

export default App
