import { useState } from "react"
import { useForm } from "react-hook-form"
import { Plus, Target } from "lucide-react"
import { trpc } from "@/providers/trpc"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  useTargetMatrixStore,
  KANBAN_COLUMNS,
  type ApplicationStatus,
} from "@/store/useTargetMatrixStore"

interface FormValues {
  company: string
  role: string
  status: ApplicationStatus
  salary: string
  location: string
  url: string
  notes: string
}

export function AddTargetDialog() {
  const [open, setOpen] = useState(false)
  const { addApplicationLocal } = useTargetMatrixStore()
  const addApplicationMutation = trpc.jobTracker.addApplication.useMutation({
    onSuccess: (data: unknown) => {
      addApplicationLocal(data as Parameters<typeof addApplicationLocal>[0])
      reset()
      setOpen(false)
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { status: "lead", notes: "" },
  })

  const onSubmit = (data: FormValues) => {
    addApplicationMutation.mutate({
      company: data.company.trim(),
      role: data.role.trim(),
      status: data.status,
      salary: data.salary.trim() || undefined,
      location: data.location.trim() || undefined,
      url: data.url.trim() || undefined,
      notes: data.notes.trim() || undefined,
    })
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          className="gap-1.5 shadow-[0_0_15px_rgba(var(--nordic-accent-rgb),0.15)] hover:shadow-[0_0_25px_rgba(var(--nordic-accent-rgb),0.3)] transition-shadow"
          aria-label="Add new target application"
        >
          <Plus className="size-3.5" />
          Add Target
        </Button>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[440px]"
          aria-describedby="add-target-description"
        >
          <DialogHeader>
            <div className="mb-1 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                <Target className="size-3.5 text-primary" />
              </div>
              <DialogTitle className="font-heading text-sm font-semibold tracking-wider uppercase">
                Lock On Target
              </DialogTitle>
            </div>
            <DialogDescription
              id="add-target-description"
              className="text-xs text-muted-foreground"
            >
              Add a new job target to the deployment grid.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            id="add-target-form"
            className="flex flex-col gap-4 py-2"
          >
            {/* Company */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="company" className="text-xs font-medium">
                Company{" "}
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="company"
                placeholder="Meridian Labs"
                {...register("company", { required: "Company is required" })}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? "company-error" : undefined}
              />
              {errors.company && (
                <p
                  id="company-error"
                  role="alert"
                  className="text-[10px] text-destructive"
                >
                  {errors.company.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role" className="text-xs font-medium">
                Role{" "}
                <span className="text-destructive" aria-hidden="true">
                  *
                </span>
              </Label>
              <Input
                id="role"
                placeholder="Senior Frontend Engineer"
                {...register("role", { required: "Role is required" })}
                aria-invalid={!!errors.role}
                aria-describedby={errors.role ? "role-error" : undefined}
              />
              {errors.role && (
                <p
                  id="role-error"
                  role="alert"
                  className="text-[10px] text-destructive"
                >
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Status + Salary row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="status-select" className="text-xs font-medium">
                  Status
                </Label>
                <Select
                  defaultValue="lead"
                  onValueChange={(val) =>
                    setValue("status", val as ApplicationStatus)
                  }
                >
                  <SelectTrigger
                    id="status-select"
                    aria-label="Select application status"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KANBAN_COLUMNS.map((col) => (
                      <SelectItem key={col.id} value={col.id}>
                        {col.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="salary" className="text-xs font-medium">
                  Salary Range
                </Label>
                <Input
                  id="salary"
                  placeholder="$120k – $150k"
                  {...register("salary")}
                />
              </div>
            </div>

            {/* Location + URL row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="location" className="text-xs font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Remote"
                  {...register("location")}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="url" className="text-xs font-medium">
                  Job URL
                </Label>
                <Input
                  id="url"
                  placeholder="https://..."
                  {...register("url")}
                  type="url"
                />
              </div>
            </div>
          </form>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                reset()
                setOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" form="add-target-form" size="sm">
              Deploy Target
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
