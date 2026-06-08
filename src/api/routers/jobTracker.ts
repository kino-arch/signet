import { protectedProcedure, router } from "../trpc"
import { z } from "zod"
import { db } from "../../db"
import { jobApplications } from "../../db/schema"
import { eq, and, asc } from "drizzle-orm"

const ApplicationSchema = z.object({
  id: z.string().optional(),
  company: z.string(),
  role: z.string(),
  status: z.string(),
  dateAdded: z.string().optional(),
  salary: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  jobDescription: z.string().optional().nullable(),
  matchScore: z.object({
    overall_match: z.number(),
    gap_analysis: z.string(),
    missing_keywords: z.array(z.object({
      keyword: z.string(),
      importance: z.string()
    }))
  }).optional().nullable()
})

export const jobTrackerRouter = router({
  getApplications: protectedProcedure.query(async ({ ctx }) => {
    return await db.select()
      .from(jobApplications)
      .where(eq(jobApplications.userId, ctx.userId))
      .orderBy(asc(jobApplications.dateAdded))
  }),

  addApplication: protectedProcedure
    .input(ApplicationSchema)
    .mutation(async ({ ctx, input }) => {
      const [inserted] = await db.insert(jobApplications).values({
        userId: ctx.userId,
        company: input.company,
        role: input.role,
        status: input.status,
        salary: input.salary,
        location: input.location,
        notes: input.notes,
        url: input.url,
        jobDescription: input.jobDescription,
        matchScore: input.matchScore,
      }).returning()
      return inserted
    }),

  updateApplication: protectedProcedure
    .input(z.object({
      id: z.string(),
      patch: ApplicationSchema.partial()
    }))
    .mutation(async ({ ctx, input }) => {
      // dateAdded is a server-set timestamp — exclude it from user patches
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dateAdded: _dateAdded, ...safeFields } = input.patch
      const [updated] = await db.update(jobApplications)
        .set(safeFields)
        .where(and(eq(jobApplications.id, input.id), eq(jobApplications.userId, ctx.userId)))
        .returning()
      return updated
    }),

  deleteApplication: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.delete(jobApplications)
        .where(and(eq(jobApplications.id, input.id), eq(jobApplications.userId, ctx.userId)))
      return { success: true }
    }),
})
