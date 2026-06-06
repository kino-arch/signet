import { useEffect } from "react"
import { useThemeStore } from "@/store/useThemeStore"
import { getEnhancementLevel } from "@/lib/enhancement"

const MAX_QUEUE_SIZE = 100
const FLUSH_INTERVAL = 30000 // 30 seconds

export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  const sessionContext = {
    device: getEnhancementLevel() === 0 ? 'mobile' : 'desktop',
    theme: useThemeStore.getState().activeThemeId,
    traffic_source: document.referrer || 'direct',
    variant: 'variant-a', // Currently testing "Build Your Resume" CTA
    landing_level: getEnhancementLevel(),
  }

  const payload = {
    event: eventName,
    properties: { ...sessionContext, ...properties },
    timestamp: Date.now()
  }

  const queue = JSON.parse(localStorage.getItem('analytics_queue') || '[]')
  queue.push(payload)
  if (queue.length > MAX_QUEUE_SIZE) queue.shift() // FIFO eviction
  localStorage.setItem('analytics_queue', JSON.stringify(queue))
  
  // @ts-ignore
  if (window.analytics?.track) {
    // @ts-ignore
    window.analytics.track(eventName, payload.properties)
  }
}

export const useAnalyticsTracker = () => {
  useEffect(() => {
    const flush = () => {
      const queue = JSON.parse(localStorage.getItem('analytics_queue') || '[]')
      if (queue.length === 0) return
      // @ts-ignore
      if (window.analytics?.track) {
        // @ts-ignore
        queue.forEach((event: any) => window.analytics.track(event.event, event.properties))
        localStorage.removeItem('analytics_queue')
      }
    }

    flush() // immediate flush on mount
    const interval = setInterval(flush, FLUSH_INTERVAL)

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const analyticsNode = target.closest('[data-analytics]') as HTMLElement | null
      if (analyticsNode) {
        const eventName = analyticsNode.getAttribute('data-analytics') || 'click'
        const location = analyticsNode.getAttribute('data-location') || 'unknown'
        trackEvent(eventName, { location })
      }
    }
    document.addEventListener('click', handleClick, { passive: true })
    
    return () => {
      document.removeEventListener('click', handleClick)
      clearInterval(interval)
    }
  }, [])
}
