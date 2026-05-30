import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  ShieldAlert, 
  ScanLine, 
  Loader2, 
  Sparkles, 
  CheckCircle,
  AlertTriangle,
  RotateCw,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForgeStore } from "@/store/useForgeStore";
import { useAI, type AtsDiagnosticResult } from "@/lib/useAI";
import { ReforgeCompareModal } from "@/components/ui/ReforgeCompareModal";

export function AtsDiagnosticPanel() {
  const { resumeData, updateBasicInfo, updateExperience } = useForgeStore();
  const { runAtsDiagnostic, autoFixAtsWarning, loading, error } = useAI();
  
  const [diagnostics, setDiagnostics] = useState<AtsDiagnosticResult[] | null>(null);
  const [fixingField, setFixingField] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [reforgedText, setReforgedText] = useState("");
  const [activeFixTarget, setActiveFixTarget] = useState<{
    field: string;
    category: string;
    message: string;
  } | null>(null);

  const handleRunScan = async () => {
    try {
      const results = await runAtsDiagnostic(resumeData);
      setDiagnostics(results);
    } catch (e) {
      console.error("ATS scan failed:", e);
    }
  };

  const handleAutoFix = async (diagnostic: AtsDiagnosticResult) => {
    if (!diagnostic.field || !diagnostic.originalValue) return;

    setFixingField(diagnostic.field);
    try {
      const fixedText = await autoFixAtsWarning(
        diagnostic.field,
        diagnostic.originalValue,
        diagnostic.category,
        diagnostic.message
      );
      
      setOriginalText(diagnostic.originalValue);
      setReforgedText(fixedText);
      setActiveFixTarget({
        field: diagnostic.field,
        category: diagnostic.category,
        message: diagnostic.message,
      });
      setModalOpen(true);
    } catch (e) {
      console.error("Auto-fix failed:", e);
    } finally {
      setFixingField(null);
    }
  };

  const handleAcceptFix = (newText: string) => {
    if (!activeFixTarget) return;
    const { field } = activeFixTarget;

    if (field === "summary") {
      updateBasicInfo({ summary: newText });
    } else {
      // Parse experience.[expId].highlights.[idx]
      const expMatch = field.match(/experience\.([a-zA-Z0-9_-]+)\.highlights\.(\d+)/);
      if (expMatch) {
        const expId = expMatch[1];
        const index = parseInt(expMatch[2], 10);
        const exp = resumeData.experience.find((e) => e.id === expId);
        if (exp) {
          const newHighlights = [...exp.highlights];
          newHighlights[index] = newText;
          updateExperience(expId, { highlights: newHighlights });
        }
      }
    }

    // Refresh diagnostics list inline to set the warning to resolved
    if (diagnostics) {
      setDiagnostics(
        diagnostics.map((d) =>
          d.field === field
            ? {
                ...d,
                status: "pass" as const,
                message: `Vulnerability resolved: ${d.category} optimized for maximum compliance.`,
                autoFixable: false,
              }
            : d
        )
      );
    }
  };

  const warnings = diagnostics?.filter((d) => d.status === "warning") || [];
  const allResolved = diagnostics !== null && warnings.length === 0;

  return (
    <div className="space-y-6">
      {/* Cinematic Banner */}
      <Card className="border-border/40 bg-card/40 p-6 backdrop-blur-md relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="flex flex-col items-center text-center space-y-4 relative z-10 py-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-muted/40">
            <ScanLine className={`h-8 w-8 text-primary ${loading ? "animate-pulse" : ""}`} />
            {diagnostics && (
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border">
                {allResolved ? (
                  <ShieldCheck className="h-4 w-4 text-primary" />
                ) : (
                  <ShieldAlert className="h-4 w-4 text-amber-500 animate-bounce" />
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-1.5 max-w-lg">
            <h3 className="font-heading text-lg font-bold tracking-widest uppercase">
              {diagnostics ? "System Audit Results" : "Initiate System Diagnostic"}
            </h3>
            <p className="text-xs text-muted-foreground">
              Run compliance checks across your resume data coordinates to satisfy automated recruiter parsing matrices.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 max-w-md rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-left text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <div>
                <span className="font-bold">Transmission Interrupted:</span> {
                  error.includes("429") 
                    ? "Gemini API rate limit exceeded (Too Many Requests). Running with offline simulation defaults. Please wait 60s before retrying." 
                    : error
                }
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button
              onClick={handleRunScan}
              disabled={loading}
              className="gap-2 shadow-md shadow-primary/15 tracking-widest uppercase font-bold text-xs h-10 px-5"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running Compliance Scan...
                </>
              ) : diagnostics ? (
                <>
                  <RotateCw className="h-4 w-4" />
                  Initiate System Scan
                </>
              ) : (
                <>
                  <ScanLine className="h-4 w-4 animate-pulse" />
                  Run ATS Diagnostic
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {diagnostics && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* System Status Summary */}
            {allResolved && (
              <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                className=" border border-primary/25 bg-primary/5 p-4.5 text-center shadow-[0_0_15px_rgba(var(--primary),0.05)]"
              >
                <div className="flex flex-col items-center space-y-2">
                  <ShieldCheck className="h-7 w-7 text-primary animate-pulse" />
                  <span className="font-heading text-sm font-bold tracking-wider text-foreground uppercase">
                    System Compliance: SECURED
                  </span>
                  <p className="text-xs text-muted-foreground max-w-md">
                    Congratulations! All vulnerabilities have been purged. Your coordinates are optimized for elite recruitment guilds.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Diagnostics List */}
            <div className="space-y-3">
              {diagnostics.map((diagnostic, idx) => {
                const isWarning = diagnostic.status === "warning";
                const isFixing = fixingField === diagnostic.field;

                return (
                  <motion.div
                    key={idx}
                    layout
                    className={`flex items-start justify-between gap-4 p-4  border transition-all ${
                      isWarning
                        ? "border-amber-500/25 bg-amber-500/5 hover:bg-amber-500/10"
                        : "border-border/40 bg-card/60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {isWarning ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[10px] font-bold uppercase ${
                            isWarning ? "text-amber-500" : "text-primary"
                          }`}>
                            {diagnostic.category}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                          <span className="font-mono text-[9px] text-muted-foreground">
                            {isWarning ? "VULNERABILITY DETECTED" : "CLEARED"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">
                          {diagnostic.message}
                        </p>
                      </div>
                    </div>

                    {isWarning && diagnostic.autoFixable && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={fixingField !== null}
                        onClick={() => handleAutoFix(diagnostic)}
                        className="shrink-0 h-8 gap-1.5 border-amber-500/30 hover:bg-amber-500/10 text-amber-500 font-bold uppercase text-[10px]"
                      >
                        {isFixing ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Sparkles className="h-3 w-3" />
                        )}
                        Apply Override
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reforge AI Modal */}
      <ReforgeCompareModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        originalText={originalText}
        reforgedText={reforgedText}
        onAccept={handleAcceptFix}
        title="ATS Auto-Fix Calibration"
        description="Integrate compliance overrides to patch your credentials datastream."
      />
    </div>
  );
}
