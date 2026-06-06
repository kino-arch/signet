import { cn } from '@/lib/utils'
import { ClientOnly } from '@/components/system/ClientOnly'
import { SignatureLayerBoundary } from '@/components/system/SignatureLayerBoundary'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'subtle' | 'pulsing'
  minLevel?: 0 | 1 | 2
}

export const GlowCard = ({ 
  children, 
  className,
  variant = 'subtle',
  minLevel = 1
}: GlowCardProps) => {
  const StaticCard = (
    <div className={cn('rounded-lg border border-slate-800 bg-slate-900/50 p-6', className)}>
      {children}
    </div>
  )

  const EnhancedCard = (
    <div 
      className={cn(
        'relative rounded-lg bg-slate-900/50 p-6',
        variant === 'subtle' && 'glow-border-subtle',
        variant === 'pulsing' && 'glow-border-pulsing',
        className
      )}
    >
      {children}
    </div>
  )

  return (
    <ClientOnly fallback={StaticCard} minLevel={minLevel}>
      <SignatureLayerBoundary fallback={StaticCard}>
        {EnhancedCard}
      </SignatureLayerBoundary>
    </ClientOnly>
  )
}
