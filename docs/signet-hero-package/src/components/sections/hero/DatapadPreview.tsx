import { motion } from "framer-motion";
import { FileText, TrendingUp, Target, Zap, Shield } from "lucide-react";

export function DatapadPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      className="relative w-full max-w-md lg:max-w-lg"
    >
      {/* Ambient glow behind card */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-cyan-500/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
              <FileText className="h-4 w-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Senior Frontend Engineer</p>
              <p className="text-xs text-slate-500">Last edited 2m ago</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>

        {/* Stats grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatCard
            icon={TrendingUp}
            label="ATS Match"
            value="94%"
            color="text-cyan-400"
            bg="bg-cyan-500/10"
          />
          <StatCard
            icon={Target}
            label="Keyword Fit"
            value="98%"
            color="text-violet-400"
            bg="bg-violet-500/10"
          />
          <StatCard
            icon={Zap}
            label="Readability"
            value="A+"
            color="text-amber-400"
            bg="bg-amber-500/10"
          />
          <StatCard
            icon={Shield}
            label="Format Check"
            value="Pass"
            color="text-emerald-400"
            bg="bg-emerald-500/10"
          />
        </div>

        {/* Mini chart bar */}
        <div className="mt-5">
          <div className="flex items-end justify-between gap-1">
            {[40, 65, 55, 80, 70, 92, 88, 94].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                className="w-full rounded-t-sm bg-gradient-to-t from-cyan-500/40 to-cyan-400"
                style={{ maxHeight: 64 }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-slate-600">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
            <span>Today</span>
          </div>
        </div>

        {/* Bottom action */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
          <span className="text-xs text-slate-500">Ready for export</span>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700">
            <Zap className="h-3 w-3 text-cyan-400" />
            Optimize
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800/60 bg-slate-950/50 p-3">
      <div className={`flex h-7 w-7 items-center justify-center rounded-md ${bg}`}>
        <Icon className={`h-3.5 w-3.5 ${color}`} />
      </div>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}
