import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { 
  X, 
  Coins, 
  ShieldCheck, 
  Loader2,
  Lock,
  Sparkles,
  ShieldAlert,
  Zap
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

interface BountyExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  infoMessage?: string;
  defaultPackageId?: string;
}

interface Package {
  id: string;
  name: string;
  credits: number;
  price: string;
  description: string;
  badge?: string;
  popular?: boolean;
}

const PACKAGES: Package[] = [
  {
    id: "foundling",
    name: "Starter",
    credits: 1,
    price: "$5",
    description: "Perfect for a single ATS-optimized resume.",
  },
  {
    id: "guild",
    name: "Professional",
    credits: 5,
    price: "$15",
    description: "Best for crafting multiple tailored resumes.",
    badge: "Best Value",
    popular: true,
  },
  {
    id: "syndicate",
    name: "Elite",
    credits: 15,
    price: "$35",
    description: "Unlimited tactical reserve for active job seekers.",
    badge: "Premium",
  },
];

const PRICE_CENTS: Record<string, number> = {
  foundling: 500,
  guild: 1500,
  syndicate: 3500,
};

export function BountyExchangeModal({ isOpen, onClose, infoMessage, defaultPackageId }: BountyExchangeModalProps) {
  const [selectedPack, setSelectedPack] = useState<Package | null>(PACKAGES[1]);
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const matched = PACKAGES.find((p) => p.id === defaultPackageId);
      setSelectedPack(matched || PACKAGES[1]);
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
      const successUrl = `${window.location.origin}/editor?stripe_session_id={CHECKOUT_SESSION_ID}&credits=${pkg.credits}`;
      const cancelUrl = `${window.location.origin}/editor`;
      
      const priceCents = PRICE_CENTS[pkg.id] || 500;

      const { data, error } = await supabase.functions.invoke("stripe-checkout", {
        body: {
          tierId: pkg.id,
          tokens: pkg.credits,
          priceCents,
          successUrl,
          cancelUrl,
          userId: user?.id,
          email: user?.email, // Now passing email to pre-fill Stripe checkout
        },
        headers: {
          "x-stripe-secret-key": stripeSecret,
        },
      });

      if (error || !data || !data.url) {
        console.error("Stripe checkout session creation failed:", error || data?.error);
        setStripeError(error?.message || data?.error || "Failed to initialize secure checkout.");
        setLoadingStripe(false);
        return;
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error("Error during checkout invocation:", err);
      setStripeError(err.message || "An unexpected checkout error occurred.");
      setLoadingStripe(false);
    }
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(12px)", transition: { duration: 0.3 } },
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => !loadingStripe && onClose()}
          className="absolute inset-0 bg-background/60"
        />

        {/* Modal Window Container */}
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* Subtle top gradient line */}
          <div className="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.08),transparent_50%)]" />

          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Unlock More Credits
                </h2>
                <p className="text-sm text-zinc-400 mt-1">Select a package to continue generating elite resumes.</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={loadingStripe}
              className="h-8 w-8 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Info Alert Message */}
          {infoMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
              <Zap className="h-4 w-4 shrink-0" />
              <p className="font-medium">{infoMessage}</p>
            </div>
          )}

          {/* Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPack?.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => {
                    if (!loadingStripe) {
                      setSelectedPack(pkg);
                      setStripeError(null);
                    }
                  }}
                  className={`group relative flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-xl border p-6 text-center transition-all duration-200 select-none ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] ring-1 ring-primary/30"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  } ${loadingStripe ? "pointer-events-none opacity-60" : ""}`}
                >
                  {/* Top Badge */}
                  <div className="flex h-6 items-center justify-center">
                    {(isSelected || pkg.popular) && (
                      <Badge 
                        variant={isSelected ? "default" : "secondary"} 
                        className={`text-[10px] uppercase font-bold tracking-wider ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-white/10 text-white"
                        }`}
                      >
                        {pkg.badge || "Popular"}
                      </Badge>
                    )}
                  </div>

                  {/* Credits amount */}
                  <div className="flex items-center gap-1.5">
                    <Coins className={`h-4 w-4 ${isSelected ? "text-primary" : "text-zinc-400"}`} />
                    <span className={`font-bold ${isSelected ? "text-primary" : "text-zinc-300"}`}>
                      {pkg.credits} {pkg.credits === 1 ? "Credit" : "Credits"}
                    </span>
                  </div>

                  {/* Price */}
                  <div>
                    <span className="text-4xl font-bold tracking-tighter text-white">
                      {pkg.price}
                    </span>
                  </div>

                  {/* Desc */}
                  <p className="text-xs leading-relaxed text-zinc-400 px-2 h-10">
                    {pkg.description}
                  </p>
                  
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {stripeError && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <p className="font-medium">{stripeError}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              onClick={() => selectedPack && handleStripeCheckout(selectedPack)}
              disabled={loadingStripe || !selectedPack}
              className="w-full sm:w-2/3 h-12 gap-2 text-sm font-bold shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 rounded-full"
            >
              {loadingStripe ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Initializing Secure Checkout...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Checkout securely with Stripe
                </>
              )}
            </Button>
            
            <p className="text-xs text-zinc-500 flex items-center gap-1.5">
              <Lock className="h-3 w-3" />
              Payments are secure and encrypted.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
