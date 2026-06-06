// @ts-nocheck
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

export async function getCachedBriefing(
  supabase: SupabaseClient,
  cacheKey: string
) {
  const { data, error } = await supabase
    .from("target_lock_cache")
    .select("company_intel, briefing")
    .eq("company_key", cacheKey)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle()

  if (error) {
    console.error("Cache read error:", error)
    return null
  }

  if (data) {
    return {
      companyIntel: data.company_intel,
      briefing: data.briefing,
      fromCache: true,
    }
  }

  return null
}

export async function setCachedBriefing(
  supabase: SupabaseClient,
  cacheKey: string,
  payload: { companyIntel: any; briefing: any }
) {
  const { error } = await supabase.from("target_lock_cache").upsert(
    {
      company_key: cacheKey,
      company_intel: payload.companyIntel,
      briefing: payload.briefing,
      // expires_at is set by default in the schema (now + 48h)
    },
    { onConflict: "company_key" }
  )

  if (error) {
    console.error("Cache write error:", error)
  }
}
