import { create } from "zustand";
import { supabase } from "@/lib/supabase";

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
  ai_proposal?: string;       // volatile — never persisted to DB
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
  setAiProposal: (id: string, text: string) => void;
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
  forceSyncSection: (sectionType: "basics" | "work" | "skills" | "education" | "certifications") => Promise<void>;
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
  return entries.map(({ id: _id, ai_proposal: _ap, ai_loading: _al, ...rest }) => rest) as any;
}

// ─── Store Factory ────────────────────────────────────────────────────────────
export const useDataSlateStore = create<DataSlateStore>((set, get) => {
  let debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};
  let syncPaused = false;
  // Track which sections have pending debounced writes
  const pendingSections = new Set<"basics" | "work" | "skills" | "education" | "certifications">();

  const scheduleSync = (sectionType: "basics" | "work" | "skills" | "education" | "certifications") => {
    if (syncPaused) return;
    pendingSections.add(sectionType);
    set({ syncState: "SYNCING...", hasPendingMutations: true });

    if (debounceTimers[sectionType]) clearTimeout(debounceTimers[sectionType]);
    debounceTimers[sectionType] = setTimeout(() => {
      pendingSections.delete(sectionType);
      get().forceSyncSection(sectionType);
      // Update hasPendingMutations based on remaining pending sections
      if (pendingSections.size === 0) {
        set({ hasPendingMutations: false });
      }
    }, 800);
  };

  return {
    activeSlateId: null,
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
    forceSyncSection: async (sectionType) => {
      const { activeSlateId, basics, work, skills, education, certifications } = get();
      if (!activeSlateId) return;

      // Guest mode: no Supabase session — data lives in-memory only, skip DB sync
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        set({ syncState: "SECURED" });
        return;
      }

      // VECTOR 3 DEFENSE: Ensure session is fresh before any DB write
      const sessionAlive = await ensureFreshSession();
      if (!sessionAlive) {
        console.error("Session expired — sync aborted. User must re-authenticate.");
        set({ syncState: "ERROR" });
        return;
      }

      // VECTOR 4 DEFENSE: Strip volatile fields (id, ai_proposal, ai_loading)
      const payload =
        sectionType === "basics"
          ? basics
          : sectionType === "work"
          ? stripVolatileFields(work as unknown as Record<string, unknown>[])
          : sectionType === "skills"
          ? stripVolatileFields(skills as unknown as Record<string, unknown>[])
          : sectionType === "education"
          ? stripVolatileFields(education as unknown as Record<string, unknown>[])
          : stripVolatileFields(certifications as unknown as Record<string, unknown>[]);

      try {
        const { data: existing } = await supabase
          .from("slate_sections")
          .select("id")
          .eq("slate_id", activeSlateId)
          .eq("section_type", sectionType)
          .maybeSingle();

        if (existing) {
          const { error } = await supabase
            .from("slate_sections")
            .update({ raw_content: payload as unknown as Record<string, unknown>, updated_at: new Date().toISOString() })
            .eq("id", existing.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("slate_sections").insert({
            slate_id: activeSlateId,
            section_type: sectionType,
            raw_content: payload as unknown as Record<string, unknown>,
          });
          if (error) throw error;
        }

        set({ syncState: "SECURED" });
        setTimeout(() => {
          if (get().syncState === "SECURED") set({ syncState: "IDLE" });
        }, 2000);
      } catch (err: any) {
        console.error(`Sync failed for ${sectionType}:`, err?.message || err);
        set({ syncState: "ERROR" });

        // Retry once after 3 seconds for transient failures
        setTimeout(() => {
          if (get().syncState === "ERROR") {
            get().forceSyncSection(sectionType);
          }
        }, 3000);
      }
    },

    // ── Emergency Flush (beforeunload) ────────────────────────────────────────
    flushAllPending: () => {
      // Drain all pending debounce timers synchronously
      for (const key of Object.keys(debounceTimers)) {
        clearTimeout(debounceTimers[key]);
        delete debounceTimers[key];
      }

      const { activeSlateId, basics, work, skills, education, certifications } = get();
      if (!activeSlateId) return;

      // Use navigator.sendBeacon for guaranteed delivery during page unload.
      // We build the payloads and fire one beacon per pending section.
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;

      // We can only send simple POST requests via sendBeacon, so we use the
      // Supabase REST API directly (PostgREST). This is a fire-and-forget flush.
      for (const sectionType of ["basics", "work", "skills", "education", "certifications"] as const) {
        const sectionPayload =
          sectionType === "basics"
            ? basics
            : sectionType === "work"
            ? stripVolatileFields(work as unknown as Record<string, unknown>[])
            : sectionType === "skills"
            ? stripVolatileFields(skills as unknown as Record<string, unknown>[])
            : sectionType === "education"
            ? stripVolatileFields(education as unknown as Record<string, unknown>[])
            : stripVolatileFields(certifications as unknown as Record<string, unknown>[]);

        // Build a PostgREST PATCH body using the RPC workaround:
        // We send the full payload as a JSON body to an upsert-style endpoint.
        // Since sendBeacon only supports POST, we use the Supabase Edge Function
        // approach for an emergency sync.
        const beaconBody = JSON.stringify({
          slate_id: activeSlateId,
          section_type: sectionType,
          raw_content: sectionPayload,
        });

        try {
          // Attempt sendBeacon to a lightweight edge function
          const beaconUrl = `${supabaseUrl}/functions/v1/emergency-sync`;
          navigator.sendBeacon(
            beaconUrl,
            new Blob([beaconBody], { type: "application/json" })
          );
        } catch {
          // sendBeacon is best-effort — if it fails, data was already in local state
          console.warn(`Emergency flush failed for ${sectionType}`);
        }
      }

      pendingSections.clear();
      set({ hasPendingMutations: false });
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

      const { data: sections, error } = await supabase
        .from("slate_sections")
        .select("section_type, raw_content")
        .eq("slate_id", slateId);

      if (error) {
        console.error("Failed to fetch slate sections:", error);
        set({ hydrationError: "FETCH_FAILED", isHydrating: false });
        return;
      }

      const patch: Partial<Pick<DataSlateStore, "basics" | "work" | "skills" | "education" | "certifications">> = {};

      for (const s of sections ?? []) {
        if (s.section_type === "basics" && s.raw_content) {
          patch.basics = s.raw_content as unknown as Basics;
        }
        if (s.section_type === "work" && Array.isArray(s.raw_content)) {
          // Re-attach ephemeral IDs for DnD
          patch.work = (s.raw_content as unknown as Omit<WorkEntry, "id">[]).map((e) => ({
            ...e,
            id: uuid(),
          }));
        }
        if (s.section_type === "skills" && Array.isArray(s.raw_content)) {
          patch.skills = (s.raw_content as unknown as Omit<SkillEntry, "id">[]).map((e) => ({
            ...e,
            id: uuid(),
          }));
        }
        if (s.section_type === "education" && Array.isArray(s.raw_content)) {
          patch.education = (s.raw_content as unknown as Omit<EducationEntry, "id">[]).map((e) => ({
            ...e,
            id: uuid(),
          }));
        }
        if (s.section_type === "certifications" && Array.isArray(s.raw_content)) {
          patch.certifications = (s.raw_content as unknown as Omit<CertificationEntry, "id">[]).map((e) => ({
            ...e,
            id: uuid(),
          }));
        }
      }

      if (Object.keys(patch).length > 0) set(patch);
      set({ isHydrating: false, hydrationError: null });
    },
  };
});
