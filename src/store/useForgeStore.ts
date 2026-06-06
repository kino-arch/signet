import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { TargetLockBriefing } from "@/lib/useTargetLock"

interface ForgeState {
  // UI State
  activeTemplate: string
  setActiveTemplate: (template: string) => void

  // Privacy
  persistConsent: boolean
  setPersistConsent: (consent: boolean) => void

  // Target Lock
  targetLockBriefing: TargetLockBriefing | null
  targetLockCompany: string | null
  targetLockJobTitle: string | null
  setTargetLockBriefing: (briefing: TargetLockBriefing | null) => void
  setTargetLockCompany: (
    company: string | null,
    jobTitle?: string | null
  ) => void
  applyTargetLock: () => void
  clearTargetLock: () => void
}

export const useForgeStore = create<ForgeState>()(
  persist(
    (set) => ({
      // UI State
      activeTemplate: "standard",
      setActiveTemplate: (template) => set({ activeTemplate: template }),

      // Privacy
      persistConsent: false,
      setPersistConsent: (consent) => set({ persistConsent: consent }),

      // Target Lock
      targetLockBriefing: null,
      targetLockCompany: null,
      targetLockJobTitle: null,
      setTargetLockBriefing: (briefing) =>
        set({ targetLockBriefing: briefing }),
      setTargetLockCompany: (company, jobTitle) =>
        set({
          targetLockCompany: company,
          targetLockJobTitle: jobTitle || null,
        }),
      applyTargetLock: () => {
        // Target Lock functionality relies on TargetMatrix and AI Client now,
        // but this method is kept for backward compatibility with the TargetLockPanel component.
      },
      clearTargetLock: () =>
        set({
          targetLockBriefing: null,
          targetLockCompany: null,
          targetLockJobTitle: null,
        }),
    }),
    {
      name: "forge-storage",
      partialize: (state) => ({
        activeTemplate: state.activeTemplate,
        persistConsent: state.persistConsent,
      }),
    }
  )
)
