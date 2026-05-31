import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  if (!mounted) return null

  // Radix UI Dialog already uses a portal, but explicitly wrapping it in one 
  // fulfills the strict z-index bypass requirement if rendering custom overlays.
  const content = (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="border border-cyan-500/30 bg-zinc-950 font-mono shadow-2xl rounded-xl overflow-hidden">
        <CommandInput autoFocus placeholder="Execute platform command... (e.g. > forge)" className="border-b border-zinc-800 text-zinc-200" />
        <CommandList className="max-h-[300px] text-zinc-400 p-2 custom-scrollbar">
          <CommandEmpty>No encrypted vectors found.</CommandEmpty>
          <CommandGroup heading="System Protocols">
            <CommandItem className="hover:bg-zinc-900 focus:bg-zinc-900 cursor-pointer data-[selected=true]:bg-zinc-900 data-[selected=true]:text-cyan-400">
              <span>&gt; forge_new_slate</span>
            </CommandItem>
            <CommandItem className="hover:bg-zinc-900 focus:bg-zinc-900 cursor-pointer data-[selected=true]:bg-zinc-900 data-[selected=true]:text-cyan-400">
              <span>&gt; access_datacore</span>
            </CommandItem>
            <CommandItem className="hover:bg-zinc-900 focus:bg-zinc-900 cursor-pointer data-[selected=true]:bg-zinc-900 data-[selected=true]:text-cyan-400">
              <span>&gt; target_recon</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </div>
    </CommandDialog>
  )

  return createPortal(content, document.body)
}
