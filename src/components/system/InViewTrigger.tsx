import { useState, useEffect, useRef } from 'react'

export function InViewTrigger({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  
  return <div ref={ref} className="contents">{inView ? children : fallback}</div>
}
