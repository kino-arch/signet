import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { SlateVersion } from "@/db/schema"
import { GhostStar } from "./GhostStar"
import type { GravityEngine } from "@/hooks/useGravityPhysics"

interface StarVersionsRendererProps {
  slateId: string
  physicsEngine: GravityEngine | null
}

export function StarVersionsRenderer({
  slateId,
  physicsEngine,
}: StarVersionsRendererProps) {
  const [versions, setVersions] = useState<SlateVersion[]>([])

  useEffect(() => {
    async function fetchVersions() {
      const { data, error } = await supabase
        .from("slate_versions")
        .select("*")
        .eq("slate_id", slateId)
        .order("version_number", { ascending: false })

      if (!error && data) {
        setVersions(data as SlateVersion[])
      }
    }
    fetchVersions()
  }, [slateId])

  if (!versions.length || !physicsEngine) return null

  return (
    <>
      {versions.map((v) => (
        <GhostStar
          key={v.id}
          version={v}
          parentStarId={slateId}
          physicsEngine={physicsEngine}
        />
      ))}
    </>
  )
}
