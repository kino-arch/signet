const fs = require('fs')

const path = 'c:\\cv\\signet\\src\\store\\useDataSlateStore.ts'
let content = fs.readFileSync(path, 'utf8')

// 1. Imports
content = content.replace(
  'import { supabase } from "@/lib/supabase"',
  `import { supabase } from "@/lib/supabase"\nimport { vanillaTrpc } from "@/providers/trpc"\nimport { LooseSnapshotSchema } from "@/lib/db-validators"\nimport { useThemeStore } from "@/store/useThemeStore"`
)

// 2. Interface updates
content = content.replace(
  '  activeSlateId: string | null',
  `  activeSlateId: string | null\n  baseVersion: number`
)
content = content.replace(
  `  forceSyncSection: (
    sectionType: "basics" | "work" | "skills" | "education" | "certifications"
  ) => Promise<void>`,
  `  saveSnapshot: (type?: "draft" | "publish") => Promise<void>\n  scheduleSave: () => void`
)

// 3. Store Initialization
content = content.replace(
  '    activeSlateId: null,\n    syncState: "IDLE",',
  `    activeSlateId: null,\n    baseVersion: 0,\n    syncState: "IDLE",`
)

// 4. scheduleSave and forceSync
content = content.replace(
  `  // We removed debouncing.
  const forceSync = (
    sectionType: "basics" | "work" | "skills" | "education" | "certifications"
  ) => {
    set({ hasPendingMutations: true })
    get()
      .forceSyncSection(sectionType)
      .finally(() => {
        set({ hasPendingMutations: false })
      })
  }`,
  `  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const scheduleSave = () => {
    set({ hasPendingMutations: true })
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      get().saveSnapshot('draft')
    }, 2000)
  }`
)

// 5. Replace all forceSync(...) with scheduleSave()
content = content.replace(/forceSync\("[^"]+"\)/g, 'scheduleSave()')
// Also in setBasics there is no forceSync currently? Let's check if there is one. 
// If not, we'll manually add it.
content = content.replace(
  `    setBasics: (updates) => {
      set((state) => ({ basics: { ...state.basics, ...updates } }))
    },`,
  `    setBasics: (updates) => {
      set((state) => ({ basics: { ...state.basics, ...updates } }))
      scheduleSave()
    },`
)

// 6. Replace forceSyncSection implementation with saveSnapshot
const syncSectionRegex = /\s*\/\/ ── Sync \(Hardened\) ──────────────────────────────────────────────────────\s*forceSyncSection: async \(sectionType\) => \{[\s\S]*?\},/g;

const saveSnapshotImpl = `
    scheduleSave: () => {
      scheduleSave()
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
           // Provide a custom conflict handling state if needed, or just standard error
           console.error("Conflict detected:", err.message)
           set({ syncState: "ERROR" })
           // We could trigger a global alert here
        } else {
           console.error("Save snapshot failed:", err)
           set({ syncState: "ERROR" })
        }
      }
    },
`
content = content.replace(syncSectionRegex, saveSnapshotImpl)

// 7. Replace initializeSlate implementation
const initRegex = /\s*initializeSlate: async \(slateId\) => \{[\s\S]*?\},/g;
const initImpl = `
    initializeSlate: async (slateId) => {
      if (!isValidUUID(slateId)) {
        set({ hydrationError: "INVALID_SLATE_ID", isHydrating: false })
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        set({ activeSlateId: slateId, isHydrating: false, hydrationError: null })
        return
      }

      set({ isHydrating: true, hydrationError: null })

      try {
        // Validate ownership
        const { data: slateRow, error: slateErr } = await supabase
          .from("data_slates")
          .select("id, user_id")
          .eq("id", slateId)
          .maybeSingle()

        if (slateErr || !slateRow) {
          set({ hydrationError: "ACCESS_DENIED", isHydrating: false })
          return
        }

        set({ activeSlateId: slateId })

        // Fetch latest version
        const { data: versionRow, error: fetchErr } = await supabase
          .from("slate_versions")
          .select("snapshot_data, version_number")
          .eq("slate_id", slateId)
          .order("version_number", { ascending: false })
          .limit(1)
          .maybeSingle()

        if (fetchErr) throw fetchErr

        if (versionRow && versionRow.snapshot_data) {
          // Parse with permissive Zod schema
          const parsed = LooseSnapshotSchema.parse(versionRow.snapshot_data)
          
          // Reattach ephemeral DnD IDs to lists
          const patch: any = {
            baseVersion: versionRow.version_number
          }

          if (parsed.basics) patch.basics = parsed.basics
          if (parsed.work) patch.work = parsed.work.map((e: any) => ({ ...e, id: uuid() }))
          if (parsed.skills) patch.skills = parsed.skills.map((e: any) => ({ ...e, id: uuid() }))
          if (parsed.education) patch.education = parsed.education.map((e: any) => ({ ...e, id: uuid() }))
          if (parsed.certifications) patch.certifications = parsed.certifications.map((e: any) => ({ ...e, id: uuid() }))

          set(patch)
          
          if (parsed.theme) {
             useThemeStore.getState().setTheme(parsed.theme)
          }

          // Cache backup
          if (typeof window !== "undefined") {
            window.localStorage.setItem(\`slate_backup_\${slateId}\`, JSON.stringify(patch))
          }
        }
        set({ isHydrating: false, hydrationError: null })
      } catch (err) {
        console.error("Hydration failed, attempting fallback:", err)
        // Fallback to localStorage
        if (typeof window !== "undefined") {
          const backup = window.localStorage.getItem(\`slate_backup_\${slateId}\`)
          if (backup) {
            try {
              const parsedBackup = JSON.parse(backup)
              set({ ...parsedBackup, isHydrating: false, hydrationError: null, syncState: "ERROR" })
              console.warn("Restored from local backup")
              return
            } catch (e) {}
          }
        }
        set({ hydrationError: "FETCH_FAILED", isHydrating: false })
      }
    },
`
content = content.replace(initRegex, initImpl)

fs.writeFileSync(path, content, 'utf8')
console.log("Rewrote useDataSlateStore.ts")
