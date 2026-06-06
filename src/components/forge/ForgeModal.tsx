import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ForgeArtifact } from "./ForgeArtifact"
import { Button } from "@/components/ui/button"

interface ForgeModalProps {
  slateId: string
  targetElementId: string
  isPremium: boolean
  onSuccess: () => Promise<void>
  disabled?: boolean
  trigger?: React.ReactNode
  onRequiresPremium?: () => void
}

export function ForgeModal({
  slateId,
  targetElementId,
  isPremium,
  onSuccess,
  disabled,
  trigger,
}: ForgeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            disabled={disabled}
            className="glow-cyan font-mono text-[10px] tracking-widest uppercase"
          >
            Forge Masterpiece
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center border-0 bg-transparent p-0 shadow-none sm:max-w-md">
        <ForgeArtifact
          slateId={slateId}
          targetElementId={targetElementId}
          isPremium={isPremium}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}
