import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDataSlateStore } from "@/store/useDataSlateStore";
import { useAuthStore } from "@/store/useAuthStore";
import type { WorkEntry } from "@/store/useDataSlateStore";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface ReforgeModalProps {
  entry: WorkEntry;
}

import { useAI } from "@/lib/useAI";

// ─── System Override Modal ────────────────────────────────────────────────────
export function ReforgeModal({ entry }: ReforgeModalProps) {
  const { setAiProposal, setAiLoading, acceptProposal, discardProposal } = useDataSlateStore();
  const proposalRef = useRef("");
  const isActive = entry.ai_loading || (entry.ai_proposal !== undefined);
  const { reforgeDescription } = useAI();
  const { user } = useAuthStore();

  // Kick off the stream when loading flag is set
  useEffect(() => {
    if (!entry.ai_loading) return;

    let isMounted = true;
    proposalRef.current = "";
    setAiProposal(entry.id, "");

    const doReforge = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const isGuest = user?.id?.startsWith("guest_");
      
      // Guest / Expired Session Fallback
      if (isGuest || !session?.access_token) {
        try {
          const result = await reforgeDescription(entry.summary || "", entry.position || "", entry.name || "");
          if (isMounted) setAiProposal(entry.id, result);
        } catch (err: unknown) {
          if (isMounted) setAiProposal(entry.id, `⚠️ Reforge failed: ${(err as Error).message}`);
        }
        return;
      }

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
            rawSummary: entry.summary,
            targetRole: entry.position,
            targetCompany: entry.name,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          if (isMounted) {
            // If Edge Function auth fails mid-flight, fallback to client-side OpenRouter
            if (response.status === 401) {
              try {
                const fallbackResult = await reforgeDescription(entry.summary || "", entry.position || "", entry.name || "");
                setAiProposal(entry.id, fallbackResult);
              } catch {
                setAiProposal(entry.id, `⚠️ Forge error ${response.status}: ${text}`);
              }
            } else {
              setAiProposal(entry.id, `⚠️ Forge error ${response.status}: ${text}`);
            }
          }
          return;
        }

        if (!response.body) {
          if (isMounted) setAiProposal(entry.id, "⚠️ No response body from edge function.");
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
              return;
            }
            try {
              const parsed = JSON.parse(data);
              const delta = parsed?.choices?.[0]?.delta?.content;
              const reasoning = parsed?.choices?.[0]?.delta?.reasoning_content || parsed?.choices?.[0]?.delta?.reasoning;
              
              if (delta !== undefined && delta !== null && isMounted) {
                 proposalRef.current += delta;
                 setAiProposal(entry.id, proposalRef.current);
              } else if (reasoning && !proposalRef.current && isMounted) {
                 setAiProposal(entry.id, "Analyzing trajectory and calculating optimal rewrite vectors...");
              }
            } catch {
              // Skip unparseable SSE lines silently
            }
          }
        }
      } catch (err: unknown) {
         if (isMounted) setAiProposal(entry.id, `⚠️ Reforge failed: ${(err as Error).message}`);
      } finally {
         if (isMounted) setAiLoading(entry.id, false);
      }
    };

    doReforge();

    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.ai_loading, entry.id, entry.summary, entry.position, entry.name]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="mt-3 overflow-hidden rounded-lg border border-primary/30 bg-background shadow-lg shadow-primary/5"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
              System Override
            </span>
          </div>
          {entry.ai_loading && (
            <div className="flex items-center gap-1.5 text-amber-500">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span className="font-mono text-[10px] tracking-widest uppercase">Reforging...</span>
            </div>
          )}
          {!entry.ai_loading && entry.ai_proposal !== undefined && (
            <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
              Proposal Ready
            </span>
          )}
        </div>

        {/* Split Comparison */}
        <div className="grid grid-cols-2 divide-x divide-border/30">
          {/* Original */}
          <div className="space-y-1.5 p-3">
            <p className="text-[9px] font-bold tracking-widest text-muted-foreground/60 uppercase">
              Original
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {entry.summary || <span className="italic opacity-50">No summary</span>}
            </p>
          </div>

          {/* AI Proposal */}
          <div className="space-y-1.5 bg-primary/[0.02] p-3">
            <p className="text-[9px] font-bold tracking-widest text-primary/60 uppercase">
              AI Proposal
            </p>
            <p
              className={cn(
                "text-xs leading-relaxed",
                entry.ai_loading ? "text-primary/60" : "text-foreground"
              )}
            >
              {entry.ai_proposal || (
                <span className="flex items-center gap-1 text-primary/40">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="font-mono text-[10px]">Receiving signal...</span>
                </span>
              )}
              {entry.ai_loading && entry.ai_proposal && (
                <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-primary align-middle" />
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {!entry.ai_loading && entry.ai_proposal !== undefined && (
          <div className="flex items-center gap-2 border-t border-border/20 bg-muted/5 px-4 py-3">
            <Button
              size="sm"
              onClick={() => acceptProposal(entry.id)}
              className="h-8 flex-1 gap-1.5 bg-primary text-xs font-bold tracking-wider text-primary-foreground uppercase hover:bg-primary/90"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Integrate Upgrade
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => discardProposal(entry.id)}
              className="h-8 flex-1 gap-1.5 border-border/50 font-mono text-xs tracking-wider text-muted-foreground uppercase hover:text-foreground"
            >
              <XCircle className="h-3.5 w-3.5" />
              Discard
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
