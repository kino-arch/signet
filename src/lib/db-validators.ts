import { z } from "zod"

// ─── Component Schemas ────────────────────────────────────────────────────────
export const LocationSchema = z.object({
  city: z.string().optional().default(""),
  countryCode: z.string().optional().default(""),
  region: z.string().optional().default(""),
})

export const ProfileSchema = z.object({
  network: z.string().optional().default(""),
  url: z.string().optional().default(""),
  username: z.string().optional().default(""),
})

export const BasicsSchema = z.object({
  name: z.string().optional().default(""),
  label: z.string().optional().default(""),
  email: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  url: z.string().optional().default(""),
  summary: z.string().optional().default(""),
  location: LocationSchema.optional().default({ city: "", countryCode: "", region: "" }),
  profiles: z.array(ProfileSchema).optional().default([]),
})

export const WorkSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional().default(""),
  position: z.string().optional().default(""),
  url: z.string().optional().default(""),
  startDate: z.string().optional().default(""),
  endDate: z.string().optional().default(""),
  summary: z.string().optional().default(""),
  highlights: z.array(z.string()).optional().default([]),
  ghostBullets: z.array(z.any()).optional(),
})

export const SkillSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional().default(""),
  level: z.string().optional().default(""),
  keywords: z.array(z.string()).optional().default([]),
})

export const EducationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().optional().default(""),
  area: z.string().optional().default(""),
  studyType: z.string().optional().default(""),
  startDate: z.string().optional().default(""),
  endDate: z.string().optional().default(""),
  score: z.string().optional().default(""),
})

export const CertificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional().default(""),
  issuer: z.string().optional().default(""),
  date: z.string().optional().default(""),
  url: z.string().optional().default(""),
})

export const ThemeSchema = z.object({
  id: z.string().optional().default("cosmic"),
})

// ─── Layered Validation Schemas ──────────────────────────────────────────────

/**
 * 1. Permissive ingestion schema
 * Allows unknown keys and custom sections so we don't drop user data during hydration.
 */
export const LooseSnapshotSchema = z
  .object({
    version: z.number().optional(), // For client-side tracking
    basics: BasicsSchema.passthrough().optional().default({ name: "", label: "", email: "", phone: "", url: "", summary: "", location: { city: "", countryCode: "", region: "" }, profiles: [] }),
    work: z.array(WorkSchema.passthrough()).optional().default([]),
    skills: z.array(SkillSchema.passthrough()).optional().default([]),
    education: z.array(EducationSchema.passthrough()).optional().default([]),
    certifications: z
      .array(CertificationSchema.passthrough())
      .optional()
      .default([]),
    theme: z.string().optional().default("cosmic"),
  })
  .passthrough()

/**
 * 2. Strict publish schema
 * For when we need guaranteed shape integrity before a major DB commit.
 * Still permits custom fields on items, but ensures top level structure is tight.
 */
export const StrictSnapshotSchema = z
  .object({
    version: z.number().optional(),
    basics: BasicsSchema.passthrough(),
    work: z.array(WorkSchema.passthrough()),
    skills: z.array(SkillSchema.passthrough()),
    education: z.array(EducationSchema.passthrough()),
    certifications: z.array(CertificationSchema.passthrough()),
    theme: z.string(),
  })
  .passthrough()

/**
 * 3. Boundary validator
 */
export const validateSnapshot = (
  raw: unknown,
  mode: "hydrate" | "publish" = "hydrate"
) => {
  const schema = mode === "publish" ? StrictSnapshotSchema : LooseSnapshotSchema
  return schema.parse(raw)
}

export type SnapshotPayload = z.infer<typeof LooseSnapshotSchema>
