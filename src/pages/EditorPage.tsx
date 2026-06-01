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
import { LottieAnimation } from "@/components/ui/lottie-animation";
import dataProcessingData from "@/assets/animations/data_processing.json";

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
          }).catch((err: unknown) => {
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
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
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
          className="gap-2 font-mono text-xs tracking-widest uppercase"
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
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3 bg-background">
        <LottieAnimation animationData={dataProcessingData} className="h-12 w-12" />
        <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
          Hydrating Forge…
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Tactical Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/40 bg-card/50 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="hidden text-muted-foreground hover:text-foreground sm:flex">
            &larr; Dashboard
          </Button>
          <Button variant="ghost" className="h-auto justify-start p-0 hover:bg-transparent" onClick={() => navigate("/")}>
            <Logo size="sm" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Sync Status Indicator (Hardened — includes ERROR state) */}
          <div className={`flex items-center gap-2 rounded-full border px-3 py-1 ${
            syncState === "ERROR"
              ? "border-destructive/30 bg-destructive/10"
              : syncState === "SYNCING..."
              ? "border-border/50 bg-muted/30"
              : "border-border/50 bg-muted/30"
          }`}>
            <Activity className={`h-3 w-3 ${
              syncState === "ERROR"
                ? "text-destructive"
                : syncState === "SYNCING..."
                ? "animate-pulse text-amber-500"
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
            className="h-8 gap-1.5 border-primary/30 font-mono text-[10px] tracking-widest text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
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
          <div className="flex-1 space-y-8 p-6 xl:p-10">
            <div>
              <h2 className="mb-1 text-lg font-bold tracking-tight text-foreground uppercase">Input Array</h2>
              <p className="text-sm text-muted-foreground">Calibrate your tactical data payload.</p>
            </div>

            {/* Identity Array */}
            <div className="space-y-4">
              <div className="border-b border-border/20 pb-2">
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase">Identity Core</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="basics-name" className="text-xs tracking-widest text-muted-foreground uppercase">Full Name</Label>
                  <Input id="basics-name" value={basics.name} onChange={(e) => setBasics({ name: e.target.value })} className="bg-background/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="basics-label" className="text-xs tracking-widest text-muted-foreground uppercase">Title / Role</Label>
                  <Input id="basics-label" value={basics.label} onChange={(e) => setBasics({ label: e.target.value })} className="bg-background/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="basics-email" className="text-xs tracking-widest text-muted-foreground uppercase">Email</Label>
                  <Input id="basics-email" value={basics.email} onChange={(e) => setBasics({ email: e.target.value })} className="bg-background/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="basics-phone" className="text-xs tracking-widest text-muted-foreground uppercase">Phone</Label>
                  <Input id="basics-phone" value={basics.phone} onChange={(e) => setBasics({ phone: e.target.value })} className="bg-background/50" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="basics-city" className="text-xs tracking-widest text-muted-foreground uppercase">Location (City, Region)</Label>
                  <Input id="basics-city" value={basics.location?.city || ''} onChange={(e) => setBasics({ location: { ...basics.location, city: e.target.value } })} className="bg-background/50" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="basics-url" className="text-xs tracking-widest text-muted-foreground uppercase">Website / Portfolio</Label>
                  <Input id="basics-url" value={basics.url} onChange={(e) => setBasics({ url: e.target.value })} className="bg-background/50" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="basics-summary" className="text-xs tracking-widest text-muted-foreground uppercase">Professional Summary</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isSummaryAiLoading}
                      onClick={() => setIsSummaryAiLoading(true)}
                      className="h-6 gap-1.5 border-primary/30 px-2 font-mono text-[10px] tracking-widest text-primary uppercase hover:border-primary/60 hover:bg-primary/10"
                    >
                      <Wand2 className="h-3 w-3" />
                      {isSummaryAiLoading ? "Reforging..." : "Reforge with AI"}
                    </Button>
                  </div>
                  <textarea
                    id="basics-summary"
                    value={basics.summary}
                    onChange={(e) => setBasics({ summary: e.target.value })}
                    className="min-h-[120px] w-full resize-none rounded-md border border-input bg-background/50 p-3 text-sm text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
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
          <div className="sticky bottom-6 z-20 mx-auto mb-6 flex w-max animate-in items-center gap-1.5 rounded-full border border-border/50 bg-background/80 p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl slide-in-from-bottom-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="h-9 rounded-full px-4 font-mono text-[10px] tracking-widest uppercase hover:bg-muted/50"
            >
              {isPreviewOpen ? "Hide Preview" : "Show Preview"}
            </Button>
            
            <div className="mx-1 h-4 w-px bg-border/50" />

            <Button
              variant="ghost"
              size="sm"
              onClick={flushAllPending}
              className="h-9 gap-2 rounded-full px-4 font-mono text-[10px] tracking-widest uppercase hover:bg-muted/50"
              disabled={syncState === "SYNCING..."}
            >
              {syncState === "SYNCING..." ? <LottieAnimation animationData={dataProcessingData} className="h-4 w-4" /> : "Save Draft"}
            </Button>

            <Button
              size="sm"
              onClick={() => setIsExportDialogOpen(true)}
              className="h-9 gap-2 rounded-full bg-primary px-5 font-mono text-[10px] tracking-widest text-primary-foreground uppercase shadow-lg shadow-primary/20 hover:bg-primary/90"
            >
              <Printer className="h-3.5 w-3.5" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Right: Data-Slate Preview (Teardown Dock) */}
        {isPreviewOpen && (
          <div className="relative flex flex-1 animate-in justify-center overflow-y-auto bg-[#09090b] p-6 duration-300 slide-in-from-right-4 xl:p-10 print:bg-white print:p-0">
          
          {/* Tactical Backdrop Grid */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] print:hidden" />

          {/* Teardown Dock Mounting */}
          <div className="relative my-auto w-full max-w-[850px]">
            {/* Corner Crop Marks */}
            <div className="pointer-events-none absolute -top-4 -left-4 h-4 w-4 border-t-2 border-l-2 border-primary/40 print:hidden" />
            <div className="pointer-events-none absolute -top-4 -right-4 h-4 w-4 border-t-2 border-r-2 border-primary/40 print:hidden" />
            <div className="pointer-events-none absolute -bottom-4 -left-4 h-4 w-4 border-b-2 border-l-2 border-primary/40 print:hidden" />
            <div className="pointer-events-none absolute -right-4 -bottom-4 h-4 w-4 border-r-2 border-b-2 border-primary/40 print:hidden" />

            {/* Zero-Deviation Corporate Template Preview */}
            <div id="resume-preview-content" className="relative z-10 min-h-[1100px] w-full rounded-sm bg-white p-10 font-sans text-[#09090b] shadow-2xl ring-1 ring-white/10 transition-all sm:p-14 print:p-0 print:shadow-none print:ring-0">
              
              {/* Template Header */}
              <div className="mb-6 border-b border-[#d4d4d8] pb-6 text-center">
                <h1 className="font-serif text-4xl font-bold tracking-tight text-[#18181b]">
                  {basics?.name || "JOHN DOE"}
                </h1>
                {basics?.label && (
                  <p className="mt-2 text-sm font-medium tracking-widest text-[#52525b] uppercase">{basics.label}</p>
                )}
                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-[#71717a]">
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
                    <h2 className="mb-2 border-b border-[#d4d4d8] pb-1 font-serif text-sm font-bold tracking-widest text-[#18181b] uppercase">Professional Summary</h2>
                    <p className="font-serif text-sm leading-relaxed whitespace-pre-wrap text-[#27272a]">{basics.summary}</p>
                  </section>
                )}

                {skills.length > 0 && (
                  <section>
                    <h2 className="mb-2 border-b border-[#d4d4d8] pb-1 font-serif text-sm font-bold tracking-widest text-[#18181b] uppercase">Core Competencies</h2>
                    <div className="space-y-1">
                      {skills.map((skill) => (
                        <div key={skill.id} className="font-serif text-sm leading-relaxed text-[#27272a]">
                          {skill.name && <span className="font-semibold text-[#18181b]">{skill.name}: </span>}
                          {skill.keywords.join(" · ")}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {work.length > 0 && (
                  <section>
                    <h2 className="mb-3 border-b border-[#d4d4d8] pb-1 font-serif text-sm font-bold tracking-widest text-[#18181b] uppercase">Experience</h2>
                    <div className="space-y-5">
                      {work.map((entry) => (
                        <div key={entry.id} className="print:break-inside-avoid">
                          <div className="mb-1 flex items-start justify-between">
                            <div>
                              <p className="font-serif text-[15px] font-bold text-[#18181b]">{entry.position || "Role Title"}</p>
                              <p className="font-serif text-sm font-medium text-[#3f3f46]">{entry.name || "Company Name"}</p>
                            </div>
                            <p className="ml-4 shrink-0 font-serif text-sm text-[#52525b]">
                              {entry.startDate}{entry.startDate && " – "}{entry.endDate || (entry.startDate ? "Present" : "")}
                            </p>
                          </div>
                          {entry.summary && (
                            <p className="mt-1.5 font-serif text-sm leading-relaxed whitespace-pre-wrap text-[#27272a]">{entry.summary}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {education.length > 0 && (
                  <section>
                    <h2 className="mb-3 border-b border-[#d4d4d8] pb-1 font-serif text-sm font-bold tracking-widest text-[#18181b] uppercase">Education</h2>
                    <div className="space-y-4">
                      {education.map((entry) => (
                        <div key={entry.id} className="print:break-inside-avoid">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-serif text-[15px] font-bold text-[#18181b]">
                                {entry.studyType} {entry.area && `in ${entry.area}`}
                              </p>
                              <p className="font-serif text-sm font-medium text-[#3f3f46]">{entry.institution || "Institution Name"}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-sm text-[#52525b]">
                                {entry.startDate}{entry.startDate && " – "}{entry.endDate || (entry.startDate ? "Present" : "")}
                              </p>
                              {entry.score && <p className="mt-0.5 font-serif text-sm text-[#3f3f46]">{entry.score}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {certifications.length > 0 && (
                  <section>
                    <h2 className="mb-3 border-b border-[#d4d4d8] pb-1 font-serif text-sm font-bold tracking-widest text-[#18181b] uppercase">Certifications</h2>
                    <div className="space-y-3">
                      {certifications.map((entry) => (
                        <div key={entry.id} className="flex items-start justify-between print:break-inside-avoid">
                          <div>
                            <p className="font-serif text-[15px] font-bold text-[#18181b]">
                              {entry.url ? (
                                <a href={entry.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  {entry.name || "Certification Name"}
                                </a>
                              ) : (
                                entry.name || "Certification Name"
                              )}
                            </p>
                            {entry.issuer && <p className="font-serif text-sm font-medium text-[#3f3f46]">{entry.issuer}</p>}
                          </div>
                          {entry.date && (
                            <p className="ml-4 shrink-0 font-serif text-sm text-[#52525b]">
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
        <DialogContent className="border-border/50 bg-background/95 p-6 shadow-2xl backdrop-blur-xl sm:max-w-[400px]">
          <DialogHeader className="space-y-3">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Printer className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-center font-heading text-xl tracking-widest uppercase">Generate PDF Dossier</DialogTitle>
            <DialogDescription className="text-center text-xs leading-relaxed">
              Compile your data slate into a strictly-formatted, ATS-optimized PDF document.
            </DialogDescription>
          </DialogHeader>

          <div className="my-2 space-y-3 rounded-lg border border-border/50 bg-muted/30 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Export Cost</span>
              <span className="font-mono font-bold text-foreground">1 Credit</span>
            </div>
            <div className="h-px w-full bg-border/50" />
            <div className="flex items-center justify-between text-sm">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Available Balance</span>
              <span className={cn("font-mono font-bold", profile?.token_balance ? "text-primary" : "text-destructive")}>
                {profile?.token_balance || 0} Credits
              </span>
            </div>
          </div>

          <DialogFooter className="mt-4 flex-col gap-2 sm:flex-col sm:space-x-0">
            <Button 
              onClick={handleExportPDF} 
              disabled={isExporting}
              className="h-10 w-full gap-2 font-mono text-[10px] tracking-widest uppercase shadow-lg shadow-primary/20"
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Printer className="h-3.5 w-3.5" />}
              {isExporting ? "Extracting..." : "Confirm Download"}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsExportDialogOpen(false)}
              className="h-10 w-full font-mono text-[10px] tracking-widest text-muted-foreground uppercase hover:bg-muted/50"
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
