import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BarChart3, Shield, Hammer, LogOut, Coins, Download, Loader2, ShieldCheck, ShieldAlert, Eye, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuthStore } from "@/store/useAuthStore";
import { LivePreview } from "@/components/editor/LivePreview";
import { DashboardOverview } from "@/components/editor/DashboardOverview";
import { ForgeWizard } from "@/components/editor/ForgeWizard";
import { UserProfile } from "@/components/editor/UserProfile";
import { generatePDF } from "@/lib/pdf";
import { SigilRetrieval } from "@/components/editor/SigilRetrieval";
import { useForgeStore } from "@/store/useForgeStore";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PureBeskarTemplate } from "@/components/editor/templates/PureBeskarTemplate";
import { OperativeTemplate } from "@/components/editor/templates/OperativeTemplate";
import { MinimalTemplate } from "@/components/editor/templates/MinimalTemplate";
import { StandardTemplate } from "@/components/editor/templates/StandardTemplate";
import { AvantGardeTemplate } from "@/components/editor/templates/AvantGardeTemplate";
import { BountyExchangeModal } from "@/components/editor/BountyExchangeModal";

const sidebarTabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "forge", label: "The Forge", icon: Hammer },
  { id: "profile", label: "Identity Core", icon: Shield },
];

export function ForgeEditor() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showExchange, setShowExchange] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [exchangeMessage, setExchangeMessage] = useState("");
  const [downloadStep, setDownloadStep] = useState<"idle" | "deducting" | "generating">("idle");

  const [searchParams, setSearchParams] = useSearchParams();
  const [verifyingSession, setVerifyingSession] = useState(false);
  const [verifyLogs, setVerifyLogs] = useState<string[]>([]);
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [verifyErrorMessage, setVerifyErrorMessage] = useState("");
  const [verifyTokensCredited, setVerifyTokensCredited] = useState(0);
  const [defaultExchangePack, setDefaultExchangePack] = useState<string | undefined>(undefined);

  const { user, profile, signOut, verifyStripeSession, fetchProfile } = useAuthStore();
  const { activeTemplate, resumeData } = useForgeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const buyPackage = searchParams.get("buy_package");
    if (!buyPackage) return;

    // Always record which pack was requested so it's pre-selected if they do open the modal.
    setDefaultExchangePack(buyPackage);

    // Only force-open the exchange if the user has no credits (or profile not yet loaded).
    // Users arriving from the pricing page with existing credits should not be interrupted.
    const balance = profile?.token_balance ?? 0;
    if (balance <= 0 || !profile) {
      setExchangeMessage("Dossier authorization request initiated from pricing boards.");
      setShowExchange(true);
    }

    // Clean the URL param so refreshing doesn't re-trigger
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("buy_package");
      return next;
    }, { replace: true });
  }, [searchParams, profile]);

  useEffect(() => {
    const sessionId = searchParams.get("stripe_session_id");
    if (!sessionId) return;

    const performVerification = async () => {
      setVerifyingSession(true);
      setVerifyStatus("verifying");
      setVerifyLogs([
        "[SYS] CONNECTING TO SECURE HOLONET NODE...",
        "[SYS] INTERFACING WITH STRIPE LEDGER DIRECTORY...",
        `[SYS] LOCATING SESSION ID: ${sessionId.substring(0, 15)}...`,
      ]);

      const logSteps = [
        "AUTHENTICATING CRYPTOGRAPHIC KEY SIGNATURES...",
        "VERIFYING TRANSACTION STATUS WITH GALACTIC BANK...",
        "SYNCHRONIZING PROFILE BESKAR LEDGER BALANCE..."
      ];

      logSteps.forEach((step, idx) => {
        setTimeout(() => {
          setVerifyLogs((prev) => [...prev, `[SYS] ${step}`]);
        }, (idx + 1) * 700);
      });

      const result = await verifyStripeSession(sessionId);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (result.success) {
        setVerifyLogs((prev) => [
          ...prev,
          "[SUCCESS] CREDITS SUCCESSFULLY RECORDED IN MAIN LEDGER!",
          `[SUCCESS] DEPOSITED: +${result.credits} BESKAR CREDITS.`,
          "[SYS] CLOSING HOLONET SECURE CONNECTION."
        ]);
        setVerifyTokensCredited(result.credits);
        setVerifyStatus("success");
        await fetchProfile();
        
        setTimeout(() => {
          setVerifyingSession(false);
          setVerifyStatus("idle");
          setSearchParams({}, { replace: true });
        }, 2500);
      } else {
        setVerifyLogs((prev) => [
          ...prev,
          "[ERROR] TRANSACTION VERIFICATION FAILED!",
          "[ERROR] UNABLE TO SECURE SECURE BESKAR CREDITS.",
          "[SYS] CLOSING SECURE CONNECTION WITH ERROR."
        ]);
        setVerifyErrorMessage("The Armorer was unable to verify this transaction. Please contact Guild support.");
        setVerifyStatus("error");
      }
    };

    performVerification();
  }, [searchParams, verifyStripeSession, fetchProfile, setSearchParams]);

  const handleDownloadPDF = async () => {
    try {
      setDownloadStep("generating");
      const filename = `${resumeData.basicInfo.firstName || 'Mandalorian'}-${resumeData.basicInfo.lastName || 'Dossier'}-Resume.pdf`.replace(/\s+/g, '-');
      await generatePDF("resume-document", filename);
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setDownloadStep("idle");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background font-sans antialiased print:block print:h-auto">
      
      {/* Editor Header */}
      <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-border/60 bg-background/95 px-6 shadow-md shadow-black/5 backdrop-blur-xl print:hidden">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-primary">Signet</span>
          <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
          <span className="hidden text-sm font-medium tracking-widest text-muted-foreground uppercase sm:inline-block">The Foundry</span>
        </div>
        
        <div className="flex items-center gap-2">
          {profile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExchange(true)}
              className="hidden items-center gap-2 border-border/50 bg-secondary/30 text-foreground sm:flex"
            >
              <Coins className="h-4 w-4 text-primary" />
              <span>{profile.token_balance} <span className="text-muted-foreground">{profile.token_balance === 1 ? "Credit" : "Credits"}</span></span>
            </Button>
          )}

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowPreview(true)} className="gap-2 cursor-pointer">
                <Eye className="h-4 w-4" />
                <span>Preview Dossier</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDownloadPDF} 
                disabled={downloadStep !== "idle"}
                className="gap-2 cursor-pointer"
              >
                {downloadStep !== "idle" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span>
                  {downloadStep === "idle" && "Download Intel"}
                  {downloadStep === "deducting" && "Authorizing..."}
                  {downloadStep === "generating" && "Generating PDF..."}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Editor Main Layout */}
      <main className="relative flex flex-1 overflow-hidden print:block print:overflow-visible">
        
        {/* Left Sidebar - Navigation & Profile */}
        <aside className="relative z-10 flex w-20 shrink-0 flex-col justify-between border-r border-border/60 bg-sidebar shadow-[4px_0_24px_-4px_rgba(0,0,0,0.08)] backdrop-blur-sm md:w-64 print:hidden">
          
          <div className="space-y-1 p-4">
            {sidebarTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isLocked = activeTab === "retrieval";
              return (
                <div key={tab.id} className="relative">
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-primary" />
                  )}
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    disabled={isLocked}
                    className={cn(
                      "w-full justify-center md:justify-start h-12 transition-all",
                      isActive
                        ? "bg-primary/10 text-foreground shadow-none hover:bg-primary/15"
                        : "text-muted-foreground hover:text-foreground",
                      isLocked && "opacity-40 cursor-not-allowed"
                    )}
                    onClick={() => !isLocked && setActiveTab(tab.id)}
                  >
                    <Icon className={cn("h-5 w-5 md:mr-3 shrink-0", isActive ? "text-primary" : "")} />
                    <span className="hidden font-medium tracking-wide md:inline-block">{tab.label}</span>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Bottom Profile Section */}
          <div className="border-t border-border/60 bg-sidebar-accent/30 p-4">
            <div className="mb-4 hidden flex-col px-2 md:flex">
              <span className="mb-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Operative</span>
              <span className="truncate text-sm font-medium text-foreground">{user?.email || "Unknown"}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut} 
              disabled={activeTab === "retrieval"}
              className="h-10 w-full justify-center gap-2 transition-colors md:justify-start"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden font-medium md:inline">Sign Out</span>
            </Button>
          </div>
        </aside>

        {/* Center - The Crucible (Dynamic Content) */}
        <section 
          className={`relative flex-1 @container print:hidden transition-colors duration-300 ${
            activeTab === "retrieval"
              ? "flex flex-col overflow-hidden p-4 md:p-6"
              : "overflow-y-auto p-6 md:p-10"
          }`}
          style={{
            background: "radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--primary) 4%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, color-mix(in srgb, var(--sidebar-primary) 3%, transparent) 0%, transparent 60%), var(--background)"
          }}
          tabIndex={0}
          aria-label="Editor Main Panel"
        >
          <div className={`mx-auto w-full max-w-4xl ${
            activeTab === "retrieval" ? "flex flex-1 flex-col justify-center min-h-0" : ""
          }`}>
            {activeTab === "overview" && (
              <DashboardOverview />
            )}
            {activeTab === "forge" && <ForgeWizard onComplete={() => setActiveTab("retrieval")} />}
            {activeTab === "profile" && <UserProfile />}
            {activeTab === "retrieval" && (
              <SigilRetrieval
                onComplete={() => setActiveTab("overview")}
                onNoTokens={() => {
                  setExchangeMessage(
                    "No Beskar credits found. Replenish your balance to extract your forged sigil."
                  );
                  setShowExchange(true);
                }}
              />
            )}
          </div>
        </section>

      </main>
      {/* Hidden container for PDF capture - rendered inside a 0x0 fixed container at top-left to avoid browser off-screen culling while remaining invisible to the user */}
      <div style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0, overflow: "hidden", zIndex: -50, pointerEvents: "none" }}>
        <div 
          id="resume-document" 
          className="bg-white"
          style={{ width: "800px", height: "1131px" }}
        >
          <div className="relative h-full w-full">
          {activeTemplate === "pure-beskar" && <PureBeskarTemplate />}
          {activeTemplate === "operative" && <OperativeTemplate data={resumeData} />}
          {activeTemplate === "minimal" && <MinimalTemplate />}
          {activeTemplate === "standard" && <StandardTemplate />}
          {(activeTemplate === "avant-garde" || !["pure-beskar", "operative", "minimal", "standard"].includes(activeTemplate)) && <AvantGardeTemplate />}
          </div>
        </div>
      </div>

      {/* Premium "Bounty Exchange" Paywall Terminal */}
      <BountyExchangeModal
        isOpen={showExchange}
        onClose={() => {
          setShowExchange(false);
          setExchangeMessage("");
          setDefaultExchangePack(undefined);
        }}
        infoMessage={exchangeMessage}
        defaultPackageId={defaultExchangePack}
      />

      {/* High-fidelity full screen holographic terminal overlay for verifying Stripe checkout */}
      {verifyingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-xl">
          {/* Cyber scanner overlay lines */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1))] bg-[size:100%_4px]" />
          <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-primary/20 via-primary to-primary/20 animate-pulse" />
          
          <div className="relative w-full max-w-[500px] overflow-hidden  border border-primary/20 bg-card p-6 shadow-2xl shadow-primary/10 md:p-8">
            {/* Ambient glowing radial light */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_srgb,var(--color-primary)_10%,transparent),transparent_70%)]" />

            <div className="flex flex-col items-center justify-center space-y-6">
              
              {/* Spinner/Status Icons */}
              {verifyStatus === "verifying" && (
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/50"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              )}

              {verifyStatus === "success" && (
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/60"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                </div>
              )}

              {verifyStatus === "error" && (
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive">
                  <ShieldAlert className="h-8 w-8" />
                </div>
              )}

              {/* Title Header */}
              <div className="text-center">
                <h3 className="font-heading text-lg font-bold tracking-wider uppercase text-foreground">
                  {verifyStatus === "verifying" && "Verifying Beskar Ledger..."}
                  {verifyStatus === "success" && "Ledger Synchronized!"}
                  {verifyStatus === "error" && "Ledger Authorization Failure"}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {verifyStatus === "verifying" && "Exchanging Beskar Ledger Credits... Please wait."}
                  {verifyStatus === "success" && `Successfully credited +${verifyTokensCredited} tokens to your identity core.`}
                  {verifyStatus === "error" && verifyErrorMessage}
                </p>
              </div>

              {/* Scrolling Terminal Output */}
              <div className="w-full  border border-border/80 bg-black/70 p-4.5 font-mono text-[10px] leading-relaxed text-primary/80 h-44 overflow-y-auto">
                <div className="space-y-1">
                  {verifyLogs.map((log, i) => {
                    const isSuccess = log.startsWith("[SUCCESS]");
                    const isError = log.startsWith("[ERROR]");
                    let textClass = "text-primary/95";
                    if (isSuccess) textClass = "text-primary font-bold";
                    if (isError) textClass = "text-destructive font-bold";
                    return (
                      <div key={i} className={`flex gap-2 ${textClass}`}>
                        <span>&gt;</span>
                        <span>{log}</span>
                      </div>
                    );
                  })}
                  {verifyStatus === "verifying" && (
                    <div className="flex h-1.5 w-1.5 animate-pulse bg-primary mt-1" />
                  )}
                </div>
              </div>

              {/* Error Actions */}
              {verifyStatus === "error" && (
                <Button
                  onClick={() => {
                    setVerifyingSession(false);
                    setSearchParams({}, { replace: true });
                  }}
                  className="w-full font-bold uppercase tracking-wider"
                >
                  Return to Dashboard
                </Button>
              )}
              
            </div>
          </div>
        </div>
      )}
      {/* Live Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[860px] h-[90vh] overflow-y-auto bg-card p-6 shadow-2xl sm:p-10 border border-border/40">
          <VisuallyHidden>
            <DialogTitle>Live Resume Preview</DialogTitle>
            <DialogDescription>A visual preview of your configured resume template.</DialogDescription>
          </VisuallyHidden>
          <div className="flex w-full items-center justify-center">
            <LivePreview />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
