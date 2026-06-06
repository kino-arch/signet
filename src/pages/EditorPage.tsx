import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { telemetry } from "@/lib/telemetry"
import { IdentityArrayV2 } from "@/components/editor/v2/IdentityArrayV2"
import { MissionHistoryArrayV2 } from "@/components/editor/v2/MissionHistoryArrayV2"
import { Loader2 } from "lucide-react"

export function NewEditorPage() {
  const { slateId } = useParams<{ slateId?: string }>()
  const { initializeSlate, isHydrating, hydrationError } = useDataSlateStore()

  useEffect(() => {
    if (slateId) {
      initializeSlate(slateId)
      telemetry.track('v2_editor_initialized', { slateId })
    }
  }, [slateId, initializeSlate])

  if (isHydrating) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--color-surface-base)]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-action-primary)]" />
      </div>
    )
  }

  if (hydrationError) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--color-surface-base)]">
        <div className="text-center">
          <h2 className="text-lg font-bold text-[var(--color-feedback-error)]">Access Denied</h2>
          <p className="text-signet-slate-400 mt-2">Unable to load this slate.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[var(--color-surface-base)] text-white font-sans overflow-y-auto">
      <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
        <header className="mb-8 border-b border-[var(--color-action-secondary)] pb-6">
          <h1 className="text-3xl font-heading font-bold text-white tracking-wide">
            Constellation Editor
          </h1>
          <p className="text-signet-slate-400 mt-2">V2 Data Slate Manipulation</p>
        </header>

        <IdentityArrayV2 />
        
        <MissionHistoryArrayV2 />
      </div>
    </div>
  )
}
