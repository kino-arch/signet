import { z } from "zod"

export const ProvenanceEnum = z.enum(["user_verified", "estimated", "inferred"])
export const UserActionEnum = z.enum([
  "none",
  "confirm_or_replace",
  "verify_or_delete",
])
export const SourceFidelityEnum = z.enum([
  "faithful",
  "amplified",
  "fabricated",
])

export const ImmutableFactsSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  companies: z.array(z.string()),
  jobTitles: z.array(z.string()),
  schools: z.array(z.string()),
})

export const BulletSchema = z.object({
  // Display
  text: z.string().min(20).max(160),

  // Provenance layer
  provenance: ProvenanceEnum,
  confidence: z.number().min(0).max(1),
  ghostNote: z.string().nullable(),
  userAction: UserActionEnum,
  suggestedRange: z.string().nullable(),

  // Source fidelity
  sourceFidelity: SourceFidelityEnum,
  originalClaim: z.string(),

  // Cryptographic zero-trust hash
  provenanceHash: z.string().optional(),

  // Visual metadata for UI
  visualHint: z.enum(["solid", "dotted", "wavy"]).optional(),
})

export const ReforgeResponseSchema = z.object({
  bullets: z.array(BulletSchema).min(1).max(5),
  humanScoreNotes: z.array(z.string()).min(1).max(3),
  immutableFacts: ImmutableFactsSchema,
})

export const JobTailorGapSchema = z.object({
  missingKeyword: z.string(),
  currentBullet: z.string(),
  suggestedRewrite: z.string(),
  provenance: ProvenanceEnum,
  confidence: z.number().min(0).max(1),
  ghostNote: z.string().nullable(),
})

export const JobTailorResponseSchema = z.object({
  gaps: z.array(JobTailorGapSchema),
  overallMatch: z.number().min(0).max(100),
  priorityFixes: z.array(z.string()).max(3),
})

export type GhostBullet = z.infer<typeof BulletSchema>
export type ReforgeResponse = z.infer<typeof ReforgeResponseSchema>
export type JobTailorGap = z.infer<typeof JobTailorGapSchema>
export type ImmutableFacts = z.infer<typeof ImmutableFactsSchema>
