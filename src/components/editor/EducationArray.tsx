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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataStreamInput } from "@/components/editor/primitives/DataStreamInput"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import type { EducationEntry } from "@/store/useDataSlateStore"
import { cn } from "@/lib/utils"

// ─── Single Sortable Education Block ──────────────────────────────────────────
function EducationBlock({ entry }: { entry: EducationEntry }) {
  const { updateEducationEntry, removeEducationEntry } = useDataSlateStore()
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
    entry.institution || entry.studyType
      ? `${entry.studyType || "Degree"}${entry.institution ? ` · ${entry.institution}` : ""}`
      : "New Education Entry"

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-lg border transition-all duration-200",
        isDragging
          ? "z-50 border-primary/60 bg-primary/5 opacity-90 shadow-lg shadow-primary/10"
          : "border-border/40 bg-card/30 hover:border-border/70"
      )}
    >
      {/* Collapsed Header Row */}
      <div
        className="flex cursor-pointer items-center gap-2 p-3 select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        <button
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 cursor-grab touch-none rounded p-1 text-muted-foreground/40 transition-colors hover:text-muted-foreground active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">
            {displayTitle}
          </span>
          {entry.area && (
            <span className="font-mono text-[10px] text-muted-foreground">
              {entry.area}
            </span>
          )}
        </div>

        <div
          className="flex shrink-0 items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => removeEducationEntry(entry.id)}
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
                label="Institution"
                value={entry.institution}
                onChange={(e) =>
                  updateEducationEntry(entry.id, {
                    institution: e.target.value,
                  })
                }
                unit="chars"
              />
            </div>
            <div className="space-y-1.5">
              <DataStreamInput
                label="Degree Type"
                value={entry.studyType}
                onChange={(e) =>
                  updateEducationEntry(entry.id, { studyType: e.target.value })
                }
                placeholder="Bachelor of Science"
                unit="chars"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <DataStreamInput
                label="Field of Study"
                value={entry.area}
                onChange={(e) =>
                  updateEducationEntry(entry.id, { area: e.target.value })
                }
                placeholder="Computer Science"
                unit="chars"
              />
            </div>
            <div className="space-y-1.5">
              <DataStreamInput
                label="Start Date"
                value={entry.startDate}
                onChange={(e) =>
                  updateEducationEntry(entry.id, { startDate: e.target.value })
                }
                placeholder="2015-09"
                unit={null}
              />
            </div>
            <div className="space-y-1.5">
              <DataStreamInput
                label="End Date"
                value={entry.endDate}
                onChange={(e) =>
                  updateEducationEntry(entry.id, { endDate: e.target.value })
                }
                placeholder="2019-06"
                unit={null}
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <DataStreamInput
                label="GPA / Score (optional)"
                value={entry.score}
                onChange={(e) =>
                  updateEducationEntry(entry.id, { score: e.target.value })
                }
                placeholder="3.8 / 4.0"
                unit={null}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Education Section ────────────────────────────────────────────────────────
export function EducationArray() {
  const {
    education,
    addEducationEntry,
    reorderEducationEntries,
    setSyncPaused,
  } = useDataSlateStore()

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
      reorderEducationEntries(String(active.id), String(over.id))
    }
  }

  const handleDragCancel = () => {
    setSyncPaused(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-border/20 pb-2">
        <h3 className="text-sm font-bold tracking-widest text-primary uppercase">
          Education
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={addEducationEntry}
          className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Entry
        </Button>
      </div>

      {education.length === 0 && (
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/30 p-6 text-center transition-colors hover:border-border/50"
          onClick={addEducationEntry}
        >
          <Plus className="h-5 w-5 text-muted-foreground/50" />
          <p className="text-xs text-muted-foreground">
            Add your first education entry
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
          items={education.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {education.map((entry) => (
              <EducationBlock key={entry.id} entry={entry} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
