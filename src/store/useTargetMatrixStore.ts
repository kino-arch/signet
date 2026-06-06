import { create } from "zustand"
import { persist } from "zustand/middleware"

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
  { id: "lead", label: "Leads", accent: "hsl(var(--muted-foreground))" },
  { id: "applied", label: "Applied", accent: "hsl(var(--primary))" },
  { id: "interviewing", label: "Interviewing", accent: "hsl(var(--chart-2))" },
  { id: "offer", label: "Offer", accent: "hsl(var(--chart-4))" },
  { id: "rejected", label: "Rejected", accent: "hsl(var(--destructive))" },
]

const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    company: "Meridian Labs",
    role: "Senior Frontend Engineer",
    status: "applied",
    dateAdded: new Date().toISOString(),
    salary: "$160k – $180k",
    location: "Remote",
  },
  {
    id: "app-2",
    company: "Nexus Dynamics",
    role: "Staff React Developer",
    status: "interviewing",
    dateAdded: new Date().toISOString(),
    salary: "$190k",
    location: "San Francisco, CA",
  },
  {
    id: "app-3",
    company: "Vault Systems",
    role: "Principal UI Engineer",
    status: "lead",
    dateAdded: new Date().toISOString(),
    location: "Remote",
  },
  {
    id: "app-4",
    company: "Cipher Corp",
    role: "Frontend Tech Lead",
    status: "offer",
    dateAdded: new Date().toISOString(),
    salary: "$210k",
    location: "Austin, TX",
  },
]

interface TargetMatrixState {
  applications: Application[]
  addApplication: (app: Omit<Application, "id" | "dateAdded">) => void
  updateApplication: (id: string, patch: Partial<Application>) => void
  moveApplication: (id: string, newStatus: ApplicationStatus) => void
  deleteApplication: (id: string) => void
  reorderApplications: (status: ApplicationStatus, orderedIds: string[]) => void
}

export const useTargetMatrixStore = create<TargetMatrixState>()(
  persist(
    (set, get) => ({
      applications: MOCK_APPLICATIONS,

      addApplication: (app) => {
        const newApp: Application = {
          ...app,
          id: `app-${Date.now()}`,
          dateAdded: new Date().toISOString(),
        }
        set((s) => ({ applications: [...s.applications, newApp] }))
      },

      updateApplication: (id, patch) => {
        set((s) => ({
          applications: s.applications.map((a) =>
            a.id === id ? { ...a, ...patch } : a
          ),
        }))
      },

      moveApplication: (id, newStatus) => {
        set((s) => ({
          applications: s.applications.map((a) =>
            a.id === id ? { ...a, status: newStatus } : a
          ),
        }))
      },

      deleteApplication: (id) => {
        set((s) => ({
          applications: s.applications.filter((a) => a.id !== id),
        }))
      },

      reorderApplications: (status, orderedIds) => {
        const { applications } = get()
        const others = applications.filter((a) => a.status !== status)
        const inColumn = applications.filter((a) => a.status === status)
        const reordered = orderedIds
          .map((id) => inColumn.find((a) => a.id === id))
          .filter(Boolean) as Application[]
        set({ applications: [...others, ...reordered] })
      },
    }),
    {
      name: "signet-target-matrix",
    }
  )
)
