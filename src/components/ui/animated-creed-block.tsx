import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CreedLine {
  text: string;
  className?: string;
  /** Characters per second. Defaults to 40ms per char. */
  typingSpeed?: number;
  /** Delay in ms before this line starts (after previous line completes). */
  pauseBefore?: number;
}

interface AnimatedCreedBlockProps {
  lines: CreedLine[];
  /** Called once all lines have finished typing. */
  onComplete?: () => void;
  className?: string;
}

export function AnimatedCreedBlock({
  lines,
  onComplete,
  className,
}: AnimatedCreedBlockProps) {
  // Which line index we're currently typing
  const [currentLine, setCurrentLine] = useState(0);
  // Partial text for the currently-typing line
  const [partialText, setPartialText] = useState("");
  // Whether the cursor is visible (we're mid-typing)
  const [isTyping, setIsTyping] = useState(false);
  // Lines that have fully completed (shown in full, no cursor)
  const [completedLines, setCompletedLines] = useState<Set<number>>(new Set());
  // Final-line glow pulse
  const [pulseActive, setPulseActive] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const linesRef = useRef(lines);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    linesRef.current = lines;
    onCompleteRef.current = onComplete;
  }, [lines, onComplete]);

  useEffect(() => {
    if (currentLine >= linesRef.current.length) {
      const doneTimer = setTimeout(() => {
        setAllDone(true);
        setPulseActive(true);
        onCompleteRef.current?.();
      }, 0);
      return () => clearTimeout(doneTimer);
    }

    const line = linesRef.current[currentLine];
    const speed = line.typingSpeed ?? 40;
    const pause = line.pauseBefore ?? 400;

    let charIndex = 0;
    let typingTimer: ReturnType<typeof setInterval>;

    // Pause before starting this line
    const pauseTimer = setTimeout(() => {
      setPartialText("");
      setIsTyping(true);

      typingTimer = setInterval(() => {
        if (charIndex < line.text.length) {
          setPartialText(line.text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingTimer);
          setIsTyping(false);
          setCompletedLines((prev) => new Set(prev).add(currentLine));

          // Advance to next line
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
          }, 600);
        }
      }, speed);
    }, pause);

    return () => {
      clearTimeout(pauseTimer);
      clearInterval(typingTimer);
    };
     
  }, [currentLine]);

  return (
    <div className={cn("space-y-5", className)}>
      {lines.map((line, index) => {
        const isActive = index === currentLine;
        const isDone = completedLines.has(index);
        const isLast = index === lines.length - 1;
        const isStarted = index <= currentLine;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
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
                  pulseActive
                    ? {
                        textShadow: [
                          "0 0 0px transparent",
                          "0 0 12px var(--color-primary)",
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
                  "text-center font-heading font-semibold italic tracking-wide text-primary",
                  line.className
                )}
              >
                {isDone ? (
                  line.text
                ) : isActive ? (
                  <>
                    <span>{partialText}</span>
                    {isTyping && <BlinkingCursor />}
                    <span className="opacity-0">{line.text.slice(partialText.length)}</span>
                  </>
                ) : (
                  <span className="opacity-0">{line.text}</span>
                )}
              </motion.p>
            ) : (
              <p
                className={cn(
                  "text-sm text-muted-foreground leading-relaxed font-mono",
                  line.className
                )}
              >
                <span
                  className={cn(
                    "text-primary/40 mr-1 select-none font-sans transition-opacity duration-300",
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
                      {isTyping && <BlinkingCursor />}
                      <span className="opacity-0">{line.text.slice(partialText.length)}</span>
                    </>
                  ) : (
                    <span className="opacity-0">{line.text}</span>
                  )}
                </span>
                <span
                  className={cn(
                    "text-primary/40 ml-0.5 select-none font-sans transition-opacity duration-300",
                    !isDone && "opacity-0"
                  )}
                >
                  &rdquo;
                </span>
              </p>
            )}
          </motion.div>
        );
      })}

      {/* Scan-line decoration visible while typing is in progress */}
      <motion.div
        className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        style={{
          opacity: allDone ? 0 : 1,
        }}
        animate={!allDone ? { scaleX: [0, 1, 0] } : {}}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.7, repeat: Infinity }}
      className="ml-0.5 inline-block h-[1em] w-0.5  bg-primary align-middle"
    />
  );
}
