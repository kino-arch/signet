import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export interface CreedLine {
  text: string
  className?: string
  /** Characters per second. Defaults to 40ms per char. */
  typingSpeed?: number
  /** Delay in ms before this line starts (after previous line completes). */
  pauseBefore?: number
}

interface AnimatedCreedBlockProps {
  lines: CreedLine[]
  /** Called once all lines have finished typing. */
  onComplete?: () => void
  className?: string
  glowColor?: string
}

export function AnimatedCreedBlock({
  lines,
  onComplete,
  className,
  glowColor = "var(--signet-glow)",
}: AnimatedCreedBlockProps) {
  const reducedMotion = useReducedMotion()
  // Which line index we're currently typing
  const [currentLine, setCurrentLine] = useState(0)
  // Partial text for the currently-typing line
  const [partialText, setPartialText] = useState("")
  // Whether the cursor is visible (we're mid-typing)
  const [isTyping, setIsTyping] = useState(false)
  // Lines that have fully completed (shown in full, no cursor)
  const [completedLines, setCompletedLines] = useState<Set<number>>(new Set())
  // Final-line glow pulse
  const [pulseActive, setPulseActive] = useState(false)
  const [allDone, setAllDone] = useState(false)

  const linesRef = useRef(lines)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    linesRef.current = lines
    onCompleteRef.current = onComplete
  }, [lines, onComplete])

  useEffect(() => {
    if (reducedMotion) {
      // Fast-forward animation for reduced motion
      const doneTimer = setTimeout(() => {
        setPartialText("")
        setIsTyping(false)
        setCompletedLines(new Set(linesRef.current.map((_, i) => i)))
        setAllDone(true)
        setPulseActive(true)
        onCompleteRef.current?.()
      }, 100)
      return () => clearTimeout(doneTimer)
    }

    if (currentLine >= linesRef.current.length) {
      const doneTimer = setTimeout(() => {
        setAllDone(true)
        setPulseActive(true)
        onCompleteRef.current?.()
      }, 0)
      return () => clearTimeout(doneTimer)
    }

    const line = linesRef.current[currentLine]
    const speed = line.typingSpeed ?? 40
    const pause = line.pauseBefore ?? 400

    let charIndex = 0
    let typingTimer: ReturnType<typeof setInterval>
    let nextLineTimer: ReturnType<typeof setTimeout>

    // Pause before starting this line
    const pauseTimer = setTimeout(() => {
      setPartialText("")
      setIsTyping(true)

      typingTimer = setInterval(() => {
        if (charIndex < line.text.length) {
          setPartialText(line.text.slice(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typingTimer)
          setIsTyping(false)
          setCompletedLines((prev) => new Set(prev).add(currentLine))

          // Advance to next line
          nextLineTimer = setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
          }, 600)
        }
      }, speed)
    }, pause)

    return () => {
      clearTimeout(pauseTimer)
      clearInterval(typingTimer)
      if (nextLineTimer) clearTimeout(nextLineTimer)
    }
  }, [currentLine, reducedMotion])

  return (
    <div className={cn("space-y-5", className)}>
      {lines.map((line, index) => {
        const isActive = index === currentLine
        const isDone = completedLines.has(index)
        const isLast = index === lines.length - 1
        const isStarted = index <= currentLine || reducedMotion

        return (
          <motion.div
            key={index}
            initial={
              reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
            }
            animate={isStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              pointerEvents: isStarted ? "auto" : "none",
            }}
          >
            {isLast ? (
              // Final "This is the Way." — special pulsing treatment
              <motion.p
                animate={
                  pulseActive && !reducedMotion
                    ? {
                        textShadow: [
                          "0 0 0px transparent",
                          `0 0 12px ${glowColor}`,
                          "0 0 0px transparent",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={cn(
                  "text-center font-heading font-semibold tracking-wide text-primary italic",
                  line.className
                )}
              >
                {isDone ? (
                  line.text
                ) : isActive ? (
                  <>
                    <span>{partialText}</span>
                    {isTyping && !reducedMotion && <BlinkingCursor />}
                    <span className="opacity-0">
                      {line.text.slice(partialText.length)}
                    </span>
                  </>
                ) : (
                  <span className="opacity-0">{line.text}</span>
                )}
              </motion.p>
            ) : (
              <p
                className={cn(
                  "font-mono text-sm leading-relaxed text-muted-foreground",
                  line.className
                )}
              >
                <span
                  className={cn(
                    "mr-1 font-sans text-primary/40 transition-opacity duration-300 select-none",
                    !isStarted && "opacity-0"
                  )}
                >
                  &ldquo;
                </span>
                <span>
                  {isDone ? (
                    line.text
                  ) : isActive ? (
                    <>
                      <span>{partialText}</span>
                      {isTyping && !reducedMotion && <BlinkingCursor />}
                      <span className="opacity-0">
                        {line.text.slice(partialText.length)}
                      </span>
                    </>
                  ) : (
                    <span className="opacity-0">{line.text}</span>
                  )}
                </span>
                <span
                  className={cn(
                    "ml-0.5 font-sans text-primary/40 transition-opacity duration-300 select-none",
                    !isDone && "opacity-0"
                  )}
                >
                  &rdquo;
                </span>
              </p>
            )}
          </motion.div>
        )
      })}

      {/* Scan-line decoration visible while typing is in progress */}
      {!reducedMotion && (
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{
            opacity: allDone ? 0 : 1,
          }}
          animate={!allDone ? { scaleX: [0, 1, 0] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  )
}

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.7, repeat: Infinity }}
      className="ml-0.5 inline-block h-[1em] w-0.5 bg-primary align-middle"
    />
  )
}
