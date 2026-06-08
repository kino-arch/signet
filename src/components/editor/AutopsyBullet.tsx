import { useState } from "react"
import type { GhostBullet } from "@/lib/ghost-schema"
import { VerifyCard } from "./VerifyCard"
import { RewriteAssistant } from "./RewriteAssistant"
import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AutopsyBulletProps {
  bullet: GhostBullet
  onUpdate: (updatedBullet: GhostBullet | null) => void
}

export function AutopsyBullet({ bullet, onUpdate }: AutopsyBulletProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleVerifyAccept = () => {
    onUpdate({ ...bullet, provenance: "user_verified", confidence: 1.0 })
    setIsExpanded(false)
  }

  const handleVerifyChange = (newValue: string) => {
    // Basic string replacement for demo purposes.
    // In a real app, we'd want to smartly replace the `suggestedRange` or estimated number.
    const newText = bullet.text.replace(
      /~?\d+([KkMm%])?(-\d+([KkMm%])?)?/,
      newValue
    )
    onUpdate({
      ...bullet,
      text: newText,
      provenance: "user_verified",
      confidence: 1.0,
    })
    setIsExpanded(false)
  }

  const handleVerifyKeep = () => {
    onUpdate({ ...bullet, userAction: "none" })
    setIsExpanded(false)
  }

  const handleRewrite = (answers: Record<string, string>) => {
    // In a real app, this would trigger an AI call to rewrite the bullet based on answers.
    // Here we'll just mock it as "rewritten" and verified for the demo.
    const newText =
      bullet.text + ` (Incorporating: ${Object.values(answers).join(", ")})`
    onUpdate({
      ...bullet,
      text: newText,
      provenance: "user_verified",
      confidence: 1.0,
      sourceFidelity: "faithful",
    })
    setIsExpanded(false)
  }

  const handleDelete = () => {
    onUpdate(null)
  }

  return (
    <div className="group relative space-y-2">
      <div
        className={cn(
          "relative cursor-pointer rounded-md py-1 pl-6 transition-colors hover:bg-slate-500/5",
          bullet.provenance === "estimated" && "cursor-pointer",
          bullet.provenance === "inferred" && "cursor-pointer"
        )}
        onClick={() => {
          if (bullet.provenance !== "user_verified") {
            setIsExpanded(!isExpanded)
          }
        }}
      >
        <div className="absolute top-1.5 left-0 flex h-4 w-4 items-center justify-center">
          {bullet.provenance === "user_verified" && (
            <CheckCircle2 className="h-3 w-3 text-green-500 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
          {bullet.provenance === "estimated" && (
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          )}
          {bullet.provenance === "inferred" && (
            <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
          )}
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={cn(
                  "text-sm leading-relaxed",
                  bullet.provenance === "user_verified" && "text-slate-200",
                  bullet.provenance === "estimated" &&
                    "text-amber-100/90 underline decoration-amber-500/50 decoration-dashed underline-offset-4",
                  bullet.provenance === "inferred" &&
                    "text-red-100/90 underline decoration-red-500/50 decoration-wavy underline-offset-4"
                )}
              >
                {bullet.text}
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-[250px] border-slate-800 bg-black/90 text-xs text-slate-300"
            >
              {bullet.provenance === "user_verified" && (
                <div className="flex items-center text-green-400">
                  <CheckCircle2 className="mr-1.5 h-3 w-3" />
                  Verified from your input
                </div>
              )}
              {bullet.provenance === "estimated" && (
                <div className="flex items-center text-amber-400">
                  <AlertTriangle className="mr-1.5 h-3 w-3" />
                  AI Estimated (Click to verify)
                </div>
              )}
              {bullet.provenance === "inferred" && (
                <div className="flex items-center text-red-400">
                  <ShieldAlert className="mr-1.5 h-3 w-3" />
                  AI Inferred (Click to fix)
                </div>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {isExpanded && bullet.provenance === "estimated" && (
        <div className="animate-in pl-6 opacity-0 duration-200 fade-in slide-in-from-top-2">
          <VerifyCard
            bullet={bullet}
            onAccept={handleVerifyAccept}
            onChange={handleVerifyChange}
            onKeepEstimated={handleVerifyKeep}
          />
        </div>
      )}

      {isExpanded && bullet.provenance === "inferred" && (
        <div className="animate-in pl-6 opacity-0 duration-200 fade-in slide-in-from-top-2">
          <RewriteAssistant
            bullet={bullet}
            onRewrite={handleRewrite}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  )
}
