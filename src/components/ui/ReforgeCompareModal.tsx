import { motion } from "framer-motion";
import { Sparkles, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReforgeCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  reforgedText: string;
  onAccept: (reforged: string) => void;
  title?: string;
  description?: string;
}

export function ReforgeCompareModal({
  isOpen,
  onClose,
  originalText,
  reforgedText,
  onAccept,
  title = "Reforge Credentials",
  description = "Compare original template with Beskar-grade optimizations before final integration.",
}: ReforgeCompareModalProps) {
  const handleAccept = () => {
    onAccept(reforgedText);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!max-w-none w-[min(920px,calc(100vw-2rem))] border border-primary/20 bg-background/95 p-6 shadow-[0_0_50px_rgba(var(--primary),0.15)] backdrop-blur-xl">
        {/* Glow overlay */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

        <DialogHeader className="relative z-10 border-b border-border/40 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <DialogTitle className="font-heading text-lg font-bold tracking-wider uppercase">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Comparison grid */}
        <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 py-4">
          {/* Original panel */}
          <div className="flex flex-col  border border-border/40 bg-muted/20 p-4">
            <div className="mb-2 flex items-center justify-between border-b border-border/20 pb-1.5 text-[10px] font-mono text-muted-foreground">
              <span>RAW DATASTATE</span>
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                ORIGINAL
              </span>
            </div>
            <div 
              className="flex-1 overflow-y-auto text-xs/relaxed text-muted-foreground whitespace-pre-wrap min-h-[120px] max-h-[220px]"
              dangerouslySetInnerHTML={{ __html: originalText }}
            />
          </div>

          {/* Reforged panel */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col  border-2 border-primary/45 bg-primary/5 p-4 shadow-[0_0_15px_rgba(var(--primary),0.05)]"
          >
            {/* Ambient reforge glow */}
            <div className="absolute inset-0 -z-10  bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-primary)_12%,transparent),transparent_60%)]" />

            <div className="mb-2 flex items-center justify-between border-b border-primary/20 pb-1.5 text-[10px] font-mono text-primary font-bold">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 animate-pulse" />
                REFORGED SIGIL
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 animate-ping rounded-full bg-primary" />
                OPTIMIZED
              </span>
            </div>
            <div 
              className="flex-1 overflow-y-auto text-xs/relaxed text-foreground whitespace-pre-wrap min-h-[120px] max-h-[220px]"
              dangerouslySetInnerHTML={{ __html: reforgedText }}
            />
          </motion.div>
        </div>

        {/* Custom Actions */}
        <div className="relative z-10 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end border-t border-border/40 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center gap-1.5"
          >
            <X className="h-3.5 w-3.5" />
            Keep Original
          </Button>
          <Button
            variant="default"
            onClick={handleAccept}
            className="flex items-center gap-1.5 shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] hover:shadow-primary/25"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
            Integrate Suggestion
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
