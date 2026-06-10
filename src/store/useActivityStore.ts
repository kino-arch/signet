import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ActivityType = "enhancement" | "target" | "ats" | "alert"

export interface ActivityItem {
  id: string
  type: ActivityType
  label: string
  timestamp: number
}

interface ActivityState {
  activities: ActivityItem[]
  addActivity: (activity: Omit<ActivityItem, "id" | "timestamp">) => void
  clearActivities: () => void
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activities: [],
      addActivity: (activity) =>
        set((state) => ({
          activities: [
            {
              ...activity,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
            ...state.activities,
          ].slice(0, 50), // Keep last 50 activities
        })),
      clearActivities: () => set({ activities: [] }),
    }),
    {
      name: "signet:activity",
    }
  )
)
