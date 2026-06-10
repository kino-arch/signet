import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import type { WorkEntry } from "@/store/useDataSlateStore"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { AutopsyBullet } from "./AutopsyBullet"
import type { GhostBullet } from "@/lib/ghost-schema"
import { sealBullet } from "@/lib/provenance"
import { computeSemanticTrajectory } from "@/lib/semantic-diff"
import { useState } from "react"
import { toast } from "sonner"
import { HighlightRewriteAssistant } from "./HighlightRewriteAssistant"

interface HighlightsEditorProps {
  entry: WorkEntry
}

export function HighlightsEditor({ entry }: HighlightsEditorProps) {
  const { updateWorkEntry } = useDataSlateStore()
  const highlights = entry.highlights || []
  const [editingIdx, setEditingIdx] = useState<number | null>(null)

  const ghostBullets: GhostBullet[] =
    entry.ghostBullets ||
    highlights.map((text) => ({
      text,
      provenance: "user_verified",
      confidence: 1.0,
      ghostNote: null,
      userAction: "none",
      suggestedRange: null,
      sourceFidelity: "faithful",
      originalClaim: text,
    }))

  const syncToStore = (newGhostBullets: GhostBullet[]) => {
    updateWorkEntry(entry.id, {
      ghostBullets: newGhostBullets,
      highlights: newGhostBullets.map((b) => b.text),
    })
  }

  const handleUpdateGhost = async (
    index: number,
    updatedBullet: GhostBullet | null
  ) => {
    const newGhostBullets = [...ghostBullets]
    if (updatedBullet === null) {
      newGhostBullets.splice(index, 1)
    } else {
      newGhostBullets[index] = await sealBullet(updatedBullet)
      
      // Calculate Semantic Impact Shift if the text actually changed
      const oldText = ghostBullets[index].text
      const newText = updatedBullet.text
      if (oldText && oldText !== newText) {
        const { shift } = await computeSemanticTrajectory(oldText, newText)
        if (shift > 0.05) {
          toast.success("Semantic Commit Logged", {
            description: `Impact shifted by ${(shift * 100).toFixed(1)}%. Vector hash sealed.`,
          })
        }
      }
    }
    syncToStore(newGhostBullets)
  }

  const handleManualTextUpdate = async (index: number, text: string) => {
    const newGhostBullets = [...ghostBullets]
    const baseBullet = {
      ...newGhostBullets[index],
      text,
      provenance: "user_verified" as const,
      confidence: 1.0,
    }
    newGhostBullets[index] = await sealBullet(baseBullet)
    syncToStore(newGhostBullets)
  }

  const handleAdd = () => {
    const newGhostBullets = [
      ...ghostBullets,
      {
        text: "",
        provenance: "user_verified",
        confidence: 1.0,
        ghostNote: null,
        userAction: "none",
        suggestedRange: null,
        sourceFidelity: "faithful",
        originalClaim: "",
      } as GhostBullet,
    ]
    syncToStore(newGhostBullets)
    setEditingIdx(newGhostBullets.length - 1)
  }

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <Label className="text-[10px] tracking-widest text-muted-foreground uppercase">
          Highlights (Bullets)
        </Label>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 gap-1 px-2 text-[10px] text-primary hover:bg-primary/10"
          onClick={handleAdd}
        >
          <Plus className="h-3 w-3" /> Add Bullet
        </Button>
      </div>

      <div className="space-y-2">
        {ghostBullets.map((bullet, idx) => {
          const isEditing = editingIdx === idx || bullet.text === ""

          return (
            <div key={idx} className="group flex items-start gap-2">
              <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />

              <div
                className="min-w-0 flex-1"
                onClick={() => {
                  if (bullet.provenance === "user_verified") setEditingIdx(idx)
                }}
              >
                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      className="nordic-input w-full resize-none text-sm"
                      value={bullet.text}
                      rows={2}
                      onChange={(e) =>
                        handleManualTextUpdate(idx, e.target.value)
                      }
                      autoFocus={editingIdx === idx}
                      placeholder="E.g., Increased conversion by 15%..."
                      aria-label="Edit highlight bullet"
                    />
                    <HighlightRewriteAssistant 
                      currentText={bullet.text}
                      onApply={(text) => {
                        handleManualTextUpdate(idx, text)
                        setEditingIdx(null)
                      }}
                    />
                    <div className="flex justify-end">
                      <Button size="sm" variant="ghost" className="h-6 text-[10px] uppercase tracking-wider" onClick={(e) => { e.stopPropagation(); setEditingIdx(null) }}>
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <AutopsyBullet
                    bullet={bullet}
                    onUpdate={(updated) => handleUpdateGhost(idx, updated)}
                  />
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUpdateGhost(idx, null)}
                className="h-8 w-8 shrink-0 p-0 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
