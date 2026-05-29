import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  token_balance: number;
}

interface OnboardingData {
  role?: string;
  [key: string]: unknown;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  onboardingCompleted: boolean;
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  initialize: () => () => void; // returns unsubscribe function
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  clearError: () => void;
  signInAsGuest: () => void;
  addTokens: (amount: number) => Promise<void>;
  deductToken: () => Promise<boolean>;
  verifyStripeSession: (sessionId: string) => Promise<{ success: boolean; tokens: number }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  loading: true,
  error: null,
  onboardingCompleted: false,

  clearError: () => set({ error: null }),

  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("id, token_balance")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
      return;
    }

    set({ profile: data });
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/editor",
      },
    });

    if (error) {
      set({ loading: false, error: error.message });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ loading: false, error: error.message });
      return;
    }

    const user = data.user;
    const onboardingCompleted = user?.user_metadata?.onboarding_completed || 
                                (user && localStorage.getItem(`onboarding_completed_${user.id}`) === "true") || 
                                false;

    set({ 
      user: data.user, 
      session: data.session, 
      loading: false,
      onboardingCompleted: !!onboardingCompleted
    });
    await get().fetchProfile();
  },

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      set({ loading: false, error: error.message });
      return;
    }

    set({ 
      user: data.user, 
      session: data.session, 
      loading: false,
      onboardingCompleted: false
    });

    if (data.user) {
      await get().fetchProfile();
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    await supabase.auth.signOut();
    set({ user: null, session: null, profile: null, loading: false, onboardingCompleted: false });
  },

  initialize: () => {
    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      const onboardingCompleted = user?.user_metadata?.onboarding_completed || 
                                  (user && localStorage.getItem(`onboarding_completed_${user.id}`) === "true") || 
                                  false;
      set({
        session,
        user,
        loading: false,
        onboardingCompleted: !!onboardingCompleted,
      });
      if (session?.user) {
        get().fetchProfile();
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      const onboardingCompleted = user?.user_metadata?.onboarding_completed || 
                                  (user && localStorage.getItem(`onboarding_completed_${user.id}`) === "true") || 
                                  false;
      set({
        session,
        user,
        loading: false,
        onboardingCompleted: !!onboardingCompleted,
      });
      if (session?.user) {
        get().fetchProfile();
      } else {
        set({ profile: null, onboardingCompleted: false });
      }
    });

    return () => subscription.unsubscribe();
  },

  completeOnboarding: async (onboardingData: OnboardingData) => {
    const { user } = get();
    if (user) {
      // If it's a real Supabase user, update user metadata
      if (!user.id.startsWith("guest_")) {
        const { error } = await supabase.auth.updateUser({
          data: {
            onboarding_completed: true,
            onboarding_data: onboardingData,
          },
        });
        if (error) {
          console.error("Error updating user metadata:", error.message);
        }
      }
      localStorage.setItem(`onboarding_completed_${user.id}`, "true");
    }
    set({ onboardingCompleted: true });
  },

  signInAsGuest: () => {
    const guestUser = {
      id: "guest_mando_" + Math.random().toString(36).substring(2, 9),
      email: "foundling@guild.org",
      user_metadata: { onboarding_completed: false },
      app_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as unknown as User;
    
    set({
      user: guestUser,
      session: {
        access_token: "mock-token",
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "mock-refresh-token",
        user: guestUser,
      } as unknown as Session,
      loading: false,
      onboardingCompleted: false,
      profile: {
        id: guestUser.id,
        token_balance: 1,
      },
    });
  },

  addTokens: async (amount: number) => {
    const { user, profile } = get();
    if (!profile) return;
    const nextBalance = (profile.token_balance || 0) + amount;
    
    set({
      profile: {
        ...profile,
        token_balance: nextBalance,
      },
    });

    if (user && !user.id.startsWith("guest_")) {
      const { error } = await supabase
        .from("profiles")
        .update({ token_balance: nextBalance })
        .eq("id", user.id);
      if (error) {
        console.error("Error updating profile tokens:", error.message);
      }
    }
  },

  deductToken: async () => {
    const { user, profile } = get();
    if (!profile || (profile.token_balance || 0) <= 0) return false;
    
    // For guest users, simulate the deduction locally
    if (!user || user.id.startsWith("guest_")) {
      const nextBalance = (profile.token_balance || 0) - 1;
      set({
        profile: {
          ...profile,
          token_balance: nextBalance,
        },
      });
      return true;
    }

    // For real users, use a server-authoritative RPC
    const { error } = await supabase.rpc('deduct_token');
    
    if (error) {
      console.error("Error deducting token:", error.message);
      return false;
    }
    
    // Refetch profile to get the authoritative balance
    await get().fetchProfile();
    return true;
  },

  verifyStripeSession: async (sessionId: string) => {
    const { user, profile } = get();
    if (!user) return { success: false, tokens: 0 };

    try {
      const stripeSecret = import.meta.env.VITE_STRIPE_SECRET_KEY;
      const { data, error } = await supabase.functions.invoke("verify-stripe-session", {
        body: {
          sessionId,
          userId: user.id,
        },
        headers: {
          "x-stripe-secret-key": stripeSecret,
        },
      });

      if (error || !data || !data.success) {
        console.error("Error verifying Stripe session:", error || data?.error);
        return { success: false, tokens: 0 };
      }

      // Sync profile state
      if (profile) {
        set({
          profile: {
            ...profile,
            token_balance: data.balance,
          },
        });
      }

      return { success: true, tokens: data.tokensCredited };
    } catch (e) {
      console.error("Failed to verify session:", e);
      return { success: false, tokens: 0 };
    }
  },
}));
