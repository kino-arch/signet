import { lazy, Suspense, useEffect } from "react"
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom"
import { NordicNav } from "./layout/NordicNav";
import { NordicHero } from "./components/nordic/NordicHero";
import { FeaturesBento } from "./components/landing/FeaturesBento";
import { SignetShowcase } from "./components/landing/SignetShowcase";
import { Testimonials } from "./components/landing/Testimonials";
import { StatsStrip } from "./components/landing/StatsStrip";
import { TestimonialQuote } from "./components/landing/TestimonialQuote";
import { FAQ } from "./components/landing/FAQ";
import { CallToAction } from "./components/landing/CallToAction";
import { DirectoryFooter } from "./components/landing/DirectoryFooter";
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuthStore } from "@/store/useAuthStore"
import { TooltipProvider } from "@/components/ui/tooltip"
import * as Sentry from "@sentry/react"
import { TRPCProvider } from "@/providers/trpc"
import { Loader2 } from "lucide-react"

// ── Lazy pages ────────────────────────────────────────────────────────────────
const NordicEditorPage = lazy(() =>
  import("@/pages/NordicEditorPage").then((m) => ({ default: m.NordicEditorPage }))
)
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage }))
)
const AtsSpecsPage = lazy(() =>
  import("@/pages/AtsSpecsPage").then((m) => ({ default: m.AtsSpecsPage }))
)
const PrivacyPage = lazy(() =>
  import("@/pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage }))
)
const TermsPage = lazy(() =>
  import("@/pages/TermsPage").then((m) => ({ default: m.TermsPage }))
)
const ApplicationsPage = lazy(() =>
  import("@/pages/ApplicationsPage").then((m) => ({ default: m.ApplicationsPage }))
)
const AnalyticsPage = lazy(() =>
  import("@/pages/AnalyticsPage").then((m) => ({ default: m.AnalyticsPage }))
)
const SettingsPage = lazy(() =>
  import("@/pages/SettingsPage").then((m) => ({ default: m.SettingsPage }))
)
const OnboardingPage = lazy(() =>
  import("@/pages/OnboardingPage").then((m) => ({ default: m.OnboardingPage }))
)
const ForgotPasswordPage = lazy(() =>
  import("@/pages/ForgotPasswordPage").then((m) => ({ default: m.ForgotPasswordPage }))
)

// ── Inline stub pages (replace as Nordic variants are built) ──────────────────
function LandingPage() {
  const { user, loading, onboardingCompleted } = useAuthStore()

  // After Google OAuth, Supabase redirects back to the site root (/).
  // If the user is already authenticated, route them to the right place
  // instead of showing the marketing page.
  useEffect(() => {
    if (!loading && user) {
      if (!onboardingCompleted) {
        window.location.replace("/onboarding")
      } else {
        window.location.replace("/dashboard")
      }
    }
  }, [user, loading, onboardingCompleted])

  // While auth state is resolving after OAuth redirect, show nothing
  // to avoid a flash of the marketing page for authenticated users.
  if (loading || user) return null

  return (
    <div className="flex min-h-screen flex-col bg-nordic-bg font-sans antialiased text-nordic-text selection:bg-nordic-accent selection:text-white">
      <NordicNav />
      <main className="flex-1">
        <NordicHero />
        <FeaturesBento />
        <SignetShowcase />
        <Testimonials />
        <StatsStrip />
        <TestimonialQuote />
        <FAQ />
        <CallToAction />
      </main>
      <DirectoryFooter />
    </div>
  )
}

function DashboardStub() {
  return <NordicEditorPage />
}

function SlatesStub() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-sm text-nordic-text-secondary">Slates — coming soon</p>
    </div>
  )
}

// ── Shared fallback ───────────────────────────────────────────────────────────
const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center bg-nordic-bg">
    <Loader2 className="h-8 w-8 animate-spin text-nordic-accent" />
  </div>
)

// ── Auth guard ────────────────────────────────────────────────────────────────
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes)

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, onboardingCompleted } = useAuthStore()
  const location = useLocation()

  if (loading) {
    return (
      <div
        className="flex h-screen flex-col items-center justify-center gap-3 bg-nordic-bg"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <Loader2 className="h-10 w-10 animate-spin text-nordic-accent" />
        <span className="text-sm text-nordic-text-secondary">Loading…</span>
        <span className="sr-only">Authenticating</span>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  const isOnboarding = location.pathname === "/onboarding"
  const isForge = location.pathname.startsWith("/forge/")

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

// ── App root ──────────────────────────────────────────────────────────────────
export function App() {
  return (
    <TRPCProvider>
      <div className="bg-nordic-bg font-sans text-nordic-text antialiased">
        <TooltipProvider>
          <BrowserRouter>
            <AuthInitializer>
              <Suspense fallback={<LoadingFallback />}>
                <SentryRoutes>
                  {/* Public */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/ats-specs" element={<AtsSpecsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />

                  {/* Protected — dashboard shell */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <DashboardStub />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/slates"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <SlatesStub />
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

                  {/* Editor — /editor (legacy) and /forge/:slateId → NordicEditorPage */}
                  <Route
                    path="/editor"
                    element={
                      <ProtectedRoute>
                        <NordicEditorPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/forge/:slateId"
                    element={
                      <ProtectedRoute>
                        <NordicEditorPage />
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
            </AuthInitializer>
          </BrowserRouter>
        </TooltipProvider>
      </div>
    </TRPCProvider>
  )
}

export default App
