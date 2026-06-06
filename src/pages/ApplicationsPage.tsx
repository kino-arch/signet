import {
  useTargetMatrixStore,
  KANBAN_COLUMNS,
} from "@/store/useTargetMatrixStore"
import { KanbanBoard } from "@/components/target-matrix/kanban-board"
import { AddTargetDialog } from "@/components/target-matrix/add-target-dialog"
import { Target, LayoutGrid } from "lucide-react"
import { LottieAnimation } from "@/components/ui/lottie-animation"
import emptyBoxTechData from "@/assets/animations/empty_box_tech.json"

export function ApplicationsPage() {
  const { applications } = useTargetMatrixStore()
  const stats = KANBAN_COLUMNS.map((col) => ({
    ...col,
    count: applications.filter((a) => a.status === col.id).length,
  }))

  const totalActive = applications.filter((a) => a.status !== "rejected").length

  return (
    <main className="flex flex-col gap-6 px-4 py-6 lg:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
              <Target className="size-4 text-primary" />
            </div>
            <h1 className="font-heading text-xl font-bold tracking-widest text-foreground uppercase">
              {"Job Tracker"}
            </h1>
          </div>
          <p className="pl-10 text-xs text-muted-foreground">
            {totalActive} {"active application"}
            {totalActive !== 1 ? "s" : ""} {"being tracked"}
          </p>
        </div>

        <AddTargetDialog />
      </div>

      {/* Status summary strip */}
      <div className="flex flex-wrap gap-2">
        {stats.map((col) => (
          <div
            key={col.id}
            className="flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-3 py-1"
          >
            <div
              className="size-1.5 rounded-full"
              style={{ backgroundColor: col.accent }}
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {col.label}
            </span>
            <span className="font-mono text-[10px] font-semibold text-foreground tabular-nums">
              {col.count}
            </span>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <div className="mb-4 flex items-center gap-2">
          <LayoutGrid className="size-3.5 text-muted-foreground" />
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            {"Application Board"}
          </span>
        </div>
        {applications.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl border border-border/40 bg-card/20">
            <LottieAnimation
              animationData={emptyBoxTechData}
              className="h-40 w-40 opacity-60"
            />
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {"No applications added yet"}
            </p>
          </div>
        ) : (
          <KanbanBoard />
        )}
      </div>
    </main>
  )
}
