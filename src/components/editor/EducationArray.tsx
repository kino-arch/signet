import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDataSlateStore } from "@/store/useDataSlateStore";
import type { EducationEntry } from "@/store/useDataSlateStore";
import { cn } from "@/lib/utils";

// ─── Single Sortable Education Block ──────────────────────────────────────────
function EducationBlock({ entry }: { entry: EducationEntry }) {
  const { updateEducationEntry, removeEducationEntry } = useDataSlateStore();
  const [expanded, setExpanded] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const displayTitle = entry.institution || entry.studyType
    ? `${entry.studyType || "Degree"}${entry.institution ? ` · ${entry.institution}` : ""}`
    : "New Education Entry";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-lg border transition-all duration-200",
        isDragging
          ? "border-primary/60 bg-primary/5 shadow-lg shadow-primary/10 opacity-90 z-50"
          : "border-border/40 bg-card/30 hover:border-border/70"
      )}
    >
      {/* Collapsed Header Row */}
      <div
        className="flex items-center gap-2 p-3 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        <button
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="touch-none shrink-0 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors p-1 rounded"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-foreground truncate block">{displayTitle}</span>
          {entry.area && (
            <span className="text-[10px] font-mono text-muted-foreground">{entry.area}</span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => removeEducationEntry(entry.id)}
            className="p-1.5 text-muted-foreground/50 hover:text-destructive transition-colors rounded"
            aria-label="Remove entry"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button className="p-1.5 text-muted-foreground/50 hover:text-foreground transition-colors">
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Panel */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-border/20 space-y-3 animate-in slide-in-from-top-1 duration-150">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Institution</Label>
              <Input
                value={entry.institution}
                onChange={(e) => updateEducationEntry(entry.id, { institution: e.target.value })}
                className="h-8 bg-background/50 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Degree Type</Label>
              <Input
                value={entry.studyType}
                onChange={(e) => updateEducationEntry(entry.id, { studyType: e.target.value })}
                placeholder="Bachelor of Science"
                className="h-8 bg-background/50 text-sm"
              />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Field of Study</Label>
              <Input
                value={entry.area}
                onChange={(e) => updateEducationEntry(entry.id, { area: e.target.value })}
                placeholder="Computer Science"
                className="h-8 bg-background/50 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Start Date</Label>
              <Input
                value={entry.startDate}
                onChange={(e) => updateEducationEntry(entry.id, { startDate: e.target.value })}
                placeholder="2015-09"
                className="h-8 bg-background/50 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">End Date</Label>
              <Input
                value={entry.endDate}
                onChange={(e) => updateEducationEntry(entry.id, { endDate: e.target.value })}
                placeholder="2019-06"
                className="h-8 bg-background/50 text-sm"
              />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">GPA / Score (optional)</Label>
              <Input
                value={entry.score}
                onChange={(e) => updateEducationEntry(entry.id, { score: e.target.value })}
                placeholder="3.8 / 4.0"
                className="h-8 bg-background/50 text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────
export function EducationArray() {
  const { education, addEducationEntry, reorderEducationEntries, setSyncPaused } = useDataSlateStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = (_e: DragStartEvent) => {
    setSyncPaused(true);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setSyncPaused(false);
    const { active, over } = e;
    if (over && active.id !== over.id) {
      reorderEducationEntries(String(active.id), String(over.id));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-border/20 pb-2">
        <h3 className="text-sm font-bold text-primary tracking-widest uppercase">Education</h3>
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
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/30 p-6 cursor-pointer hover:border-border/50 transition-colors text-center"
          onClick={addEducationEntry}
        >
          <Plus className="h-5 w-5 text-muted-foreground/50" />
          <p className="text-xs text-muted-foreground">Add your first education entry</p>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={education.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {education.map((entry) => (
              <EducationBlock key={entry.id} entry={entry} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
