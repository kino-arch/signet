import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, Users, Lock, Unlock, ChevronRight } from "lucide-react"
import { TEMPLATE_REGISTRY, getTemplateById } from "./templates/registry"
import { useAuthStore } from "@/store/useAuthStore"
import { cn } from "@/lib/utils"
import { trpc } from "@/providers/trpc"
import { toast } from "sonner"
import type { SlateData } from "./templates/registry"

interface TemplateMarketplaceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeTemplateId: string
  onSelectTemplate: (id: string) => void
  slateId: string
  slateData: SlateData
}

export function TemplateMarketplaceModal({
  open,
  onOpenChange,
  activeTemplateId,
  onSelectTemplate,
  slateId,
}: TemplateMarketplaceModalProps) {
  const { user, profile } = useAuthStore()
  const [selectedId, setSelectedId] = useState(activeTemplateId)
  const [isExporting, setIsExporting] = useState(false)

  const selectedTemplate = getTemplateById(selectedId)
  const isPremiumUser = (profile?.credits ?? 0) > 0
  const canUseTemplate = !selectedTemplate.isPremium || isPremiumUser

  // Setup TRPC mutation
  const unlockAndExportMutation = trpc.template.unlockAndExport.useMutation({
    onSuccess: (data) => {
      setIsExporting(false)
      toast.success(
        data.alreadyOwned
          ? "Exporting template..."
          : "Template unlocked! Exporting..."
      )
      // Switch active template on success
      onSelectTemplate(selectedId)
      onOpenChange(false)
      // Redirect or download using data.exportUrl
      console.log("Redirecting to", data.exportUrl)
    },
    onError: (err) => {
      setIsExporting(false)
      toast.error(err.message || "Failed to unlock template")
    },
  })

  const handleExportClick = () => {
    if (canUseTemplate) {
      // Just select and apply
      onSelectTemplate(selectedId)
      onOpenChange(false)
    } else {
      // Unlock flow
      if (!user) {
        toast.error("Please sign in to unlock premium templates.")
        return
      }
      setIsExporting(true)
      unlockAndExportMutation.mutate({
        userId: user.id,
        templateId: selectedId,
        slateId,
      })
    }
  }

  // Group templates by category
  const categories = ["professional", "modern", "technical", "creative"] as const
  const templatesByCategory = Object.values(TEMPLATE_REGISTRY).reduce(
    (acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = []
      }
      acc[template.category].push(template)
      return acc
    },
    {} as Record<string, typeof TEMPLATE_REGISTRY[keyof typeof TEMPLATE_REGISTRY][]>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[90vh] max-w-6xl flex-col gap-0 overflow-hidden border-border/20 bg-background/95 p-0 backdrop-blur-xl sm:rounded-2xl">
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Browse */}
          <div className="flex w-1/3 min-w-80 flex-col overflow-y-auto border-r border-border/20 bg-card/50 hide-scrollbar">
            <div className="sticky top-0 z-10 bg-background/80 p-6 backdrop-blur-md">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Template Gallery
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose a layout that fits your career stage.
              </p>
            </div>

            <div className="p-6 pt-0 space-y-8">
              {categories.map((category) => {
                const templates = templatesByCategory[category]
                if (!templates || templates.length === 0) return null

                return (
                  <div key={category} className="space-y-3">
                    <h3 className="text-xs font-bold tracking-widest text-primary uppercase">
                      {category}
                    </h3>
                    <div className="grid gap-3">
                      {templates.map((template) => {
                        const isSelected = selectedId === template.id
                        return (
                          <button
                            key={template.id}
                            onClick={() => setSelectedId(template.id)}
                            className={cn(
                              "group relative flex items-center gap-4 rounded-xl border p-3 text-left transition-all hover:bg-accent/50",
                              isSelected
                                ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                                : "border-border/30 bg-background/50"
                            )}
                          >
                            <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded bg-background shadow-inner">
                              <img
                                src={template.thumbnail}
                                alt={template.name}
                                className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                              />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <div className="flex items-center justify-between">
                                <h4 className="font-bold text-foreground">
                                  {template.name}
                                </h4>
                                {template.isPremium && (
                                  <Lock className="h-3 w-3 text-cyan-400" />
                                )}
                              </div>
                              <p className="truncate text-xs text-muted-foreground">
                                {template.nameCivilian}
                              </p>
                              <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                                <span className="flex items-center gap-0.5">
                                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                  {template.rating}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-0.5">
                                  <Users className="h-3 w-3" />
                                  {Math.round(template.usageCount / 1000)}k
                                </span>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Panel: Preview & Actions */}
          <div className="relative flex flex-1 flex-col items-center bg-black/40">
            {/* Action Bar */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-border/20 bg-background/95 p-6 backdrop-blur-xl">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {selectedTemplate.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {selectedTemplate.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent/50 px-2 py-0.5 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {selectedTemplate.isPremium && !isPremiumUser ? (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Requires Premium</p>
                    <p className="text-sm font-bold text-cyan-400">
                      {selectedTemplate.priceCredits} Credit
                    </p>
                  </div>
                ) : (
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-400">Included</p>
                  </div>
                )}
                <Button
                  onClick={handleExportClick}
                  disabled={isExporting}
                  className={cn(
                    "min-w-[140px] font-mono text-[10px] uppercase tracking-widest",
                    !canUseTemplate
                      ? "glow-cyan"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {isExporting ? (
                    "Processing..."
                  ) : canUseTemplate ? (
                    <>
                      Apply & Export <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      <Unlock className="mr-1.5 h-3.5 w-3.5" />
                      Unlock Template
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Preview Frame */}
            <div className="flex h-full w-full items-center justify-center overflow-hidden p-8 pb-32">
              <div className="relative flex aspect-[210/297] h-full max-h-[80vh] w-auto items-center justify-center overflow-hidden rounded-md bg-white shadow-2xl transition-all duration-500">
                {selectedTemplate.previewUrl ? (
                  <img
                    src={selectedTemplate.previewUrl}
                    alt={`${selectedTemplate.name} preview`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <p>Generating preview...</p>
                  </div>
                )}
                {/* Watermark overlay if not owned */}
                {!canUseTemplate && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-px">
                    <div className="rotate-[-35deg] border-4 border-cyan-500/30 px-8 py-4 text-4xl font-black uppercase tracking-[0.5em] text-cyan-500/30">
                      Preview
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
