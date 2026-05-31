import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useDataSlateStore } from "@/store/useDataSlateStore";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import { ShieldCheck, Activity, AlertTriangle, Loader2, Printer, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { MissionHistoryArray } from "@/components/editor/MissionHistoryArray";
import { CoreCompetenciesArray } from "@/components/editor/CoreCompetenciesArray";
import { EducationArray } from "@/components/editor/EducationArray";
import { CertificationsArray } from "@/components/editor/CertificationsArray";
import { ReforgeSummaryModal } from "@/components/editor/ReforgeSummaryModal";
import { BountyExchangeModal } from "@/components/editor/BountyExchangeModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRewardsStore } from "@/store/useRewardsStore";
import html2pdf from "html2pdf.js";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function EditorPage() {
  const { slateId } = useParams<{ slateId: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { profile, deductCredit, fetchProfile } = useAuthStore();
  const { forgeFirstSigil } = useRewardsStore();
  const [isSummaryAiLoading, setIsSummaryAiLoading] = useState(false);
  const [summaryProposal, setSummaryProposal] = useState("");
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const {
    syncState,
    basics,
    work,
    skills,
    education,
    certifications,
    setBasics,
    activeSlateId,
    createDefaultSlate,
    initializeSlate,
    flushAllPending,
    isHydrating,
    hydrationError,
  } = useDataSlateStore();

  // ── Slate initialization with ownership validation ────────────────────────
  useEffect(() => {
    // "new" is a sentinel value — create a fresh slate and redirect
    if (slateId === "new" || (!slateId && !activeSlateId)) {
      createDefaultSlate().then((newId) => {
        if (newId) navigate(`/forge/${newId}`, { replace: true });
      });
    } else if (slateId && slateId !== activeSlateId) {
      initializeSlate(slateId);
    }
  }, [slateId, activeSlateId, createDefaultSlate, initializeSlate, navigate]);

  // ── Stripe Checkout Success Handler ─────────────────────────────────────────
  useEffect(() => {
    const sessionId = searchParams.get("stripe_session_id");
    const credits = searchParams.get("credits");
    if (sessionId) {
      toast.success(`Payment successful! ${credits} credits added.`);
      fetchProfile();
      // Remove params from URL without refreshing
      searchParams.delete("stripe_session_id");
      searchParams.delete("credits");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, fetchProfile]);

  // ── VECTOR 2 DEFENSE: beforeunload interceptor ────────────────────────────
  // Prevents silent data loss when the user closes/refreshes during debounce
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const { syncState, hasPendingMutations } = useDataSlateStore.getState();
      if (syncState === "SYNCING..." || hasPendingMutations) {
        // Attempt emergency flush via sendBeacon
        flushAllPending();
        // Trigger the browser's native "unsaved changes" dialog
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [syncState, flushAllPending]);

  const handleExportPDF = async () => {
    setIsExporting(true);
    const success = await deductCredit();
    if (success) {
      forgeFirstSigil();
      setIsExportDialogOpen(false);
      setTimeout(() => {
        const element = document.getElementById("resume-preview-content");
        if (element) {
          const opt = {
            margin:       0.5,
            filename:     `${basics.name?.replace(/\s+/g, '_') || 'signet_dossier'}.pdf`,
            image:        { type: 'jpeg' as const, quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
          };
          html2pdf().set(opt).from(element).save().then(() => {
            setIsExporting(false);
          }).catch((err: any) => {
            console.error("PDF generation failed:", err);
            setIsExporting(false);
          });
        } else {
          setIsExporting(false);
        }
      }, 300);
    } else {
      setIsExporting(false);
      setIsExportDialogOpen(false);
      setIsPaywallOpen(true);
    }
  };

  // ── Render States ─────────────────────────────────────────────────────────
  if (hydrationError) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-4">
        <div className="flex items-center gap-3 text-destructive">
          <AlertTriangle className="h-8 w-8" />
          <div>
            <h1 className="text-lg font-bold tracking-tight uppercase">Access Denied</h1>
            <p className="text-sm text-muted-foreground">
              {hydrationError === "INVALID_SLATE_ID"
                ? "The forge URL contains an invalid identifier."
                : hydrationError === "ACCESS_DENIED"
                ? "You do not have permission to access this data slate."
                : "Failed to load data slate. Please try again."}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/onboarding", { replace: true })}
          className="gap-2 font-mono text-xs uppercase tracking-widest"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Return to Base
        </Button>
      </div>
    );
  }

  // ── Hydration loading state ───────────────────────────────────────────────
  if (isHydrating) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
          Hydrating Forge…
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background overflow-hidden">
      {/* Tactical Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/40 bg-card/50 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="hidden sm:flex text-muted-foreground hover:text-foreground">
            &larr; Dashboard
          </Button>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent justify-start" onClick={() => navigate("/")}>
            <Logo size="sm" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Sync Status Indicator (Hardened — includes ERROR state) */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
            syncState === "ERROR"
              ? "bg-destructive/10 border-destructive/30"
              : syncState === "SYNCING..."
              ? "bg-muted/30 border-border/50"
              : "bg-muted/30 border-border/50"
          }`}>
            <Activity className={`w-3 h-3 ${
              syncState === "ERROR"
                ? "text-destructive"
                : syncState === "SYNCING..."
                ? "text-amber-500 animate-pulse"
                : "text-primary"
            }`} />
            <span className={`font-mono text-[10px] tracking-widest uppercase ${
              syncState === "ERROR"
                ? "text-destructive"
                : syncState === "SYNCING..."
                ? "text-amber-500"
                : "text-foreground"
            }`}>
              STATE: {syncState}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1.5 font-mono text-[10px] uppercase tracking-widest text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setIsExportDialogOpen(true)}
          >
            <Printer className="h-3.5 w-3.5" />
            Export PDF
          </Button>
          <ProfileDropdown />
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex flex-1 overflow-hidden">
        
        {/* Left: Input Array */}
        <div className={cn(
          "shrink-0 overflow-y-auto border-border/40 bg-card/10 hide-scrollbar print:hidden flex flex-col relative transition-all duration-300",
          isPreviewOpen ? "w-full max-w-xl border-r" : "flex-1 max-w-3xl mx-auto border-x shadow-2xl"
        )}>
          <div className="flex-1 p-6 xl:p-10 space-y-8">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground uppercase mb-1">Input Array</h2>
              <p className="text-sm text-muted-foreground">Calibrate your tactical data payload.</p>
            </div>

            {/* Identity Array */}
            <div className="space-y-4">
              <div className="border-b border-border/20 pb-2">
                <h3 className="text-sm font-bold text-primary tracking-widest uppercase">Identity Core</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="basics-name" className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                  <Input id="basics-name" value={basics.name} onChange={(e) => setBasics({ name: e.target.value })} className="bg-background/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="basics-label" className="text-xs uppercase tracking-widest text-muted-foreground">Title / Role</Label>
                  <Input id="basics-label" value={basics.label} onChange={(e) => setBasics({ label: e.target.value })} className="bg-background/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="basics-email" className="text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
                  <Input id="basics-email" value={basics.email} onChange={(e) => setBasics({ email: e.target.value })} className="bg-background/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="basics-phone" className="text-xs uppercase tracking-widest text-muted-foreground">Phone</Label>
                  <Input id="basics-phone" value={basics.phone} onChange={(e) => setBasics({ phone: e.target.value })} className="bg-background/50" />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label htmlFor="basics-city" className="text-xs uppercase tracking-widest text-muted-foreground">Location (City, Region)</Label>
                  <Input id="basics-city" value={basics.location?.city || ''} onChange={(e) => setBasics({ location: { ...basics.location, city: e.target.value } })} className="bg-background/50" />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label htmlFor="basics-url" className="text-xs uppercase tracking-widest text-muted-foreground">Website / Portfolio</Label>
                  <Input id="basics-url" value={basics.url} onChange={(e) => setBasics({ url: e.target.value })} className="bg-background/50" />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="basics-summary" className="text-xs uppercase tracking-widest text-muted-foreground">Professional Summary</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isSummaryAiLoading}
                      onClick={() => setIsSummaryAiLoading(true)}
                      className="h-6 px-2 gap-1.5 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 font-mono text-[10px] uppercase tracking-widest"
                    >
                      <Wand2 className="h-3 w-3" />
                      {isSummaryAiLoading ? "Reforging..." : "Reforge with AI"}
                    </Button>
                  </div>
                  <textarea
                    id="basics-summary"
                    value={basics.summary}
                    onChange={(e) => setBasics({ summary: e.target.value })}
                    className="w-full min-h-[120px] p-3 bg-background/50 border border-input rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none text-foreground"
                    placeholder="Results-driven professional..."
                  />
                  <ReforgeSummaryModal 
                    isOpen={isSummaryAiLoading || summaryProposal !== ""}
                    isLoading={isSummaryAiLoading}
                    setIsLoading={setIsSummaryAiLoading}
                    rawText={basics.summary}
                    targetRole={basics.label}
                    proposal={summaryProposal}
                    setProposal={setSummaryProposal}
                    onAccept={(newText) => {
                      setBasics({ summary: newText });
                      setSummaryProposal("");
                      setIsSummaryAiLoading(false);
                    }}
                    onClose={() => {
                      setSummaryProposal("");
                      setIsSummaryAiLoading(false);
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Mission History */}
            <MissionHistoryArray />

            {/* Core Competencies */}
            <CoreCompetenciesArray />

            {/* Education */}
            <EducationArray />

            {/* Certifications */}
            <CertificationsArray />

          </div>

          {/* Floating Command Dock */}
          <div className="sticky bottom-6 mx-auto w-max z-20 p-1.5 mb-6 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex items-center gap-1.5 animate-in slide-in-from-bottom-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="rounded-full font-mono text-[10px] tracking-widest uppercase px-4 h-9 hover:bg-muted/50"
            >
              {isPreviewOpen ? "Hide Preview" : "Show Preview"}
            </Button>
            
            <div className="w-px h-4 bg-border/50 mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={flushAllPending}
              className="rounded-full font-mono text-[10px] tracking-widest uppercase px-4 h-9 gap-2 hover:bg-muted/50"
              disabled={syncState === "SYNCING..."}
            >
              {syncState === "SYNCING..." ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save Draft"}
            </Button>

            <Button
              size="sm"
              onClick={() => setIsExportDialogOpen(true)}
              className="rounded-full font-mono text-[10px] tracking-widest uppercase px-5 h-9 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              <Printer className="h-3.5 w-3.5" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Right: Data-Slate Preview (Teardown Dock) */}
        {isPreviewOpen && (
          <div className="flex-1 overflow-y-auto bg-[#09090b] p-6 xl:p-10 flex justify-center relative print:p-0 print:bg-white animate-in slide-in-from-right-4 duration-300">
          
          {/* Tactical Backdrop Grid */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] print:hidden" />

          {/* Teardown Dock Mounting */}
          <div className="relative w-full max-w-[850px] my-auto">
            {/* Corner Crop Marks */}
            <div className="absolute -top-4 -left-4 w-4 h-4 border-t-2 border-l-2 border-primary/40 pointer-events-none print:hidden" />
            <div className="absolute -top-4 -right-4 w-4 h-4 border-t-2 border-r-2 border-primary/40 pointer-events-none print:hidden" />
            <div className="absolute -bottom-4 -left-4 w-4 h-4 border-b-2 border-l-2 border-primary/40 pointer-events-none print:hidden" />
            <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-2 border-r-2 border-primary/40 pointer-events-none print:hidden" />

            {/* Zero-Deviation Corporate Template Preview */}
            <div id="resume-preview-content" className="w-full bg-white text-[#09090b] shadow-2xl ring-1 ring-white/10 min-h-[1100px] p-10 sm:p-14 transition-all print:shadow-none print:ring-0 print:p-0 relative z-10 rounded-sm font-sans">
              
              {/* Template Header */}
              <div className="border-b border-[#d4d4d8] pb-6 mb-6 text-center">
                <h1 className="text-4xl font-serif font-bold text-[#18181b] tracking-tight">
                  {basics?.name || "JOHN DOE"}
                </h1>
                {basics?.label && (
                  <p className="text-sm font-medium text-[#52525b] uppercase tracking-widest mt-2">{basics.label}</p>
                )}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-xs font-medium text-[#71717a]">
                  {basics?.email && <span>{basics.email}</span>}
                  {basics?.phone && <span>• {basics.phone}</span>}
                  {basics?.location?.city && <span>• {basics.location.city}</span>}
                  {basics?.url && <span>• {basics.url}</span>}
                </div>
              </div>

              {/* Template Body */}
              <div className="space-y-6">
                {basics?.summary && (
                  <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#18181b] mb-2 border-b border-[#d4d4d8] pb-1 font-serif">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-[#27272a] whitespace-pre-wrap font-serif">{basics.summary}</p>
                  </section>
                )}

                {skills.length > 0 && (
                  <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#18181b] mb-2 border-b border-[#d4d4d8] pb-1 font-serif">Core Competencies</h2>
                    <div className="space-y-1">
                      {skills.map((skill) => (
                        <div key={skill.id} className="text-sm text-[#27272a] font-serif leading-relaxed">
                          {skill.name && <span className="font-semibold text-[#18181b]">{skill.name}: </span>}
                          {skill.keywords.join(" · ")}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {work.length > 0 && (
                  <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#18181b] mb-3 border-b border-[#d4d4d8] pb-1 font-serif">Experience</h2>
                    <div className="space-y-5">
                      {work.map((entry) => (
                        <div key={entry.id} className="print:break-inside-avoid">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <p className="font-bold text-[#18181b] text-[15px] font-serif">{entry.position || "Role Title"}</p>
                              <p className="text-sm text-[#3f3f46] font-serif font-medium">{entry.name || "Company Name"}</p>
                            </div>
                            <p className="text-sm text-[#52525b] shrink-0 ml-4 font-serif">
                              {entry.startDate}{entry.startDate && " – "}{entry.endDate || (entry.startDate ? "Present" : "")}
                            </p>
                          </div>
                          {entry.summary && (
                            <p className="mt-1.5 text-sm text-[#27272a] leading-relaxed font-serif whitespace-pre-wrap">{entry.summary}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {education.length > 0 && (
                  <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#18181b] mb-3 border-b border-[#d4d4d8] pb-1 font-serif">Education</h2>
                    <div className="space-y-4">
                      {education.map((entry) => (
                        <div key={entry.id} className="print:break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-[#18181b] text-[15px] font-serif">
                                {entry.studyType} {entry.area && `in ${entry.area}`}
                              </p>
                              <p className="text-sm text-[#3f3f46] font-serif font-medium">{entry.institution || "Institution Name"}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-[#52525b] font-serif">
                                {entry.startDate}{entry.startDate && " – "}{entry.endDate || (entry.startDate ? "Present" : "")}
                              </p>
                              {entry.score && <p className="text-sm text-[#3f3f46] mt-0.5 font-serif">{entry.score}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {certifications.length > 0 && (
                  <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#18181b] mb-3 border-b border-[#d4d4d8] pb-1 font-serif">Certifications</h2>
                    <div className="space-y-3">
                      {certifications.map((entry) => (
                        <div key={entry.id} className="flex justify-between items-start print:break-inside-avoid">
                          <div>
                            <p className="font-bold text-[#18181b] text-[15px] font-serif">
                              {entry.url ? (
                                <a href={entry.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  {entry.name || "Certification Name"}
                                </a>
                              ) : (
                                entry.name || "Certification Name"
                              )}
                            </p>
                            {entry.issuer && <p className="text-sm text-[#3f3f46] font-serif font-medium">{entry.issuer}</p>}
                          </div>
                          {entry.date && (
                            <p className="text-sm text-[#52525b] font-serif shrink-0 ml-4">
                              {entry.date}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
          </div>
        )}
      </main>

      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px] border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl p-6">
          <DialogHeader className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 mx-auto">
              <Printer className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-center text-xl font-heading tracking-widest uppercase">Generate PDF Dossier</DialogTitle>
            <DialogDescription className="text-center text-xs leading-relaxed">
              Compile your data slate into a strictly-formatted, ATS-optimized PDF document.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted/30 rounded-lg p-4 my-2 space-y-3 border border-border/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-mono">Export Cost</span>
              <span className="font-mono text-foreground font-bold">1 Credit</span>
            </div>
            <div className="w-full h-px bg-border/50" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-mono">Available Balance</span>
              <span className={cn("font-mono font-bold", profile?.token_balance ? "text-primary" : "text-destructive")}>
                {profile?.token_balance || 0} Credits
              </span>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-2 mt-4 sm:space-x-0">
            <Button 
              onClick={handleExportPDF} 
              disabled={isExporting}
              className="w-full h-10 gap-2 font-mono text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Printer className="h-3.5 w-3.5" />}
              {isExporting ? "Extracting..." : "Confirm Download"}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsExportDialogOpen(false)}
              className="w-full h-10 text-muted-foreground hover:bg-muted/50 font-mono text-[10px] uppercase tracking-widest"
            >
              Cancel & Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isPaywallOpen && (
        <BountyExchangeModal 
          isOpen={isPaywallOpen} 
          onClose={() => setIsPaywallOpen(false)} 
          infoMessage="Insufficient credits. Top up to export your resume."
        />
      )}
    </div>
  );
}
