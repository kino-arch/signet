"use client";

import { motion, type Variants } from "framer-motion";

import { useRewardsStore } from "@/store/useRewardsStore";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Shield,
  Download,
  ArrowUpRight,
  Crosshair,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TargetLockPanel } from "./TargetLockPanel";
import { Button } from "@/components/ui/button";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ============================================================================
// DATA & TYPES
// ============================================================================

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  accent?: string;
}

const PROFILE_VIEWS_DATA = [
  { name: "W1", value: 45 },
  { name: "W2", value: 120 },
  { name: "W3", value: 85 },
  { name: "W4", value: 180 },
  { name: "W5", value: 240 },
  { name: "W6", value: 190 },
  { name: "W7", value: 310 },
  { name: "W8", value: 400 },
];

const CONTRACTS_DATA = [
  { name: "W1", value: 4 },
  { name: "W2", value: 5 },
  { name: "W3", value: 4 },
  { name: "W4", value: 6 },
  { name: "W5", value: 5 },
  { name: "W6", value: 4 },
  { name: "W7", value: 3 },
  { name: "W8", value: 3 },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ============================================================================
// CUSTOM TOOLTIP
// ============================================================================

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className=" border border-border/60 bg-card px-3 py-2 shadow-xl shadow-black/10">
      <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{label}</p>
      <p className="mt-0.5 text-lg font-bold text-foreground">{payload[0].value}</p>
    </div>
  );
}

// ============================================================================
// METRIC CARD
// ============================================================================

