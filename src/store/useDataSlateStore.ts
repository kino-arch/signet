import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { vanillaTrpc } from "@/providers/trpc";
import { LooseSnapshotSchema } from "@/lib/db-validators";
import { useThemeStore } from "@/store/useThemeStore";

export type SyncState = "IDLE" | "SYNCING..." | "SECURED" | "ERROR";

// ─── JSON Resume Standard Types ──────────────────────────────────────────────
export interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: {
    city: string;
    countryCode: string;
    region: string;
  };
  profiles: Array<{ network: string; url: string; username: string }>;
}

export interface WorkEntry {
  id: string; // internal DnD key — stripped on DB write
  name: string;        // company
  position: string;    // role title
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  ghostBullets?: import("@/lib/ghost-schema").GhostBullet[];
  ai_proposal?: any;          // volatile — never persisted to DB
  ai_loading?: boolean;       // streaming in progress
}

export interface SkillEntry {
  id: string; // internal DnD key
  name: string;
  level: string;
  keywords: string[];
}

export interface EducationEntry {
  id: string; // internal DnD key
  institution: string;
  area: string;       // field of study
  studyType: string;  // degree type
  startDate: string;
  endDate: string;
  score: string;
}

export interface CertificationEntry {
  id: string; // internal DnD key
  name: string;
  issuer: string;
  date: string;
  url: string;
}

// ─── Store Interface ──────────────────────────────────────────────────────────
interface DataSlateStore {
  activeSlateId: string | null;
  syncState: SyncState;
  isDragging: boolean;
  /** True while initializeSlate is fetching — used for loading UI */
  isHydrating: boolean;
  /** Non-null if initializeSlate failed ownership/existence check */
  hydrationError: string | null;
  /** True if there are local mutations not yet flushed to Postgres */
  hasPendingMutations: boolean;
  basics: Basics;
  work: WorkEntry[];
  skills: SkillEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];

  setBasics: (updates: Partial<Basics>) => void;
  setSyncPaused: (paused: boolean) => void;

  // Mission History (work) actions
  addWorkEntry: () => void;
  removeWorkEntry: (id: string) => void;
  updateWorkEntry: (id: string, updates: Partial<Omit<WorkEntry, "id">>) => void;
  reorderWorkEntries: (activeId: string, overId: string) => void;
  // AI Proposal actions
  setAiProposal: (id: string, text: any) => void;
  setAiLoading: (id: string, loading: boolean) => void;
  acceptProposal: (id: string) => void;
  discardProposal: (id: string) => void;

  // Core Competencies (skills) actions
  addSkillEntry: () => void;
  addSkillEntryWithData: (name: string, keywords: string[]) => void;
  removeSkillEntry: (id: string) => void;
  updateSkillEntry: (id: string, updates: Partial<Omit<SkillEntry, "id">>) => void;
  reorderSkillEntries: (activeId: string, overId: string) => void;

  // Education actions
  addEducationEntry: () => void;
  removeEducationEntry: (id: string) => void;
  updateEducationEntry: (id: string, updates: Partial<Omit<EducationEntry, "id">>) => void;
  reorderEducationEntries: (activeId: string, overId: string) => void;

  // Certification actions
  addCertificationEntry: () => void;
  removeCertificationEntry: (id: string) => void;
  updateCertificationEntry: (id: string, updates: Partial<Omit<CertificationEntry, "id">>) => void;
  reorderCertificationEntries: (activeId: string, overId: string) => void;

  // Lifecycle
  initializeSlate: (slateId: string) => Promise<void>;
  createDefaultSlate: () => Promise<string | null>;
  createNewSlate: () => Promise<string | null>;
  saveSnapshot: (type?: "draft" | "publish") => Promise<void>;
  baseVersion: number;
  /** Emergency flush — called on beforeunload to drain all pending debounces */
  flushAllPending: () => void;
}

// ─── UUID Generator ───────────────────────────────────────────────────────────
const uuid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);

// ─── UUID v4 Format Validator ─────────────────────────────────────────────────
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isValidUUID = (s: string) => UUID_RE.test(s);

// ─── Array Swap Utility ───────────────────────────────────────────────────────
function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...arr];
  const [moved] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, moved);
  return result;
}

// ─── Session Freshness Guard ──────────────────────────────────────────────────
// Transparently refreshes the Supabase session if the JWT is stale.
// Returns false if the session is irrecoverable (user must re-authenticate).
async function ensureFreshSession(): Promise<boolean> {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return false;

  // Supabase JS v2 auto-refreshes tokens when calling getSession(),
  // but we verify the access_token expiry as an extra safety net.
  const exp = session.expires_at; // unix seconds
  if (exp && exp * 1000 < Date.now() + 30_000) {
    // Token expires within 30s — force refresh
    const { error: refreshErr } = await supabase.auth.refreshSession();
    if (refreshErr) {
      console.error("Session refresh failed:", refreshErr.message);
      return false;
    }
  }
  return true;
}

