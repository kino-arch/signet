import { useEffect, useRef } from "react"

export function TextScrambleEffect({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const chars = "!<>-_\\\\/[]{}—=+*^?#________"

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.textContent = text
          .split("")
          .map((_letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      }

      if (iteration >= text.length) {
        clearInterval(interval)
      }
      iteration += 1
    }, 30)

    return () => clearInterval(interval)
  }, [text])

  return <p ref={textRef} className={className}></p>
}
