import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { TEMPLATE_REGISTRY } from "@/components/editor/templates/registry"
import type { TemplateId } from "@/components/editor/templates/registry"
import { Loader2, AlertCircle } from "lucide-react"

export function EmbedResumePage() {
  const { slateId } = useParams<{ slateId: string }>()
  const { initializeSlate, activeSlateId, isHydrating, hydrationError, basics, work, skills, education, certifications } = useDataSlateStore()
  const [templateId] = useState<TemplateId>("standard")

  useEffect(() => {
    if (slateId && slateId !== activeSlateId) {
      initializeSlate(slateId)
    }
  }, [slateId, activeSlateId, initializeSlate])

  // Iframe auto-resizer logic for external parent hosts
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === document.body) {
          const height = entry.contentRect.height;
          window.parent.postMessage({ type: "signet-embed-resize", height }, "*");
        }
      }
    });

    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  // In a real implementation, the template ID might be saved with the slate.
  // For now, we default to "standard".
  const ActiveTemplate = TEMPLATE_REGISTRY[templateId]?.component || TEMPLATE_REGISTRY["standard"].component

  if (isHydrating) {
    return (
      <div className="flex h-screen items-center justify-center bg-transparent">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (hydrationError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-transparent text-destructive gap-2">
        <AlertCircle className="h-8 w-8" />
        <p className="text-sm font-medium">Failed to load resume</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-transparent p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-background shadow-lg rounded-xl overflow-hidden ring-1 ring-border">
        {/* Render the actual template without any editor shell */}
        <ActiveTemplate 
          data={{ basics, work, skills, education, certifications }} 
          variant="preview" 
        />
      </div>
    </div>
  )
}
