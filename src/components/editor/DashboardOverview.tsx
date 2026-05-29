"use client";

import { motion, type Variants } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Eye,
  Download,
  ArrowUpRight,
} from "lucide-react";
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
    <div className="rounded-xl border border-border/60 bg-card px-3 py-2 shadow-xl shadow-black/10">
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
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm ring-1 shadow-black/5 ring-white/5 transition-all duration-300 ring-inset hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
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
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] via-transparent to-transparent" />

      <div className="relative space-y-5">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-foreground/70 shadow-sm transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary">
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
          <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground/80 uppercase">
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
        <h3 className="text-[10px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
          {title}
        </h3>
        <p className="text-xs text-foreground/50">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

// ============================================================================
// DASHBOARD OVERVIEW
// ============================================================================

interface DashboardOverviewProps {
  onBuyTokens?: () => void;
}

export function DashboardOverview({ onBuyTokens }: DashboardOverviewProps) {
  const { profile } = useAuthStore();

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
              Bounty Analytics
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-primary uppercase ring-1 ring-primary/20 ring-inset">
              Live
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Track the performance of your credentials across the Outer Rim.
          </p>
        </div>

        {/* Token Balance & Paywall CTA */}
        <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-2 shadow-sm">
          <div className="flex flex-col px-3 text-right">
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Balance</span>
            <span className="font-heading text-lg font-bold text-foreground">
              {profile?.token_balance ?? 0} {profile?.token_balance === 1 ? "Token" : "Tokens"}
            </span>
          </div>
          <button 
            onClick={onBuyTokens}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-primary/25 active:scale-95 cursor-pointer"
          >
            Buy Tokens
          </button>
        </div>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Profile Views"
          value="1,482"
          change="+12%"
          trend="up"
          icon={<Eye className="h-5 w-5" />}
        />
        <MetricCard
          label="Resume Downloads"
          value="340"
          change="+5.4%"
          trend="up"
          icon={<Download className="h-5 w-5" />}
        />
        <MetricCard
          label="Active Contracts"
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
          className="group relative col-span-1 overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm ring-1 shadow-black/5 ring-white/5 transition-all duration-300 ring-inset hover:shadow-md hover:shadow-primary/10 lg:col-span-2"
        >
          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-60" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />

          <div className="relative space-y-6">
            <SectionHeader
              title="Profile Views Trend"
              subtitle="Unique visitors over the last 8 weeks"
              action={
                <button className="flex items-center gap-1 rounded-lg border border-border/60 bg-background/80 px-3 py-1.5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:border-primary/30 hover:text-primary">
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
          className="group relative col-span-1 overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm ring-1 shadow-black/5 ring-white/5 transition-all duration-300 ring-inset hover:shadow-md hover:shadow-primary/10"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] via-transparent to-transparent" />

          <div className="relative space-y-6">
            <SectionHeader
              title="Active Contracts"
              subtitle="Weekly contract engagement"
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
        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm ring-1 shadow-black/5 ring-white/5 transition-all duration-300 ring-inset hover:shadow-md hover:shadow-black/10"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] via-transparent to-transparent" />
        <div className="relative px-6 py-5">
          <SectionHeader title="Intel Log: ATS Scanners" subtitle="Recent data-slate analytics" />
        </div>
        <div className="relative divide-y divide-border/40">
          {[
            { time: "Just now", event: "System Diagnostic: 0% data loss detected. Pure Beskar armor holding.", type: "update" },
            { time: "2h ago", event: "Workday/Taleo filter bypass successful. 100% parse rate.", type: "view" },
            { time: "5h ago", event: "Threat averted: 43% of two-column layouts rejected by Guild Scanners today.", type: "contract" },
            { time: "1d ago", event: "Upgrade Prompt: Purchase Forge Tokens to unlock 'The FAANG Executive' tier.", type: "download" },
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
              <p className="flex-1 text-sm text-foreground/80">{item.event}</p>
              <span className="shrink-0 text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
