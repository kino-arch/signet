import { z } from "zod"
import { router, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { supabaseAdmin } from "../../lib/supabaseAdmin"
import { logAuditEvent } from "../../lib/audit"
// import { saveSnapshotRatelimit } from "../../lib/ratelimit"
import {
  StrictSnapshotSchema,
  LooseSnapshotSchema,
} from "../../lib/db-validators"
export const slateRouter = router({
  saveSnapshot: protectedProcedure
    .input(
      z.object({
        slateId: z.string().uuid(),
        snapshot: z.any(), // We validate inside the mutation
        type: z.enum(["draft", "publish"]),
        baseVersion: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // NOTE: Rate Limiting is currently commented out due to npm package installation failures on the workspace, 
      // but the code structure is in place for when @upstash packages are resolved.
      // const { success, reset } = await saveSnapshotRatelimit.limit(`saveSnapshot:${ctx.userId}`)
      // if (!success) {
      //   throw new TRPCError({
      //     code: "TOO_MANY_REQUESTS",
      //     message: `Rate limit exceeded. Retry after ${Math.ceil((reset - Date.now()) / 1000)}s.`,
      //   })
      // }

      const { userId } = ctx

      // AUTHORIZATION CHECK: Verify the user owns this slate
      const { data: slate, error: slateError } = await supabaseAdmin
        .from("data_slates")
        .select("id, user_id")
        .eq("id", input.slateId)
        .maybeSingle()

      if (slateError || !slate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Slate not found",
        })
      }

      if (slate.user_id !== userId) {
        console.warn(`[SECURITY] Unauthorized write attempt: user ${userId} tried to modify slate ${input.slateId} owned by ${slate.user_id}`)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to modify this slate",
        })
      }

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

        // 4. Audit log (fire-and-forget, non-blocking)
        const req = ctx.req
        const ip = req?.header("x-forwarded-for")?.split(",")[0]?.trim() || req?.header("cf-connecting-ip") || null
        const ua = req?.header("user-agent") || null

        logAuditEvent({
          userId,
          action: "SAVE_SNAPSHOT_DRAFT",
          resourceType: "slate",
          resourceId: input.slateId,
          ipAddress: ip,
          userAgent: ua,
          metadata: { timestamp: new Date().toISOString(), version: nextVersion },
        })

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

        // 4. Audit log (fire-and-forget, non-blocking)
        const req = ctx.req
        const ip = req?.header("x-forwarded-for")?.split(",")[0]?.trim() || req?.header("cf-connecting-ip") || null
        const ua = req?.header("user-agent") || null

        logAuditEvent({
          userId,
          action: "SAVE_SNAPSHOT_PUBLISH",
          resourceType: "slate",
          resourceId: input.slateId,
          ipAddress: ip,
          userAgent: ua,
          metadata: { timestamp: new Date().toISOString(), version: nextVersion },
        })

        return { success: true, version: nextVersion }
      }
    }),
})
