import React from "react"
import { NordicTopNav } from "@/layout/NordicTopNav"
import { NordicBackground } from "@/components/ui/NordicBackground"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-nordic-bg font-sans text-nordic-text">
      <NordicBackground />
      {/* Global Top Navigation */}
      <NordicTopNav />

      {/* Main Layout Grid */}
      <div className="flex">
        {/* Dynamic Workspace Viewport */}
        <main
          role="main"
          className="flex-1 w-full px-8 py-8"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