// ─── Volatile Field Stripper ──────────────────────────────────────────────────
// Removes internal DnD IDs and ephemeral AI state before DB writes.
function stripVolatileFields<T extends Record<string, unknown>>(
  entries: T[]
): Omit<T, "id" | "ai_proposal" | "ai_loading">[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return entries.map(({ id: _id, ai_proposal: _ap, ai_loading: _al, ...rest }) => rest) as unknown as Omit<T, "id" | "ai_proposal" | "ai_loading">[];
}

// ─── Store Factory ────────────────────────────────────────────────────────────
export const useDataSlateStore = create<DataSlateStore>((set, get) => {
  let syncPaused = false;
  // Track which sections have pending debounced writes
  let globalDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  const scheduleSync = (_sectionType?: string) => {
    if (syncPaused) return;
    set({ syncState: "SYNCING...", hasPendingMutations: true });

    if (globalDebounceTimer) clearTimeout(globalDebounceTimer);
    globalDebounceTimer = setTimeout(() => {
      get().saveSnapshot('draft');
    }, 2000);
  };

  return {
    activeSlateId: null,
    baseVersion: 0,
    syncState: "IDLE",
    isDragging: false,
    isHydrating: false,
    hydrationError: null,
    hasPendingMutations: false,
    basics: {
      name: "",
      label: "",
      email: "",
      phone: "",
      url: "",
      summary: "",
      location: { city: "", countryCode: "", region: "" },
      profiles: [],
    },
    work: [],
    skills: [],
    education: [],
    certifications: [],

    setSyncPaused: (paused) => {
      syncPaused = paused;
      set({ isDragging: paused });
    },

    // ── Basics ───────────────────────────────────────────────────────────────
    setBasics: (updates) => {
      set((state) => ({ basics: { ...state.basics, ...updates } }));
      scheduleSync("basics");
    },

    // ── Work Entries ──────────────────────────────────────────────────────────
    addWorkEntry: () => {
      const blank: WorkEntry = {
        id: uuid(),
        name: "",
        position: "",
        url: "",
        startDate: "",
        endDate: "",
        summary: "",
        highlights: [],
      };
      set((state) => ({ work: [...state.work, blank] }));
      scheduleSync("work");
    },

    removeWorkEntry: (id) => {
      set((state) => ({ work: state.work.filter((e) => e.id !== id) }));
      scheduleSync("work");
    },

    updateWorkEntry: (id, updates) => {
      set((state) => ({
        work: state.work.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      }));
      scheduleSync("work");
    },

    reorderWorkEntries: (activeId, overId) => {
      const { work } = get();
      const fromIndex = work.findIndex((e) => e.id === activeId);
      const toIndex = work.findIndex((e) => e.id === overId);
      if (fromIndex === -1 || toIndex === -1) return;
      set({ work: arrayMove(work, fromIndex, toIndex) });
      scheduleSync("work");
    },

    setAiLoading: (id, loading) => {
      set((state) => ({
        work: state.work.map((e) =>
          e.id === id ? { ...e, ai_loading: loading, ai_proposal: loading ? "" : e.ai_proposal } : e
        ),
      }));
    },

    setAiProposal: (id, text) => {
      set((state) => ({
        work: state.work.map((e) =>
          e.id === id ? { ...e, ai_proposal: text } : e
        ),
      }));
    },

    acceptProposal: (id) => {
      set((state) => ({
        work: state.work.map((e) =>
          e.id === id
            ? { ...e, summary: e.ai_proposal ?? e.summary, ai_proposal: undefined, ai_loading: false }
            : e
        ),
      }));
      scheduleSync("work");
    },

    discardProposal: (id) => {
      set((state) => ({
        work: state.work.map((e) =>
          e.id === id ? { ...e, ai_proposal: undefined, ai_loading: false } : e
        ),
      }));
    },

    // ── Skill Entries ─────────────────────────────────────────────────────────
    addSkillEntry: () => {
      const blank: SkillEntry = {
        id: uuid(),
        name: "",
        level: "",
        keywords: [],
      };
      set((state) => ({ skills: [...state.skills, blank] }));
      scheduleSync("skills");
    },

    addSkillEntryWithData: (name, keywords) => {
      const entry: SkillEntry = {
        id: uuid(),
        name,
        level: "",
        keywords,
      };
      set((state) => ({ skills: [...state.skills, entry] }));
      scheduleSync("skills");
    },

    removeSkillEntry: (id) => {
      set((state) => ({ skills: state.skills.filter((e) => e.id !== id) }));
      scheduleSync("skills");
    },

    updateSkillEntry: (id, updates) => {
      set((state) => ({
        skills: state.skills.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      }));
      scheduleSync("skills");
    },

    reorderSkillEntries: (activeId, overId) => {
      const { skills } = get();
      const fromIndex = skills.findIndex((e) => e.id === activeId);
      const toIndex = skills.findIndex((e) => e.id === overId);
      if (fromIndex === -1 || toIndex === -1) return;
      set({ skills: arrayMove(skills, fromIndex, toIndex) });
      scheduleSync("skills");
    },

    // ── Education Entries ──────────────────────────────────────────────────────
    addEducationEntry: () => {
      const blank: EducationEntry = {
        id: uuid(),
        institution: "",
        area: "",
        studyType: "",
        startDate: "",
        endDate: "",
        score: "",
      };
      set((state) => ({ education: [...state.education, blank] }));
      scheduleSync("education");
    },

    removeEducationEntry: (id) => {
      set((state) => ({ education: state.education.filter((e) => e.id !== id) }));
      scheduleSync("education");
    },

    updateEducationEntry: (id, updates) => {
      set((state) => ({
        education: state.education.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      }));
      scheduleSync("education");
    },

    reorderEducationEntries: (activeId, overId) => {
      const { education } = get();
      const fromIndex = education.findIndex((e) => e.id === activeId);
      const toIndex = education.findIndex((e) => e.id === overId);
      if (fromIndex === -1 || toIndex === -1) return;
      set({ education: arrayMove(education, fromIndex, toIndex) });
      scheduleSync("education");
    },

    // ── Certification Entries ──────────────────────────────────────────────────
    addCertificationEntry: () => {
      const blank: CertificationEntry = {
        id: uuid(),
        name: "",
        issuer: "",
        date: "",
        url: "",
      };
      set((state) => ({ certifications: [...state.certifications, blank] }));
      scheduleSync("certifications");
    },

    removeCertificationEntry: (id) => {
      set((state) => ({ certifications: state.certifications.filter((e) => e.id !== id) }));
      scheduleSync("certifications");
    },

    updateCertificationEntry: (id, updates) => {
      set((state) => ({
        certifications: state.certifications.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      }));
      scheduleSync("certifications");
    },

    reorderCertificationEntries: (activeId, overId) => {
      const { certifications } = get();
      const fromIndex = certifications.findIndex((e) => e.id === activeId);
      const toIndex = certifications.findIndex((e) => e.id === overId);
      if (fromIndex === -1 || toIndex === -1) return;
      set({ certifications: arrayMove(certifications, fromIndex, toIndex) });
      scheduleSync("certifications");
    },

    // ── Sync (Hardened) ──────────────────────────────────────────────────────
    saveSnapshot: async (type = 'draft') => {
      const state = get()
      if (!state.activeSlateId) return

      // Vector 3 Defense
      const sessionAlive = await ensureFreshSession()
      if (!sessionAlive) {
        set({ syncState: "ERROR" })
        return
      }

      set({ syncState: "SYNCING..." })

      // Assemble payload
      const payload = {
        version: state.baseVersion,
        basics: state.basics,
        work: stripVolatileFields(state.work as any),
        skills: stripVolatileFields(state.skills as any),
        education: stripVolatileFields(state.education as any),
        certifications: stripVolatileFields(state.certifications as any),
        theme: useThemeStore.getState().activeThemeId || "cosmic"
      }

      const parsed = LooseSnapshotSchema.safeParse(payload)
      if (!parsed.success) {
        console.error("Zod Validation Failed", parsed.error)
        set({ syncState: "ERROR" })
        return
      }

      try {
        const res = await vanillaTrpc.slate.saveSnapshot.mutate({
          slateId: state.activeSlateId,
          snapshot: parsed.data,
          type,
          baseVersion: state.baseVersion
        })

        if (res.success) {
          set({ syncState: "SECURED", baseVersion: res.version, hasPendingMutations: false })
          setTimeout(() => {
            if (get().syncState === "SECURED") set({ syncState: "IDLE" })
          }, 2000)
        }
      } catch (err: any) {
        if (err.message?.includes('CONFLICT')) {
           console.error("Conflict detected:", err.message)
           set({ syncState: "ERROR" })
        } else {
           console.error("Save snapshot failed:", err)
           set({ syncState: "ERROR" })
        }
      }
    },

    // ── Emergency Flush (beforeunload) ────────────────────────────────────────
    flushAllPending: () => {
      // With explicit saves, flushAllPending is no longer attempting to drain a debouncer.
    },

    // ── Lifecycle (Hardened) ──────────────────────────────────────────────────
    createDefaultSlate: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Guest mode: no Supabase session — create a local in-memory slate
      if (!session?.user) {
        const guestSlateId = uuid();
        set({ activeSlateId: guestSlateId });
        return guestSlateId;
      }

      // Check if user already has a slate to avoid duplicates on re-render
      const { data: existing } = await supabase
        .from("data_slates")
        .select("id")
        .eq("user_id", session.user.id)
        .limit(1)
        .maybeSingle();

      if (existing) return existing.id;

      const { data, error } = await supabase
        .from("data_slates")
        .insert({ user_id: session.user.id, title: "New Data Slate" })
        .select()
        .single();

      if (error) {
        console.error("Failed to create slate:", error);
        return null;
      }
      return data.id;
    },

    createNewSlate: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Reset local state to empty
      const emptyState = {
        basics: {
          name: "",
          label: "",
          email: "",
          phone: "",
          url: "",
          summary: "",
          location: { city: "", countryCode: "", region: "" },
          profiles: [],
        },
        work: [],
        skills: [],
        education: [],
        certifications: [],
        baseVersion: 0
      };
      set(emptyState);

      if (!session?.user) {
        const guestSlateId = uuid();
        set({ activeSlateId: guestSlateId });
        return guestSlateId;
      }

      const { data, error } = await supabase
        .from("data_slates")
        .insert({ user_id: session.user.id, title: "New Data Slate", status: "Draft" })
        .select()
        .single();

      if (error) {
        console.error("Failed to create slate:", error);
        return null;
      }
      return data.id;
    },

    initializeSlate: async (slateId) => {
      // VECTOR 1 DEFENSE: Validate UUID format before hitting the database
      if (!isValidUUID(slateId)) {
        console.error("Invalid slate ID format:", slateId);
        set({ hydrationError: "INVALID_SLATE_ID", isHydrating: false });
        return;
      }

      // Guest mode shortcut: if this slateId was generated locally (no Supabase session),
      // skip DB checks and mark as hydrated with empty data
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        set({ activeSlateId: slateId, isHydrating: false, hydrationError: null });
        return;
      }

      set({ isHydrating: true, hydrationError: null });

      // VECTOR 1 DEFENSE: Verify ownership via RLS — if the user doesn't own
      // this slate, the Supabase RLS policy will return zero rows.
      const { data: slateRow, error: slateErr } = await supabase
        .from("data_slates")
        .select("id, user_id")
        .eq("id", slateId)
        .maybeSingle();

      if (slateErr || !slateRow) {
        console.error("Slate not found or access denied:", slateId);
        set({ hydrationError: "ACCESS_DENIED", isHydrating: false });
        return;
      }

      // Slate exists and the user has read access (RLS enforced) — proceed
      set({ activeSlateId: slateId });

      try {
        // Fetch latest version
        const { data: versionRow, error: fetchErr } = await supabase
          .from("slate_versions")
          .select("snapshot_data, version_number")
          .eq("slate_id", slateId)
          .order("version_number", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (fetchErr) throw fetchErr;

        if (versionRow && versionRow.snapshot_data) {
          // Parse with permissive Zod schema
          const parsed = LooseSnapshotSchema.parse(versionRow.snapshot_data);
          
          // Reattach ephemeral DnD IDs to lists
          const patch: any = {
            baseVersion: versionRow.version_number
          };

          if (parsed.basics) patch.basics = parsed.basics;
          if (parsed.work) patch.work = parsed.work.map((e: any) => ({ ...e, id: uuid() }));
          if (parsed.skills) patch.skills = parsed.skills.map((e: any) => ({ ...e, id: uuid() }));
          if (parsed.education) patch.education = parsed.education.map((e: any) => ({ ...e, id: uuid() }));
          if (parsed.certifications) patch.certifications = parsed.certifications.map((e: any) => ({ ...e, id: uuid() }));

          set(patch);
          
          if (parsed.theme) {
             useThemeStore.getState().setTheme(parsed.theme as any);
          }

          // Cache backup
          if (typeof window !== "undefined") {
            window.localStorage.setItem(`slate_backup_${slateId}`, JSON.stringify(patch));
          }
        }
        set({ isHydrating: false, hydrationError: null });
      } catch (err) {
        console.error("Hydration failed, attempting fallback:", err);
        // Fallback to localStorage
        if (typeof window !== "undefined") {
          const backup = window.localStorage.getItem(`slate_backup_${slateId}`);
          if (backup) {
            try {
              const parsedBackup = JSON.parse(backup);
              set({ ...parsedBackup, isHydrating: false, hydrationError: null, syncState: "ERROR" });
              console.warn("Restored from local backup");
              return;
            } catch (e) {}
          }
        }
        set({ hydrationError: "FETCH_FAILED", isHydrating: false });
      }
    },
  };
});
