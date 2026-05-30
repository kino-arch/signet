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
import { Shield, Flame, LayoutDashboard, Coins, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function LandingPage() {
  const { user, profile, signOut } = useAuthStore();


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
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4 md:gap-8">
          {/* Premium Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              className="group flex items-center gap-3" 
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.div 
                whileHover={{ rotate: 180 }} 
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="flex h-8 w-8 items-center justify-center  border border-primary/30 bg-primary/10 shadow-[0_0_10px_rgba(var(--color-primary),0.2)]"
              >
                <Shield className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="font-heading text-lg font-bold tracking-widest text-foreground transition-colors group-hover:text-primary sm:text-xl uppercase">
                Signet
              </span>
            </Link>
          </div>

          {/* Center Navigation Links with Mando vibe */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-4 xl:space-x-8">
              {[
                { name: "The Forge", href: "#features" },
                { name: "The Armory", href: "#signets" },
                { name: "The Covert", href: "#covert" },
                { name: "The Creed", href: "#creed" },
                { name: "Comm-Link", href: "#commlink" },
              ].map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="group relative text-xs xl:text-sm font-medium tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary whitespace-nowrap"
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
              {user ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="default" size="sm" asChild className="hidden sm:inline-flex relative overflow-hidden shadow-[0_0_15px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--color-primary),0.5)] transition-all">
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-1 hover:bg-transparent">
                        <Avatar className="h-8 w-8 border border-primary/20 shadow-[0_0_10px_rgba(var(--color-primary),0.15)] transition-transform hover:scale-105">
                          <AvatarFallback className="bg-primary/10 text-primary font-heading font-bold">
                            {user.email ? user.email.charAt(0).toUpperCase() : "M"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 border-border/40 bg-background/95 backdrop-blur-md" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-foreground">Hunter</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email || "foundling@guild.org"}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-border/40" />
                      <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 focus:text-primary">
                        <Link to="/editor" className="w-full">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>The Forge</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-default focus:bg-transparent">
                        <Coins className="mr-2 h-4 w-4 text-primary" />
                        <span className="font-medium">{profile?.token_balance || 0} Credits</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border/40" />
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