function MetricCard({ label, value, change, trend, icon }: MetricCardProps) {
  const isPositive = trend === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden  border border-border/60 bg-card p-6 shadow-sm ring-1 shadow-black/5 ring-white/5 transition-all duration-300 ring-inset hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
    >
      {/* Subtle top accent bar */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] rounded-t-2xl transition-opacity duration-300 group-hover:opacity-100 ${
          isPositive
            ? "bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0"
            : "bg-gradient-to-r from-destructive/80 via-destructive to-destructive/80 opacity-0"
        }`}
      />

      {/* Background noise texture */}
      <div className="absolute inset-0  bg-gradient-to-br from-foreground/[0.015] via-transparent to-transparent" />

      <div className="relative space-y-5">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center  border border-border/60 bg-background/80 text-muted-foreground shadow-sm transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary">
            {icon}
          </div>

          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
              isPositive
                ? "bg-primary/10 text-primary ring-1 ring-primary/20 ring-inset"
                : "bg-destructive/10 text-destructive ring-1 ring-destructive/20 ring-inset"
            }`}
          >
            <TrendIcon className="h-3 w-3" />
            {change}
          </div>
        </div>

        {/* Metric value */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            {label}
          </p>
          <p className="font-heading text-[2rem] leading-none font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SECTION HEADER
// ============================================================================

function SectionHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-0.5">
        <h2 className="text-[10px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

// ============================================================================
// DASHBOARD OVERVIEW
// ============================================================================

export type DashboardOverviewProps = Record<string, never>;

export function DashboardOverview() {

  const { shields, getRank, processDailyCheckIn } = useRewardsStore();
  const [targetLockOpen, setTargetLockOpen] = useState(false);

  useEffect(() => {
    // Award 5 Shields on first login of the day
    processDailyCheckIn();
  }, [processDailyCheckIn]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8"
    >
      {/* Page title */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Performance Analytics
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-primary uppercase ring-1 ring-primary/20 ring-inset">
              Live
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Track the performance of your resume and applications.
          </p>
        </div>

        <div>
          <Dialog open={targetLockOpen} onOpenChange={setTargetLockOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                <Crosshair className="h-4 w-4" />
                Engage Target Lock
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] w-full max-w-5xl overflow-x-hidden overflow-y-auto border-primary/20 bg-background/95 backdrop-blur-xl sm:max-w-5xl">
              <DialogHeader>
                <DialogTitle className="sr-only">Target Lock Intelligence</DialogTitle>
                <DialogDescription className="sr-only">AI-powered company intelligence and resume strategy</DialogDescription>
              </DialogHeader>
              <TargetLockPanel onComplete={() => setTargetLockOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label={`Guild Rank: ${getRank()}`}
          value={shields.toString()}
          change="Beskar Shields"
          trend="up"
          icon={<Shield className="h-5 w-5 text-primary" />}
        />
        <MetricCard
          label="Resume Downloads"
          value="340"
          change="+5.4%"
          trend="up"
          icon={<Download className="h-5 w-5" />}
        />
        <MetricCard
          label="Active Applications"
          value="3"
          change="-1"
          trend="down"
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          label="Time on Profile"
          value="2m 45s"
          change="+14s"
          trend="up"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main area chart — Profile Views Trend (spans 2 cols) */}
        <motion.div
          variants={itemVariants}
          className="group relative col-span-1 overflow-hidden  border border-border/60 bg-card p-6 shadow-sm ring-1 shadow-black/5 ring-white/5 transition-all duration-300 ring-inset hover:shadow-md hover:shadow-primary/10 lg:col-span-2"
        >
          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-60" />
          <div className="absolute inset-0  bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />

          <div className="relative space-y-6">
            <SectionHeader
              title="Profile Views Trend"
              subtitle="Unique visitors over the last 8 weeks"
              action={
                <button className="flex items-center gap-1  border border-border/60 bg-background/80 px-3 py-1.5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:border-primary/30 hover:text-primary">
                  <ArrowUpRight className="h-3 w-3" />
                  Export
                </button>
              }
            />

            <div className="h-[240px] w-full" style={{ minHeight: 240 }}>
              <ResponsiveContainer width="99%" height={240}>
                <AreaChart
                  data={PROFILE_VIEWS_DATA}
                  margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    opacity={0.4}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--muted-foreground)"
                    opacity={0.6}
                    style={{ fontSize: "10px", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    opacity={0.6}
                    style={{ fontSize: "10px", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--primary)", strokeOpacity: 0.15, strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    fill="url(#viewsGradient)"
                    dot={{ r: 3.5, fill: "var(--card)", stroke: "var(--primary)", strokeWidth: 2 }}
                    activeDot={{ r: 5.5, fill: "var(--primary)", stroke: "var(--card)", strokeWidth: 2 }}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Secondary chart — Active Contracts */}
        <motion.div
          variants={itemVariants}
          className="group relative col-span-1 overflow-hidden  border border-border/60 bg-card p-6 shadow-sm ring-1 shadow-black/5 ring-white/5 transition-all duration-300 ring-inset hover:shadow-md hover:shadow-primary/10"
        >
          <div className="absolute inset-0  bg-gradient-to-br from-foreground/[0.015] via-transparent to-transparent" />

          <div className="relative space-y-6">
            <SectionHeader
              title="Active Applications"
              subtitle="Weekly application engagement"
            />

            <div className="h-[240px] w-full" style={{ minHeight: 240 }}>
              <ResponsiveContainer width="99%" height={240}>
                <LineChart
                  data={CONTRACTS_DATA}
                  margin={{ top: 8, right: 8, left: -32, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="contractsGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--sidebar-primary)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    opacity={0.4}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--muted-foreground)"
                    opacity={0.6}
                    style={{ fontSize: "10px", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    opacity={0.6}
                    style={{ fontSize: "10px", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 8]}
                    ticks={[0, 2, 4, 6, 8]}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--primary)", strokeOpacity: 0.15, strokeWidth: 1 }} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#contractsGradient)"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: "var(--card)", stroke: "var(--primary)", strokeWidth: 2 }}
                    activeDot={{ r: 5.5, fill: "var(--primary)", stroke: "var(--card)", strokeWidth: 2 }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activity feed / intel log */}
      <motion.div
        variants={itemVariants}
        className="group relative overflow-hidden  border border-border/60 bg-card shadow-sm ring-1 shadow-black/5 ring-white/5 transition-all duration-300 ring-inset hover:shadow-md hover:shadow-black/10"
      >
        <div className="absolute inset-0  bg-gradient-to-br from-foreground/[0.015] via-transparent to-transparent" />
        <div className="relative px-6 py-5">
          <SectionHeader title="System Log: ATS Scanners" subtitle="Recent parsing analytics" />
        </div>
        <div className="relative divide-y divide-border/40">
          {[
            { time: "Just now", event: "System Diagnostic: 0% data loss detected. Structure integrity verified.", type: "update" },
            { time: "2h ago", event: "Workday/Taleo parsing successful. 100% parse rate.", type: "view" },
            { time: "5h ago", event: "Warning: 43% of two-column layouts rejected by legacy ATS systems today.", type: "contract" },
            { time: "1d ago", event: "Upgrade Prompt: Purchase Signet Pro to unlock 'Executive' templates.", type: "download" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30">
              <div
                className={`h-2 w-2 shrink-0 rounded-full ${
                  item.type === "view"
                    ? "bg-primary shadow-[0_0_6px] shadow-primary/50"
                    : item.type === "download"
                    ? "bg-chart-2 shadow-[0_0_6px] shadow-chart-2/50"
                    : item.type === "contract"
                    ? "bg-destructive shadow-[0_0_6px] shadow-destructive/50"
                    : "bg-muted-foreground"
                }`}
              />
              <p className="flex-1 text-sm text-muted-foreground">{item.event}</p>
              <span className="shrink-0 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
