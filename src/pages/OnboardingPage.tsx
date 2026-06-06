import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Hammer,
  Users,
  Compass,
  MapPin,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  Headphones,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AnimatedCreedBlock,
  type CreedLine,
} from "@/components/ui/animated-creed-block"
import { Logo } from "@/components/ui/logo"
import { TargetLockPanel } from "@/components/editor/TargetLockPanel"
import { Onboarding, ChoiceGroup } from "@/components/ui/onboarding"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { Seo } from "@/components/seo/Seo"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

// ─── 70/30 Creed Lines ────────────────────────────────────────────────────────
const CREED_LINES: CreedLine[] = [
  {
    text: "Your experience is your Beskar. Tested under pressure, forged through real work. The Forge shapes it into something that gets you hired.",
    typingSpeed: 26,
    pauseBefore: 400,
  },
  {
    text: "— This is the Way.",
    typingSpeed: 75,
    pauseBefore: 600,
  },
]

// ─── Role Options ─────────────────────────────────────────────────────────────
interface RoleOption {
  id: string
  title: string
  subtitle: string
  description: string
  creed: string
  icon: LucideIcon
}

const ROLES: RoleOption[] = [
  {
    id: "forge",
    title: "Engineering & Design",
    subtitle: "The Forge",
    description:
      "Building systems, interfaces, and digital infrastructure. The technical backbone behind every great product.",
    creed: "We build the foundations others stand on.",
    icon: Hammer,
  },
  {
    id: "outpost",
    title: "Customer Success",
    subtitle: "The Outpost",
    description:
      "Managing client relationships and frontline communications. Turning every interaction into a long-term partnership.",
    creed: "Every client is a contract. Every contract is honored.",
    icon: Headphones,
  },
  {
    id: "guild",
    title: "Leadership & Ops",
    subtitle: "Command & Ops",
    description:
      "Orchestrating teams, resources, and strategic initiatives. Turning vision into execution at every level.",
    creed: "Set the mission. Align the team. Deliver.",
    icon: Users,
  },
  {
    id: "navigators",
    title: "Marketing & Strategy",
    subtitle: "The Navigators",
    description:
      "Charting market pathways and analyzing performance data. The strategic minds that drive growth.",
    creed: "Plot the course. The data does not lie.",
    icon: Compass,
  },
]

