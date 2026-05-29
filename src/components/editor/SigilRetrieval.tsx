import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePDF } from "@/lib/pdf";

// ============================================================================
// WEB AUDIO SCI-FI SOUND SYNTHESIS
// ============================================================================
const playSciFiSound = (type: "click" | "success" | "process") => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.12);
    } else if (type === "process") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(360, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.35);
    } else if (type === "success") {
      const now = ctx.currentTime;
      [880, 1320].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now + idx * 0.08); osc.stop(now + idx * 0.08 + 0.3);
      });
    }
  } catch (e) {
    console.warn("AudioContext failed to initialize", e);
  }
};

type RetrievalState = "idle" | "extracting" | "downloaded";

export function SigilRetrieval({ onComplete }: { onComplete: () => void }) {
  const [state, setState] = useState<RetrievalState>("idle");
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState("CACHED IN ANVIL MAIN DATACORE");

  const getLogMessage = (prog: number) => {
    if (prog < 35) return "COOLING BESKAR ALLOY CORE...";
    if (prog < 70) return "STAMPING FOUNDRY SIGIL SCHEMATICS...";
    if (prog < 95) return "TEMPERING EDGE COORDINATES...";
    return "DECRYPTION COMPLETE. SIGIL READOUT ACTIVE.";
  };

  const handleExtract = async () => {
    if (state !== "idle") return;
    playSciFiSound("click");
    setState("extracting");
    setProgress(0);
  };

  const triggerDownload = async () => {
    try {
      await generatePDF("resume-document", "mandalorian-dossier.pdf");
      playSciFiSound("success");
      setState("downloaded");
    } catch (error) {
      console.error("PDF generation failed during retrieval", error);
      setState("idle");
    }
  };

  useEffect(() => {
    if (state !== "extracting") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const current = next > 100 ? 100 : next;
        setLogText(getLogMessage(current));
        if (current % 15 < 4) playSciFiSound("process");
        if (current >= 100) { clearInterval(interval); triggerDownload(); }
        return current;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [state]);

  return (
    /* Outer wrapper: fills available height without overflow, centered */
    <div className="flex min-h-0 w-full flex-col items-center justify-center py-4">

      {/* ── Compact Cinematic Header ── */}
      <div className="mb-5 space-y-1 text-center">
        <span className="animate-pulse text-[10px] font-bold tracking-[0.3em] text-primary uppercase">
          Crucible Chamber Section 09
        </span>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground uppercase md:text-3xl">
          The Armory Cache
        </h1>
        <p className="mx-auto max-w-sm text-xs text-muted-foreground">
          Your credentials have been forged in pure Beskar. Secure the digital sigil to complete your covert profile.
        </p>
      </div>

      {/* ── Horizontal Terminal Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-primary/20 bg-background/60 shadow-[0_0_40px_-8px] shadow-primary/10 backdrop-blur-xl select-none"
      >
        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

        {/* Glow overlays */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-36 w-36 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-primary/8 blur-3xl" />

        {/* Laser scan line (only while extracting) */}
        {state === "extracting" && (
          <motion.div
            className="pointer-events-none absolute left-0 z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_var(--color-primary)]"
            animate={{ top: ["4%", "96%", "4%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* ── Card body: horizontal split ── */}
        <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:gap-6">

          {/* Left col — Sigil Icon */}
          <div className="flex shrink-0 items-center justify-center md:w-36">
            <div className="relative flex h-20 w-20 items-center justify-center">
              {/* Orbital rings */}
              <div className={`absolute inset-0 rounded-full border border-primary/15 transition-all duration-700 ${
                state === "extracting" ? "scale-110 animate-spin border-primary/35" : ""
              }`} />
              <div className={`absolute inset-3 rounded-full border border-dashed border-primary/20 transition-all duration-700 ${
                state === "extracting" ? "scale-105 animate-reverse-spin" : ""
              }`} />

              {/* Sigil SVG */}
              <motion.div
                animate={state === "extracting" ? {
                  scale: [1, 1.06, 1],
                  filter: [
                    "drop-shadow(0 0 6px var(--color-primary))",
                    "drop-shadow(0 0 16px var(--color-primary))",
                    "drop-shadow(0 0 6px var(--color-primary))"
                  ]
                } : {
                  scale: 1,
                  filter: "drop-shadow(0 0 5px var(--color-primary))"
                }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="z-10 flex items-center justify-center text-primary"
              >
                <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M50 5L85 22V50C85 68.3 70 87 50 95C30 87 15 68.3 15 50V22L50 5Z"
                    stroke="currentColor" strokeWidth="3.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    className={state === "downloaded" ? "text-emerald-500" : "text-primary"}
                  />
                  <path
                    d="M33 35H67M33 47H67M42 59H58"
                    stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"
                    className={state === "downloaded" ? "text-emerald-400" : "text-primary/70"}
                  />
                  <path d="M50 20V80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Divider (desktop horizontal) */}
          <div className="hidden md:block md:h-28 md:w-px md:bg-border/40" />
          <div className="md:hidden h-px w-full bg-border/40" />

          {/* Right col — Terminal metadata + actions */}
          <div className="flex flex-1 flex-col gap-4">

            {/* Terminal Console readout */}
            <div className="rounded-xl border border-border/40 bg-muted/20 p-3.5 font-mono text-[11px]">
              <div className="flex items-center justify-between border-b border-border/30 pb-2 mb-2.5 text-muted-foreground/60">
                <span>FOUNDRY DATABASE LINK</span>
                <span className="flex items-center gap-1 font-bold text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  SECURE_CONN
                </span>
              </div>

              <div className="space-y-1.5 text-foreground/80">
                <div className="flex justify-between">
                  <span className="text-muted-foreground/70">OPERATIVE SIGIL HASH:</span>
                  <span className="font-bold text-primary">SIG-770-MANDO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground/70">STATUS READOUT:</span>
                  <span className={state === "downloaded"
                    ? "font-bold text-emerald-500"
                    : "animate-pulse font-bold text-primary"
                  }>
                    {logText}
                  </span>
                </div>
              </div>

              {/* Progress bar (extracting only) */}
              {state === "extracting" && (
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[10px] text-muted-foreground/60">
                    <span>TEMPERING ALLOY METRICS:</span>
                    <span className="font-bold text-primary">{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full border border-border/20 bg-border/30">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-orange-500 shadow-[0_0_6px_var(--color-primary)]"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <AnimatePresence mode="wait">
              {state === "idle" && (
                <motion.div
                  key="idle-btn"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <Button
                    onClick={handleExtract}
                    className="h-10 w-full gap-2 rounded-xl border border-primary/30 text-sm font-bold tracking-widest uppercase shadow-md shadow-primary/10 transition-all hover:scale-[1.02] hover:shadow-primary/30"
                  >
                    <Download className="h-4 w-4" />
                    Extract Forged Sigil
                  </Button>
                </motion.div>
              )}

              {state === "extracting" && (
                <motion.div
                  key="extracting-btn"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <Button
                    disabled
                    className="h-10 w-full cursor-not-allowed gap-2 rounded-xl border border-primary/30 bg-primary/10 text-sm font-bold text-primary uppercase tracking-widest"
                  >
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Tempering Sigil Dossier...
                  </Button>
                </motion.div>
              )}

              {state === "downloaded" && (
                <motion.div
                  key="downloaded-btn"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2"
                >
                  <Button
                    disabled
                    className="h-10 w-full cursor-not-allowed gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-sm font-bold text-emerald-500 uppercase tracking-widest"
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                    Sigil Secured — Downloaded
                  </Button>
                  <Button
                    onClick={onComplete}
                    variant="outline"
                    className="h-9 w-full gap-2 rounded-xl border-border text-xs font-bold transition-all hover:bg-muted hover:text-foreground"
                  >
                    Return to Covert
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom monospace footnote */}
        <div className="border-t border-border/30 px-5 py-2">
          <p className="text-center font-mono text-[9px] text-muted-foreground/40 tracking-widest uppercase">
            Guild Mainframe · Encryption active · Beskar-grade channel secured
          </p>
        </div>
      </motion.div>
    </div>
  );
}
