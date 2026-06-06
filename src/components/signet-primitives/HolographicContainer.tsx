import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface HolographicContainerProps {
  children: React.ReactNode
  className?: string
  intensity?: 'subtle' | 'strong'
}

export const HolographicContainer = forwardRef<HTMLDivElement, HolographicContainerProps>(({ 
  children, 
  className,
  intensity = 'subtle' 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        intensity === 'strong' && 'holographic-strong',
        className
      )}
    >
      {children}
      {/* Scanlines - CSS only, no JS, no canvas */}
      <div 
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 md:opacity-30 holographic-scanline",
          intensity === 'subtle' ? "opacity-10 md:opacity-20" : ""
        )}
      />
      {/* Vignette glow */}
      <div 
        className="pointer-events-none absolute inset-0 holographic-vignette"
      />
    </div>
  )
})
HolographicContainer.displayName = 'HolographicContainer'
