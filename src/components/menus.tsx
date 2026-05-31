"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Specs",
    href: "#specs",
    description: "Explore our comprehensive blueprints and technical documentation.",
  },
  {
    title: "Factions",
    href: "#factions",
    description: "Vibrant, accessible color palettes tailored for guild integration.",
  },
  {
    title: "Modules",
    href: "#manifesto",
    description: "Modular, tactical UI blocks for seamless arsenal construction.",
  },
  {
    title: "Holograms",
    href: "#blueprints",
    description: "Stunning UI component showcase for premium visual exploration.",
  },
  {
    title: "Transmissions",
    href: "#runes",
    description: "Engaging field reports and insights for seamless integration.",
  },
  {
    title: "Comms",
    href: "#comms",
    description: "Open a secure channel for inquiries, support, and collaboration.",
  },
]

// Custom Link Component for tactical hover effect
function TacticalLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent text-xs font-mono uppercase tracking-widest hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent relative group cursor-pointer")}>
      <a href={href}>
        {children}
        <span className="absolute bottom-1.5 left-3 right-3 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out shadow-[0_0_8px_var(--color-primary)]" />
      </a>
    </NavigationMenuLink>
  )
}

export function Menus() {
  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem><TacticalLink href="#manifesto">Manifesto</TacticalLink></NavigationMenuItem>
        <NavigationMenuItem><TacticalLink href="#blueprints">Blueprints</TacticalLink></NavigationMenuItem>
        <NavigationMenuItem><TacticalLink href="#arsenal">Arsenal</TacticalLink></NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-xs font-mono uppercase tracking-widest hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent relative group">
            Intel
            <span className="absolute bottom-1.5 left-3 right-8 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out shadow-[0_0_8px_var(--color-primary)]" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2 border border-primary/20 bg-background/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(var(--color-primary),0.1)]">
            <ul className="grid max-w-xl gap-3 md:grid-cols-3 lg:w-3xl">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem><TacticalLink href="#runes">Runes</TacticalLink></NavigationMenuItem>
        <NavigationMenuItem><TacticalLink href="#the-forge">The Forge</TacticalLink></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a className="group p-3 block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-all hover:bg-primary/10 border border-transparent hover:border-primary/20 focus:bg-primary/10 focus:border-primary/20" href={href}>
          <div className="text-sm font-mono tracking-widest uppercase font-bold text-primary group-hover:drop-shadow-[0_0_5px_rgba(var(--color-primary),0.5)] transition-all">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-xs leading-snug font-sans group-hover:text-foreground transition-colors mt-2">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
