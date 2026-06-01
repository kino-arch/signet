import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { useAI } from "@/lib/useAI";
import { useAuthStore } from "@/store/useAuthStore";
import { LottieAnimation } from "@/components/ui/lottie-animation";
import cyberSuccessData from "@/assets/animations/cyber_success.json";

interface ReforgeSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawText: string;
  targetRole?: string;
  onAccept: (newText: string) => void;
  proposal: string;
  setProposal: (text: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function ReforgeSummaryModal({
  isOpen,
  onClose,
  rawText,
  targetRole,
  onAccept,
  proposal,
  setProposal,
  isLoading,
  setIsLoading
}: ReforgeSummaryModalProps) {
  const proposalRef = useRef("");
  const { reforgeSummary } = useAI();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!isOpen || !isLoading) return;

    proposalRef.current = "";
    setProposal("");
    
    let isMounted = true;
    
    const streamData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const isGuest = user?.id?.startsWith("guest_");
      
      // ── Guest / Expired Session Fallback ─────────────────────────────────
      // If the user has no valid session or is a guest, skip the Edge Function entirely
      // and use the client-side OpenRouter path which doesn't require auth.
      if (isGuest || !session?.access_token) {
        try {
          const result = await reforgeSummary(rawText, targetRole || "Professional");
          if (isMounted) {
            setProposal(result);
            setIsLoading(false);
          }
        } catch (err: unknown) {
          if (isMounted) {
            setProposal(`⚠️ Reforge failed: ${(err as Error).message}`);
            setIsLoading(false);
          }
        }
        return;
      }

      // ── Authenticated Path: Stream from Supabase Edge Function ───────────
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const edgeUrl = `${supabaseUrl}/functions/v1/reforge-datacore`;
      
      try {
        const response = await fetch(edgeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
          },
          body: JSON.stringify({
            rawSummary: rawText,
            targetRole: targetRole || "Professional",
            targetCompany: "Any",
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          if (isMounted) {
            // If Edge Function auth fails mid-flight (e.g. token expired during editing),
            // fall back to client-side OpenRouter instead of showing a raw 401 error.
            if (response.status === 401) {
              try {
                const fallbackResult = await reforgeSummary(rawText, targetRole || "Professional");
                setProposal(fallbackResult);
              } catch {
                setProposal(`⚠️ Forge error ${response.status}: ${text}`);
              }
            } else {
              setProposal(`⚠️ Forge error ${response.status}: ${text}`);
            }
            setIsLoading(false);
          }
          return;
        }

        if (!response.body) {
          if (isMounted) {
            setProposal("⚠️ No response body from edge function.");
            setIsLoading(false);
          }
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              if (isMounted) setIsLoading(false);
              return;
            }
            try {
              const parsed = JSON.parse(data);
              const delta = parsed?.choices?.[0]?.delta?.content;
              const reasoning = parsed?.choices?.[0]?.delta?.reasoning_content || parsed?.choices?.[0]?.delta?.reasoning;
              
              if (delta !== undefined && delta !== null && isMounted) {
                proposalRef.current += delta;
                setProposal(proposalRef.current);
              } else if (reasoning && !proposalRef.current && isMounted) {
                setProposal("Analyzing trajectory and calculating optimal rewrite vectors...");
              }
            } catch {
              // skip unparseable lines
            }
          }
        }
        if (isMounted) setIsLoading(false);
      } catch (err: unknown) {
        if (isMounted) {
          setProposal(`⚠️ Reforge failed: ${(err as Error).message}`);
          setIsLoading(false);
        }
      }
    };

    streamData();

    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isLoading, rawText, targetRole]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: 8, height: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-3 overflow-hidden rounded-lg border border-primary/30 bg-background shadow-lg shadow-primary/5"
      >
        <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
              System Override (Summary)
            </span>
          </div>
          {isLoading && (
            <div className="flex items-center gap-1.5 text-amber-500">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span className="font-mono text-[10px] tracking-widest uppercase">Processing</span>
            </div>
          )}
        </div>

        <div className="my-2 ml-4 border-l-2 border-primary/40 p-4 pl-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
          {proposal || (isLoading ? "Connecting to Datacore..." : "")}
        </div>

        {!isLoading && proposal && (
          <div className="flex items-center justify-end gap-2 border-t border-border/40 bg-secondary/30 px-4 py-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-8 gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase hover:text-foreground"
            >
              <XCircle className="h-3.5 w-3.5" />
              Discard
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                onAccept(proposal);
                onClose();
              }}
              className={cn(
                "h-8 gap-1.5 text-xs font-mono uppercase tracking-wider",
                "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_10px_rgba(var(--color-primary),0.3)]"
              )}
            >
              <LottieAnimation animationData={cyberSuccessData} className="h-4 w-4" />
              Accept Override
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
