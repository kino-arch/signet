import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { LooseSnapshotSchema } from "../lib/db-validators"
config({ path: ".env.local" })

const supabaseUrl = process.env.VITE_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ""

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
})

async function migrate() {
  console.log("Starting ETL migration from slate_sections to slate_versions...")

  // 1. Fetch all slate sections
  const { data: sections, error } = await supabaseAdmin.from("slate_sections").select("*")
  if (error) {
    console.error("Failed to fetch legacy sections:", error)
    process.exit(1)
  }

  console.log(`Fetched ${sections.length} legacy sections.`)

  // 2. Group by slate_id
  const grouped = new Map<string, Record<string, unknown>>()
  for (const s of sections) {
    if (!grouped.has(s.slate_id)) {
      grouped.set(s.slate_id, {})
    }
    const slateData = grouped.get(s.slate_id)
    if (slateData) {
      slateData[s.section_type] = s.raw_content
    }
  }

  console.log(`Found ${grouped.size} unique slates to migrate.`)

  // 3. Assemble and Insert
  for (const [slateId, slateData] of grouped.entries()) {
    try {
      // Clean up the data for hydration
      const payload = {
        basics: slateData.basics || {},
        work: slateData.work || [],
        skills: slateData.skills || [],
        education: slateData.education || [],
        certifications: slateData.certifications || [],
        theme: "cosmic" // default
      }

      // Validate with Loose schema to allow unknown fields and prevent data loss
      const validated = LooseSnapshotSchema.parse(payload)

      // Insert as Draft (version 0)
      const { error: errDraft } = await supabaseAdmin.from("slate_versions").upsert({
        slate_id: slateId,
        version_number: 0,
        is_draft: true,
        snapshot_data: validated,
      }, { onConflict: 'slate_id,is_draft,version_number' })

      if (errDraft) throw errDraft

      // Insert as Published (version 1)
      const { error: errPub } = await supabaseAdmin.from("slate_versions").upsert({
        slate_id: slateId,
        version_number: 1,
        is_draft: false,
        snapshot_data: validated,
      }, { onConflict: 'slate_id,is_draft,version_number' })

      if (errPub) throw errPub

      console.log(`Migrated slate_id: ${slateId}`)
    } catch (e: unknown) {
      console.error(`Error migrating slate_id ${slateId}:`, (e as Error).message)
    }
  }

  console.log("ETL Migration complete.")
}

migrate()
