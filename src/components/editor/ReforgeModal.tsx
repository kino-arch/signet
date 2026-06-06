import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, Loader2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import type { WorkEntry } from "@/store/useDataSlateStore"
import { cn } from "@/lib/utils"
import { checkExportStatus } from "@/lib/export-guard"
import { AutopsyBullet } from "./AutopsyBullet"

interface ReforgeModalProps {
  entry: WorkEntry
}

import { useForgeStore } from "@/store/useForgeStore"
// ─── System Override Modal ────────────────────────────────────────────────────
export function ReforgeModal({ entry }: ReforgeModalProps) {
  const { setAiProposal, setAiLoading, acceptProposal, discardProposal } =
    useDataSlateStore()
  const proposalRef = useRef("")
  const isActive = entry.ai_loading || entry.ai_proposal !== undefined
  const targetLockBriefing = useForgeStore((s) => s.targetLockBriefing)

  // Kick off the stream when loading flag is set
  useEffect(() => {
    if (!entry.ai_loading) return

    let isMounted = true
    proposalRef.current = ""
    setAiProposal(entry.id, "")

    const doReforge = async () => {
      const apiUrl = "/ai/reforge"
      const userKey = localStorage.getItem("openrouter_api_key") || ""

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-api-key": userKey,
          },
          body: JSON.stringify({
            rawSummary: entry.summary,
            targetRole: entry.position,
            targetCompany: entry.name,
            targetLock: targetLockBriefing,
            industry: localStorage.getItem("user_industry") || "",
            tone: localStorage.getItem("user_tone") || "Professional",
            enableLanguageTool:
              localStorage.getItem("enable_language_tool") !== "false",
            userId: localStorage.getItem("sb-vslbiwubtcynvfytwcbr-auth-token")
              ? JSON.parse(
                  localStorage.getItem("sb-vslbiwubtcynvfytwcbr-auth-token") ||
                    "{}"
                )?.user?.id
              : undefined,
            slateId: useDataSlateStore.getState().activeSlateId,
          }),
        })

        if (!response.ok) {
          const text = await response.text()
          if (isMounted) {
            setAiProposal(entry.id, {
              error: `Forge error ${response.status}: ${text}`,
            })
          }
          return
        }

        const data = await response.json()
        if (isMounted) {
          setAiProposal(entry.id, data)
        }
      } catch (err: unknown) {
        if (isMounted)
          setAiProposal(entry.id, {
            error: `Reforge failed: ${(err as Error).message}`,
          })
      } finally {
        if (isMounted) setAiLoading(entry.id, false)
      }
    }

    doReforge()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.ai_loading, entry.id, entry.summary, entry.position, entry.name])

  if (!isActive) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="mt-3 overflow-hidden rounded-lg border border-primary/30 bg-background shadow-lg shadow-primary/5"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
              System Override (Ghost Protocol)
            </span>
          </div>
          {entry.ai_loading && (
            <div className="flex items-center gap-1.5 text-amber-500">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="font-mono text-[10px] tracking-widest uppercase">
                Reforging...
              </span>
            </div>
          )}
          {!entry.ai_loading && entry.ai_proposal !== undefined && (
            <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
              Proposal Ready
            </span>
          )}
        </div>

        {/* Split Comparison */}
        <div className="grid grid-cols-2 divide-x divide-border/30">
          {/* Original */}
          <div className="space-y-1.5 p-3">
            <p className="text-[9px] font-bold tracking-widest text-muted-foreground/60 uppercase">
              Original
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {entry.summary || (
                <span className="italic opacity-50">No summary</span>
              )}
            </p>
          </div>

          {/* AI Proposal */}
          <div className="space-y-1.5 bg-primary/[0.02] p-3">
            <p className="text-[9px] font-bold tracking-widest text-primary/60 uppercase">
              AI Proposal
            </p>
            <div
              className={cn(
                "space-y-2 text-xs leading-relaxed",
                entry.ai_loading ? "text-primary/60" : "text-foreground"
              )}
            >
              {entry.ai_loading ? (
                <span className="flex items-center gap-1 text-primary/40">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="font-mono text-[10px]">
                    Analyzing trajectory and calculating optimal rewrite
                    vectors...
                  </span>
                </span>
              ) : entry.ai_proposal?.error ? (
                <span className="text-destructive">
                  {entry.ai_proposal.error}
                </span>
              ) : entry.ai_proposal?.bullets ? (
                <div className="space-y-3">
                  {entry.ai_proposal.bullets.map((b: any, idx: number) => (
                    <AutopsyBullet
                      key={idx}
                      bullet={b}
                      onUpdate={(updatedBullet) => {
                        const newProposal = { ...entry.ai_proposal }
                        if (updatedBullet === null) {
                          newProposal.bullets.splice(idx, 1)
                        } else {
                          newProposal.bullets[idx] = updatedBullet
                        }
                        setAiProposal(entry.id, newProposal)
                      }}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {!entry.ai_loading && entry.ai_proposal?.bullets && (
          <div className="border-t border-border/20 bg-muted/20 px-4 py-2">
            {(() => {
              const status = checkExportStatus(entry.ai_proposal.bullets)
              if (status.blockers.length > 0) {
                return (
                  <div className="flex flex-col gap-1 text-xs font-medium text-red-500">
                    {status.blockers.map((b, i) => (
                      <span key={i}>• {b}</span>
                    ))}
                  </div>
                )
              }
              if (status.warnings.length > 0) {
                return (
                  <div className="flex flex-col gap-1 text-xs font-medium text-amber-500">
                    {status.warnings.map((w, i) => (
                      <span key={i}>• {w}</span>
                    ))}
                  </div>
                )
              }
              return (
                <div className="text-xs font-medium text-green-500">
                  • Ready to integrate
                </div>
              )
            })()}
          </div>
        )}

        {/* Action Buttons */}
        {!entry.ai_loading && entry.ai_proposal !== undefined && (
          <div className="flex items-center gap-2 border-t border-border/20 bg-muted/5 px-4 py-3">
            <Button
              size="sm"
              disabled={(() => {
                if (entry.ai_proposal?.bullets) {
                  const status = checkExportStatus(entry.ai_proposal.bullets)
                  return !status.allowed
                }
                return false
              })()}
              onClick={() => {
                acceptProposal(entry.id)
              }}
              className="h-8 flex-1 gap-1.5 bg-primary text-xs font-bold tracking-wider text-primary-foreground uppercase hover:bg-primary/90 disabled:opacity-50"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Integrate Upgrade
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => discardProposal(entry.id)}
              className="h-8 flex-1 gap-1.5 border-border/50 font-mono text-xs tracking-wider text-muted-foreground uppercase hover:text-foreground"
            >
              <XCircle className="h-3.5 w-3.5" />
              Discard
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
