import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { 
  X, 
  Coins, 
  ShieldCheck, 
  Loader2, 
  CreditCard, 
  Terminal, 
  Lock, 
  Check, 
  Sparkles,
  ShieldAlert
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

interface BountyExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  infoMessage?: string;
  defaultPackageId?: string;
}

type ModalPhase = "packages" | "payment" | "processing" | "success";

interface Package {
  id: string;
  name: string;
  tokens: number;
  price: string;
  description: string;
  badge?: string;
  popular?: boolean;
}

const PACKAGES: Package[] = [
  {
    id: "foundling",
    name: "Foundling Dossier",
    tokens: 1,
    price: "$5",
    description: "Secure one full-access single-column resume export. Perfect for a targeted application.",
  },
  {
    id: "guild",
    name: "Guild Contractor",
    tokens: 5,
    price: "$15",
    description: "Receive 5 Beskar Tokens. Edit, iterate, and customize multiple sigil variations.",
    badge: "Best Value",
    popular: true,
  },
  {
    id: "syndicate",
    name: "Mandalore Syndicate",
    tokens: 15,
    price: "$35",
    description: "An unlimited tactical reserve of 15 Beskar Tokens. Command the hiring market.",
    badge: "Elite Tier",
  },
];

const PRICE_CENTS: Record<string, number> = {
  foundling: 500,
  guild: 1500,
  syndicate: 3500,
};

