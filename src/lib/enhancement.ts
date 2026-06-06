export const getEnhancementLevel = (): 0 | 1 | 2 => {
  if (typeof window === 'undefined') return 0
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0
  if (window.matchMedia('(pointer: coarse)').matches) return 0 // mobile gets static only
  
  // Check hardware: if device has <4GB RAM or is low-power, cap at Level 1
  if ('deviceMemory' in navigator && (navigator as any).deviceMemory < 4) return 1
  
  return 2
}
