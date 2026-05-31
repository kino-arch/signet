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
        <span className="absolute right-3 bottom-1.5 left-3 h-[2px] origin-left scale-x-0 bg-primary shadow-[0_0_8px_var(--color-primary)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
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
          <NavigationMenuTrigger className="group relative bg-transparent font-mono text-xs tracking-widest uppercase hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
            Intel
            <span className="absolute right-8 bottom-1.5 left-3 h-[2px] origin-left scale-x-0 bg-primary shadow-[0_0_8px_var(--color-primary)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="border border-primary/20 bg-background/95 p-2 shadow-[0_10px_40px_rgba(var(--color-primary),0.1)] backdrop-blur-xl">
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
        <a className="group block space-y-1 rounded-md border border-transparent p-3 leading-none no-underline transition-all outline-none select-none hover:border-primary/20 hover:bg-primary/10 focus:border-primary/20 focus:bg-primary/10" href={href}>
          <div className="font-mono text-sm font-bold tracking-widest text-primary uppercase transition-all group-hover:drop-shadow-[0_0_5px_rgba(var(--color-primary),0.5)]">{title}</div>
          <p className="mt-2 line-clamp-2 font-sans text-xs leading-snug text-muted-foreground transition-colors group-hover:text-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