export function BountyExchangeModal({ isOpen, onClose, infoMessage, defaultPackageId }: BountyExchangeModalProps) {
  const { addTokens } = useAuthStore();
  const [phase, setPhase] = useState<ModalPhase>("packages");
  const [selectedPack, setSelectedPack] = useState<Package | null>(PACKAGES[1]);
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  // Form states
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardZip, setCardZip] = useState("");

  // Terminal logging states
  const [logs, setLogs] = useState<string[]>([]);
  const [terminalProgress, setTerminalProgress] = useState(0);

  // Active form field focus for card visual state
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPhase("packages");
      const matched = PACKAGES.find((p) => p.id === defaultPackageId);
      setSelectedPack(matched || PACKAGES[1]);
      setCardName("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      setCardZip("");
      setLogs([]);
      setTerminalProgress(0);
      setLoadingStripe(false);
      setStripeError(null);
    }
  }, [isOpen, defaultPackageId]);

  const handleStripeCheckout = async (pkg: Package) => {
    setLoadingStripe(true);
    setStripeError(null);
    try {
      const { user } = useAuthStore.getState();
      const stripeSecret = import.meta.env.VITE_STRIPE_SECRET_KEY;
      const successUrl = `${window.location.origin}/editor?stripe_session_id={CHECKOUT_SESSION_ID}&tokens=${pkg.tokens}`;
      const cancelUrl = `${window.location.origin}/editor`;
      
      const priceCents = PRICE_CENTS[pkg.id] || 500;

      const { data, error } = await supabase.functions.invoke("stripe-checkout", {
        body: {
          tierId: pkg.id,
          tokens: pkg.tokens,
          priceCents,
          successUrl,
          cancelUrl,
          userId: user?.id,
        },
        headers: {
          "x-stripe-secret-key": stripeSecret,
        },
      });

      if (error || !data || !data.url) {
        console.error("Stripe checkout session creation failed:", error || data?.error);
        setStripeError(error?.message || data?.error || "Failed to establish holonet stripe link.");
        setLoadingStripe(false);
        return;
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error("Error during checkout invocation:", err);
      setStripeError(err.message || "An unexpected Holonet connection failure occurred.");
      setLoadingStripe(false);
    }
  };

  // Real-time card formatting
  const handleCardNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    setCardNumber(formatted.substring(0, 19));
  };

  const handleExpiryChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    setCardExpiry(formatted.substring(0, 5));
  };

  const handleCvcChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    setCardCvc(cleaned.substring(0, 4));
  };

  const handleZipChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    setCardZip(cleaned.substring(0, 5));
  };

  // Run terminal sequence
  const startTransaction = () => {
    if (!selectedPack) return;
    setPhase("processing");

    const terminalSteps = [
      { text: "ESTABLISHING HOLONET UPLINK PROTOCOLS...", delay: 200 },
      { text: "CREATING SECURE DOUBLE-TUNNELED SYNDICATE TUNNEL...", delay: 600 },
      { text: "LEDGER SYNCHRONIZATION: EXCHANGING CRYPTOGRAPHIC OATH KEYS...", delay: 1000 },
      { text: `AUTHORIZING ${selectedPack.price.toUpperCase()} CREDIT DEBIT ROUTING...`, delay: 1500 },
      { text: "VERIFYING BIOMETRICS AND ARMOR SIGNATURES...", delay: 2000 },
      { text: "COMMITTING BESKAR LEDGER WRITES TO MAIN MAIN-FRAME...", delay: 2600 },
      { text: "TRANSACTION SECURED BY THE ARMORER'S CREED.", delay: 3200 },
    ];

    terminalSteps.forEach((step) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[SYS_LOG] ${step.text}`]);
      }, step.delay);
    });

    const progressInterval = setInterval(() => {
      setTerminalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(async () => {
            // Credit the tokens
            await addTokens(selectedPack.tokens);
            setPhase("success");
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 180);
  };

  // Easing presets
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glass */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => phase !== "processing" && onClose()}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-2xl shadow-black/40"
        >
          {/* Cyber accents */}
          <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-primary)_8%,transparent),transparent_60%)]" />

          {/* Header row */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                <Coins className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold tracking-tight text-foreground leading-tight">
                  The Bounty Exchange
                </h2>
                <p className="text-[10px] text-muted-foreground/80 tracking-wide">Replenish your Beskar Token supply</p>
              </div>
            </div>

            {phase !== "processing" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          {/* Info Alert Message */}
          {infoMessage && phase === "packages" && (
            <div className="mb-3.5 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-[11px] text-primary">
              <Terminal className="h-3.5 w-3.5 shrink-0 animate-pulse" />
              <p className="font-semibold leading-none truncate">{infoMessage}</p>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* PHASE 1: PACKAGES SELECTOR                               */}
          {/* ──────────────────────────────────────────────────────── */}
          {phase === "packages" && (
            <div className="space-y-4">
              <div className="grid gap-2.5">
                {PACKAGES.map((pkg) => {
                  const isSelected = selectedPack?.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPack(pkg);
                        setStripeError(null);
                      }}
                      className={`group relative flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all select-none ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10 ring-1 ring-primary/30"
                          : pkg.popular 
                            ? "border-primary/30 bg-primary/5 hover:border-primary/50" 
                            : "border-border/60 bg-background/50 hover:border-primary/40"
                      }`}
                    >
                      <div className="space-y-1 pr-4 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isSelected && (
                            <ShieldCheck className="h-4 w-4 text-primary shrink-0 animate-pulse" />
                          )}
                          <span className={`font-heading text-sm font-bold transition-colors ${
                            isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                          }`}>
                            {pkg.name}
                          </span>
                          {pkg.badge && (
                            <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-extrabold tracking-widest uppercase shrink-0 ${
                              isSelected || pkg.popular 
                                ? "bg-primary text-primary-foreground" 
                                : "border border-border/80 bg-muted text-muted-foreground"
                            }`}>
                              {pkg.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] leading-snug text-muted-foreground/90 max-w-sm">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end shrink-0 pl-3">
                        <span className="font-heading text-lg font-black text-foreground leading-none">
                          {pkg.price}
                        </span>
                        <span className="font-mono text-[9px] font-bold tracking-wide text-primary mt-1">
                          {pkg.tokens} {pkg.tokens === 1 ? "TOKEN" : "TOKENS"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {stripeError && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-[11px] text-destructive">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                  <p className="font-semibold leading-none">{stripeError}</p>
                </div>
              )}

              <div className="flex gap-2.5 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setPhase("payment");
                  }}
                  disabled={loadingStripe || !selectedPack}
                  className="w-1/2 h-9 gap-1.5 text-xs font-semibold"
                >
                  <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                  Sandbox Demo
                </Button>

                <Button
                  type="button"
                  onClick={() => selectedPack && handleStripeCheckout(selectedPack)}
                  disabled={loadingStripe || !selectedPack}
                  className="w-1/2 h-9 gap-1.5 text-xs font-bold shadow-md shadow-primary/20 transition-all hover:shadow-primary/40"
                >
                  {loadingStripe ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Lock className="h-3.5 w-3.5" />
                  )}
                  Pay with Stripe
                </Button>
              </div>

              <p className="text-center font-mono text-[9px] text-muted-foreground/50 leading-relaxed">
                Secured by Stripe · Guild mainframe encrypted
              </p>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* PHASE 2: PAYMENT FORM (THE INTEGRATION INTERFACE)        */}
          {/* ──────────────────────────────────────────────────────── */}
          {phase === "payment" && selectedPack && (
            <div className="space-y-6">
              {/* Visual payment card outline */}
              <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-linear-to-br from-primary/10 via-secondary/20 to-background/50 p-5 shadow-inner">
                {/* Visual card glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--color-primary)_12%,transparent),transparent_50%)]" />
                <div className="relative z-10 flex h-28 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold tracking-widest text-primary/70 uppercase">Guild Ledger slate</span>
                      <span className="font-mono text-[11px] font-bold text-muted-foreground">SECURE NODE TERMINAL</span>
                    </div>
                    <CreditCard className="h-5 w-5 text-primary/60" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-mono text-sm tracking-[0.2em] font-semibold text-foreground">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </div>

                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <span className="text-[7px] text-muted-foreground/70 tracking-widest uppercase">Operative Code</span>
                        <span className="font-mono text-[10px] font-bold uppercase truncate max-w-[150px]">
                          {cardName || "Din Djarin"}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-end">
                          <span className="text-[7px] text-muted-foreground/70 tracking-widest uppercase">Expiry</span>
                          <span className="font-mono text-[10px] font-bold">{cardExpiry || "MM/YY"}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[7px] text-muted-foreground/70 tracking-widest uppercase">Cvc</span>
                          <span className="font-mono text-[10px] font-bold">{cardCvc || "•••"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  startTransaction();
                }}
                className="space-y-3.5"
              >
                {/* Holder Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="holder-name" className="text-xs">Sigil Name (Cardholder Name)</Label>
                  <Input
                    id="holder-name"
                    required
                    placeholder="Din Djarin"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    className={activeField === "name" ? "border-primary/60 ring-1 ring-primary/20" : ""}
                  />
                </div>

                {/* Card Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="card-number" className="text-xs">Galactic Vault Coordinate (Card Number)</Label>
                  <Input
                    id="card-number"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    onFocus={() => setActiveField("number")}
                    onBlur={() => setActiveField(null)}
                    className={activeField === "number" ? "border-primary/60 ring-1 ring-primary/20" : ""}
                  />
                </div>

                {/* Expiry, CVC, Zip row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="card-expiry" className="text-xs">Expiry</Label>
                    <Input
                      id="card-expiry"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      onFocus={() => setActiveField("expiry")}
                      onBlur={() => setActiveField(null)}
                      className={activeField === "expiry" ? "border-primary/60 ring-1 ring-primary/20" : ""}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="card-cvc" className="text-xs">CVC</Label>
                    <Input
                      id="card-cvc"
                      required
                      placeholder="321"
                      value={cardCvc}
                      onChange={(e) => handleCvcChange(e.target.value)}
                      onFocus={() => setActiveField("cvc")}
                      onBlur={() => setActiveField(null)}
                      className={activeField === "cvc" ? "border-primary/60 ring-1 ring-primary/20" : ""}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="card-zip" className="text-xs">Zip</Label>
                    <Input
                      id="card-zip"
                      required
                      placeholder="90210"
                      value={cardZip}
                      onChange={(e) => handleZipChange(e.target.value)}
                      onFocus={() => setActiveField("zip")}
                      onBlur={() => setActiveField(null)}
                      className={activeField === "zip" ? "border-primary/60 ring-1 ring-primary/20" : ""}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPhase("packages")}
                    className="w-1/3"
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    className="w-2/3 gap-2 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/45"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    Authorize {selectedPack.price}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* PHASE 3: SECURE TRANSMISSION (THE MAINFRAME ENCRYPTOR)  */}
          {/* ──────────────────────────────────────────────────────── */}
          {phase === "processing" && (
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <span className="font-heading text-xs font-bold tracking-widest text-primary animate-pulse uppercase">
                  TRANSMITTING ENCRYPTED LEDGER DATASATE...
                </span>
              </div>

              {/* Logs block */}
              <div className="rounded-xl border border-border/80 bg-black/60 p-4.5 font-mono text-[10px] leading-relaxed text-primary/80 h-44 overflow-y-auto">
                <div className="space-y-1.5">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-primary shrink-0">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <div className="flex h-1 w-1 animate-pulse bg-primary mt-1" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                  <span>SECURE TUNNEL UPLINK:</span>
                  <span className="font-bold text-primary">{terminalProgress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${terminalProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* PHASE 4: SUCCESS CONFIRMED (LEDGER DEPOSITED)            */}
          {/* ──────────────────────────────────────────────────────── */}
          {phase === "success" && selectedPack && (
            <div className="space-y-6 py-6 text-center">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <ShieldCheck className="h-8 w-8" />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/50"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <h3 className="font-heading text-lg font-bold tracking-tight text-foreground mt-2">
                  Beskar Deposited
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                  Your credentials have been authenticated. The Armorer has credited your core ledger balance.
                </p>
              </div>

              {/* Secure voucher widget */}
              <div className="mx-auto max-w-xs rounded-xl border border-primary/20 bg-primary/5 p-4 font-mono text-xs">
                <div className="flex justify-between border-b border-border/50 pb-2 mb-2 text-muted-foreground">
                  <span>VOUCHER HASH:</span>
                  <span className="font-semibold text-primary">SEC-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>CREDIT ADDED:</span>
                  <span className="text-primary flex items-center gap-1">
                    <Sparkles className="h-4 w-4 fill-current text-primary" />
                    +{selectedPack.tokens} {selectedPack.tokens === 1 ? "TOKEN" : "TOKENS"}
                  </span>
                </div>
              </div>

              <Button
                onClick={onClose}
                className="w-full h-11 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/45"
              >
                Return to the Crucible <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
