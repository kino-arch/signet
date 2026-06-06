/**
 * Seed script for the industry_taxonomies table.
 * Populates starter data for common industries so the AI pipeline
 * can inject relevant terminology into resume generation prompts.
 *
 * Run: npx tsx src/db/seed-taxonomies.ts
 */
import { config } from "dotenv"
config({ path: ".env.local" })
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VITE_SUPABASE_URL || ""
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  ""

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars"
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
})

interface TaxonomyEntry {
  industry: string
  term: string
  category: string
  weight: number
}

const taxonomies: TaxonomyEntry[] = [
  // Software Engineering
  {
    industry: "Software Engineering",
    term: "microservices architecture",
    category: "Architecture",
    weight: 10,
  },
  {
    industry: "Software Engineering",
    term: "CI/CD pipelines",
    category: "DevOps",
    weight: 9,
  },
  {
    industry: "Software Engineering",
    term: "REST API design",
    category: "Backend",
    weight: 9,
  },
  {
    industry: "Software Engineering",
    term: "system design",
    category: "Architecture",
    weight: 8,
  },
  {
    industry: "Software Engineering",
    term: "distributed systems",
    category: "Architecture",
    weight: 8,
  },
  {
    industry: "Software Engineering",
    term: "automated testing",
    category: "Quality",
    weight: 7,
  },
  {
    industry: "Software Engineering",
    term: "code review",
    category: "Process",
    weight: 7,
  },
  {
    industry: "Software Engineering",
    term: "agile methodology",
    category: "Process",
    weight: 6,
  },
  {
    industry: "Software Engineering",
    term: "performance optimization",
    category: "Backend",
    weight: 6,
  },
  {
    industry: "Software Engineering",
    term: "technical debt reduction",
    category: "Process",
    weight: 5,
  },

  // Data Science
  {
    industry: "Data Science",
    term: "machine learning models",
    category: "ML",
    weight: 10,
  },
  {
    industry: "Data Science",
    term: "statistical analysis",
    category: "Analytics",
    weight: 9,
  },
  {
    industry: "Data Science",
    term: "feature engineering",
    category: "ML",
    weight: 8,
  },
  {
    industry: "Data Science",
    term: "A/B testing",
    category: "Analytics",
    weight: 8,
  },
  {
    industry: "Data Science",
    term: "data pipeline orchestration",
    category: "Data Engineering",
    weight: 7,
  },
  {
    industry: "Data Science",
    term: "model deployment",
    category: "MLOps",
    weight: 7,
  },
  {
    industry: "Data Science",
    term: "ETL workflows",
    category: "Data Engineering",
    weight: 6,
  },
  {
    industry: "Data Science",
    term: "predictive analytics",
    category: "Analytics",
    weight: 6,
  },
  {
    industry: "Data Science",
    term: "deep learning",
    category: "ML",
    weight: 5,
  },
  {
    industry: "Data Science",
    term: "data visualization",
    category: "Analytics",
    weight: 5,
  },

  // Product Management
  {
    industry: "Product Management",
    term: "product roadmap",
    category: "Strategy",
    weight: 10,
  },
  {
    industry: "Product Management",
    term: "user research",
    category: "Discovery",
    weight: 9,
  },
  {
    industry: "Product Management",
    term: "OKRs",
    category: "Metrics",
    weight: 8,
  },
  {
    industry: "Product Management",
    term: "stakeholder alignment",
    category: "Leadership",
    weight: 8,
  },
  {
    industry: "Product Management",
    term: "go-to-market strategy",
    category: "Strategy",
    weight: 7,
  },
  {
    industry: "Product Management",
    term: "sprint planning",
    category: "Execution",
    weight: 7,
  },
  {
    industry: "Product Management",
    term: "competitive analysis",
    category: "Discovery",
    weight: 6,
  },
  {
    industry: "Product Management",
    term: "prioritization frameworks",
    category: "Strategy",
    weight: 6,
  },
  {
    industry: "Product Management",
    term: "cross-functional collaboration",
    category: "Leadership",
    weight: 5,
  },
  {
    industry: "Product Management",
    term: "product-market fit",
    category: "Strategy",
    weight: 5,
  },

  // Finance
  {
    industry: "Finance",
    term: "financial modeling",
    category: "Analysis",
    weight: 10,
  },
  { industry: "Finance", term: "risk assessment", category: "Risk", weight: 9 },
  {
    industry: "Finance",
    term: "regulatory compliance",
    category: "Compliance",
    weight: 9,
  },
  {
    industry: "Finance",
    term: "portfolio management",
    category: "Investment",
    weight: 8,
  },
  {
    industry: "Finance",
    term: "quantitative analysis",
    category: "Analysis",
    weight: 8,
  },
  {
    industry: "Finance",
    term: "due diligence",
    category: "Investment",
    weight: 7,
  },
  {
    industry: "Finance",
    term: "P&L management",
    category: "Operations",
    weight: 7,
  },
  {
    industry: "Finance",
    term: "valuation methods",
    category: "Analysis",
    weight: 6,
  },
  {
    industry: "Finance",
    term: "audit procedures",
    category: "Compliance",
    weight: 6,
  },
  {
    industry: "Finance",
    term: "capital allocation",
    category: "Investment",
    weight: 5,
  },

  // Healthcare
  {
    industry: "Healthcare",
    term: "HIPAA compliance",
    category: "Compliance",
    weight: 10,
  },
  {
    industry: "Healthcare",
    term: "clinical workflows",
    category: "Operations",
    weight: 9,
  },
  {
    industry: "Healthcare",
    term: "EHR/EMR systems",
    category: "Technology",
    weight: 9,
  },
  {
    industry: "Healthcare",
    term: "patient outcomes",
    category: "Quality",
    weight: 8,
  },
  {
    industry: "Healthcare",
    term: "care coordination",
    category: "Operations",
    weight: 7,
  },
  {
    industry: "Healthcare",
    term: "FDA regulatory affairs",
    category: "Compliance",
    weight: 7,
  },
  {
    industry: "Healthcare",
    term: "health informatics",
    category: "Technology",
    weight: 6,
  },
  {
    industry: "Healthcare",
    term: "clinical trials",
    category: "Research",
    weight: 6,
  },
  {
    industry: "Healthcare",
    term: "quality improvement",
    category: "Quality",
    weight: 5,
  },
  {
    industry: "Healthcare",
    term: "population health",
    category: "Research",
    weight: 5,
  },

  // Marketing
  {
    industry: "Marketing",
    term: "conversion rate optimization",
    category: "Growth",
    weight: 10,
  },
  {
    industry: "Marketing",
    term: "content strategy",
    category: "Content",
    weight: 9,
  },
  { industry: "Marketing", term: "SEO/SEM", category: "Digital", weight: 9 },
  {
    industry: "Marketing",
    term: "marketing automation",
    category: "Technology",
    weight: 8,
  },
  {
    industry: "Marketing",
    term: "brand positioning",
    category: "Brand",
    weight: 8,
  },
  {
    industry: "Marketing",
    term: "demand generation",
    category: "Growth",
    weight: 7,
  },
  {
    industry: "Marketing",
    term: "analytics and attribution",
    category: "Analytics",
    weight: 7,
  },
  {
    industry: "Marketing",
    term: "customer segmentation",
    category: "Analytics",
    weight: 6,
  },
  {
    industry: "Marketing",
    term: "campaign management",
    category: "Execution",
    weight: 6,
  },
  {
    industry: "Marketing",
    term: "social media strategy",
    category: "Digital",
    weight: 5,
  },
]

async function seed() {
  console.log(`Seeding ${taxonomies.length} industry taxonomy entries...`)

  const { error } = await supabase
    .from("industry_taxonomies")
    .upsert(taxonomies, { onConflict: "industry,term" })

  if (error) {
    // If upsert with onConflict fails (no unique constraint), fall back to insert
    console.warn(
      "Upsert failed, trying insert with ignoreDuplicates:",
      error.message
    )
    const { error: insertError } = await supabase
      .from("industry_taxonomies")
      .insert(taxonomies)

    if (insertError) {
      console.error("Seed failed:", insertError.message)
      process.exit(1)
    }
  }

  console.log("✅ Industry taxonomies seeded successfully.")

  // Verify
  const { data, error: countError } = await supabase
    .from("industry_taxonomies")
    .select("industry")
    .limit(1000)

  if (!countError && data) {
    const industries = [...new Set(data.map((r) => r.industry))]
    console.log(`   Industries: ${industries.join(", ")}`)
    console.log(`   Total entries: ${data.length}`)
  }
}

seed()
