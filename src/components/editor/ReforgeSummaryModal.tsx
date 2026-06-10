import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { XCircle, Loader2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useForgeStore } from "@/store/useForgeStore"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { LottieAnimation } from "@/components/ui/lottie-animation"
import cyberSuccessData from "@/assets/animations/cyber_success.json"
import type { GhostBullet } from "@/lib/ghost-schema"
import { checkExportStatus } from "@/lib/export-guard"
import { AutopsyBullet } from "./AutopsyBullet"

interface ReforgeSummaryModalProps {
  isOpen: boolean
  onClose: () => void
  rawText: string
  targetRole?: string
  onAccept: (newText: string) => void
  proposal: string
  setProposal: (text: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function ReforgeSummaryModal({
  isOpen,
  onClose,
  rawText,
  targetRole,
  onAccept,
  proposal,
  setProposal,
  isLoading,
  setIsLoading,
}: ReforgeSummaryModalProps) {
  const proposalRef = useRef("")
  const targetLockBriefing = useForgeStore((s) => s.targetLockBriefing)

  useEffect(() => {
    if (!isOpen || !isLoading) return

    proposalRef.current = ""
    setProposal("")

    let isMounted = true

    const streamData = async () => {
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
            rawSummary: rawText,
            targetRole: targetRole || "Professional",
            targetCompany: "Any",
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
            setProposal(
              JSON.stringify({
                error: `Forge error ${response.status}: ${text}`,
              })
            )
            setIsLoading(false)
          }
          return
        }

        const data = await response.json()
        if (isMounted) {
          // Serialize it so the parent can handle it, or we could lift the state type.
          // Since proposal is just a string, we can JSON.stringify it for now to avoid refactoring the entire parent component's state.
          // Or better yet, we can render the JSON here.
          setProposal(JSON.stringify(data))
          setIsLoading(false)
        }
      } catch (err: unknown) {
        if (isMounted) {
          setProposal(
            JSON.stringify({
              error: `Reforge failed: ${(err as Error).message}`,
            })
          )
          setIsLoading(false)
        }
      }
    }

    streamData()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isLoading, rawText, targetRole])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: 8, height: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-3 overflow-hidden rounded-lg border border-primary/30 bg-background shadow-lg shadow-primary/5"
      >
        <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
              System Override (Summary)
            </span>
          </div>
          {isLoading && (
            <div className="flex items-center gap-1.5 text-amber-500">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span className="font-mono text-[10px] tracking-widest uppercase">
                Processing
              </span>
            </div>
          )}
        </div>

        <div className="my-2 ml-4 border-l-2 border-primary/40 p-4 pl-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
          {(() => {
            if (isLoading) return "Connecting to Datacore..."
            if (!proposal) return ""
            
            let parsed = null
            try {
              parsed = JSON.parse(proposal)
            } catch {
              // Not JSON
            }

            if (parsed) {
              if (parsed.error)
                return <span className="text-destructive">{parsed.error}</span>
              if (parsed.bullets) {
                return (
                  <div className="mt-2 space-y-3">
                    {parsed.bullets.map((b: GhostBullet, idx: number) => (
                      <AutopsyBullet
                        key={idx}
                        bullet={b}
                        onUpdate={(updatedBullet) => {
                          const newProposal = { ...parsed }
                          if (updatedBullet === null) {
                            newProposal.bullets.splice(idx, 1)
                          } else {
                            newProposal.bullets[idx] = updatedBullet
                          }
                          setProposal(JSON.stringify(newProposal))
                        }}
                      />
                    ))}
                  </div>
                )
              }
            }
            return proposal
          })()}
        </div>

        {/* Status Messages */}
        {!isLoading && proposal && (
          <div className="border-t border-border/20 bg-muted/20 px-4 py-2">
            {(() => {
              try {
                const parsed = JSON.parse(proposal)
                if (parsed.bullets) {
                  const status = checkExportStatus(parsed.bullets)
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
                }
              } catch (e) {
                console.error(
                  "[ReforgeSummaryModal] Failed to parse proposal status:",
                  e
                )
              }
              return null
            })()}
          </div>
        )}

        {!isLoading && proposal && (
          <div className="flex items-center justify-end gap-2 border-t border-border/40 bg-secondary/30 px-4 py-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-8 gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase hover:text-foreground"
            >
              <XCircle className="h-3.5 w-3.5" />
              Discard
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={(() => {
                try {
                  const p = JSON.parse(proposal)
                  if (p.bullets) {
                    const status = checkExportStatus(p.bullets)
                    return !status.allowed
                  }
                  return false
                } catch {
                  return false
                }
              })()}
              onClick={() => {
                let finalSummary = proposal
                try {
                  const p = JSON.parse(proposal)
                  if (p.bullets) {
                    finalSummary = p.bullets
                      .map((b: GhostBullet) => "- " + b.text)
                      .join("\n  // constellation-override: forge-bot-auto-migration\n")
                  }
                } catch {
                  // Ignore JSON parse errors and use raw proposal
                }
                onAccept(finalSummary)
                onClose()
              }}
              className={cn(
                "h-8 gap-1.5 font-mono text-xs tracking-wider uppercase",
                "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--color-primary),0.3)] hover:bg-primary/90"
              )}
            >
              <LottieAnimation
                animationData={cyberSuccessData}
                className="h-4 w-4"
                loop={false}
              />
              Accept Override
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
