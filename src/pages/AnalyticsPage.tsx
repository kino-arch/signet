import { useEffect } from "react"
import { useTargetMatrixStore } from "@/store/useTargetMatrixStore"
import { trpc } from "@/providers/trpc"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { TrendingUp, FileText, Calendar } from "lucide-react"

const atsTrend = [
  { day: "Mon", score: 62 },
  { day: "Tue", score: 78 },
  { day: "Wed", score: 85 },
  { day: "Thu", score: 71 },
  { day: "Fri", score: 92 },
  { day: "Sat", score: 88 },
  { day: "Sun", score: 95 },
]

export function AnalyticsPage() {
  const { applications, setApplications } = useTargetMatrixStore()
  const { data: serverApps } = trpc.jobTracker.getApplications.useQuery()

  useEffect(() => {
    if (serverApps) {
      setApplications(serverApps as any[])
    }
  }, [serverApps, setApplications])

  const counts = {
    lead: applications.filter((a) => a.status === "lead").length,
    applied: applications.filter((a) => a.status === "applied").length,
    interviewing: applications.filter((a) => a.status === "interviewing").length,
    offer: applications.filter((a) => a.status === "offer").length,
  }

  const funnel = [
    { stage: "Leads", count: counts.lead, color: "#3B82F6" },
    { stage: "Applied", count: counts.applied, color: "#2563EB" },
    { stage: "Interview", count: counts.interviewing, color: "#60A5FA" },
    { stage: "Offer", count: counts.offer, color: "#93C5FD" },
  ]

  const totalActive = counts.applied + counts.interviewing + counts.offer

  const kpis = [
    { label: "Applications", value: String(totalActive), change: "", icon: FileText },
    { label: "Interviews", value: String(counts.interviewing), change: "", icon: Calendar },
    { label: "Response Rate", value: totalActive > 0 ? `${Math.round((counts.interviewing + counts.offer) / totalActive * 100)}%` : "0%", change: "", icon: TrendingUp },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-nordic-text">Analytics</h1>
        <p className="text-sm text-nordic-text-secondary">
          Track your resume performance and application progress.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="nordic-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-nordic-text-secondary">
                {kpi.label}
              </span>
              <kpi.icon className="h-4 w-4 text-nordic-accent" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-nordic-text">
                {kpi.value}
              </span>
              <span className="text-xs font-medium text-green-600">
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="nordic-card p-6" aria-label="ATS Score Trend Chart Container">
          <h3 className="text-sm font-semibold text-nordic-text">
            ATS Score Trend
          </h3>
          <p className="text-xs text-nordic-text-secondary mb-4">Last 7 days</p>
          <div className="h-[280px]" aria-label="Line chart showing ATS score trend over the last 7 days" role="img">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={atsTrend}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E4E4E7"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke="#A1A1AA"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#A1A1AA"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E4E4E7",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.06)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#2563EB"
                  fill="url(#colorScore)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="nordic-card p-6" aria-label="Application Funnel Chart Container">
          <h3 className="text-sm font-semibold text-nordic-text">
            Application Funnel
          </h3>
          <p className="text-xs text-nordic-text-secondary mb-4">
            Conversion by stage
          </p>
          <div className="h-[280px]" aria-label="Bar chart showing application conversion funnel by stage" role="img">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnel} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E4E4E7"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  stroke="#A1A1AA"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  dataKey="stage"
                  type="category"
                  stroke="#52525B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: "#F4F4F5" }}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E4E4E7",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {funnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
