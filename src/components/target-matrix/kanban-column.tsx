import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "@/lib/utils"
import type {
  Application,
  KanbanColumn as KanbanColumnDef,
} from "@/store/useTargetMatrixStore"
import { KanbanCard } from "./kanban-card"

interface KanbanColumnProps {
  column: KanbanColumnDef
  applications: Application[]
  isOver?: boolean
}

export function KanbanColumn({
  column,
  applications,
  isOver,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: "column", status: column.id },
  })

  const ids = applications.map((a) => a.id)

  return (
    <div className="flex w-72 shrink-0 flex-col gap-0 px-2">
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-nordic-text">{column.label}</h3>
        <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-md bg-nordic-surface-hover px-1.5 text-xs font-medium text-nordic-text-secondary tabular-nums">
          {applications.length}
        </span>
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[200px] flex-col gap-3 transition-all duration-150",
          isOver && "bg-nordic-surface-hover/50 rounded-xl"
        )}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {applications.map((app) => (
            <KanbanCard key={app.id} application={app} />
          ))}
        </SortableContext>

        {applications.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-nordic-border p-4 text-center">
            <p className="text-xs text-nordic-text-tertiary">No applications</p>
          </div>
        )}
      </div>
    </div>
  )
}
