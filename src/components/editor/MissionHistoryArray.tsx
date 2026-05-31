import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ChevronDown, ChevronUp, Plus, Trash2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDataSlateStore } from "@/store/useDataSlateStore";
import type { WorkEntry } from "@/store/useDataSlateStore";
import { ReforgeModal } from "@/components/editor/ReforgeModal";
import { cn } from "@/lib/utils";

// ─── Single Sortable Work Block ───────────────────────────────────────────────
function WorkBlock({ entry }: { entry: WorkEntry }) {
  const { updateWorkEntry, removeWorkEntry, setAiLoading } = useDataSlateStore();
  const [expanded, setExpanded] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const displayTitle = entry.position || entry.name
    ? `${entry.position || "Untitled Role"}${entry.name ? ` · ${entry.name}` : ""}`
    : "New Mission Entry";

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
          <span className="block truncate text-sm font-medium text-foreground">{displayTitle}</span>
          {(entry.startDate || entry.endDate) && (
            <span className="font-mono text-[10px] text-muted-foreground">
              {entry.startDate} {entry.endDate ? `→ ${entry.endDate}` : "→ Present"}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => removeWorkEntry(entry.id)}
            className="rounded p-1.5 text-muted-foreground/50 transition-colors hover:text-destructive"
            aria-label="Remove entry"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button className="p-1.5 text-muted-foreground/50 transition-colors hover:text-foreground">
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Panel */}
      {expanded && (
        <div className="animate-in space-y-3 border-t border-border/20 px-4 pt-1 pb-4 duration-150 slide-in-from-top-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] tracking-widest text-muted-foreground uppercase">Company</Label>
              <Input
                value={entry.name}
                onChange={(e) => updateWorkEntry(entry.id, { name: e.target.value })}
                className="h-8 bg-background/50 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] tracking-widest text-muted-foreground uppercase">Role / Title</Label>
              <Input
                value={entry.position}
                onChange={(e) => updateWorkEntry(entry.id, { position: e.target.value })}
                className="h-8 bg-background/50 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] tracking-widest text-muted-foreground uppercase">Start Date</Label>
              <Input
                value={entry.startDate}
                onChange={(e) => updateWorkEntry(entry.id, { startDate: e.target.value })}
                placeholder="2022-01"
                className="h-8 bg-background/50 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] tracking-widest text-muted-foreground uppercase">End Date</Label>
              <Input
                value={entry.endDate}
                onChange={(e) => updateWorkEntry(entry.id, { endDate: e.target.value })}
                placeholder="Present"
                className="h-8 bg-background/50 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] tracking-widest text-muted-foreground uppercase">Summary</Label>
            <textarea
              value={entry.summary}
              onChange={(e) => updateWorkEntry(entry.id, { summary: e.target.value })}
              className="min-h-[80px] w-full resize-none rounded-md border border-input bg-background/50 p-2.5 text-sm text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              placeholder="Describe your responsibilities and impact..."
            />
          </div>

          {/* AI Reforge Button */}
          <Button
            variant="outline"
            size="sm"
            disabled={entry.ai_loading}
            onClick={() => setAiLoading(entry.id, true)}
            className="w-full gap-2 border-primary/30 font-mono text-xs tracking-widest text-primary uppercase hover:border-primary/60 hover:bg-primary/10"
          >
            <Wand2 className="h-3.5 w-3.5" />
            {entry.ai_loading ? "Reforging..." : "Reforge with AI"}
          </Button>

          {/* System Override Modal — inline streaming comparison */}
          <ReforgeModal entry={entry} />
        </div>
      )}
    </div>
  );
}

// ─── Mission History Section ──────────────────────────────────────────────────
export function MissionHistoryArray() {
  const { work, addWorkEntry, reorderWorkEntries, setSyncPaused } = useDataSlateStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = () => {
    setSyncPaused(true);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setSyncPaused(false);
    const { active, over } = e;
    if (over && active.id !== over.id) {
      reorderWorkEntries(String(active.id), String(over.id));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-border/20 pb-2">
        <h3 className="text-sm font-bold tracking-widest text-primary uppercase">Mission History</h3>
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
          <p className="text-xs text-muted-foreground">Add your first mission entry</p>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={work.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {work.map((entry) => (
              <WorkBlock key={entry.id} entry={entry} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