// ─── Main Page ────────────────────────────────────────────────────────────────
export function OnboardingPage() {
  const navigate = useNavigate()
  const { user, completeOnboarding } = useAuthStore()
  const reducedMotion = useReducedMotion()

  const [preOnboardingStep, setPreOnboardingStep] = useState(0) // 0 = Identity Verification
  const [role, setRole] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [website, setWebsite] = useState("")
  const [swearOath, setSwearOath] = useState(false)
  const [creedComplete, setCreedComplete] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Identity verification state
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStatus, setScanStatus] = useState("INITIALIZING")

  // Pre-fill user data if available
  useEffect(() => {
    if (user?.user_metadata?.full_name && !firstName) {
      const parts = user.user_metadata.full_name.split(" ")
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFirstName(parts[0] || "")
      setLastName(parts.slice(1).join(" ") || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // Edge Function Geolocation (Step 3 mount)
  useEffect(() => {
    if (preOnboardingStep === 1 && !location) {
      const fetchGeo = async () => {
        try {
          const { data, error } =
            await supabase.functions.invoke("get-user-geo")
          if (
            !error &&
            data?.threat_origin &&
            data.threat_origin !== "Unknown"
          ) {
            setLocation(data.threat_origin)
          }
        } catch (err) {
          console.warn("Edge Geo telemetry failed:", err)
        }
      }
      fetchGeo()
    }
  }, [preOnboardingStep, location])

  useEffect(() => {
    if (preOnboardingStep !== 0) return
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setScanStatus("AUTHORIZED"), 400)
          return 100
        }
        const next = Math.min(prev + Math.floor(Math.random() * 14) + 5, 100)
        if (next > 75) setScanStatus("VERIFYING CREDENTIALS")
        else if (next > 40) setScanStatus("READING ACCOUNT DATA")
        else setScanStatus("ESTABLISHING SECURE LINK")
        return next
      })
    }, 180)
    return () => clearInterval(interval)
  }, [preOnboardingStep])

  const handleLaunch = async () => {
    if (!swearOath) return
    setSubmitting(true)
    setError(null)
    try {
      const details = {
        role,
        firstName,
        lastName,
        email: user?.email || "",
        phone,
        location,
        website,
      }

      // 2. Mark onboarding complete in Supabase user metadata + localStorage
      await completeOnboarding(details)

      // 3. For guest users, skip Supabase DB operations — navigate directly to editor
      const isGuest = user?.id?.startsWith("guest_")
      if (isGuest) {
        navigate(`/slates`, { replace: true })
        return
      }

      // 4. THE HANDOFF PAYLOAD — create a new data_slate and seed the basics section
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session?.user)
        throw new Error("Session expired. Please sign in again.")

      // 4a. Create the slate row
      const { data: slate, error: slateErr } = await supabase
        .from("data_slates")
        .insert({
          user_id: session.user.id,
          title: `${firstName} ${lastName} — Forge Resume`,
          is_target_optimized: false,
        })
        .select("id")
        .single()

      if (slateErr || !slate)
        throw new Error(slateErr?.message || "Failed to create data slate.")

      // 4b. Seed the basics section from onboarding identity data
      const basicsPayload = {
        name: `${firstName} ${lastName}`.trim(),
        label:
          role === "forge"
            ? "Software Engineer"
            : role === "outpost"
              ? "Customer Success Manager"
              : role === "guild"
                ? "Director of Operations"
                : role === "navigators"
                  ? "Growth Strategist"
                  : "Professional",
        email: user?.email || "",
        phone,
        url: website,
        summary: "",
        location: { city: location, countryCode: "", region: "" },
        profiles: [],
      }

      await supabase.from("slate_sections").insert({
        slate_id: slate.id,
        section_type: "basics",
        raw_content: basicsPayload,
      })

      navigate(`/slates`, { replace: true })
    } catch (err: unknown) {
      const e = err as Error
      setError(e.message || "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Seo
        title="Onboarding | Signet"
        description="Join the Forge."
        noindex={true}
      />
      <div className="relative flex min-h-svh flex-col bg-background text-foreground selection:bg-primary/20">
        {/* Ambient background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--color-primary)_8%,transparent),transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(var(--color-primary) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Header */}
        <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border/40 bg-background/70 px-6 backdrop-blur-md">
          <Logo size="sm" />
        </header>

        {/* Content */}
        <main className="relative z-10 flex flex-1 items-center justify-center px-4 pt-14">
          <div className="w-full max-w-3xl py-12">
            <AnimatePresence mode="wait">
              {/* ── Pre-Onboarding: Identity Verification ─────────────────────────── */}
              {preOnboardingStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={
                    reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                  }
                  animate={
                    reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                  }
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="mx-auto max-w-sm"
                >
                  <div className="rounded-2xl border border-border/50 bg-card/60 p-8 shadow-xl backdrop-blur-xl">
                    {/* Icon */}
                    <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary/5">
                      <Logo
                        size="lg"
                        showText={false}
                        className="ml-1"
                        animateOnHover={false}
                      />
                      {scanStatus !== "AUTHORIZED" && (
                        <motion.div
                          className="absolute inset-x-0 h-px bg-primary/60 shadow-[0_0_6px_var(--color-primary)]"
                          animate={{ top: ["8%", "92%", "8%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </div>

                    <h1 className="mb-1 text-center text-sm font-bold tracking-widest text-primary uppercase">
                      Identity Verification
                    </h1>
                    <p className="mb-6 text-center text-xs text-muted-foreground">
                      Establishing a secure session before setup.
                    </p>

                    {/* Status grid */}
                    <div className="mb-6 space-y-2 rounded-lg border border-border/50 bg-muted/30 px-4 py-3 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          SECURE CONNECTION
                        </span>
                        <span className="font-semibold text-primary">
                          ESTABLISHED
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          SESSION TOKEN
                        </span>
                        <span className="text-foreground">MD-823901-B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">STATUS</span>
                        <span
                          className={cn(
                            "font-semibold",
                            scanStatus === "AUTHORIZED"
                              ? "text-primary"
                              : "animate-pulse text-primary/70"
                          )}
                        >
                          {scanStatus}
                        </span>
                      </div>
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      disabled={scanStatus !== "AUTHORIZED"}
                      onClick={() => setPreOnboardingStep(1)}
                      className="w-full text-xs font-bold tracking-widest uppercase"
                    >
                      {scanStatus === "AUTHORIZED"
                        ? "Enter the Forge"
                        : "Verifying…"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ── Main Onboarding Flow (Powered by Cult UI primitive) ─────────── */}
              {preOnboardingStep === 1 && (
                <motion.div
                  key="step-main"
                  initial={
                    reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                  }
                  animate={
                    reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                  }
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="w-full"
                >
                  <Onboarding totalSteps={4} onComplete={handleLaunch}>
                    {/* Global Step Indicator */}
                    <div className="mx-auto mb-8 w-full max-w-sm">
                      <Onboarding.StepIndicator />
                    </div>

                    {/* STEP 1: Specialization */}
                    <Onboarding.Step step={1}>
                      <Onboarding.Header
                        stepTitle="Setup · Step 01 of 04"
                        title="Select Your Specialization"
                        description="Choose your professional discipline. The Forge AI will optimize your resume layout and content to match your field."
                      />

                      <ChoiceGroup
                        name="role"
                        onValueChange={setRole}
                        value={role}
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                      >
                        {ROLES.map((r) => {
                          const Icon = r.icon
                          return (
                            <ChoiceGroup.Item
                              key={r.id}
                              value={r.id}
                              title={r.title}
                              subtitle={r.subtitle}
                              description={r.description}
                              creed={r.creed}
                              icon={<Icon className="h-4 w-4" />}
                            />
                          )
                        })}
                      </ChoiceGroup>

                      <div className="mt-6 flex justify-end">
                        <Onboarding.Navigation
                          canGoNext={!!role}
                          hideBack
                          nextLabel="Confirm Specialization"
                        />
                      </div>
                    </Onboarding.Step>

                    {/* STEP 2: Target Intelligence */}
                    <Onboarding.Step step={2}>
                      <Onboarding.Header
                        stepTitle="Setup · Step 02 of 04"
                        title="Target Intelligence"
                        description="Enter a target company and the Forge AI will analyze their culture, interview process, and job listings to tailor your resume instantly. (Optional)"
                      />

                      <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-xl">
                        <TargetLockPanel />
                      </div>

                      {/* The TargetLockPanel internally doesn't advance steps anymore, we just let the user skip or advance manually when done */}
                      <Onboarding.Navigation nextLabel="Skip for now / Continue" />
                    </Onboarding.Step>

                    {/* STEP 3: Professional Profile */}
                    <Onboarding.Step step={3}>
                      <div className="mx-auto max-w-lg">
                        <Onboarding.Header
                          stepTitle="Setup · Step 03 of 04"
                          title="Your Professional Profile"
                          description="Enter your contact details. These will pre-populate your resume so you can get started instantly."
                        />

                        <div className="space-y-5 rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-xl">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="h-px flex-1 bg-border/50"></div>
                            <span className="px-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                              Pre-filled for{" "}
                              {user?.user_metadata?.full_name ||
                                user?.email ||
                                "John Doe"}
                            </span>
                            <div className="h-px flex-1 bg-border/50"></div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="firstName"
                                className="text-xs font-medium text-muted-foreground"
                              >
                                First Name
                              </Label>
                              <Input
                                id="firstName"
                                required
                                placeholder="Alex"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="h-9 bg-background/60 text-sm"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="lastName"
                                className="text-xs font-medium text-muted-foreground"
                              >
                                Last Name
                              </Label>
                              <Input
                                id="lastName"
                                required
                                placeholder="Morgan"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="h-9 bg-background/60 text-sm"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <Mail className="h-3 w-3" /> Email Address
                            </Label>
                            <Input
                              type="email"
                              disabled
                              value={user?.email || ""}
                              className="h-9 cursor-not-allowed bg-muted/40 text-sm text-muted-foreground"
                            />
                            <p className="font-mono text-[10px] text-muted-foreground/50">
                              Synced from your authentication credentials.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <Label
                                htmlFor="phone"
                                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                              >
                                <Phone className="h-3 w-3" /> Phone
                              </Label>
                              <PhoneInput
                                international
                                defaultCountry="US"
                                value={phone}
                                onChange={(val) => setPhone(val || "")}
                                className="flex h-9 w-full rounded-md border border-input bg-background/60 px-3 py-1 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-primary [&>.PhoneInputCountry]:mr-3 [&>.PhoneInputCountry>select]:bg-background [&>.PhoneInputCountry>select]:text-foreground [&>input]:w-full [&>input]:bg-transparent [&>input]:outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="location"
                                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                              >
                                <MapPin className="h-3 w-3" /> Location
                              </Label>
                              <Input
                                id="location"
                                required
                                placeholder="San Francisco, CA"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="h-9 bg-background/60 text-sm"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <Label
                              htmlFor="website"
                              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                            >
                              <Globe className="h-3 w-3" /> Website / LinkedIn
                            </Label>
                            <Input
                              id="website"
                              placeholder="linkedin.com/in/yourname"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              className="h-9 bg-background/60 text-sm"
                            />
                          </div>
                        </div>

                        <Onboarding.Navigation
                          canGoNext={!!(firstName && lastName && location)}
                          nextLabel="Continue to Review"
                        />
                      </div>
                    </Onboarding.Step>

                    {/* STEP 4: The Forge Commitment */}
                    <Onboarding.Step step={4}>
                      <div className="mx-auto max-w-md">
                        <div className="rounded-2xl border border-border/50 bg-card/60 p-8 shadow-xl backdrop-blur-xl">
                          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                            <Terminal className="h-5 w-5" />
                          </div>

                          <div className="mb-6 text-center">
                            <p className="mb-1 text-xs font-semibold tracking-widest text-primary uppercase">
                              Setup · Step 04 of 04
                            </p>
                            <h1 className="text-xl font-bold tracking-tight text-foreground">
                              The Forge Commitment
                            </h1>
                          </div>

                          <div className="mb-6 rounded-lg border border-border/40 bg-muted/20 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                            <AnimatedCreedBlock
                              lines={CREED_LINES}
                              onComplete={() => setCreedComplete(true)}
                            />
                          </div>

                          <AnimatePresence>
                            {creedComplete && (
                              <motion.div
                                initial={
                                  reducedMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, y: 8 }
                                }
                                animate={
                                  reducedMotion
                                    ? { opacity: 1 }
                                    : { opacity: 1, y: 0 }
                                }
                                transition={{ duration: 0.4 }}
                                className="mb-5"
                              >
                                <button
                                  type="button"
                                  aria-pressed={swearOath}
                                  onClick={() => setSwearOath(!swearOath)}
                                  className={cn(
                                    "flex w-full cursor-pointer items-start gap-3 rounded-lg border p-4 text-left transition-all duration-200",
                                    swearOath
                                      ? "border-primary/40 bg-primary/5"
                                      : "border-border/40 bg-muted/10 hover:border-border hover:bg-muted/20"
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200",
                                      swearOath
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-muted-foreground/40"
                                    )}
                                  >
                                    {swearOath && (
                                      <CheckCircle2 className="h-2.5 w-2.5 fill-current" />
                                    )}
                                  </div>
                                  <span className="text-xs leading-relaxed text-foreground select-none">
                                    I'm ready to build my resume inside the
                                    Forge editor.
                                  </span>
                                </button>
                                {error && (
                                  <p className="mt-3 text-xs font-medium text-destructive">
                                    {error}
                                  </p>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="flex flex-col gap-3">
                            <Button
                              disabled={!swearOath || submitting}
                              onClick={handleLaunch}
                              className={cn(
                                "w-full gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-300",
                                swearOath &&
                                  !submitting &&
                                  "shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]"
                              )}
                            >
                              {submitting ? "Launching…" : "Launch the Forge"}
                              <Sparkles className="h-3.5 w-3.5" />
                            </Button>

                            <Onboarding.Navigation
                              hideBack={false}
                              nextLabel=""
                              backLabel="Back to Profile"
                              className="mt-0 flex justify-center [&>button[data-slot='onboarding-back']]:w-full [&>button[data-slot='onboarding-back']]:border-none [&>button[data-slot='onboarding-back']]:text-muted-foreground [&>button[data-slot='onboarding-complete']]:hidden"
                            />
                          </div>
                        </div>
                      </div>
                    </Onboarding.Step>
                  </Onboarding>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  )
}
