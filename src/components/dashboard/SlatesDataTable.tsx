import React, { useEffect, useMemo, useState } from "react"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import {

  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  MoreVertical,
  Pin,
  Pencil,
  Copy,
  Trash2,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { relativeTime } from "@/lib/utils"

// ─── Slate Row Schema ─────────────────────────────────────────────────────────
export interface SlateRow {
  id: string
  name: string
  targetCompany: string
  targetRole: string
  atsScore: number
  ghostScore: number
  lastModified: Date
  status: "active" | "draft" | "archived"
}

// Mock data — replace with real store data in Phase 2
const MOCK_SLATES: SlateRow[] = [
  {
    id: "1",
    name: "Senior Engineer @ Google",
    targetCompany: "Google",
    targetRole: "Senior Software Engineer",
    atsScore: 87,
    ghostScore: 92,
    lastModified: new Date(Date.now() - 2 * 3600 * 1000),
    status: "active",
  },
  {
    id: "2",
    name: "PM Role @ Airbnb",
    targetCompany: "Airbnb",
    targetRole: "Product Manager",
    atsScore: 74,
    ghostScore: 78,
    lastModified: new Date(Date.now() - 24 * 3600 * 1000),
    status: "draft",
  },
  {
    id: "3",
    name: "Frontend Dev @ Vercel",
    targetCompany: "Vercel",
    targetRole: "Frontend Engineer",
    atsScore: 91,
    ghostScore: 88,
    lastModified: new Date(Date.now() - 48 * 3600 * 1000),
    status: "draft",
  },
]

// ─── Score Color Helper ───────────────────────────────────────────────────────
function scoreColor(score: number): string {
  if (score >= 85) return "text-emerald-400"
  if (score >= 70) return "text-amber-400"
  return "text-red-400"
}



// ─── Drag Handle ─────────────────────────────────────────────────────────────
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id })
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent cursor-grab active:cursor-grabbing"
      aria-label="Drag to reorder slate"
    >
      <GripVertical className="size-3.5" />
    </Button>
  )
}

// ─── Draggable Row ────────────────────────────────────────────────────────────
function DraggableRow({ row }: { row: Row<SlateRow> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })
  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 hover:bg-sidebar-accent/50 transition-colors"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="py-2.5">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

// ─── Column Definitions ───────────────────────────────────────────────────────
const columns: ColumnDef<SlateRow>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all slates"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "name",
    header: "Slate",
    cell: ({ row }) => (
      <Link
        to="/editor"
        className="font-medium text-sm hover:text-primary transition-colors truncate max-w-[200px] block"
      >
        {row.original.name}
      </Link>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "targetCompany",
    header: "Target",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground truncate max-w-[120px]">
        {row.original.targetCompany || "—"}
      </div>
    ),
  },
  {
    accessorKey: "atsScore",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-1 text-xs -ml-1 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ATS
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className={`text-sm font-semibold tabular-nums ${scoreColor(row.original.atsScore)}`}>
        {row.original.atsScore}%
      </span>
    ),
  },
  {
    accessorKey: "ghostScore",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-1 text-xs -ml-1 hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ghost
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className={`text-sm font-semibold tabular-nums ${scoreColor(row.original.ghostScore)}`}>
        {row.original.ghostScore}%
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.original.status
      return (
        <Badge
          variant="outline"
          className={`text-[10px] px-1.5 py-0.5 capitalize ${
            s === "active"
              ? "text-nordic-success border-nordic-success/30 bg-nordic-success/10"
              : s === "draft"
              ? "text-nordic-info border-nordic-info/30 bg-nordic-info/10"
              : "text-nordic-text-tertiary"
          }`}
        >
          {s}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastModified",
    header: "Modified",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground tabular-nums">
        {relativeTime(row.original.lastModified)}
      </span>
    ),
    sortingFn: (a, b) =>
      b.original.lastModified.getTime() - a.original.lastModified.getTime(),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-7 text-muted-foreground" aria-label="Slate actions">
            <MoreVertical className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem asChild>
            <Link to="/editor" className="flex items-center gap-2">
              <Pencil className="size-3.5" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Pin className="size-3.5" /> Set as Active
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Copy className="size-3.5" /> Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 text-red-400 focus:text-red-400" disabled>
            <Trash2 className="size-3.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  },
]

// ─── localStorage persistence key ────────────────────────────────────────────
const LS_ORDER_KEY = "signet:slates:order"

function loadOrder(): string[] {
  try {
    const raw = localStorage.getItem(LS_ORDER_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function saveOrder(ids: string[]): void {
  try {
    localStorage.setItem(LS_ORDER_KEY, JSON.stringify(ids))
  } catch {
    // localStorage unavailable — silently ignore
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
/**
 * Sortable, filterable, drag-to-reorder slates table.
 *
 * Uses TanStack Table for sorting/filtering/pagination and DnD Kit for
 * drag-to-reorder rows. Row order is persisted to localStorage.
 */
export function SlatesDataTable({ initialData = MOCK_SLATES }: { initialData?: SlateRow[] }) {
  const [data, setData] = useState<SlateRow[]>(() => {
    const order = loadOrder()
    if (order.length === 0) return initialData
    return [...initialData].sort((a, b) => {
      const ia = order.indexOf(a.id)
      const ib = order.indexOf(b.id)
      if (ia === -1 && ib === -1) return 0
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })
  })

  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = useMemo<UniqueIdentifier[]>(() => data.map(({ id }) => id), [data])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, pagination },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        const next = arrayMove(prev, oldIndex, newIndex)
        saveOrder(next.map((r) => r.id))
        return next
      })
    }
  }

  // Persist order when data changes externally
  useEffect(() => {
    saveOrder(data.map((r) => r.id))
  }, [data])

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 lg:px-6">
        <Input
          placeholder="Search slates…"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="h-8 w-48 text-xs"
          aria-label="Search slates"
        />
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onValueChange={(v) => table.getColumn("status")?.setFilterValue(v === "all" ? "" : v)}
        >
          <SelectTrigger className="h-8 w-32 text-xs" aria-label="Filter by status">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        {selectedCount > 0 && (
          <span className="ml-2 text-xs text-muted-foreground">
            {selectedCount} selected
          </span>
        )}
        <div className="ml-auto text-xs text-muted-foreground">
          {table.getFilteredRowModel().rows.length} slates
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-sidebar-border mx-4 lg:mx-6">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-sidebar-accent/30">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-sidebar-border">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="h-9 text-xs font-medium text-muted-foreground py-0">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground text-sm">
                      No slates yet. Create your first slate to get started.
                    </TableCell>
                  </TableRow>
                )}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 lg:px-6 pb-2">
        <div className="text-xs text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
