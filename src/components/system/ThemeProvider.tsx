import { useEffect, useState, useRef } from "react"
import { useThemeStore } from "@/store/useThemeStore"
import { useLocation } from "react-router-dom"
import { themes } from "@/themes"

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const activeThemeId = useThemeStore(state => state.activeThemeId)
  const [announcement, setAnnouncement] = useState("")
  const isFirstRender = useRef(true)

  useEffect(() => {
    const unsub = useThemeStore.subscribe(
      (state) => {
        if (isFirstRender.current) {
          isFirstRender.current = false
          return
        }
        setAnnouncement(`Theme changed to ${themes[state.activeThemeId]?.name || state.activeThemeId}`)
      }
    )
    return unsub
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const theme = themes[activeThemeId]
    if (!theme) return
    
    // Determine mode based on route
    const isLanding = location.pathname === '/' || location.pathname === '/login'
    const modeData = isLanding ? theme.landing : theme.functional
    
    // Write all theme tokens to CSS variables
    root.style.setProperty('--theme-bg-start', modeData.bgStart)
    root.style.setProperty('--theme-bg-end', modeData.bgEnd)
    root.style.setProperty('--signet-glow', modeData.glowColor)
    root.style.setProperty('--signet-accent', modeData.accentColor)
    root.style.setProperty('--signet-grain-opacity', String(modeData.grainOpacity))
    
    // Broadcast theme change for cross-tab sync
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('theme_sync')
      bc.postMessage({ type: 'THEME_CHANGED', themeId: activeThemeId })
      bc.close()
    } else {
      // Fallback for Safari < 15.4
      window.localStorage.setItem('theme_sync_timestamp', Date.now().toString())
      window.localStorage.setItem('theme_sync_value', activeThemeId)
    }
  }, [activeThemeId, location.pathname])
  
  // Listen for cross-tab sync
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel('theme_sync')
      channel.onmessage = (event) => {
        if (event.data.type === 'THEME_CHANGED') {
          const currentThemeId = useThemeStore.getState().activeThemeId
          if (currentThemeId !== event.data.themeId) {
            useThemeStore.getState().setTheme(event.data.themeId)
          }
        }
      }
    }
    
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme_sync_timestamp') {
        const theme = window.localStorage.getItem('theme_sync_value')
        const currentThemeId = useThemeStore.getState().activeThemeId
        if (theme && theme !== currentThemeId) {
          // @ts-expect-error - localStorage theme string is untyped
          useThemeStore.getState().setTheme(theme)
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    
    return () => {
      if (channel) channel.close()
      window.removeEventListener('storage', handleStorage)
    }
  }, [])
  
  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      {children}
    </>
  )
}
