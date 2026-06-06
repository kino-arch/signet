import { supabase } from "@/lib/supabase"
import { StrictSnapshotSchema } from "@/lib/db-validators"

export async function restoreVersion(versionId: string): Promise<any> {
  // 1. Fetch the version to restore
  const { data: targetVersion, error: fetchErr } = await supabase
    .from("slate_versions")
    .select("*")
    .eq("id", versionId)
    .single()

  if (fetchErr || !targetVersion) throw new Error("Version not found")

  // 2. Validate snapshot shape
  const snapshot = StrictSnapshotSchema.parse(targetVersion.snapshot_data)

  // 3. Create a NEW current version from the existing state
  const { data: lastVersion } = await supabase
    .from("slate_versions")
    .select("version_number")
    .eq("slate_id", targetVersion.slate_id)
    .order("version_number", { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextNumber = (lastVersion?.version_number ?? 0) + 1

  const { data: newVersion, error: insertErr } = await supabase
    .from("slate_versions")
    .insert({
      slate_id: targetVersion.slate_id,
      version_number: nextNumber,
      is_draft: false,
      snapshot_data: snapshot as any,
    })
    .select()
    .single()

  if (insertErr || !newVersion) {
    throw new Error(`Failed to create version: ${insertErr?.message}`)
  }

  // 4. Update the slate modified time
  await supabase
    .from("data_slates")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", targetVersion.slate_id)

  return newVersion
}
