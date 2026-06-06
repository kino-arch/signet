import { z } from "zod"
import { router, publicProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { createClient } from "@supabase/supabase-js"
import {
  StrictSnapshotSchema,
  LooseSnapshotSchema,
} from "../../lib/db-validators"

// Setup Supabase admin client
const supabaseUrl =
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://dummy.supabase.co"
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  "dummy-key"

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
})

export const slateRouter = router({
  saveSnapshot: publicProcedure
    .input(
      z.object({
        slateId: z.string().uuid(),
        snapshot: z.any(), // We validate inside the mutation
        type: z.enum(["draft", "publish"]),
        baseVersion: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Boundary Validation
      const schema =
        input.type === "publish" ? StrictSnapshotSchema : LooseSnapshotSchema
      const parsedSnapshot = schema.safeParse(input.snapshot)

      if (!parsedSnapshot.success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Snapshot validation failed: ${parsedSnapshot.error.message}`,
        })
      }

      const validSnapshot = parsedSnapshot.data

      // 2. Draft Upsert Logic
      if (input.type === "draft") {
        // Fetch current draft to check conflict
        const { data: currentDraft, error: fetchError } = await supabaseAdmin
          .from("slate_versions")
          .select("version_number, id")
          .eq("slate_id", input.slateId)
          .eq("is_draft", true)
          .maybeSingle()

        if (fetchError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: fetchError.message,
          })
        }

        // Conflict check
        if (
          currentDraft &&
          input.baseVersion !== undefined &&
          input.baseVersion !== currentDraft.version_number
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Slate was modified in another session",
          })
        }

        const nextVersion = currentDraft
          ? currentDraft.version_number
          : input.baseVersion || 0

        // Upsert draft
        const { error: upsertError } = await supabaseAdmin
          .from("slate_versions")
          .upsert(
            {
              id: currentDraft ? currentDraft.id : undefined, // let it default to random if new
              slate_id: input.slateId,
              is_draft: true,
              version_number: nextVersion,
              snapshot_data: validSnapshot,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "slate_id,is_draft,version_number" }
          )

        if (upsertError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: upsertError.message,
          })
        }

        return { success: true, version: nextVersion }
      }

      // 3. Publish Logic
      else {
        // Get the latest published version to increment
        const { data: latestPub, error: pubError } = await supabaseAdmin
          .from("slate_versions")
          .select("version_number")
          .eq("slate_id", input.slateId)
          .eq("is_draft", false)
          .order("version_number", { ascending: false })
          .limit(1)
          .maybeSingle()

        if (pubError && pubError.code !== "PGRST116") {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: pubError.message,
          })
        }

        const nextVersion = latestPub ? latestPub.version_number + 1 : 1

        const { error: insertError } = await supabaseAdmin
          .from("slate_versions")
          .insert({
            slate_id: input.slateId,
            is_draft: false,
            version_number: nextVersion,
            snapshot_data: validSnapshot,
            updated_at: new Date().toISOString(),
          })

        if (insertError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: insertError.message,
          })
        }

        return { success: true, version: nextVersion }
      }
    }),
})
