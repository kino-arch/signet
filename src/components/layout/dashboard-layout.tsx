import React from "react"
import { useLocation } from "react-router-dom"
import { NordicTopNav } from "@/layout/NordicTopNav"
import { NordicEditorSidebar } from "@/components/nordic/NordicEditorSidebar"
import { NordicBackground } from "@/components/ui/NordicBackground"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  
  // Only show the contextual sidebar when deep inside the Forge editor
  const showSidebar = location.pathname.startsWith("/forge") || location.pathname === "/editor"

  return (
    <div className="relative min-h-screen bg-nordic-bg font-sans text-nordic-text">
      <NordicBackground />
      {/* Global Top Navigation */}
      <NordicTopNav />

      {/* Main Layout Grid */}
      <div className="flex">
        {/* Contextual Sidebar (Forge Only) */}
        {showSidebar && <NordicEditorSidebar />}

        {/* Dynamic Workspace Viewport */}
        <main
          className={`flex-1 ${
            showSidebar ? "" : "w-full px-8 py-8"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
