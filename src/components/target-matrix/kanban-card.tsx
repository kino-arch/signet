import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  GripVertical,
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
import { NativeDelete } from "@/components/ui/native-delete"
import { trpc } from "@/providers/trpc"

interface KanbanCardProps {
  application: Application
  isDragOverlay?: boolean
}

export function KanbanCard({
  application,
  isDragOverlay = false,
}: KanbanCardProps) {
  const { deleteApplicationLocal } = useTargetMatrixStore()
  const deleteMutation = trpc.jobTracker.deleteApplication.useMutation()

  const handleDelete = () => {
    deleteApplicationLocal(application.id)
    deleteMutation.mutate({ id: application.id })
  }

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
          "group relative flex flex-col gap-3 border border-nordic-border bg-nordic-surface/80 backdrop-blur-md p-4 transition-all duration-300 cursor-pointer hover:shadow-[0_4px_20px_-10px_rgba(255,255,255,0.1)] hover:border-nordic-accent",
          isDragOverlay && "border-nordic-accent shadow-[0_8px_30px_-10px_rgba(255,255,255,0.15)] bg-nordic-surface"
        )}
      >
        {/* Subtle hover gradient */}
        <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-nordic-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Drag handle + delete row */}
        <div className="flex items-center justify-between">
          <button
            {...attributes}
            {...listeners}
            aria-label="Drag application card"
            className="cursor-grab touch-none rounded-none p-0.5 text-nordic-text-tertiary opacity-0 transition-opacity group-hover:opacity-100 hover:text-nordic-text-secondary hover:bg-nordic-border active:cursor-grabbing"
          >
            <GripVertical className="size-3.5" />
          </button>
          <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <NativeDelete onDelete={handleDelete} />
          </div>
        </div>

        {/* Company + Role */}
        <div className="-mt-1">
          <h4 className="text-sm font-medium text-nordic-text">
            {application.company}
          </h4>
          <p className="mt-0.5 text-xs leading-snug text-nordic-text-secondary">
            {application.role}
          </p>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {application.location && (
            <span className="flex items-center gap-1 text-[10px] text-nordic-text-tertiary">
              <MapPin className="size-2.5 shrink-0" />
              {application.location}
            </span>
          )}
          {application.salary && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-nordic-accent">
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
              className="flex items-center gap-1 text-[10px] text-nordic-accent/80 hover:text-nordic-accent"
            >
              <ExternalLink className="size-2.5 shrink-0" />
              Posting
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-nordic-border pt-2.5 mt-1">
          <div className="flex items-center gap-1.5">
            <Building2 className="size-2.5 shrink-0 text-nordic-text-tertiary" />
            <span className="text-[10px] text-nordic-text-tertiary/70 uppercase tracking-wider font-semibold">
              Added {formattedDate}
            </span>
          </div>
          <MatchAnalysisDialog application={application} />
        </div>
      </motion.div>
    </div>
  )
}
