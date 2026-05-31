import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import {
  useTargetMatrixStore,
  KANBAN_COLUMNS,
  type Application,
  type ApplicationStatus,
} from "@/store/useTargetMatrixStore";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";

export function KanbanBoard() {
  const { applications, moveApplication, reorderApplications } = useTargetMatrixStore();
  const [activeApplication, setActiveApplication] = useState<Application | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // prevent accidental drags on click
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const app = applications.find((a) => a.id === event.active.id);
    setActiveApplication(app ?? null);
  }, [applications]);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event;
    setOverId(over ? String(over.id) : null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveApplication(null);
      setOverId(null);

      if (!over) return;

      const activeApp = applications.find((a) => a.id === active.id);
      if (!activeApp) return;

      const overIsColumn = KANBAN_COLUMNS.some((c) => c.id === over.id);
      const overApp = applications.find((a) => a.id === over.id);

      // Determine target status
      const targetStatus: ApplicationStatus = overIsColumn
        ? (over.id as ApplicationStatus)
        : overApp
        ? overApp.status
        : activeApp.status;

      if (targetStatus !== activeApp.status) {
        // Move to a different column
        moveApplication(activeApp.id, targetStatus);
      } else if (!overIsColumn && overApp && active.id !== over.id) {
        // Reorder within the same column
        const colApps = applications
          .filter((a) => a.status === activeApp.status)
          .map((a) => a.id);
        const fromIdx = colApps.indexOf(String(active.id));
        const toIdx = colApps.indexOf(String(over.id));
        if (fromIdx !== -1 && toIdx !== -1) {
          const reordered = arrayMove(colApps, fromIdx, toIdx);
          reorderApplications(activeApp.status, reordered);
        }
      }
    },
    [applications, moveApplication, reorderApplications]
  );

  const getColumnApplications = (status: ApplicationStatus) =>
    applications.filter((a) => a.status === status);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-5 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            applications={getColumnApplications(col.id)}
            isOver={overId === col.id}
          />
        ))}
      </div>

      {createPortal(
        <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.18,0.67,0.6,1.22)" }}>
          {activeApplication && (
            <KanbanCard application={activeApplication} isDragOverlay />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
