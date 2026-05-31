"use client"

import React from "react"
import { Link } from "react-router-dom"
import { Menu as Equal, X, Flame, LayoutDashboard, Coins, LogOut } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { motion } from "framer-motion"

import { Menus } from "@/components/menus"
import { ModeToggle } from "@/components/theme-switch"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { name: "Manifesto", href: "#manifesto" },
  { name: "Blueprints", href: "#blueprints" },
  { name: "Arsenal", href: "#arsenal" },
  { name: "Intel", href: "#" }, // Intel acts as a dropdown or modal on mobile typically
  { name: "Runes", href: "#runes" },
  { name: "The Forge", href: "#the-forge" },
]

export function Header() {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { user, profile, signOut } = useAuthStore()

  const handleSignOut = async () => {
    await signOut()
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="relative z-50 w-full">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        data-state={menuState && "active"}
        className={cn(
          "fixed top-0 left-0 right-0 w-full px-3 py-2 transition-colors duration-300 md:px-4",
          isScrolled ? "bg-background/40 backdrop-blur-md border-b border-white/5" : "bg-background border-b border-white/5"
        )}
      >
        <div
          className={cn(
            "mx-auto transition-all duration-300 w-full",
            isScrolled
              ? "bg-background/70 max-w-5xl rounded-2xl border border-border/50 px-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:bg-zinc-950/50"
              : "max-w-7xl px-4"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-3 py-2.5">
            <div className="flex w-full items-center justify-between lg:w-auto">
              <Link 
                to="/" 
                aria-label="home" 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Logo size="md" />
              </Link>

              <div className="flex gap-2 lg:hidden">
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 block cursor-pointer p-2 text-foreground"
                >
                  {menuState ? <X className="size-6 transition-all" /> : <Equal className="size-6 transition-all" />}
                </button>
              </div>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <Menus />
            </div>

            <div className={cn(
              "shadow-3xl w-full flex-wrap items-center justify-end space-y-6 rounded-sm border p-4 shadow-zinc-300/20 backdrop-blur-2xl transition-all duration-300 lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none lg:flex-nowrap",
              menuState ? "block mt-4" : "hidden lg:flex"
            )}>
              <div className="block p-2 lg:hidden">
                <ul className="space-y-4 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="block text-sm text-muted-foreground duration-150 hover:text-primary"
                        onClick={() => setMenuState(false)}
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 lg:w-auto">
                <ModeToggle />
                
                {user ? (
                  <div className="flex items-center gap-3">
                    <Button variant="default" size="sm" asChild className={cn("relative overflow-hidden transition-all", isScrolled && "lg:h-9")}>
                      <Link to="/editor">
                        <span className="relative z-10 flex items-center gap-2">
                          Start Building
                          <Flame className="h-4 w-4" />
                        </span>
                      </Link>
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" aria-label="User Menu" className="relative h-8 w-8 rounded-full hover:bg-transparent">
                          <Avatar className="h-8 w-8 border border-primary/20 shadow-[0_0_10px_rgba(var(--color-primary),0.15)] transition-transform hover:scale-105">
                            <AvatarFallback className="bg-primary/10 font-heading font-bold text-primary">
                              {user.email ? user.email.charAt(0).toUpperCase() : "S"}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 border-border/40 bg-background/95 backdrop-blur-md" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm leading-none font-medium text-foreground">My Account</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email || ""}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border/40" />
                        <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 focus:text-primary">
                          <Link to="/editor" className="flex w-full items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Resume Builder</span>
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
                  </div>
                ) : (
                  <Button variant="default" size="sm" asChild className="relative overflow-hidden transition-all">
                    <Link to="/login">
                      <span className="relative z-10 flex items-center gap-2">
                        Sign In
                        <Flame className="h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </header>
  )
}
