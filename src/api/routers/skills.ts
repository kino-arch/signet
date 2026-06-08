import { z } from "zod"
import { router, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { supabaseAdmin } from "../../lib/supabaseAdmin"

export const skillsRouter = router({
  commitOrder: protectedProcedure
    .input(
      z.object({
        slateId: z.string().uuid(),
        categories: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            keywords: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
              })
            ),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

      // For now, since the existing schema uses `slate_sections`,
      // we'll update that directly to keep it simple and avoid breaking the existing UI fully,
      // or we can write to the new tables.
      // Since the user said "Keep Supabase Postgres... You only route complex operations through Hono"
      // and we are changing the DnD commit behavior, we can update the existing slate_sections json payload
      // so we don't have to rewrite the entire application right away.

      const { error } = await supabaseAdmin
        .from("slate_sections")
        .update({
          raw_content: input.categories,
          updated_at: new Date().toISOString(),
        })
        .eq("slate_id", input.slateId)
        .eq("section_type", "skills")

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        })
      }

      return { success: true }
    }),
})
