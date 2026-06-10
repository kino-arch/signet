import { useState, useEffect } from "react"
import { Mic, Square, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useDataSlateStore } from "@/store/useDataSlateStore"

interface VoiceMemoButtonProps {
  /** Pass entryId to auto-wire transcript into the DataSlate store summary field. */
  entryId?: string
  /** Pass onTranscriptComplete for manual/controlled usage. */
  onTranscriptComplete?: (transcript: string) => void
  className?: string
}

export function VoiceMemoButton({ entryId, onTranscriptComplete, className }: VoiceMemoButtonProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [timer, setTimer] = useState(0)

  // Simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } else {
      setTimer(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const toggleRecording = () => {
    if (isRecording) {
      // Stop and process
      setIsRecording(false)
      setIsProcessing(true)
      
      // Simulate Whisper API call
      setTimeout(() => {
        setIsProcessing(false)
        const transcript =
          "I led a team of 4 engineers to rebuild the checkout flow. We cut the page load time from 4.2 seconds to 800 milliseconds, which was a huge win."
        if (entryId) {
          // Auto-wire into store summary
          const store = useDataSlateStore.getState()
          const entry = store.work.find((w) => w.id === entryId)
          const newSummary = entry?.summary ? `${entry.summary} ${transcript}` : transcript
          store.updateWorkEntry(entryId, { summary: newSummary })
        }
        onTranscriptComplete?.(transcript)
      }, 1500)
    } else {
      // Start recording
      setIsRecording(true)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={toggleRecording}
        disabled={isProcessing}
        className={cn(
          "relative gap-2 transition-all duration-300",
          isRecording
            ? "border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400"
            : "border-border/40 hover:border-border/80"
        )}
      >
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </motion.div>
          ) : isRecording ? (
            <motion.div
              key="stop"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Square className="h-4 w-4 fill-current" />
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Mic className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>

        <span className="text-xs font-mono">
          {isProcessing
            ? "Transcribing..."
            : isRecording
            ? formatTime(timer)
            : "Voice Memo"}
        </span>

        {/* Recording Pulse Effect */}
        {isRecording && (
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
          </span>
        )}
      </Button>
    </div>
  )
}
