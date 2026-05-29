import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { SignetShowcase } from "@/components/landing/SignetShowcase";
import { CTASection } from "@/components/landing/CTASection";
import { TheCovert } from "@/components/landing/TheCovert";
import { CreedFAQ } from "@/components/landing/CreedFAQ";
import { CommLink } from "@/components/landing/CommLink";
import { DirectoryFooter } from "@/components/landing/DirectoryFooter";
import { PricingSection } from "@/components/landing/PricingSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";
import { Shield, Radio, Flame } from "lucide-react";

export function LandingPage() {
  const { user, signOut } = useAuthStore();


  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="relative flex min-h-svh flex-col bg-background font-sans antialiased selection:bg-primary/20 selection:text-primary">
      {/* Immersive Background */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-primary)_10%,transparent),transparent_50%)]" />
        <div className="absolute top-0 h-[500px] w-full max-w-[1000px] bg-primary/10 blur-[120px] filter" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Premium Logo */}
          <div className="flex items-center">
            <Link className="group flex items-center gap-3" to="/">
              <motion.div 
                whileHover={{ rotate: 180 }} 
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-primary/30 bg-primary/10 shadow-[0_0_10px_rgba(var(--color-primary),0.2)]"
              >
                <Shield className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="font-heading text-lg font-bold tracking-widest text-foreground transition-colors group-hover:text-primary sm:text-xl uppercase">
                Signet
              </span>
            </Link>
          </div>

          {/* Center Navigation Links with Mando vibe */}
          <div className="flex flex-1 items-center justify-center">
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: "The Forge", href: "#features" },
                { name: "The Armory", href: "#signets" },
                { name: "The Covert", href: "#covert" },
                { name: "The Creed", href: "#creed" },
              ].map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="group relative text-sm font-medium tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100 shadow-[0_0_8px_rgba(var(--color-primary),0.6)]" />
                </a>
              ))}
            </nav>
          </div>
          
          {/* Right Action Buttons and Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex border-primary/20 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(var(--color-primary),0.15)] transition-all">
                  <a href="#commlink">
                    <Radio className="mr-2 h-4 w-4" />
                    Comm-Link
                  </a>
                </Button>
              </motion.div>
              {user ? (
                <>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="hidden sm:inline-flex">
                    Sign Out
                  </Button>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="default" size="sm" asChild className="relative overflow-hidden shadow-[0_0_15px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--color-primary),0.5)] transition-all">
                      <Link to="/editor">
                        <span className="relative z-10 flex items-center gap-2">
                          Enter the Forge
                          <Flame className="h-4 w-4" />
                        </span>
                        <motion.div 
                          className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.7, ease: "easeInOut" }}
                        />
                      </Link>
                    </Button>
                  </motion.div>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="default" size="sm" asChild className="relative overflow-hidden shadow-[0_0_15px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--color-primary),0.5)] transition-all">
                    <Link to="/login">
                      <span className="relative z-10 flex items-center gap-2">
                        Enter the Forge
                        <Flame className="h-4 w-4" />
                      </span>
                      <motion.div 
                        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
            {/* Theme Toggle separated to the extreme right */}
            <div className="hidden h-6 w-px bg-border md:block" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <Hero />
        <Features />
        <SignetShowcase />
        <TheCovert />
        <CreedFAQ />
        <PricingSection />
        <CommLink />
        <CTASection />
      </main>

      <DirectoryFooter />
    </div>
  );
}
