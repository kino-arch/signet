import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import type { Application, KanbanColumn as KanbanColumnDef } from "@/store/useTargetMatrixStore";
import { KanbanCard } from "./kanban-card";

interface KanbanColumnProps {
  column: KanbanColumnDef;
  applications: Application[];
  isOver?: boolean;
}

export function KanbanColumn({ column, applications, isOver }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: "column", status: column.id },
  });

  const ids = applications.map((a) => a.id);

  return (
    <div className="flex w-[280px] shrink-0 flex-col gap-0">
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: column.accent }}
            aria-hidden="true"
          />
          <h2 className="font-heading text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {column.label}
          </h2>
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-mono text-[10px] tabular-nums transition-colors",
            applications.length > 0
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {applications.length}
        </span>
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[200px] flex-col gap-2.5 rounded-xl border border-dashed border-border/40 p-2.5 transition-all duration-150",
          isOver && "border-primary/50 bg-primary/[0.03] shadow-inner"
        )}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {applications.map((app) => (
            <KanbanCard key={app.id} application={app} />
          ))}
        </SortableContext>

        {applications.length === 0 && (
          <div className="flex flex-1 items-center justify-center">
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground/40 uppercase">
              Drop targets here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
