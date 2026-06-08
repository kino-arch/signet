import { useState } from "react"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Wand2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataStreamInput } from "@/components/editor/primitives/DataStreamInput"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import type { WorkEntry } from "@/store/useDataSlateStore"
import { ReforgeModal } from "@/components/editor/ReforgeModal"
import { HighlightsEditor } from "@/components/editor/HighlightsEditor"
import { ImpactScorePanel } from "@/components/editor/ImpactScorePanel"
import { cn } from "@/lib/utils"

// ─── Single Sortable Work Block ───────────────────────────────────────────────
function WorkBlock({ entry }: { entry: WorkEntry }) {
  const { updateWorkEntry, removeWorkEntry, setAiLoading } = useDataSlateStore()
  const [expanded, setExpanded] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const displayTitle =
    entry.position || entry.name
      ? `${entry.position || "Untitled Role"}${entry.name ? ` · ${entry.name}` : ""}`
      : "New Mission Entry"

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-lg border transition-all duration-300",
        isDragging
          ? "z-50 border-primary/60 bg-primary/10 opacity-90 shadow-[0_0_30px_rgba(var(--primary),0.2)] ring-1 ring-primary/50"
          : "border-white/10 bg-black/40 hover:border-white/20 hover:bg-black/60 hover:shadow-xl hover:ring-1 hover:ring-primary/30"
      )}
    >
      {/* Collapsed Header Row */}
      <div
        className="flex cursor-pointer items-center gap-2 p-3 select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 cursor-grab touch-none rounded p-1 text-muted-foreground/40 transition-colors hover:text-muted-foreground active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Title */}
        <div className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">
            {displayTitle}
          </span>
          {(entry.startDate || entry.endDate) && (
            <span className="font-mono text-[10px] text-muted-foreground">
              {entry.startDate}{" "}
              {entry.endDate ? `→ ${entry.endDate}` : "→ Present"}
            </span>
          )}
        </div>

        {/* Actions */}
        <div
          className="flex shrink-0 items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => removeWorkEntry(entry.id)}
            className="rounded p-1.5 text-muted-foreground/50 transition-colors hover:text-destructive"
            aria-label="Remove entry"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="p-1.5 text-muted-foreground/50 transition-colors hover:text-foreground"
          >
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Panel */}
      {expanded && (
        <div className="animate-in space-y-3 border-t border-border/20 px-4 pt-1 pb-4 duration-150 slide-in-from-top-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <DataStreamInput
                label="Company"
                value={entry.name}
                onChange={(e) =>
                  updateWorkEntry(entry.id, { name: e.target.value })
                }
                unit="chars"
              />
            </div>
            <div className="space-y-1.5">
              <DataStreamInput
                label="Role / Title"
                value={entry.position}
                onChange={(e) =>
                  updateWorkEntry(entry.id, { position: e.target.value })
                }
                unit="chars"
              />
            </div>
            <div className="space-y-1.5">
              <DataStreamInput
                label="Start Date"
                value={entry.startDate}
                onChange={(e) =>
                  updateWorkEntry(entry.id, { startDate: e.target.value })
                }
                placeholder="2022-01"
                unit={null}
              />
            </div>
            <div className="space-y-1.5">
              <DataStreamInput
                label="End Date"
                value={entry.endDate}
                onChange={(e) =>
                  updateWorkEntry(entry.id, { endDate: e.target.value })
                }
                placeholder="Present"
                unit={null}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-widest text-nordic-text-secondary font-mono">Summary (Paragraph)</Label>
            <Textarea
              value={entry.summary}
              onChange={(e) =>
                updateWorkEntry(entry.id, { summary: e.target.value })
              }
              placeholder="Brief overview of the role..."
              className="min-h-[80px]"
            />
          </div>

          <HighlightsEditor entry={entry} />

          <ImpactScorePanel entry={entry} />

          {/* AI Reforge Button */}
          <div className="group/reforge relative">
            <div className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-emerald-500/0 via-primary/50 to-emerald-500/0 opacity-0 blur transition duration-500 group-hover/reforge:opacity-100" />
            <Button
              variant="outline"
              size="sm"
              disabled={entry.ai_loading}
              onClick={() => setAiLoading(entry.id, true)}
              className="relative w-full gap-2 border-primary/30 bg-black/50 font-mono text-xs tracking-widest text-primary uppercase transition-all duration-300 hover:border-primary/60 hover:bg-primary/20 hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            >
              <Wand2 className="h-3.5 w-3.5" />
              {entry.ai_loading ? "Reforging..." : "Reforge with AI"}
            </Button>
          </div>

          {/* System Override Modal — inline streaming comparison */}
          <ReforgeModal entry={entry} />
        </div>
      )}
    </div>
  )
}

// ─── Mission History Section ──────────────────────────────────────────────────
export function MissionHistoryArray() {
  const { work, addWorkEntry, reorderWorkEntries, setSyncPaused } =
    useDataSlateStore()
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const handleDragStart = () => {
    setSyncPaused(true)
  }

  const handleDragEnd = (e: DragEndEvent) => {
    setSyncPaused(false)
    const { active, over } = e
    if (over && active.id !== over.id) {
      reorderWorkEntries(String(active.id), String(over.id))
    }
  }

  const handleDragCancel = () => {
    setSyncPaused(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-border/20 pb-2">
        <h3 className="text-sm font-bold tracking-widest text-primary uppercase">
          {"Experience"}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={addWorkEntry}
          className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Entry
        </Button>
      </div>

      {work.length === 0 && (
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/30 p-6 text-center transition-colors hover:border-border/50"
          onClick={addWorkEntry}
        >
          <Plus className="h-5 w-5 text-muted-foreground/50" />
          <p className="text-xs text-muted-foreground">
            Add your first mission entry
          </p>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={work.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {work.map((entry) => (
              <WorkBlock key={entry.id} entry={entry} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

