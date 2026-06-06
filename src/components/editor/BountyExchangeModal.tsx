import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { X, Coins, Loader2, Lock, Zap, Sparkles } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

interface BountyExchangeModalProps {
  isOpen: boolean
  onClose: () => void
  infoMessage?: string
  defaultPackageId?: string
}

interface Package {
  id: string
  name: string
  credits: number
  price: number
  description: string
  badge?: string
}

const PACKAGES: Package[] = [
  {
    id: "foundling",
    name: "Starter Pack",
    credits: 1,
    price: 5.0,
    description: "Perfect for a single ATS-optimized resume.",
  },
  {
    id: "guild",
    name: "Professional Pack",
    credits: 5,
    price: 15.0,
    description: "Best for crafting multiple tailored resumes.",
    badge: "Best Value",
  },
  {
    id: "syndicate",
    name: "Elite Pack",
    credits: 15,
    price: 35.0,
    description: "Unlimited tactical reserve for active job seekers.",
  },
]

export function BountyExchangeModal({
  isOpen,
  onClose,
  infoMessage,
  defaultPackageId,
}: BountyExchangeModalProps) {
  const [selectedPack, setSelectedPack] = useState<Package | null>(PACKAGES[1])
  const [loadingStripe, setLoadingStripe] = useState(false)
  const [stripeError, setStripeError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      const matched = PACKAGES.find((p) => p.id === defaultPackageId)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPack(matched || PACKAGES[1])
      setLoadingStripe(false)
      setStripeError(null)
    }
  }, [isOpen, defaultPackageId])

  const handleStripeCheckout = async (pkg: Package) => {
    setLoadingStripe(true)
    setStripeError(null)
    try {
      const { user } = useAuthStore.getState()
      const stripeSecret = import.meta.env.VITE_STRIPE_SECRET_KEY
      const successUrl = `${window.location.origin}/editor?stripe_session_id={CHECKOUT_SESSION_ID}&credits=${pkg.credits}`
      const cancelUrl = `${window.location.origin}/editor`

      const priceCents = pkg.price * 100

      const { data, error } = await supabase.functions.invoke(
        "stripe-checkout",
        {
          body: {
            tierId: pkg.id,
            credits: pkg.credits,
            priceCents,
            successUrl,
            cancelUrl,
            userId: user?.id,
            email: user?.email,
          },
          headers: {
            "x-stripe-secret-key": stripeSecret,
          },
        }
      )

      if (error || !data || !data.url) {
        console.error(
          "Stripe checkout session creation failed:",
          error || data?.error
        )
        setStripeError(
          error?.message ||
            data?.error ||
            "Failed to initialize secure checkout."
        )
        setLoadingStripe(false)
        return
      }

      window.location.href = data.url
    } catch (err: unknown) {
      console.error("Error during checkout invocation:", err)
      setStripeError(
        (err as Error).message || "An unexpected checkout error occurred."
      )
      setLoadingStripe(false)
    }
  }

  const overlayVariants: Variants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: {
      opacity: 1,
      backdropFilter: "blur(12px)",
      transition: { duration: 0.3 },
    },
  }

  const panelVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
  }

  if (!isOpen) return null

  // Render the modal into the document body to break out of any stacking contexts
  // like the layout header, so it never renders behind the PDF preview.
  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => !loadingStripe && onClose()}
          className="absolute inset-0 bg-background/60"
        />

        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-[760px]"
        >
          <Card className="group relative overflow-hidden rounded-2xl border-white/10 bg-zinc-950/80 p-0 shadow-2xl backdrop-blur-xl transition-all duration-300">
            {/* Subtle top gradient line */}
            <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.08),transparent_50%)]" />

            <div className="flex flex-col md:flex-row">
              {/* Left Column - Packages */}
              <div className="flex-1 p-6 md:p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white">
                        Unlock Credits
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Select a package below
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    disabled={loadingStripe}
                    className="h-8 w-8 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white md:hidden"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {infoMessage && (
                  <div className="mb-6 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
                    <Zap className="h-4 w-4 shrink-0" />
                    <p className="font-medium">{infoMessage}</p>
                  </div>
                )}

                <div className="space-y-3">
                  {PACKAGES.map((pkg) => {
                    const isSelected = selectedPack?.id === pkg.id
                    return (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => {
                          if (!loadingStripe) {
                            setSelectedPack(pkg)
                            setStripeError(null)
                          }
                        }}
                        className={cn(
                          "flex cursor-pointer items-center gap-4 rounded-xl border p-3 transition-colors",
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10",
                            isSelected ? "bg-primary/20" : "bg-black/50"
                          )}
                        >
                          <Coins
                            className={cn(
                              "h-6 w-6",
                              isSelected ? "text-primary" : "text-zinc-500"
                            )}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">
                              {pkg.name}
                            </h4>
                            {pkg.badge && (
                              <span
                                className={cn(
                                  "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase",
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-white/10 text-zinc-300"
                                )}
                              >
                                {pkg.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400">
                            {pkg.credits}{" "}
                            {pkg.credits === 1 ? "Credit" : "Credits"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-white">
                            ${pkg.price.toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Right Column - Summary & Checkout */}
              <div className="relative flex w-full shrink-0 flex-col justify-between border-t border-white/10 bg-black/40 p-6 md:w-80 md:border-t-0 md:border-l md:p-8">
                {/* Close button for desktop */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  disabled={loadingStripe}
                  className="absolute top-4 right-4 hidden h-8 w-8 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white md:flex"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="mt-4 md:mt-0">
                  <h4 className="mb-6 hidden text-sm font-bold text-white md:block">
                    Order Summary
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-zinc-400">
                      <span>Package</span>
                      <span className="font-medium text-white">
                        {selectedPack?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span>${selectedPack?.price.toFixed(2) || "0.00"}</span>
                    </div>
                    <Separator className="my-4 bg-white/10" />
                    <div className="flex justify-between text-lg font-bold text-white">
                      <span>Total Due</span>
                      <span>${selectedPack?.price.toFixed(2) || "0.00"}</span>
                    </div>
                  </div>

                  {stripeError && (
                    <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-xs font-medium text-red-400">
                      {stripeError}
                    </div>
                  )}
                </div>

                <Button
                  className="group/btn mt-8 w-full gap-2 bg-primary py-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40"
                  onClick={() =>
                    selectedPack && handleStripeCheckout(selectedPack)
                  }
                  disabled={loadingStripe || !selectedPack}
                >
                  {loadingStripe ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Checkout securely
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  )
}
