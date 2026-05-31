import React from "react"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { CommandPalette } from "../ui/command-palette"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-50 font-sans">
      {/* Structural Sidebar (30% Mandalorian Visual Weight) */}
      <Sidebar className="w-64 border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-md" />

      {/* Main Operations Terminal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Persistent Top Navigation Telemetry Bar */}
        <TopNav className="h-16 border-b border-zinc-800 bg-zinc-950 px-8 flex items-center justify-between" />
        
        {/* Dynamic Workspace Viewport */}
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-8 custom-scrollbar relative">
          {children}
        </main>
      </div>

      {/* Global Command Overlay */}
      <CommandPalette />
    </div>
  )
}
