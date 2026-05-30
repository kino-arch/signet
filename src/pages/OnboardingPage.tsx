import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Hammer, 
  Users, 
  Compass, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Sparkles, 
  Terminal, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  type LucideIcon
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useForgeStore } from "@/store/useForgeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { AnimatedCreedBlock, type CreedLine } from "@/components/ui/animated-creed-block";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const CREED_LINES: CreedLine[] = [
  {
    text: "A Signet is not merely a record of your jobs. It is your shield in the battle of the hiring guilds.",
    typingSpeed: 28,
    pauseBefore: 500,
  },
  {
    text: "It represents your Beskar. It is forged in fire, beaten into shape, and worn with pride. Once forged, you must carry it with honor.",
    typingSpeed: 24,
    pauseBefore: 700,
  },
  {
    text: "\u2014 This is the Way.",
    typingSpeed: 80,
    pauseBefore: 900,
  },
];

interface RoleOption {
  id: string;
  title: string;
  professionalTitle: string;
  description: string;
  creed: string;
  icon: LucideIcon;
}

const ROLES: RoleOption[] = [
  {
    id: "forge",
    title: "The Forge",
    professionalTitle: "Engineering & Design",
    description: "Architecting digital and physical infrastructure. Building resilient systems, interfaces, and creations.",
    creed: "We build the foundations others stand on.",
    icon: Hammer,
  },
  {
    id: "outpost",
    title: "The Outpost",
    professionalTitle: "Customer Success & Support",
    description: "Managing frontline communications and client relations. The first and last line of the guild's honor.",
    creed: "Every client is a contract. Every contract is sacred.",
    icon: Headphones,
  },
  {
    id: "guild",
    title: "The Guild",
    professionalTitle: "Leadership & Operations",
    description: "Orchestrating teams, resources, and strategic missions. Commanding the covert from the war table.",
    creed: "Decide the mission. Coordinate the assault.",
    icon: Users,
  },
  {
    id: "navigators",
    title: "The Navigators",
    professionalTitle: "Marketing & Analysis",
    description: "Charting market pathways and analyzing intelligence. The eyes and minds that guide the guild.",
    creed: "Plot the course. The data does not lie.",
    icon: Compass,
  }
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuthStore();
  const { initializeWithOnboarding } = useForgeStore();

  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [swearOath, setSwearOath] = useState(false);
  const [creedComplete, setCreedComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scanner states
  const [scannerStatus, setScannerStatus] = useState("INITIALIZING");
  const [scannerProgress, setScannerProgress] = useState(0);

  // Biometric scanner sequence
  useEffect(() => {
    if (step === 0) {
      const interval = setInterval(() => {
        setScannerProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setScannerStatus("AUTHORIZED");
            }, 500);
            return 100;
          }
          const next = prev + Math.floor(Math.random() * 15) + 5;
          const currentProgress = next > 100 ? 100 : next;
          
          if (currentProgress > 75) {
            setScannerStatus("DECRYPTING IDENTITY");
          } else if (currentProgress > 40) {
            setScannerStatus("READING BIOMETRIC CREED");
          } else {
            setScannerStatus("INITIALIZING HELMET FEED");
          }
          return currentProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleSelectRole = (roleId: string) => {
    setRole(roleId);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !location) {
      return;
    }
    handleNextStep();
  };

  const handleIgniteForge = async () => {
    if (!swearOath) return;
    
    setSubmitting(true);
    setError(null);
    try {
      const onboardingDetails = {
        role,
        firstName,
        lastName,
        email: user?.email || "",
        phone,
        location,
        website
      };

      initializeWithOnboarding(onboardingDetails);
      await completeOnboarding(onboardingDetails);
      navigate("/editor", { replace: true });
    } catch (err: any) {
      setError(err.message || "Failed to complete onboarding. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-8 font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Immersive Background */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-primary)_10%,transparent),transparent_50%)]" />
        <div className="absolute top-0 h-[500px] w-full max-w-[1000px] bg-primary/10 blur-[120px] filter" />
      </div>

      {/* Subtle Background Pattern */}
      <div 
        role="presentation"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" 
        style={{
          backgroundImage: "radial-gradient(var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-border/50 bg-background/60 px-6 backdrop-blur-md">
        <div className="flex items-center space-x-2 text-primary">
          <ShieldCheck className="h-5 w-5 animate-pulse" />
          <span className="font-heading text-lg font-bold tracking-wider">
            SIGNET FOUNDRY
          </span>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Interactive Interface */}
      <main className="relative z-10 flex w-full max-w-4xl items-center justify-center pt-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Biometric Scan */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <Card className="border-primary/20 bg-card/80 shadow-[0_0_20px_var(--color-primary-foreground)] shadow-primary/10 backdrop-blur-xl">
                <CardHeader className="pb-2 text-center">
                  <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-muted/30">
                    <ShieldCheck className="h-16 w-16 text-primary opacity-80" />
                    {scannerStatus !== "AUTHORIZED" && (
                      <motion.div
                        className="absolute left-0 h-[2px] w-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                        animate={{ top: ["5%", "95%", "5%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </div>
                  <CardTitle className="tracking-widest text-primary uppercase">Biometric Recognition</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2  border border-border bg-muted/50 p-3 text-left font-mono text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>SECTOR CONNECTION:</span>
                      <span className="font-bold text-primary">ESTABLISHED</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>SECURITY HASH:</span>
                      <span>MD-823901-B</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>LORE SCANNER:</span>
                      <span className="animate-pulse font-bold text-primary">{scannerStatus}</span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${scannerProgress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={scannerStatus !== "AUTHORIZED"}
                    onClick={handleNextStep}
                    className="w-full font-semibold transition-all duration-300"
                  >
                    {scannerStatus === "AUTHORIZED" ? "ENTER THE FORGE" : "SCANNING CREED…"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* STEP 1: Select Specialization */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
                <CardHeader className="text-center">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">INITIATION SECTION 01</span>
                  <CardTitle className="mt-1 text-2xl md:text-3xl">Choose Your Guild Creed</CardTitle>
                  <CardDescription>
                    Select your professional discipline. The Armorer will tailor your Beskar template components based on this path.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {ROLES.map((option) => {
                      const Icon = option.icon;
                      const isSelected = role === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => handleSelectRole(option.id)}
                          className={`relative flex cursor-pointer flex-col items-center justify-between  border p-5 text-center text-left transition-all duration-300 select-none ${
                            isSelected 
                              ? "-translate-y-1 border-primary bg-muted shadow-[0_0_15px_var(--color-primary-foreground)] shadow-primary/20" 
                              : "border-border/50 bg-background hover:border-primary/50 hover:bg-muted/50"
                          }`}
                        >
                          <div className="absolute top-2 right-2 flex h-2.5 w-2.5 items-center justify-center rounded-full border border-primary/20">
                            {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                          </div>

                          <div className={`mb-4  border border-border/50 bg-background p-3 text-primary transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                            <Icon className="h-6 w-6" />
                          </div>

                          <div className="space-y-1">
                            <h3 className="font-heading text-sm font-bold tracking-wide text-foreground">
                              {option.title}
                            </h3>
                            <p className="font-mono text-[10px] tracking-wider text-primary/80">
                              {option.professionalTitle}
                            </p>
                            <p className="mt-2 hidden text-[11px] leading-relaxed text-muted-foreground md:block">
                              {option.description}
                            </p>
                          </div>

                          <div className="mt-4 w-full truncate border-t border-border/50 pt-2 font-mono text-[9px] text-muted-foreground/60 italic">
                            "{option.creed}"
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end border-t border-border/50 bg-muted/10 pt-6">
                  <Button
                    disabled={!role}
                    onClick={handleNextStep}
                    className="gap-2"
                  >
                    Confirm Specialization <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* STEP 2: Enter Guild Identity Form */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg"
            >
              <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
                <CardHeader className="text-center">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">INITIATION SECTION 02</span>
                  <CardTitle className="mt-1 text-2xl">Establish Your Sigil Details</CardTitle>
                  <CardDescription>
                    Enter your core coordinates. These will pre-populate your personal contact data inside the editor mainframe.
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleFormSubmit}>
                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Codename (First Name)</Label>
                        <Input
                          id="firstName"
                          required
                          placeholder="Din"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Surname (Last Name)</Label>
                        <Input
                          id="lastName"
                          required
                          placeholder="Djarin"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Comm Link (Email)
                      </Label>
                      <Input
                        type="email"
                        disabled
                        value={user?.email || "foundling@guild.org"}
                        className="cursor-not-allowed bg-muted/50 text-muted-foreground"
                      />
                      <p className="font-mono text-[10px] text-muted-foreground/60">
                        Linked to your galactic auth credentials.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" /> Comm Frequency (Phone)
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="555-0198"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Sector (Location)
                        </Label>
                        <Input
                          id="location"
                          required
                          placeholder="Mandalore Sector"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" /> Holonet Node (Website / LinkedIn)
                      </Label>
                      <Input
                        id="website"
                        placeholder="guild.org"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between border-t border-border/50 bg-muted/10 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={!firstName || !lastName || !location}
                    >
                      Proceed to the Oath
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}

          {/* STEP 3: Swear the Oath & Ignite the Forge */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <NeonGradientCard
                className="w-full"
                borderSize={2}
                borderRadius={24}
                neonColors={{ firstColor: "hsl(var(--primary))", secondColor: "hsl(var(--primary) / 0.5)" }}
              >
                <Card className="border-none bg-background text-center ">
                  <CardHeader>
                    <div className="mx-auto mb-4 animate-pulse rounded-full border border-primary/30 bg-primary/10 p-3 text-primary">
                      <Terminal className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-primary uppercase">INITIATION SECTION 03</span>
                    <CardTitle className="mt-1 text-2xl">The Armorer's Creed</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Animated sequential creed */}
                    <div className=" border border-border/50 bg-background/50 p-5">
                      {step === 3 && (
                        <AnimatedCreedBlock
                          lines={CREED_LINES}
                          onComplete={() => setCreedComplete(true)}
                        />
                      )}
                    </div>

                    {/* Oath checkbox — fades in only after creed finishes typing */}
                    <AnimatePresence>
                      {creedComplete && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <button
                            type="button"
                            aria-pressed={swearOath}
                            className="flex w-full cursor-pointer items-center space-x-3  border border-border/50 bg-muted/30 p-4 text-left transition-all hover:bg-muted/50"
                            onClick={() => setSwearOath(!swearOath)}
                          >
                            <div className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${
                              swearOath ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/60"
                            }`}>
                              {swearOath && <CheckCircle2 className="h-3 w-3 fill-current" />}
                            </div>
                            <span className="text-xs font-medium text-foreground select-none">
                              I swear the Creed. I am ready to forge my resume.
                            </span>
                          </button>
                          {error && (
                            <p className="mt-3 text-sm text-destructive font-medium">{error}</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3">
                    <Button
                      disabled={!swearOath || submitting}
                      onClick={handleIgniteForge}
                      className={`relative h-12 w-full overflow-hidden font-bold transition-all duration-500 ${
                        swearOath && !submitting
                          ? "shadow-[0_0_15px_var(--color-primary-foreground)] shadow-primary/30" 
                          : ""
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitting ? "IGNITING..." : "IGNITE THE FORGE"} <Sparkles className="h-4 w-4" />
                      </span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setStep(2);
                        setCreedComplete(false);
                        setSwearOath(false);
                      }}
                      className="w-full text-muted-foreground"
                    >
                      Back to Coordinates
                    </Button>
                  </CardFooter>
                </Card>
              </NeonGradientCard>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
