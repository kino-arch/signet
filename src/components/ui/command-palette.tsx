import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { LottieAnimation } from "@/components/ui/lottie-animation"
import barcodeScannerData from "@/assets/animations/barcode_scanner.json"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <div className="overflow-hidden rounded-xl border border-cyan-500/30 bg-zinc-950 font-mono shadow-2xl">
        <CommandInput
          autoFocus
          placeholder="Execute platform command... (e.g. > forge)"
          className="border-b border-zinc-800 text-zinc-200"
        />
        <CommandList className="max-h-[300px] p-2 text-zinc-400">
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center py-6">
              <LottieAnimation
                animationData={barcodeScannerData}
                className="mb-2 h-12 w-32 opacity-70 mix-blend-screen"
              />
              <span>No encrypted vectors found.</span>
            </div>
          </CommandEmpty>
          <CommandGroup heading="System Protocols">
            <CommandItem className="cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 data-[selected=true]:bg-zinc-900 data-[selected=true]:text-cyan-400">
              <span>&gt; forge_new_slate</span>
            </CommandItem>
            <CommandItem className="cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 data-[selected=true]:bg-zinc-900 data-[selected=true]:text-cyan-400">
              <span>&gt; access_datacore</span>
            </CommandItem>
            <CommandItem className="cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 data-[selected=true]:bg-zinc-900 data-[selected=true]:text-cyan-400">
              <span>&gt; target_recon</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </div>
    </CommandDialog>
  )

  return createPortal(content, document.body)
}
