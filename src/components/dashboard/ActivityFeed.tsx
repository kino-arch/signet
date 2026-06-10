import { Zap, Target, Activity, AlertTriangle } from "lucide-react"
import { useActivityStore } from "@/store/useActivityStore"
import { relativeTime } from "@/lib/utils"

// ─── Activity Feed ─────────────────────────────────────────────────────────────
function getActivityIcon(type: string) {
  switch (type) {
    case "enhancement":
      return { icon: Zap, color: "text-nordic-primary" }
    case "target":
      return { icon: Target, color: "text-nordic-info" }
    case "ats":
      return { icon: Activity, color: "text-nordic-success" }
    case "alert":
      return { icon: AlertTriangle, color: "text-nordic-warning" }
    default:
      return { icon: Activity, color: "text-nordic-text-secondary" }
  }
}

export function ActivityFeed({ className }: { className?: string }) {
  const activities = useActivityStore((s) => s.activities)

  // Use mock data if store is empty (using a stable timestamp to avoid purity lint errors)
  const now = 1718000000000 // Stable mock timestamp
  const displayActivities = activities.length > 0 ? activities : [
    { id: "1", type: "enhancement", label: "Enhanced 3 bullets", timestamp: now - 2 * 60 * 1000 },
    { id: "2", type: "target", label: "Target Lock: Stripe acquired", timestamp: now - 14 * 60 * 1000 },
    { id: "3", type: "ats", label: "ATS score improved 71→88", timestamp: now - 60 * 60 * 1000 },
    { id: "4", type: "alert", label: "Missing metric detected in 2 bullets", timestamp: now - 2 * 60 * 60 * 1000 },
  ] as const

  return (
    <div className={`nordic-surface p-5 flex flex-col ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-nordic-accent-light mb-4">
        Ghost Protocol Feed
      </p>
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px]">
        {displayActivities.map((item) => {
          const { icon: Icon, color } = getActivityIcon(item.type)
          return (
            <div key={item.id} className="flex items-start gap-2.5">
              <div className={`mt-0.5 shrink-0 ${color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-nordic-text leading-snug">{item.label}</p>
                <p className="text-[10px] text-nordic-text-tertiary mt-0.5">
                  {relativeTime(new Date(item.timestamp))}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
