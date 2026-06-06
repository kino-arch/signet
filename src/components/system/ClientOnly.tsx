'use client'
import { useEffect, useState } from 'react'

import { getEnhancementLevel } from '@/lib/enhancement'

export const ClientOnly = ({ children, fallback = null, minLevel = 1 }: { children: React.ReactNode, fallback?: React.ReactNode, minLevel?: 0 | 1 | 2 }) => {
  const [mounted, setMounted] = useState(false)
  const [level, setLevel] = useState<0 | 1 | 2>(0)
  
  useEffect(() => {
    setMounted(true)
    setLevel(getEnhancementLevel())
  }, [])
  
  return (mounted && level >= minLevel) ? children : fallback
}
