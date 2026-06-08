import { useEffect } from "react"
import { useTargetMatrixStore } from "@/store/useTargetMatrixStore"
import { KanbanBoard } from "@/components/target-matrix/kanban-board"
import { AddTargetDialog } from "@/components/target-matrix/add-target-dialog"
import { trpc } from "@/providers/trpc"
import { Seo } from "@/components/seo/Seo"
import { StatsCard } from "@/components/dashboard/stats-card"
import { NativeTabs } from "@/components/ui/native-tabs"
import { Activity, Briefcase, CheckCircle2, XCircle } from "lucide-react"

export function ApplicationsPage() {
  const { applications, setApplications } = useTargetMatrixStore()

  const { data: serverApps, isLoading } = trpc.jobTracker.getApplications.useQuery()

  useEffect(() => {
    if (serverApps) {
      setApplications(serverApps as Parameters<typeof setApplications>[0])
    }
  }, [serverApps, setApplications])

  const totalActive = applications.filter(
    (a) => a.status !== "rejected" && a.status !== "lead"
  ).length

  const totalInterviews = applications.filter(
    (a) => a.status === "interviewing"
  ).length

  const totalOffers = applications.filter(
    (a) => a.status === "offer"
  ).length

  return (
    <>
      <Seo
        title="Job Tracker | Signet"
        description="Track your job applications."
        noindex={true}
      />
      <div className="space-y-8 pb-8">
        {/* Header & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-nordic-text tracking-tight">Command Center</h1>
            <p className="text-sm text-nordic-text-secondary mt-1">
              {applications.length} total deployments tracking
            </p>
          </div>
          <AddTargetDialog />
        </div>

        {/* Top Metrics / Glassmorphism Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Active Operations" 
            value={totalActive} 
            icon={<Activity className="h-4 w-4" />} 
          />
          <StatsCard 
            title="Interviews" 
            value={totalInterviews} 
            icon={<Briefcase className="h-4 w-4" />} 
          />
          <StatsCard 
            title="Offers Secured" 
            value={totalOffers} 
            icon={<CheckCircle2 className="h-4 w-4" />} 
          />
          <StatsCard 
            title="Rejected" 
            value={applications.filter(a => a.status === "rejected").length} 
            icon={<XCircle className="h-4 w-4" />} 
          />
        </div>

        {/* View Toggle using NativeTabs */}
        <NativeTabs
          defaultTab="kanban"
          items={[
            {
              id: "kanban",
              label: "Grid Deployment",
              content: (
                <div className="min-h-[500px]">
                  {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                      <span className="text-nordic-text-tertiary">Synchronizing grid...</span>
                    </div>
                  ) : (
                    <KanbanBoard />
                  )}
                </div>
              ),
            },
            {
              id: "timeline",
              label: "Timeline Log",
              content: (
                <div className="flex h-64 items-center justify-center border border-nordic-border bg-nordic-surface/30">
                  <span className="text-nordic-text-tertiary">Timeline module offline. (Coming soon)</span>
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}
