import { create } from "zustand"

export type ApplicationStatus =
  | "lead"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected"

export interface Application {
  id: string
  company: string
  role: string
  status: ApplicationStatus
  dateAdded: string
  salary?: string
  location?: string
  notes?: string
  url?: string
  jobDescription?: string
  matchScore?: {
    overall_match: number
    gap_analysis: string
    missing_keywords: Array<{ keyword: string; importance: string }>
  }
}

export interface KanbanColumn {
  id: ApplicationStatus
  label: string
  accent: string // tailwind color token for the column accent
}

export const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: "lead", label: "Leads", accent: "#52525B" },          // nordic-text-tertiary
  { id: "applied", label: "Applied", accent: "#3B82F6" },      // nordic-accent
  { id: "interviewing", label: "Interviewing", accent: "#60A5FA" }, // lighter blue
  { id: "offer", label: "Offer", accent: "#22C55E" },           // nordic-success
  { id: "rejected", label: "Rejected", accent: "#EF4444" },     // nordic-error
]

interface TargetMatrixState {
  applications: Application[]
  setApplications: (apps: Application[]) => void
  addApplicationLocal: (app: Application) => void
  updateApplicationLocal: (id: string, patch: Partial<Application>) => void
  moveApplicationLocal: (id: string, newStatus: ApplicationStatus) => void
  deleteApplicationLocal: (id: string) => void
  reorderApplicationsLocal: (status: ApplicationStatus, orderedIds: string[]) => void
}

export const useTargetMatrixStore = create<TargetMatrixState>()((set, get) => ({
  applications: [],

  setApplications: (apps) => {
    set({ applications: apps })
  },

  addApplicationLocal: (app) => {
    set((s) => ({ applications: [...s.applications, app] }))
  },

  updateApplicationLocal: (id, patch) => {
    set((s) => ({
      applications: s.applications.map((a) =>
        a.id === id ? { ...a, ...patch } : a
      ),
    }))
  },

  moveApplicationLocal: (id, newStatus) => {
    set((s) => ({
      applications: s.applications.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      ),
    }))
  },

  deleteApplicationLocal: (id) => {
    set((s) => ({
      applications: s.applications.filter((a) => a.id !== id),
    }))
  },

  reorderApplicationsLocal: (status, orderedIds) => {
    const { applications } = get()
    const others = applications.filter((a) => a.status !== status)
    const inColumn = applications.filter((a) => a.status === status)
    const reordered = orderedIds
      .map((id) => inColumn.find((a) => a.id === id))
      .filter(Boolean) as Application[]
    set({ applications: [...others, ...reordered] })
  },
}))
