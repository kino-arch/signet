import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { EditorPage } from "@/pages/EditorPage";
import { LoginPage } from "@/pages/LoginPage";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { AtsSpecsPage } from "@/pages/AtsSpecsPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { TermsPage } from "@/pages/TermsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { SlatesPage } from "@/pages/SlatesPage";
import { ApplicationsPage } from "@/pages/ApplicationsPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useAuthStore } from "@/store/useAuthStore";
import { TooltipProvider } from "@/components/ui/tooltip";

// ProtectedRoute ensures authentication and onboarding are completed before dashboard access
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, onboardingCompleted } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-3 animate-pulse font-heading text-lg font-bold tracking-widest text-primary">
            SIGNET
          </div>
          <p className="text-sm text-muted-foreground">Authenticating…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isOnboarding = location.pathname === "/onboarding";
  const isForge = location.pathname.startsWith("/forge/");

  // Redirect to onboarding if not completed and trying to access other protected routes
  if (!onboardingCompleted && !isOnboarding && !isForge) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { initialize } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initialize();
    return unsubscribe;
  }, [initialize]);

  return <>{children}</>;
}

export function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <TooltipProvider>
        <BrowserRouter>
          <AuthInitializer>
            <Routes>
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
          </Routes>
          </AuthInitializer>
        </BrowserRouter>
      </TooltipProvider>
    </div>
  );
}

export default App;

