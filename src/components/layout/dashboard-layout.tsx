import React from "react"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { CommandPalette } from "../ui/command-palette"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 font-sans text-zinc-50">
      {/* Structural Sidebar */}
      <Sidebar className="w-64 border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-md" />

      {/* Main Operations Terminal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Persistent Top Navigation Telemetry Bar */}
        <TopNav className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8" />

        {/* Dynamic Workspace Viewport */}
        <main className="relative flex-1 overflow-y-auto bg-zinc-950 p-8">
          {children}
        </main>
      </div>

      {/* Global Command Overlay */}
      <CommandPalette />
    </div>
  )
}
