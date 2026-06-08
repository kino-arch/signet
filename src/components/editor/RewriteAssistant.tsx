import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { GhostBullet } from "@/lib/ghost-schema"
import { ShieldAlert, Sparkles } from "lucide-react"
import { Label } from "@/components/ui/label"

interface RewriteAssistantProps {
  bullet: GhostBullet
  onRewrite: (answers: Record<string, string>) => void
  onDelete: () => void
}

export function RewriteAssistant({
  bullet,
  onRewrite,
  onDelete,
}: RewriteAssistantProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({
    who: "",
    hardest: "",
  })

  return (
    <Card className="w-full max-w-md border-red-500/30 bg-red-500/5 shadow-lg shadow-red-500/10 transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-sm font-bold tracking-wider text-red-500 uppercase">
          <ShieldAlert className="mr-2 h-4 w-4" />
          AI Inferred — Needs Your Voice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border border-red-500/20 bg-black/40 p-3 text-slate-200 line-through decoration-red-500/50">
          "{bullet.text}"
        </div>

        <p className="text-sm font-medium text-slate-400">
          This is generic. Let's make it yours.
        </p>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs text-slate-300">
              Who did you actually work with?
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Just my team",
                "PM + Design + QA",
                "8-person squad",
                "Multiple depts",
              ].map((opt) => (
                <Button
                  key={opt}
                  variant="outline"
                  size="sm"
                  className={`h-8 justify-start text-xs font-normal ${answers.who === opt ? "border-red-500/50 bg-red-500/20 text-red-100" : "border-slate-700/50 bg-black/20 text-slate-400"}`}
                  onClick={() => setAnswers((prev) => ({ ...prev, who: opt }))}
                >
                  <div
                    className={`mr-2 flex h-3 w-3 items-center justify-center rounded-full border ${answers.who === opt ? "border-red-400" : "border-slate-500"}`}
                  >
                    {answers.who === opt && (
                      <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    )}
                  </div>
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-slate-300">
              What was the hardest part?
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Aligning priorities",
                "Time zones",
                "Technical constraints",
                "Tight deadlines",
              ].map((opt) => (
                <Button
                  key={opt}
                  variant="outline"
                  size="sm"
                  className={`h-8 justify-start text-xs font-normal ${answers.hardest === opt ? "border-red-500/50 bg-red-500/20 text-red-100" : "border-slate-700/50 bg-black/20 text-slate-400"}`}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, hardest: opt }))
                  }
                >
                  <div
                    className={`mr-2 flex h-3 w-3 items-center justify-center rounded-full border ${answers.hardest === opt ? "border-red-400" : "border-slate-500"}`}
                  >
                    {answers.hardest === opt && (
                      <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    )}
                  </div>
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2">
        <Button
          className="w-full bg-slate-100 font-bold text-black hover:bg-white"
          disabled={!answers.who || !answers.hardest}
          onClick={() => onRewrite(answers)}
        >
          <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
          Rewrite with my answers
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-slate-500 hover:text-red-400"
          onClick={onDelete}
        >
          Just delete this bullet
        </Button>
      </CardFooter>
    </Card>
  )
}
