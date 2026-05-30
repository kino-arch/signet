import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GuildRank = "Foundling" | "Apprentice" | "Journeyman" | "Mandalorian" | "Alor";

export interface RewardsState {
  shields: number;
  lastCheckInDate: string | null;
  hasCompletedIdentityCore: boolean;
  hasForgedFirstSigil: boolean;

  // Actions
  addShields: (amount: number) => void;
  processDailyCheckIn: () => { awarded: boolean; amount: number };
  completeIdentityCore: () => { awarded: boolean; amount: number };
  forgeFirstSigil: () => { awarded: boolean; amount: number };
  getRank: () => GuildRank;
}

const getRankFromShields = (shields: number): GuildRank => {
  if (shields >= 500) return "Alor";
  if (shields >= 250) return "Mandalorian";
  if (shields >= 100) return "Journeyman";
  if (shields >= 25) return "Apprentice";
  return "Foundling";
};

export const useRewardsStore = create<RewardsState>()(
  persist(
    (set, get) => ({
      shields: 0,
      lastCheckInDate: null,
      hasCompletedIdentityCore: false,
      hasForgedFirstSigil: false,

      addShields: (amount) => set((state) => ({ shields: state.shields + amount })),

      processDailyCheckIn: () => {
        const today = new Date().toDateString();
        const { lastCheckInDate, shields } = get();

        if (lastCheckInDate !== today) {
          const rewardAmount = 5;
          set({
            lastCheckInDate: today,
            shields: shields + rewardAmount,
          });
          return { awarded: true, amount: rewardAmount };
        }
        return { awarded: false, amount: 0 };
      },

      completeIdentityCore: () => {
        const { hasCompletedIdentityCore, shields } = get();
        if (!hasCompletedIdentityCore) {
          const rewardAmount = 10;
          set({
            hasCompletedIdentityCore: true,
            shields: shields + rewardAmount,
          });
          return { awarded: true, amount: rewardAmount };
        }
        return { awarded: false, amount: 0 };
      },

      forgeFirstSigil: () => {
        const { hasForgedFirstSigil, shields } = get();
        if (!hasForgedFirstSigil) {
          const rewardAmount = 20;
          set({
            hasForgedFirstSigil: true,
            shields: shields + rewardAmount,
          });
          return { awarded: true, amount: rewardAmount };
        }
        return { awarded: false, amount: 0 };
      },

      getRank: () => getRankFromShields(get().shields),
    }),
    {
      name: "mando-rewards-storage",
    }
  )
);
