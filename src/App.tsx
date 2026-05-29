import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { ForgeEditor } from "@/pages/ForgeEditor";
import { LoginPage } from "@/pages/LoginPage";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { AtsSpecsPage } from "@/pages/AtsSpecsPage";
import { useAuthStore } from "@/store/useAuthStore";

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

  // Redirect to onboarding if not completed and trying to access other protected routes
  if (!onboardingCompleted && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // We removed the strict redirect that prevented users from re-visiting the onboarding page 
  // so that the "Test Onboarding" button functions properly.

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
    <main className="font-sans antialiased min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <AuthInitializer>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/ats-specs" element={<AtsSpecsPage />} />
            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <ForgeEditor />
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
    </main>
  );
}

export default App;
