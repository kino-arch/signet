import { create } from "zustand"
import { supabase } from "@/lib/supabase"
import type { User, Session } from "@supabase/supabase-js"
import { logger } from "@/lib/logger"

interface Profile {
  id: string
  credits: number
}

interface OnboardingData {
  role?: string
  [key: string]: unknown
}

interface AuthState {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  error: string | null
  onboardingCompleted: boolean
  /** Timestamp (ms) until which fetchProfile must NOT overwrite local optimistic balance */
  _optimisticLockUntil: number | null
  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  fetchProfile: () => Promise<void>
  initialize: () => () => void // returns unsubscribe function
  completeOnboarding: (data: OnboardingData) => Promise<void>
  clearError: () => void
  signInAsGuest: () => void
  addCredits: (amount: number) => Promise<void>
  addCreditsOptimistic: (amount: number) => void
  deductCredit: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  loading: true,
  error: null,
  onboardingCompleted: false,
  _optimisticLockUntil: null,

  clearError: () => set({ error: null }),

  fetchProfile: async () => {
    const { user, _optimisticLockUntil, profile } = get()
    if (!user) return

    const { data, error } = await supabase
      .from("profiles")
      .select("id, credits")
      .eq("id", user.id)
      .single()

    if (error) {
      logger.error("Error fetching profile:", error.message)
      return
    }

    // If an optimistic update occurred recently, protect the local balance.
    // The server balance may still be stale (e.g. webhook not finished).
    const isLocked =
      _optimisticLockUntil !== null && Date.now() < _optimisticLockUntil
    if (isLocked && profile) {
      // Keep the local optimistic balance
      set({ profile: { ...data, credits: profile.credits } })
    } else {
      set({ profile: data, _optimisticLockUntil: null })
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null })
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Redirect to site root after OAuth — the app's auth listener and
        // ProtectedRoute will handle routing to /dashboard or /onboarding
        // based on the user's onboarding_completed metadata.
        // This avoids needing sub-paths in the Supabase allowed redirect URLs list.
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      set({ loading: false, error: error.message })
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null })
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      set({ loading: false, error: error.message })
      return
    }

    const user = data.user
    const onboardingCompleted = !!user?.user_metadata?.onboarding_completed

    set({
      user: data.user,
      session: data.session,
      loading: false,
      onboardingCompleted: !!onboardingCompleted,
    })
    await get().fetchProfile()
  },

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null })
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      set({ loading: false, error: error.message })
      return
    }

    set({
      user: data.user,
      session: data.session,
      loading: false,
      onboardingCompleted: false,
    })

    if (data.user) {
      await get().fetchProfile()
    }
  },

  signOut: async () => {
    set({ loading: true, error: null })
    await supabase.auth.signOut()
    set({
      user: null,
      session: null,
      profile: null,
      loading: false,
      onboardingCompleted: false,
    })
  },

  initialize: () => {
    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null
      const onboardingCompleted = !!user?.user_metadata?.onboarding_completed
      set({
        session,
        user,
        loading: false,
        onboardingCompleted: !!onboardingCompleted,
      })
      if (session?.user) {
        get().fetchProfile()
      }
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      const onboardingCompleted = !!user?.user_metadata?.onboarding_completed
      set({
        session,
        user,
        loading: false,
        onboardingCompleted: !!onboardingCompleted,
      })
      if (session?.user) {
        get().fetchProfile()
      } else {
        set({ profile: null, onboardingCompleted: false })
      }
    })

    return () => subscription.unsubscribe()
  },

  completeOnboarding: async (onboardingData: OnboardingData) => {
    const { user } = get()
    if (user) {
      // If it's a real Supabase user, update user metadata
      if (!user.id.startsWith("guest_")) {
        const { error } = await supabase.auth.updateUser({
          data: {
            onboarding_completed: true,
            onboarding_data: onboardingData,
          },
        })
        if (error) {
          logger.error("Error updating user metadata:", error.message)
        }
      }
    }
    set({ onboardingCompleted: true })
  },

  signInAsGuest: () => {
    const guestUser = {
      id: "guest_mando_" + Math.random().toString(36).substring(2, 9),
      email: "foundling@guild.org",
      user_metadata: { onboarding_completed: false },
      app_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as unknown as User

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
        credits: 1,
      },
    })
  },

  addCredits: async (amount: number) => {
    const { user, profile } = get()
    if (!profile) return
    const nextBalance = (profile.credits || 0) + amount

    set({
      profile: {
        ...profile,
        credits: nextBalance,
      },
    })

    if (user && !user.id.startsWith("guest_")) {
      const { error } = await supabase
        .from("profiles")
        .update({ credits: nextBalance })
        .eq("id", user.id)
      if (error) {
        logger.error("Error updating profile credits:", error.message)
      }
    }
  },

  addCreditsOptimistic: (amount: number) => {
    const { profile } = get()
    if (!profile) return
    const nextBalance = (profile.credits || 0) + amount

    set({
      profile: {
        ...profile,
        credits: nextBalance,
      },
      // Lock for 15 seconds to give the Stripe webhook time to process
      _optimisticLockUntil: Date.now() + 15_000,
    })
  },

  deductCredit: async () => {
    const { user, profile } = get()
    if (!profile || (profile.credits || 0) <= 0) return false

    // OPTIMISTIC UPDATE: Deduct locally immediately so the UI reflects the change instantly.
    const nextBalance = (profile.credits || 0) - 1
    // Lock for 15 seconds so that background auth token refreshes cannot
    // overwrite this local deduction with the stale server balance.
    set({
      profile: { ...profile, credits: nextBalance },
      _optimisticLockUntil: Date.now() + 15_000,
    })

    // For guest users, simulate the deduction locally only
    if (!user || user.id.startsWith("guest_")) {
      return true
    }

    try {
      // For real users, sync to the server in the background.
      // We use a direct UPDATE instead of an RPC to avoid the RPC not existing.
      const { error } = await supabase
        .from("profiles")
        .update({ credits: nextBalance })
        .eq("id", user.id)

      if (error) {
        logger.error("Network Error deducting credit:", error.message)
        // Local state already updated — lock stays active so refetch won't clobber it
        return true
      }

      // Success: server is now in sync, we can release the lock
      set({ _optimisticLockUntil: null })
      return true
    } catch (err) {
      logger.error("Exception in deductCredit:", err)
      return true
    }
  },
}))
