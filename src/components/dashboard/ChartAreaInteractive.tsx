import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {
  ChartConfig,
} from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTargetMatrixStore } from "@/store/useTargetMatrixStore"
import { useForgeStore } from "@/store/useForgeStore"

// ─── Mock ATS Trend Data (rolling 7-day) ─────────────────────────────────────
const atsTrendData = [
  { day: "Mon", score: 62, target: 80 },
  { day: "Tue", score: 71, target: 80 },
  { day: "Wed", score: 78, target: 80 },
  { day: "Thu", score: 76, target: 80 },
  { day: "Fri", score: 85, target: 80 },
  { day: "Sat", score: 88, target: 80 },
  { day: "Sun", score: 92, target: 80 },
]

const atsTrendConfig = {
  score: { label: "ATS Score", color: "hsl(var(--chart-1))" },
  target: { label: "Target", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

// ─── Skill Gap Radar Config ───────────────────────────────────────────────────
const skillRadarConfig = {
  yours: { label: "Your Resume", color: "hsl(var(--chart-1))" },
  target: { label: "Target Role", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

// ─── Application Funnel ───────────────────────────────────────────────────────
const funnelConfig = {
  count: { label: "Applications", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig

/**
 * 3-tab interactive chart surface for the dashboard.
 * Tab A: ATS Score Pulse (7-day area trend)
 * Tab B: Application Funnel (horizontal bar by stage)
 * Tab C: Skill Gap Radar (resume vs target role requirements)
 *
 * Adapts the dashboard-01 ChartAreaInteractive pattern to Signet domain data.
 */
export function ChartAreaInteractive() {
  const applications = useTargetMatrixStore((s) => s.applications)
  const briefing = useForgeStore((s) => s.targetLockBriefing)

  // Application funnel counts
  const funnelData = [
    { stage: "Leads", count: applications.filter((a) => a.status === "lead").length },
    { stage: "Applied", count: applications.filter((a) => a.status === "applied").length },
    { stage: "Interview", count: applications.filter((a) => a.status === "interviewing").length },
    { stage: "Offer", count: applications.filter((a) => a.status === "offer").length },
  ]

  // Skill Gap radar from target lock fit_radar or defaults
  const radarData = briefing?.fit_radar
    ? Object.entries(briefing.fit_radar).map(([key, val]) => ({
        skill: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        yours: Math.round((val as number) * 0.9), // proxy: resume slightly below target
        target: 100,
      }))
    : [
        { skill: "Technical", yours: 72, target: 90 },
        { skill: "Leadership", yours: 65, target: 85 },
        { skill: "Communication", yours: 80, target: 80 },
        { skill: "Domain", yours: 58, target: 95 },
        { skill: "AI/ML", yours: 70, target: 88 },
      ]

  return (
    <Tabs defaultValue="ats" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="h-9">
          <TabsTrigger value="ats" className="text-xs">ATS Pulse</TabsTrigger>
          <TabsTrigger value="funnel" className="text-xs">App Funnel</TabsTrigger>
          <TabsTrigger value="radar" className="text-xs">Skill Radar</TabsTrigger>
        </TabsList>
      </div>

      {/* Tab A: ATS Score Trend */}
      <TabsContent value="ats" className="m-0">
        <Card className="bg-sidebar border-sidebar-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">ATS Score — 7-Day Pulse</CardTitle>
            <CardDescription className="text-xs">
              Rolling score vs. 80% target threshold
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 pt-2">
            <ChartContainer config={atsTrendConfig} className="h-[240px] w-full">
              <AreaChart data={atsTrendData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  width={28}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Area
                  dataKey="target"
                  type="monotone"
                  fill="url(#targetGradient)"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <Area
                  dataKey="score"
                  type="monotone"
                  fill="url(#scoreGradient)"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab B: Application Funnel */}
      <TabsContent value="funnel" className="m-0">
        <Card className="bg-sidebar border-sidebar-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Application Funnel</CardTitle>
            <CardDescription className="text-xs">
              Conversion by stage — {applications.length} total applications
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 pt-2">
            <ChartContainer config={funnelConfig} className="h-[240px] w-full">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 24, bottom: 0, left: 16 }}>
                <CartesianGrid horizontal={false} stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  dataKey="stage"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  width={60}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {funnelData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={`hsl(var(--chart-${(i % 4) + 1}))`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab C: Skill Gap Radar */}
      <TabsContent value="radar" className="m-0">
        <Card className="bg-sidebar border-sidebar-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Skill Gap Radar</CardTitle>
            <CardDescription className="text-xs">
              {briefing
                ? "Your resume coverage vs. target role requirements"
                : "Set a Target Lock to see personalized skill gap analysis"}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 pt-2">
            <ChartContainer config={skillRadarConfig} className="h-[240px] w-full">
              <RadarChart data={radarData} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
                <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar
                  name="Target Role"
                  dataKey="target"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.1}
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
                <Radar
                  name="Your Resume"
                  dataKey="yours"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
