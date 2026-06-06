import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  GripVertical,
  Trash2,
  Building2,
  MapPin,
  DollarSign,
  ExternalLink,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Application } from "@/store/useTargetMatrixStore"
import { useTargetMatrixStore } from "@/store/useTargetMatrixStore"
import { MatchAnalysisDialog } from "./match-analysis-dialog"

interface KanbanCardProps {
  application: Application
  isDragOverlay?: boolean
}

export function KanbanCard({
  application,
  isDragOverlay = false,
}: KanbanCardProps) {
  const { deleteApplication } = useTargetMatrixStore()

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: application.id,
    data: {
      type: "card",
      application,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const formattedDate = new Date(application.dateAdded).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  )

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative",
        isDragging && "opacity-30",
        isDragOverlay && "scale-[1.02] rotate-1"
      )}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "group relative flex flex-col gap-3 rounded-lg border border-border/50 bg-card p-3.5 shadow-sm transition-all duration-150",
          "hover:border-primary/40 hover:shadow-md hover:shadow-primary/5",
          isDragOverlay && "border-primary/30 shadow-2xl shadow-primary/10"
        )}
      >
        {/* Drag handle + delete row */}
        <div className="flex items-center justify-between">
          <button
            {...attributes}
            {...listeners}
            aria-label="Drag application card"
            className="cursor-grab touch-none rounded p-0.5 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100 hover:text-muted-foreground active:cursor-grabbing"
          >
            <GripVertical className="size-3.5" />
          </button>
          <button
            aria-label={`Delete ${application.company} application`}
            onClick={() => deleteApplication(application.id)}
            className="rounded p-0.5 text-muted-foreground/30 opacity-0 transition-all group-hover:opacity-100 hover:text-destructive"
          >
            <Trash2 className="size-3" />
          </button>
        </div>

        {/* Company + Role */}
        <div className="-mt-1">
          <p className="font-heading text-sm leading-tight font-semibold text-foreground">
            {application.company}
          </p>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            {application.role}
          </p>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {application.location && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPin className="size-2.5 shrink-0" />
              {application.location}
            </span>
          )}
          {application.salary && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <DollarSign className="size-2.5 shrink-0" />
              {application.salary}
            </span>
          )}
          {application.url && (
            <a
              href={application.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View job posting for ${application.role} at ${application.company}`}
              className="flex items-center gap-1 text-[10px] text-primary/70 hover:text-primary"
            >
              <ExternalLink className="size-2.5 shrink-0" />
              Posting
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-border/30 pt-2.5">
          <div className="flex items-center gap-1.5">
            <Building2 className="size-2.5 shrink-0 text-muted-foreground/40" />
            <span className="text-[10px] text-muted-foreground/60">
              Added {formattedDate}
            </span>
          </div>
          <MatchAnalysisDialog application={application} />
        </div>
      </motion.div>
    </div>
  )
}
