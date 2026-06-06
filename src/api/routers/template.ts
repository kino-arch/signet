import { z } from "zod"
import { router, publicProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { db } from "../../db"
import { profiles, userTemplates } from "../../db/schema"
import { eq, and, sql } from "drizzle-orm"

export const templateRouter = router({
  unlockAndExport: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        templateId: z.string(),
        slateId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.transaction(async (tx) => {
        // 1. Lock the user's profile credit row
        const userProfile = await tx.query.profiles.findFirst({
          where: eq(profiles.id, input.userId),
          // row-level lock using raw SQL is possible, or assume it's atomic if we use UPDATE WHERE credits > 0
          // For now we'll do standard findFirst then atomic UPDATE
        })

        if (!userProfile || userProfile.credits < 1) {
          throw new TRPCError({
            code: "PAYMENT_REQUIRED",
            message: "Insufficient credits",
          })
        }

        // 2. Check if already unlocked (idempotency)
        const existing = await tx.query.userTemplates.findFirst({
          where: and(
            eq(userTemplates.userId, input.userId),
            eq(userTemplates.templateId, input.templateId)
          ),
        })

        if (existing) {
          // Already owned — just export, don't deduct
          return {
            creditsRemaining: userProfile.credits,
            alreadyOwned: true,
            exportUrl: `/api/export/${input.slateId}?template=${input.templateId}`,
          }
        }

        // 3. Deduct and record unlock atomically
        const [updatedProfile] = await tx
          .update(profiles)
          .set({ credits: sql`${profiles.credits} - 1` })
          .where(and(eq(profiles.id, input.userId), sql`${profiles.credits} > 0`))
          .returning()

        if (!updatedProfile) {
          throw new TRPCError({
            code: "PAYMENT_REQUIRED",
            message: "Insufficient credits during transaction",
          })
        }

        await tx.insert(userTemplates).values({
          userId: input.userId,
          templateId: input.templateId,
        })

        // 4. Generate and return export URL (mocked for now, actual implementation pending)
        const exportUrl = `/api/export/${input.slateId}?template=${input.templateId}`

        return {
          creditsRemaining: updatedProfile.credits,
          alreadyOwned: false,
          exportUrl,
        }
      })
    }),
})
