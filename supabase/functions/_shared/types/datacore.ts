import { z } from "npm:zod@3.23.8"

export const DatacoreSchema = z.object({
  identity: z.object({
    full_name: z.string(),
    professional_title: z.string(),
    contact_matrix: z.object({
      email: z.string().email(),
      phone: z.string().optional(),
      location: z.string(),
      linkedin_url: z.string().url().optional(),
    }),
    executive_summary: z
      .string()
      .describe(
        "A high-impact, 3-sentence summary completely devoid of corporate filler words."
      ),
  }),

  mission_history: z
    .array(
      z.object({
        company: z.string(),
        role: z.string(),
        timeline: z.object({
          start_date: z.string().describe("Format: YYYY-MM"),
          end_date: z.string().describe("Format: YYYY-MM or 'PRESENT'"),
        }),
        location: z.string().optional(),
        metrics: z
          .array(z.string())
          .describe(
            "Strictly quantifiable, action-oriented bullet points. Must begin with a strong verb. No markdown."
          ),
      })
    )
    .describe(
      "The user's work experience, ordered from most recent to oldest."
    ),

  strategic_reserves: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        graduation_year: z.string(),
      })
    )
    .describe("The user's education and certifications."),

  core_competencies: z.object({
    soft_skills: z.array(z.string()).max(8),
    technical_stack: z.array(z.string()).max(12),
  }),
})

// Export the inferred TypeScript type for our frontend Zustand store
export type DatacorePayload = z.infer<typeof DatacoreSchema>
