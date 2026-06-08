import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import type { GhostBullet } from "@/lib/ghost-schema"
import { CheckCircle2, Pencil, HelpCircle, AlertTriangle } from "lucide-react"

interface VerifyCardProps {
  bullet: GhostBullet
  onAccept: () => void
  onChange: (newValue: string) => void
  onKeepEstimated: () => void
}

export function VerifyCard({
  bullet,
  onAccept,
  onChange,
  onKeepEstimated,
}: VerifyCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [customValue, setCustomValue] = useState("")

  // Extract numbers to render fake visual "Range" bounds just for UI demo
  // In reality, suggestedRange might be "10-25%"
  const confidencePercent = Math.round((bullet.confidence || 0.5) * 100)

  return (
    <Card className="w-full max-w-md border-amber-500/30 bg-amber-500/5 shadow-lg shadow-amber-500/10 transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-sm font-bold tracking-wider text-amber-500 uppercase">
          <AlertTriangle className="mr-2 h-4 w-4" />
          AI Estimate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border border-amber-500/20 bg-black/40 p-3 text-slate-200">
          "{bullet.text}"
        </div>

        <div className="space-y-2 text-sm text-slate-400">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-300">Basis:</span>
            <span className="ml-2 max-w-48 truncate text-xs">
              {bullet.ghostNote || "Industry standard typicals"}
            </span>
          </div>

          {bullet.suggestedRange && (
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300">Range:</span>
              <span className="font-mono text-amber-400/80">
                {bullet.suggestedRange}
              </span>
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300">Confidence:</span>
              <span className="font-mono text-amber-500">
                {confidencePercent}%
              </span>
            </div>
            <Progress
              value={confidencePercent}
              className="h-1.5 [&>div]:bg-amber-500"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2">
        {isEditing ? (
          <div className="flex w-full gap-2">
            <Input
              autoFocus
              placeholder="e.g. 15%"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="border-amber-500/30 bg-black/50 text-amber-50"
            />
            <Button
              size="sm"
              className="bg-amber-500 font-semibold text-black hover:bg-amber-600"
              onClick={() => {
                if (customValue) onChange(customValue)
              }}
            >
              Update
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="grid w-full grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
              onClick={onAccept}
            >
              <CheckCircle2 className="mr-1.5 h-4 w-4" />
              Looks right
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="mr-1.5 h-4 w-4" />
              Change it
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="col-span-2 mt-1 text-xs text-slate-500 hover:text-slate-300"
              onClick={onKeepEstimated}
            >
              <HelpCircle className="mr-1 h-3 w-3" />I don't know, keep
              estimated
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
