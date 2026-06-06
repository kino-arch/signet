import { z } from "zod"
import { router, publicProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { createClient } from "@supabase/supabase-js"

// We should use the service role key for admin privileges inside the Hono backend
// In a real deployed app, these would come from environment variables.
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

export const skillsRouter = router({
  commitOrder: publicProcedure
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
    .mutation(async ({ input }) => {
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
