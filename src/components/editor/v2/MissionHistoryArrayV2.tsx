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
import { SignetButton } from "@/components/primitives/SignetButton"
import { SignetCard } from "@/components/primitives/SignetCard"
import { SignetInput } from "@/components/primitives/SignetInput"
import { SignetIcon } from "@/components/primitives/SignetIcon"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import type { WorkEntry } from "@/store/useDataSlateStore"
import { ReforgeModal } from "@/components/editor/ReforgeModal"
import { HighlightsEditor } from "@/components/editor/HighlightsEditor"
import { ImpactScorePanel } from "@/components/editor/ImpactScorePanel"
import { cn } from "@/lib/utils"
import { telemetry } from "@/lib/telemetry"

// ─── Single Sortable Work Block V2 ───────────────────────────────────────────────
function WorkBlockV2({ entry }: { entry: WorkEntry }) {
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
    <div ref={setNodeRef} style={style} className="relative group">
      <SignetCard
        variant={isDragging ? 'glow' : 'default'}
        className={cn(
          "transition-all duration-300",
          isDragging ? "z-50 opacity-90" : "hover:border-[var(--color-action-primary)]/50"
        )}
      >
        {/* Collapsed Header Row */}
        <div
          className="flex cursor-pointer items-center gap-2 p-3 select-none"
          onClick={() => {
            setExpanded((v) => !v);
            telemetry.track('v2_editor_mission_toggle', { expanded: !expanded });
          }}
        >
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 cursor-grab touch-none rounded p-1 text-signet-slate-500 transition-colors hover:text-white active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </button>

          {/* Title */}
          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-white">
              {displayTitle}
            </span>
            {(entry.startDate || entry.endDate) && (
              <span className="font-mono text-xs text-signet-slate-400">
                {entry.startDate} {"→"} {entry.endDate || "Present"}
              </span>
            )}
          </div>

          {/* Actions */}
          <div
            className="flex shrink-0 items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                removeWorkEntry(entry.id);
                telemetry.track('v2_editor_mission_delete');
              }}
              className="rounded p-1.5 text-signet-slate-500 transition-colors hover:text-[var(--color-feedback-error)]"
              aria-label="Remove entry"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="p-1.5 text-signet-slate-500 transition-colors hover:text-white"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Panel */}
        {expanded && (
          <div className="animate-in space-y-4 border-t border-[var(--color-action-secondary)] px-4 pt-4 pb-4 duration-150 slide-in-from-top-1">
            <div className="grid grid-cols-2 gap-4">
              <SignetInput
                label="Company"
                value={entry.name}
                onChange={(e) => updateWorkEntry(entry.id, { name: e.target.value })}
              />
              <SignetInput
                label="Role / Title"
                value={entry.position}
                onChange={(e) => updateWorkEntry(entry.id, { position: e.target.value })}
              />
              <SignetInput
                label="Start Date"
                value={entry.startDate}
                onChange={(e) => updateWorkEntry(entry.id, { startDate: e.target.value })}
                placeholder="2022-01"
              />
              <SignetInput
                label="End Date"
                value={entry.endDate}
                onChange={(e) => updateWorkEntry(entry.id, { endDate: e.target.value })}
                placeholder="Present"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-signet-slate-400 mb-1">Summary (Paragraph)</label>
              <textarea
                value={entry.summary}
                onChange={(e) => updateWorkEntry(entry.id, { summary: e.target.value })}
                placeholder="Brief overview of the role..."
                className="w-full bg-[var(--color-surface-base)] border border-[var(--component-input-border)] rounded-signet px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:border-[var(--component-input-focusRing)] focus-visible:shadow-glow-focus min-h-[100px]"
              />
            </div>

            <HighlightsEditor entry={entry} />
            <ImpactScorePanel entry={entry} />

            {/* AI Reforge Button */}
            <SignetButton
              variant="secondary"
              isLoading={entry.ai_loading}
              onClick={() => {
                setAiLoading(entry.id, true);
                telemetry.track('v2_editor_mission_reforge_ai');
              }}
              className="w-full"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {entry.ai_loading ? "Reforging..." : "Reforge with AI"}
            </SignetButton>

            <ReforgeModal entry={entry} />
          </div>
        )}
      </SignetCard>
    </div>
  )
}

// ─── Mission History Section V2 ──────────────────────────────────────────────────
export function MissionHistoryArrayV2() {
  const { work, addWorkEntry, reorderWorkEntries, setSyncPaused } = useDataSlateStore()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const handleDragStart = () => setSyncPaused(true)

  const handleDragEnd = (e: DragEndEvent) => {
    setSyncPaused(false)
    const { active, over } = e
    if (over && active.id !== over.id) {
      reorderWorkEntries(String(active.id), String(over.id))
      telemetry.track('v2_editor_mission_reorder');
    }
  }

  const handleDragCancel = () => setSyncPaused(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[var(--color-action-secondary)] pb-2">
        <h3 className="text-sm font-bold tracking-widest text-[var(--color-action-primary)] uppercase">
          Experience
        </h3>
        <SignetButton
          variant="tertiary"
          size="sm"
          onClick={() => {
            addWorkEntry();
            telemetry.track('v2_editor_mission_add');
          }}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Entry
        </SignetButton>
      </div>

      {work.length === 0 && (
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-signet border border-dashed border-signet-slate-500 p-8 text-center transition-colors hover:border-[var(--color-action-primary)]"
          onClick={addWorkEntry}
        >
          <Plus className="h-6 w-6 text-signet-slate-500" />
          <p className="text-sm text-signet-slate-400">Add your first mission entry</p>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={work.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {work.map((entry) => (
              <WorkBlockV2 key={entry.id} entry={entry} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
