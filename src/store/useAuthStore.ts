import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  token_balance: number; // We keep the DB field name as token_balance to avoid DB migrations for now, but UI will show credits.
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
  /** Timestamp (ms) until which fetchProfile must NOT overwrite a local deduction */
  _deductionLockUntil: number | null;
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
  addCredits: (amount: number) => Promise<void>;
  deductCredit: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  loading: true,
  error: null,
  onboardingCompleted: false,
  _deductionLockUntil: null,

  clearError: () => set({ error: null }),

  fetchProfile: async () => {
    const { user, _deductionLockUntil, profile } = get();
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

    // If a credit was deducted locally in the last 60s, protect the local balance.
    // The server balance may still be stale (RPC blocked by CORS / adblocker).
    const isLocked = _deductionLockUntil !== null && Date.now() < _deductionLockUntil;
    if (isLocked && profile) {
      // Keep whichever balance is lower — the local optimistic one
      set({ profile: { ...data, token_balance: Math.min(data.token_balance, profile.token_balance) } });
    } else {
      set({ profile: data, _deductionLockUntil: null });
    }
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

  addCredits: async (amount: number) => {
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
        console.error("Error updating profile credits:", error.message);
      }
    }
  },

  deductCredit: async () => {
    const { user, profile } = get();
    if (!profile || (profile.token_balance || 0) <= 0) return false;
    
    // OPTIMISTIC UPDATE: Deduct locally immediately so the UI reflects the change instantly.
    const nextBalance = (profile.token_balance || 0) - 1;
    // Lock for 60 seconds so that background auth token refreshes cannot
    // overwrite this local deduction with the stale server balance.
    set({
      profile: { ...profile, token_balance: nextBalance },
      _deductionLockUntil: Date.now() + 60_000,
    });

    // For guest users, simulate the deduction locally only
    if (!user || user.id.startsWith("guest_")) {
      return true;
    }

    try {
      // For real users, sync to the server in the background.
      // We use a direct UPDATE instead of an RPC to avoid the RPC not existing.
      const { error } = await supabase
        .from('profiles')
        .update({ token_balance: nextBalance })
        .eq('id', user.id);
      
      if (error) {
        console.error("Network Error deducting credit:", error.message);
        // Local state already updated — lock stays active so refetch won't clobber it
        return true;
      }
      
      // Success: server is now in sync, we can release the lock
      set({ _deductionLockUntil: null });
      return true;
    } catch (err) {
      console.error("Exception in deductCredit:", err);
      return true;
    }
  },
}));
