"use client";

import { NativeUserCard } from "../native-user-card-shadcnui";

export function NativeUserCardDemo() { return (
<div className="flex w-full flex-col items-center gap-8 p-8">
<div className="w-full max-w-[250px]">
<NativeUserCard
          imageSrc="https://github.com/shadcn.png"
          name="shadcn"
          handle="@shadcn"
          href="#"
        />
</div>
</div> ); }

<NativeTooltipProvider>
  <NativeTooltip content="This is a smooth tooltip">
    <NativeButton variant="outline">Default (Blur)</NativeButton>
  </NativeTooltip>
</NativeTooltipProvider>

"use client"

import { NativeLikesCounter, LikeUser } from "../native-likes-counter-shadcnui"
import { cn } from "@/lib/utils" import { useState } from "react"

const USERS = [ { id: "user-1", name: "Nova Studio", avatar:
"https://iimydr2b8o.ufs.sh/f/Zqn6AViLMoTtHnKrXgkK7FlZGQ2nWi4Jzv0TXU9DVkAd5yE1",
}, { id: "user-2", name: "Growth Lab", avatar:
"https://iimydr2b8o.ufs.sh/f/Zqn6AViLMoTtIYuGoisEhfWHMxKLVXD5ouFcBtgk6enZS0OG",
}, { id: "user-3", name: "Personal Workspace", avatar:
"https://iimydr2b8o.ufs.sh/f/Zqn6AViLMoTtqpB1uxNk0UapbrAxOtRg9jDGu8sZzWLf2VM1",
}, ]

function Container({ children, className }: { children: React.ReactNode;
className?: string }) { return ( <div className={cn( "h-[400px] w-full flex
items-center justify-center rounded-xl relative transition-colors", className
)}>
<div className="relative z-10"> {children}
</div>
</div> ) }

export function NativeLikesCounterDefault() { return (
<Container>
<NativeLikesCounter count={128} users={USERS} />
</Container> ) }

export function NativeLikesCounterSubtle() { return (
<Container> <NativeLikesCounter count={42} users={USERS.slice(0, 2)}
variant="subtle" />
</Container> ) }

export function NativeLikesCounterOutline() { return (
<Container>
<NativeLikesCounter count={89} users={USERS} variant="outline" liked />
</Container> ) }

export function NativeLikesCounterGhost() { return (
<Container>
<NativeLikesCounter count={256} users={USERS} variant="ghost" />
</Container> ) }

export function NativeLikesCounterSizes() { return (
<Container>
<div className="flex flex-col gap-8 items-center">
<div className="flex flex-col items-center gap-2">
<span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Small</span>
<NativeLikesCounter count={12} users={USERS.slice(0, 1)} size="sm" />
</div>
<div className="flex flex-col items-center gap-2">
<span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Default</span>
<NativeLikesCounter count={128} users={USERS} size="default" />
</div>
<div className="flex flex-col items-center gap-2">
<span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Large</span>
<NativeLikesCounter count={1024} users={USERS} size="lg" />
</div>
</div>
</Container> ) }

export function NativeLikesCounterInteractive() { const [loadCount,
setLoadCount] = useState(0)

const handleLoadMore = async () => { // Simulate API call await new
Promise(resolve => setTimeout(resolve, 1000)) setLoadCount(prev => prev + 1)

    return [
      {
        id: `extra-${loadCount}-1`,
        name: `User ${10 + loadCount * 2}`,
        avatar: `https://avatar.iran.liara.run/public/${20 + loadCount}`,
      },
      {
        id: `extra-${loadCount}-2`,
        name: `User ${11 + loadCount * 2}`,
        avatar: `https://avatar.iran.liara.run/public/${30 + loadCount}`,
      }
    ] as LikeUser[]

}

return (
<Container>
<div className="flex flex-col items-center gap-4 text-center">
<NativeLikesCounter count={150} users={USERS} hasMore={loadCount < 3}
onLoadMore={handleLoadMore} onLike={() => console.log("Liked!")} />
<p className="text-xs text-muted-foreground max-w-[200px]"> Hover to see popup.
Click "Load more" to fetch additional users (simulated).
</p>
</div>
</Container> ) }

export function NativeLikesCounterDemo() { return <NativeLikesCounterDefault />
}

"use client";

import { NativeButton } from "../native-button-shadcnui"; import { NativeDialog,
NativeDialogContent, NativeDialogDescription, NativeDialogFooter,
NativeDialogHeader, NativeDialogTitle, NativeDialogTrigger, } from
"../native-dialog-shadcnui";

export function NativeDialogDemo() { return (
<NativeDialog>
<NativeDialogTrigger asChild>
<NativeButton>Open Dialog</NativeButton>
</NativeDialogTrigger>
<NativeDialogContent className="sm:max-w-[425px]">
<NativeDialogHeader>
<NativeDialogTitle>Edit Profile</NativeDialogTitle>
<NativeDialogDescription> Make changes to your profile here. Click save when
you're done.
</NativeDialogDescription>
</NativeDialogHeader>
<div className="grid gap-4 py-4">
<div className="grid grid-cols-4 items-center gap-4">
<span className="text-right text-sm font-medium">Name</span>
<input
              className="col-span-3 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-1 focus-visible:ring-ring"
              defaultValue="Pedro Duarte"
            />
</div>
<div className="grid grid-cols-4 items-center gap-4">
<span className="text-right text-sm font-medium">Username</span>
<input
              className="col-span-3 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              defaultValue="@peduarte"
            />
</div>
</div>
<NativeDialogFooter> <NativeButton glow onClick={() => {}}> Save changes
</NativeButton>
</NativeDialogFooter>
</NativeDialogContent>
</NativeDialog> ); }

import { Button, ButtonProps } from "@/components/ui/button"; import { cn } from
"@/lib/utils"; import { motion } from "framer-motion"; import { Chrome, Github,
Linkedin, Triangle, Twitter } from "lucide-react"; import { ReactNode } from
"react";

export type SocialProvider = "github" | "google" | "x" | "vercel" | "linkedin";
export type SocialAnimation = "slide" | "scale" | "glow" | "shine" | "none";

export interface SocialLoginButtonProps extends ButtonProps { provider:
SocialProvider; animation?: SocialAnimation; children?: ReactNode; // Optional,
defaults to "Continue with [Provider]" }

const providerConfig: Record< SocialProvider, { icon: React.ComponentType<{
className?: string }>; label: string; bgClass: string; textClass?: string; }

> = { github: { icon: Github, label: "Verify with Github", bgClass: "bg-black
> text-white hover:bg-black/90 dark:bg-white dark:text-black
> dark:hover:bg-white/90", }, google: { icon: Chrome, label: "Continue with
> Google", bgClass: "bg-white text-black border border-input hover:bg-accent
> hover:text-accent-foreground dark:bg-neutral-900 dark:text-white
> dark:border-neutral-800", }, x: { icon: Twitter, label: "Sign in with X",
> bgClass: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black
> dark:hover:bg-white/90", }, vercel: { icon: Triangle, label: "Continue with
> Vercel", bgClass: "bg-black text-white hover:bg-black/90 dark:bg-white
> dark:text-black dark:hover:bg-white/90", }, linkedin: { icon: Linkedin, label:
> "Connect with LinkedIn", bgClass: "bg-black text-white hover:bg-black/90
> dark:bg-white dark:text-black dark:hover:bg-white/90", }, };

const SocialLoginButton = ({ className, provider, animation = "none", children,
...props }: SocialLoginButtonProps) => { const config =
providerConfig[provider]; const Icon = config.icon;

const baseStyles = cn( "cursor-pointer relative h-12 rounded-md px-8 text-sm
font-medium transition-all w-full md:w-auto min-w-[240px]", config.bgClass,
className );

// Animation variants const getAnimationProps = () => { switch (animation) {
case "scale": return { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 },
}; case "slide": return {}; // Handled via CSS/State inside default: return {
whileTap: { scale: 0.98 }, }; } };

return ( <motion.div {...getAnimationProps()} className="relative group/social
inline-block"> {/* Glow Effect */} {animation === "glow" && (
<div className="absolute inset-0 rounded-md bg-current opacity-0 blur-lg group-hover/social:opacity-40 transition-opacity duration-500 text-inherit" />
)}

      <Button className={cn(baseStyles, "overflow-hidden")} {...props}>
        {/* Shine Effect */}
        {animation === "shine" && (
          <div className="absolute inset-0 -translate-x-full group-hover/social:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 ease-in-out" />
        )}

        <div className="flex items-center justify-center gap-3 w-full relative z-10">
          <motion.span
            className={cn(
              "flex-shrink-0",
              animation === "slide" &&
                "transition-transform duration-300 group-hover/social:-translate-x-1"
            )}
          >
            <Icon className="w-5 h-5" />
          </motion.span>
          <span
            className={cn(
              animation === "slide" &&
                "transition-transform duration-300 group-hover/social:translate-x-1"
            )}
          >
            {children || config.label}
          </span>
        </div>
      </Button>
    </motion.div>

); };

export { SocialLoginButton };

"use client";

import { NativeButton } from "../native-button-shadcnui";

export function NativeButtonDefault() { return
<NativeButton>Click</NativeButton>; }

export function NativeButtonGlow() { return <NativeButton glow>Glow
Effect</NativeButton>; }

export function NativeButtonOutline() { return
<NativeButton variant="outline">Learn More</NativeButton>; }

export function NativeButtonLoading() { return
<NativeButton loading>Processing...</NativeButton>; }

export function NativeButtonDisabled() { return
<NativeButton disabled>Disabled</NativeButton>; }

"use client";

import { NativeTabs } from "../native-tabs-shadcnui";

export function NativeTabsDemo() { return ( <NativeTabs items={[ { id:
"account", label: "Account", content: (
<div className="flex flex-col gap-4">
<h3 className="text-lg font-semibold">Account Settings</h3>
<p className="text-muted-foreground"> Manage your account credentiale here.
</p>
</div> ), }, { id: "notifications", label: "Notifications", content: (
<div className="flex flex-col gap-4">
<h3 className="text-lg font-semibold"> Notification Preferences
</h3>
<p className="text-muted-foreground"> Choose what updates you want.
</p>
</div> ), }, { id: "billing", label: "Billing", content: (
<div className="flex flex-col gap-4">
<h3 className="text-lg font-semibold">Billing Information</h3>
<p className="text-muted-foreground"> View your invoices and manage payment
methods.
</p>
</div> ), }, ]} /> ); }

"use client";

import { cn } from "@/lib/utils"; import { cva, type VariantProps } from
"class-variance-authority"; import { HTMLMotionProps, motion } from
"framer-motion"; import { Sparkles } from "lucide-react"; import React from
"react";

const badgeVariants = cva( "inline-flex items-center rounded-full px-3 py-1
text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2
focus:ring-ring focus:ring-offset-2", { variants: { variant: { default: "border
border-primary/20 bg-primary/10 text-primary hover:bg-primary/20
hover:border-primary/40 hover:shadow-[0_0_10px_rgba(var(--primary),0.1)]",
neutral: "border border-border/40 bg-card/50 text-muted-foreground
backdrop-blur-sm hover:bg-card/80 hover:text-foreground hover:border-border/80",
outline: "text-foreground border border-input bg-background/50 backdrop-blur-sm
hover:bg-accent hover:text-accent-foreground", glass: "bg-white/10
dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10
text-foreground shadow-sm hover:bg-white/20 dark:hover:bg-black/20", glow:
"bg-primary/10 text-primary border border-primary/20
shadow-[0_0_10px_rgba(var(--primary),0.2)]
hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:bg-primary/20
hover:scale-[1.02]", animated: "group gap-2 tracking-widest uppercase border
border-border/60 bg-card/70 text-muted-foreground backdrop-blur
hover:border-primary/60 hover:bg-primary/15 hover:text-primary transition-colors
duration-300", }, size: { sm: "text-[10px] px-2 py-0.5", md: "text-xs px-2.5
py-0.5", lg: "text-sm px-3.5 py-1", }, }, defaultVariants: { variant: "default",
size: "md", }, } );

export interface NativeBadgeProps extends Omit<HTMLMotionProps<"div">, "ref" |
"children">, VariantProps<typeof badgeVariants> { /**

- Whether to animate the badge on mount.
- Default: true _/ animate?: boolean; /_*
- Optional label for the animated variant's secondary tag (e.g., "new", "beta").
- Only applies when variant="animated". _/ tag?: string; /_*
- Optional icon for the animated variant. Defaults to Sparkles.
- Only applies when variant="animated". _/ icon?: React.ReactNode; /_*
- Badge content. */ children?: React.ReactNode; }

function NativeBadge({ className, variant, size, animate = true, tag = "new",
icon, children, ...props }: NativeBadgeProps) { const isAnimated = variant ===
"animated"; const IconElement = icon ??
<Sparkles className="h-3 w-3 text-primary" />;

return ( <motion.div initial={animate ? { opacity: 0, scale: 0.9 } : { opacity:
1, scale: 1 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 260,
damping: 20 }} className={cn(badgeVariants({ variant, size }), className)}
{...props} > {isAnimated && ( <motion.span animate={{ rotate: [0, 15, -15, 0],
opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity, ease:
"easeInOut" }} className="inline-block" aria-hidden > {IconElement}
</motion.span> )} {children} {isAnimated && tag && (
<span className="rounded-full border border-border/40 bg-white/5 px-2 py-0.5 text-[0.6rem] text-muted-foreground transition-colors duration-300 group-hover:border-primary/60 group-hover:bg-primary/25 group-hover:text-primary">
{tag}
</span> )} </motion.div> ); }

export { badgeVariants, NativeBadge };

---
title: Native Counter Up
description: Animated number counter with smooth easing and accessibility support.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeCounterUp } from "@uitripled/react-carbon/src/components/native/native-counter-up-carbon.tsx";

export function NativeCounterUpDemo() {
    return <NativeCounterUp />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-counter-up-carbon
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-counter-up-carbon" title="@uitripled/react-carbon/src/components/native/native-counter-up-carbon.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeCounterUp } from "@uitripled/react-carbon/src/components/native/native-counter-up-carbon.tsx";
```

```tsx showLineNumbers
<NativeCounterUp />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeCounterUp } from "@uitripled/react-carbon/src/components/native/native-counter-up-carbon.tsx";

export function BasicExample() {
    return <NativeCounterUp />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Notification Bell
description: Animated notification bell with badge and ringing effect.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeNotificationBell } from "@uitripled/react-shadcn/src/components/native/native-notification-bell-shadcnui.tsx";

export function NativeNotificationBellDemo() {
    return <NativeNotificationBell />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-notification-bell-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-notification-bell-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-notification-bell-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeNotificationBell } from "@uitripled/react-shadcn/src/components/native/native-notification-bell-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeNotificationBell />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeNotificationBell } from "@uitripled/react-shadcn/src/components/native/native-notification-bell-shadcnui.tsx";

export function BasicExample() {
    return <NativeNotificationBell />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Verified Badge
description: Verified badge component with multiple variants, sizes, and styles including outline and shield designs.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeVerifiedBadge } from "@uitripled/react-shadcn/src/components/native/native-verified-badge-shadcnui.tsx";

export function NativeVerifiedBadgeDemo() {
    return <NativeVerifiedBadge />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-verified-badge-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-verified-badge-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-verified-badge-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeVerifiedBadge } from "@uitripled/react-shadcn/src/components/native/native-verified-badge-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeVerifiedBadge />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeVerifiedBadge } from "@uitripled/react-shadcn/src/components/native/native-verified-badge-shadcnui.tsx";

export function BasicExample() {
    return <NativeVerifiedBadge />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Morphing Button
description: Floating action button that morphs into a menu of actions.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeMorphingButton } from "@uitripled/react-shadcn/src/components/native/native-morphing-button-shadcnui.tsx";

export function NativeMorphingButtonDemo() {
    return <NativeMorphingButton />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-morphing-button-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-morphing-button-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-morphing-button-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeMorphingButton } from "@uitripled/react-shadcn/src/components/native/native-morphing-button-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeMorphingButton />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeMorphingButton } from "@uitripled/react-shadcn/src/components/native/native-morphing-button-shadcnui.tsx";

export function BasicExample() {
    return <NativeMorphingButton />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Liquid Button
description: Button with animated liquid fill effect, progress tracking, and multiple visual variants for engaging interactions.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeLiquidButton } from "@uitripled/react-shadcn/src/components/native/native-liquid-button-shadcnui.tsx";

export function NativeLiquidButtonDemo() {
    return <NativeLiquidButton />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-liquid-button-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-liquid-button-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-liquid-button-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeLiquidButton } from "@uitripled/react-shadcn/src/components/native/native-liquid-button-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeLiquidButton />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeLiquidButton } from "@uitripled/react-shadcn/src/components/native/native-liquid-button-shadcnui.tsx";

export function BasicExample() {
    return <NativeLiquidButton />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Avatar Expand
description: Avatar component that expands to reveal the name on click with smooth animations.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeAvatarExpand } from "@uitripled/react-shadcn/src/components/native/native-avatar-expand-shadcnui.tsx";

export function NativeAvatarExpandDemo() {
    return <NativeAvatarExpand />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-avatar-expand-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-avatar-expand-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-avatar-expand-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeAvatarExpand } from "@uitripled/react-shadcn/src/components/native/native-avatar-expand-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeAvatarExpand />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeAvatarExpand } from "@uitripled/react-shadcn/src/components/native/native-avatar-expand-shadcnui.tsx";

export function BasicExample() {
    return <NativeAvatarExpand />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Avatar With Name
description: Avatar component that displays a name tooltip on hover with directional animations.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeAvatarWithName } from "@uitripled/react-shadcn/src/components/native/native-avatar-with-name-shadcnui.tsx";

export function NativeAvatarWithNameDemo() {
    return <NativeAvatarWithName />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-avatar-with-name-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-avatar-with-name-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-avatar-with-name-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeAvatarWithName } from "@uitripled/react-shadcn/src/components/native/native-avatar-with-name-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeAvatarWithName />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeAvatarWithName } from "@uitripled/react-shadcn/src/components/native/native-avatar-with-name-shadcnui.tsx";

export function BasicExample() {
    return <NativeAvatarWithName />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Image Checkbox
description: Image checkbox component with grayscale filter and checkmark indicator.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeImageCheckbox } from "@uitripled/react-shadcn/src/components/native/native-image-checkbox-shadcnui.tsx";

export function NativeImageCheckboxDemo() {
    return <NativeImageCheckbox />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-image-checkbox-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-image-checkbox-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-image-checkbox-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeImageCheckbox } from "@uitripled/react-shadcn/src/components/native/native-image-checkbox-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeImageCheckbox />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeImageCheckbox } from "@uitripled/react-shadcn/src/components/native/native-image-checkbox-shadcnui.tsx";

export function BasicExample() {
    return <NativeImageCheckbox />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Delete
description: Delete button that expands to show a confirmation button with smooth animations.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeDelete } from "@uitripled/react-shadcn/src/components/native/native-delete-shadcnui.tsx";

export function NativeDeleteDemo() {
    return <NativeDelete />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-delete-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-delete-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-delete-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeDelete } from "@uitripled/react-shadcn/src/components/native/native-delete-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeDelete />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeDelete } from "@uitripled/react-shadcn/src/components/native/native-delete-shadcnui.tsx";

export function BasicExample() {
    return <NativeDelete />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Hover Card
description: Avatar card that expands on hover to reveal profile information with smooth animations.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeHoverCard } from "@uitripled/react-shadcn/src/components/native/native-hover-card-shadcnui.tsx";

export function NativeHoverCardDemo() {
    return <NativeHoverCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-hover-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-hover-card-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-hover-card-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeHoverCard } from "@uitripled/react-shadcn/src/components/native/native-hover-card-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeHoverCard />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeHoverCard } from "@uitripled/react-shadcn/src/components/native/native-hover-card-shadcnui.tsx";

export function BasicExample() {
    return <NativeHoverCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Nested List
description: A nested list component with smooth expand/collapse animations, perfect for file explorers or navigation menus.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeNestedList } from "@uitripled/react-shadcn/src/components/native/native-nested-list-shadcnui.tsx";

export function NativeNestedListDemo() {
    return <NativeNestedList />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-nested-list-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-nested-list-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-nested-list-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeNestedList } from "@uitripled/react-shadcn/src/components/native/native-nested-list-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeNestedList />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeNestedList } from "@uitripled/react-shadcn/src/components/native/native-nested-list-shadcnui.tsx";

export function BasicExample() {
    return <NativeNestedList />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native Profile Notch
description: A dynamic expanding notch component for displaying user profiles with smooth spring animations.
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeProfileNotch } from "@uitripled/react-shadcn/src/components/native/native-profile-notch-shadcnui.tsx";

export function NativeProfileNotchDemo() {
    return <NativeProfileNotch />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-profile-notch-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-profile-notch-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-profile-notch-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeProfileNotch } from "@uitripled/react-shadcn/src/components/native/native-profile-notch-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeProfileNotch />;
```

## Component Details

- **Category**: native

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeProfileNotch } from "@uitripled/react-shadcn/src/components/native/native-profile-notch-shadcnui.tsx";

export function BasicExample() {
    return <NativeProfileNotch />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Stocks Dashboard
description: Interactive stock portfolio dashboard with status cards, data table, and detailed stock information modal
component: true
---

```tsx
"use client";

import * as React from "react";

import { StocksDashboard } from "@/components/components/stocks-dashboard/stocks-dashboard.tsx";

export function StocksDashboardDemo() {
    return <StocksDashboard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/stocks-dashboard
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Stocks Dashboard` component uses the following components. Make sure you
have them installed in your project.

- badge
- card
- dialog

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="stocks-dashboard" title="@/components/components/stocks-dashboard/stocks-dashboard.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { StocksDashboard } from "@/components/components/stocks-dashboard/stocks-dashboard.tsx";
```

```tsx showLineNumbers
<StocksDashboard />;
```

## Component Details

- **Category**: blocks
- **Tags**: dashboard, stocks, table, portfolio, data, modal, shadcn

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- badge
- card
- dialog

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { StocksDashboard } from "@/components/components/stocks-dashboard/stocks-dashboard.tsx";

export function BasicExample() {
    return <StocksDashboard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [badge](/docs/components/badge)
- [card](/docs/components/card)
- [dialog](/docs/components/dialog)

---
title: Dashboard
description: Interactive stock portfolio dashboard with status cards, data table, and detailed stock information modal
component: true
---

```tsx
"use client";

import * as React from "react";

import { Dashboard } from "@uitripled/react-shadcn/src/components/components/stocks-dashboard/dashboard.tsx";

export function DashboardDemo() {
    return <Dashboard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/dashboard-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Dashboard` component uses the following components. Make sure you have them
installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="dashboard-shadcnui" title="@uitripled/react-shadcn/src/components/components/stocks-dashboard/dashboard.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { Dashboard } from "@uitripled/react-shadcn/src/components/components/stocks-dashboard/dashboard.tsx";
```

```tsx showLineNumbers
<Dashboard />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { Dashboard } from "@uitripled/react-shadcn/src/components/components/stocks-dashboard/dashboard.tsx";

export function BasicExample() {
    return <Dashboard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Contact Form
description: Contact form section with animated inputs, validation, and form handling
component: true
---

```tsx
"use client";

import * as React from "react";

import { ContactForm } from "@uitripled/react-shadcn/src/components/sections/contact-form-section.tsx";

export function ContactFormDemo() {
    return <ContactForm />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/contact-form-section-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Contact Form` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="contact-form-section-shadcnui" title="@uitripled/react-shadcn/src/components/sections/contact-form-section.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { ContactForm } from "@uitripled/react-shadcn/src/components/sections/contact-form-section.tsx";
```

```tsx showLineNumbers
<ContactForm />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { ContactForm } from "@uitripled/react-shadcn/src/components/sections/contact-form-section.tsx";

export function BasicExample() {
    return <ContactForm />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Team Section Block
description: Animated team member cards with avatars, roles, and social links
component: true
---

```tsx
"use client";

import * as React from "react";

import { TeamSectionBlock } from "@uitripled/react-shadcn/src/components/sections/team-section-block.tsx";

export function TeamSectionBlockDemo() {
    return <TeamSectionBlock />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/team-section-block-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Team Section Block` component uses the following components. Make sure you
have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="team-section-block-shadcnui" title="@uitripled/react-shadcn/src/components/sections/team-section-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { TeamSectionBlock } from "@uitripled/react-shadcn/src/components/sections/team-section-block.tsx";
```

```tsx showLineNumbers
<TeamSectionBlock />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { TeamSectionBlock } from "@uitripled/react-shadcn/src/components/sections/team-section-block.tsx";

export function BasicExample() {
    return <TeamSectionBlock />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Newsletter Signup Block
description: Animated newsletter subscription form with success state and gradient background
component: true
---

```tsx
"use client";

import * as React from "react";

import { NewsletterSignupBlock } from "@uitripled/react-shadcn/src/components/sections/newsletter-signup-block.tsx";

export function NewsletterSignupBlockDemo() {
    return <NewsletterSignupBlock />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/newsletter-signup-block-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Newsletter Signup Block` component uses the following components. Make sure
you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="newsletter-signup-block-shadcnui" title="@uitripled/react-shadcn/src/components/sections/newsletter-signup-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NewsletterSignupBlock } from "@uitripled/react-shadcn/src/components/sections/newsletter-signup-block.tsx";
```

```tsx showLineNumbers
<NewsletterSignupBlock />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NewsletterSignupBlock } from "@uitripled/react-shadcn/src/components/sections/newsletter-signup-block.tsx";

export function BasicExample() {
    return <NewsletterSignupBlock />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Footer Block
description: Comprehensive footer with links, newsletter signup, social icons, and scroll-to-top
component: true
---

```tsx
"use client";

import * as React from "react";

import { FooterBlock } from "@uitripled/react-shadcn/src/components/sections/footer-block.tsx";

export function FooterBlockDemo() {
    return <FooterBlock />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/footer-block-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Footer Block` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="footer-block-shadcnui" title="@uitripled/react-shadcn/src/components/sections/footer-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { FooterBlock } from "@uitripled/react-shadcn/src/components/sections/footer-block.tsx";
```

```tsx showLineNumbers
<FooterBlock />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { FooterBlock } from "@uitripled/react-shadcn/src/components/sections/footer-block.tsx";

export function BasicExample() {
    return <FooterBlock />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: CTA Hero Block
description: Engaging hero section with email signup, video preview, and social proof
component: true
---

```tsx
"use client";

import * as React from "react";

import { CTAHeroBlock } from "@uitripled/react-shadcn/src/components/sections/cta-hero-block.tsx";

export function CTAHeroBlockDemo() {
    return <CTAHeroBlock />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/cta-hero-block-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `CTA Hero Block` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="cta-hero-block-shadcnui" title="@uitripled/react-shadcn/src/components/sections/cta-hero-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { CTAHeroBlock } from "@uitripled/react-shadcn/src/components/sections/cta-hero-block.tsx";
```

```tsx showLineNumbers
<CTAHeroBlock />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { CTAHeroBlock } from "@uitripled/react-shadcn/src/components/sections/cta-hero-block.tsx";

export function BasicExample() {
    return <CTAHeroBlock />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Notion Blog Page
description: Notion-style publishing playbook with rich text, toggles, and supporting visuals
component: true
---

```tsx
"use client";

import * as React from "react";

import { NotionBlogPage } from "@uitripled/react-shadcn/src/components/sections/notion-blog-page.tsx";

export function NotionBlogPageDemo() {
    return <NotionBlogPage />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/notion-blog-page-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Notion Blog Page` component uses the following components. Make sure you
have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="notion-blog-page-shadcnui" title="@uitripled/react-shadcn/src/components/sections/notion-blog-page.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NotionBlogPage } from "@uitripled/react-shadcn/src/components/sections/notion-blog-page.tsx";
```

```tsx showLineNumbers
<NotionBlogPage />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NotionBlogPage } from "@uitripled/react-shadcn/src/components/sections/notion-blog-page.tsx";

export function BasicExample() {
    return <NotionBlogPage />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Timeline Block
description: Vertical timeline with alternating cards and animated progress line
component: true
---

```tsx
"use client";

import * as React from "react";

import { TimelineBlock } from "@uitripled/react-shadcn/src/components/sections/timeline-block.tsx";

export function TimelineBlockDemo() {
    return <TimelineBlock />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/timeline-block-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Timeline Block` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="timeline-block-shadcnui" title="@uitripled/react-shadcn/src/components/sections/timeline-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { TimelineBlock } from "@uitripled/react-shadcn/src/components/sections/timeline-block.tsx";
```

```tsx showLineNumbers
<TimelineBlock />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { TimelineBlock } from "@uitripled/react-shadcn/src/components/sections/timeline-block.tsx";

export function BasicExample() {
    return <TimelineBlock />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Glassmorphism Portfolio
description: Personal portfolio spotlight with profile portrait, narrative highlights, and animated social links
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassmorphismPortfolio } from "@uitripled/react-shadcn/src/components/sections/glassmorphism-portfolio-block.tsx";

export function GlassmorphismPortfolioDemo() {
    return <GlassmorphismPortfolio />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glassmorphism-portfolio-block-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Glassmorphism Portfolio` component uses the following components. Make sure
you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glassmorphism-portfolio-block-shadcnui" title="@uitripled/react-shadcn/src/components/sections/glassmorphism-portfolio-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassmorphismPortfolio } from "@uitripled/react-shadcn/src/components/sections/glassmorphism-portfolio-block.tsx";
```

```tsx showLineNumbers
<GlassmorphismPortfolio />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassmorphismPortfolio } from "@uitripled/react-shadcn/src/components/sections/glassmorphism-portfolio-block.tsx";

export function BasicExample() {
    return <GlassmorphismPortfolio />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Glassmorphism Product Updates
description: Multi-state changelog cards with glass overlays, status badges, and GitHub integration banner
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassmorphismProductUpdates } from "@uitripled/react-shadcn/src/components/sections/glassmorphism-product-update-block.tsx";

export function GlassmorphismProductUpdatesDemo() {
    return <GlassmorphismProductUpdates />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glassmorphism-product-update-block-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Glassmorphism Product Updates` component uses the following components.
Make sure you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glassmorphism-product-update-block-shadcnui" title="@uitripled/react-shadcn/src/components/sections/glassmorphism-product-update-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassmorphismProductUpdates } from "@uitripled/react-shadcn/src/components/sections/glassmorphism-product-update-block.tsx";
```

```tsx showLineNumbers
<GlassmorphismProductUpdates />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassmorphismProductUpdates } from "@uitripled/react-shadcn/src/components/sections/glassmorphism-product-update-block.tsx";

export function BasicExample() {
    return <GlassmorphismProductUpdates />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: N8N Workflow Block
description: Visual workflow automation builder with animated nodes, connections, and real-time execution monitoring
component: true
---

```tsx
"use client";

import * as React from "react";

import { N8NWorkflowBlock } from "@uitripled/react-shadcn/src/components/sections/n8n-workflow-block.tsx";

export function N8NWorkflowBlockDemo() {
    return <N8NWorkflowBlock />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/n8n-workflow-block-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `N8N Workflow Block` component uses the following components. Make sure you
have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="n8n-workflow-block-shadcnui" title="@uitripled/react-shadcn/src/components/sections/n8n-workflow-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { N8NWorkflowBlock } from "@uitripled/react-shadcn/src/components/sections/n8n-workflow-block.tsx";
```

```tsx showLineNumbers
<N8NWorkflowBlock />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { N8NWorkflowBlock } from "@uitripled/react-shadcn/src/components/sections/n8n-workflow-block.tsx";

export function BasicExample() {
    return <N8NWorkflowBlock />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Interactive Logs Table
description: Observability logs panel with animated filters, search, and expandable rows
component: true
---

```tsx
"use client";

import * as React from "react";

import { InteractiveLogsTable } from "@uitripled/react-shadcn/src/components/sections/interactive-logs-table.tsx";

export function InteractiveLogsTableDemo() {
    return <InteractiveLogsTable />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/interactive-logs-table-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Interactive Logs Table` component uses the following components. Make sure
you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="interactive-logs-table-shadcnui" title="@uitripled/react-shadcn/src/components/sections/interactive-logs-table.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { InteractiveLogsTable } from "@uitripled/react-shadcn/src/components/sections/interactive-logs-table.tsx";
```

```tsx showLineNumbers
<InteractiveLogsTable />;
```

## Component Details

- **Category**: sections

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { InteractiveLogsTable } from "@uitripled/react-shadcn/src/components/sections/interactive-logs-table.tsx";

export function BasicExample() {
    return <InteractiveLogsTable />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Kanban Board
description: Interactive Kanban board with drag-and-drop, glassmorphism styling, and task management features
component: true
---

```tsx
"use client";

import * as React from "react";

import { KanbanBoard } from "@/components/components/kanban/kanban-board.tsx";

export function KanbanBoardDemo() {
    return <KanbanBoard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/kanban-board
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Kanban Board` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="kanban-board" title="@/components/components/kanban/kanban-board.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { KanbanBoard } from "@/components/components/kanban/kanban-board.tsx";
```

```tsx showLineNumbers
<KanbanBoard />;
```

## Component Details

- **Category**: blocks
- **Tags**: kanban, board, drag-drop, task, management, glassmorphism

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { KanbanBoard } from "@/components/components/kanban/kanban-board.tsx";

export function BasicExample() {
    return <KanbanBoard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Conference Ticket
description: Animated conference ticket with glassmorphism effects and holographic details
component: true
---

```tsx
"use client";

import * as React from "react";

import { ConferenceTicket } from "@uitripled/react-shadcn/src/components/sections/conference-ticket.tsx";

export function ConferenceTicketDemo() {
    return <ConferenceTicket />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/conference-ticket-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="conference-ticket-shadcnui" title="@uitripled/react-shadcn/src/components/sections/conference-ticket.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { ConferenceTicket } from "@uitripled/react-shadcn/src/components/sections/conference-ticket.tsx";
```

```tsx showLineNumbers
<ConferenceTicket />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { ConferenceTicket } from "@uitripled/react-shadcn/src/components/sections/conference-ticket.tsx";

export function BasicExample() {
    return <ConferenceTicket />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Theater Ticket
description: Cinematic theater ticket with rip effect and barcode
component: true
---

```tsx
"use client";

import * as React from "react";

import { TheaterTicket } from "@uitripled/react-shadcn/src/components/sections/theater-ticket.tsx";

export function TheaterTicketDemo() {
    return <TheaterTicket />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/theater-ticket-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="theater-ticket-shadcnui" title="@uitripled/react-shadcn/src/components/sections/theater-ticket.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { TheaterTicket } from "@uitripled/react-shadcn/src/components/sections/theater-ticket.tsx";
```

```tsx showLineNumbers
<TheaterTicket />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { TheaterTicket } from "@uitripled/react-shadcn/src/components/sections/theater-ticket.tsx";

export function BasicExample() {
    return <TheaterTicket />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Cinema Ticket
description: Cinematic theater ticket with rip effect and barcode
component: true
---

```tsx
"use client";

import * as React from "react";

import { CinemaTicket } from "@uitripled/react-shadcn/src/components/sections/cinema-ticket.tsx";

export function CinemaTicketDemo() {
    return <CinemaTicket />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/cinema-ticket-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="cinema-ticket-shadcnui" title="@uitripled/react-shadcn/src/components/sections/cinema-ticket.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { CinemaTicket } from "@uitripled/react-shadcn/src/components/sections/cinema-ticket.tsx";
```

```tsx showLineNumbers
<CinemaTicket />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { CinemaTicket } from "@uitripled/react-shadcn/src/components/sections/cinema-ticket.tsx";

export function BasicExample() {
    return <CinemaTicket />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Project Card
description: Glassmorphism project card with links, tags, and hover effects
component: true
---

```tsx
"use client";

import * as React from "react";

import { ProjectCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/project-card.tsx";

export function ProjectCardDemo() {
    return <ProjectCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/project-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="project-card-shadcnui" title="@uitripled/react-shadcn/src/components/components/cards/shadcnui/project-card.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { ProjectCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/project-card.tsx";
```

```tsx showLineNumbers
<ProjectCard />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { ProjectCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/project-card.tsx";

export function BasicExample() {
    return <ProjectCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Glass Blog Card
description: Glassmorphism blog card with image zoom, author info, and read action
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassBlogCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-blog-card.tsx";

export function GlassBlogCardDemo() {
    return <GlassBlogCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glass-blog-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glass-blog-card-shadcnui" title="@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-blog-card.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassBlogCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-blog-card.tsx";
```

```tsx showLineNumbers
<GlassBlogCard />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassBlogCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-blog-card.tsx";

export function BasicExample() {
    return <GlassBlogCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Glass Order Summary
description: Glassmorphism order summary card with item list and checkout button
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassOrderSummary } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-order-summary.tsx";

export function GlassOrderSummaryDemo() {
    return <GlassOrderSummary />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glass-order-summary-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glass-order-summary-shadcnui" title="@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-order-summary.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassOrderSummary } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-order-summary.tsx";
```

```tsx showLineNumbers
<GlassOrderSummary />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassOrderSummary } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-order-summary.tsx";

export function BasicExample() {
    return <GlassOrderSummary />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Glass Checkout Card
description: Glassmorphism checkout card with payment method selector and input fields
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassCheckoutCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-checkout-card.tsx";

export function GlassCheckoutCardDemo() {
    return <GlassCheckoutCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glass-checkout-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glass-checkout-card-shadcnui" title="@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-checkout-card.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassCheckoutCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-checkout-card.tsx";
```

```tsx showLineNumbers
<GlassCheckoutCard />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassCheckoutCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/glass-checkout-card.tsx";

export function BasicExample() {
    return <GlassCheckoutCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Hover Expand Card
description: Card that lifts and expands on hover
component: true
---

```tsx
"use client";

import * as React from "react";

import { HoverExpandCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/hover-expand.tsx";

export function HoverExpandCardDemo() {
    return <HoverExpandCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/hover-expand-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="hover-expand-card-shadcnui" title="@uitripled/react-shadcn/src/components/components/cards/shadcnui/hover-expand.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { HoverExpandCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/hover-expand.tsx";
```

```tsx showLineNumbers
<HoverExpandCard />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { HoverExpandCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/hover-expand.tsx";

export function BasicExample() {
    return <HoverExpandCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Detail Task Card
description: Task management detail panel with animated assignee chips and editor controls
component: true
---

```tsx
"use client";

import * as React from "react";

import { DetailTaskCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/detail-task.tsx";

export function DetailTaskCardDemo() {
    return <DetailTaskCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/detail-task-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="detail-task-card-shadcnui" title="@uitripled/react-shadcn/src/components/components/cards/shadcnui/detail-task.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { DetailTaskCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/detail-task.tsx";
```

```tsx showLineNumbers
<DetailTaskCard />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { DetailTaskCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/detail-task.tsx";

export function BasicExample() {
    return <DetailTaskCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Ecommerce Highlight Card
description: Product spotlight card with blurred border, bundle selector, and fulfillment details
component: true
---

```tsx
"use client";

import * as React from "react";

import { EcommerceHighlightCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/ecommerce-highlight-card.tsx";

export function EcommerceHighlightCardDemo() {
    return <EcommerceHighlightCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/ecommerce-highlight-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="ecommerce-highlight-card-shadcnui" title="@uitripled/react-shadcn/src/components/components/cards/shadcnui/ecommerce-highlight-card.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { EcommerceHighlightCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/ecommerce-highlight-card.tsx";
```

```tsx showLineNumbers
<EcommerceHighlightCard />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { EcommerceHighlightCard } from "@uitripled/react-shadcn/src/components/components/cards/shadcnui/ecommerce-highlight-card.tsx";

export function BasicExample() {
    return <EcommerceHighlightCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Accessible Image Slider Card
description: Image carousel card with keyboard support, reduced motion handling, and screen reader-friendly labels
component: true
---

```tsx
"use client";

import * as React from "react";

import { AccessibleImageSliderCard } from "@/components/components/cards/image-slider-card.tsx";

export function AccessibleImageSliderCardDemo() {
    return <AccessibleImageSliderCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/image-slider-card
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Accessible Image Slider Card` component uses the following components. Make
sure you have them installed in your project.

- button
- card

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="image-slider-card" title="@/components/components/cards/image-slider-card.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { AccessibleImageSliderCard } from "@/components/components/cards/image-slider-card.tsx";
```

```tsx showLineNumbers
<AccessibleImageSliderCard />;
```

## Component Details

- **Category**: cards
- **Tags**: carousel, image, card, accessibility, keyboard

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button
- card

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { AccessibleImageSliderCard } from "@/components/components/cards/image-slider-card.tsx";

export function BasicExample() {
    return <AccessibleImageSliderCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [card](/docs/components/card)

---
title: Cards Slider
description: Liquid smooth draggable cards slider with shadcn/ui styling and framer-motion animations
component: true
---

```tsx
"use client";

import * as React from "react";

import { CardsSlider } from "@/components/components/sliders/cards-slider.tsx";

export function CardsSliderDemo() {
    return <CardsSlider />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/cards-slider
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="cards-slider" title="@/components/components/sliders/cards-slider.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { CardsSlider } from "@/components/components/sliders/cards-slider.tsx";
```

```tsx showLineNumbers
<CardsSlider />;
```

## Component Details

- **Category**: cards
- **Tags**: slider, cards, carousel, framer-motion, shadcn, draggable

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { CardsSlider } from "@/components/components/sliders/cards-slider.tsx";

export function BasicExample() {
    return <CardsSlider />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Native User Card
description: Compact user profile card with avatar, name, handle, and action button with spring animations
component: true
---

```tsx
"use client";

import * as React from "react";

import { NativeUserCard } from "@uitripled/react-shadcn/src/components/native/native-user-card-shadcnui.tsx";

export function NativeUserCardDemo() {
    return <NativeUserCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/native-user-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="native-user-card-shadcnui" title="@uitripled/react-shadcn/src/components/native/native-user-card-shadcnui.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NativeUserCard } from "@uitripled/react-shadcn/src/components/native/native-user-card-shadcnui.tsx";
```

```tsx showLineNumbers
<NativeUserCard />;
```

## Component Details

- **Category**: cards

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NativeUserCard } from "@uitripled/react-shadcn/src/components/native/native-user-card-shadcnui.tsx";

export function BasicExample() {
    return <NativeUserCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Notification Center
description: Multi-variant notification stack with accessible announcements, actions, and motion states
component: true
---

```tsx
"use client";

import * as React from "react";

import { NotificationCenter } from "@/components/components/notifications/notification-center.tsx";

export function NotificationCenterDemo() {
    return <NotificationCenter />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/notification-center
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Notification Center` component uses the following components. Make sure you
have them installed in your project.

- button
- card

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="notification-center" title="@/components/components/notifications/notification-center.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NotificationCenter } from "@/components/components/notifications/notification-center.tsx";
```

```tsx showLineNumbers
<NotificationCenter />;
```

## Component Details

- **Category**: components
- **Tags**: notification, alerts, toast, stack, accessible, shadcn

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button
- card

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NotificationCenter } from "@/components/components/notifications/notification-center.tsx";

export function BasicExample() {
    return <NotificationCenter />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [card](/docs/components/card)

---
title: Weather Dashboard
description: Immersive weather dashboard with hourly charting, weekly outlook, and live air-quality alerts
component: true
---

```tsx
"use client";

import * as React from "react";

import { WeatherDashboard } from "@/components/components/weather/weather-dashboard.tsx";

export function WeatherDashboardDemo() {
    return <WeatherDashboard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/weather-dashboard
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Weather Dashboard` component uses the following components. Make sure you
have them installed in your project.

- badge
- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="weather-dashboard" title="@/components/components/weather/weather-dashboard.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { WeatherDashboard } from "@/components/components/weather/weather-dashboard.tsx";
```

```tsx showLineNumbers
<WeatherDashboard />;
```

## Component Details

- **Category**: components
- **Tags**: weather, dashboard, forecast, charts, environment, data

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- badge
- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { WeatherDashboard } from "@/components/components/weather/weather-dashboard.tsx";

export function BasicExample() {
    return <WeatherDashboard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [badge](/docs/components/badge)
- [button](/docs/components/button)

---
title: Browse Folder
description: Folder browser with animated tabs and content
component: true
---

```tsx
"use client";

import * as React from "react";

import { BrowseFolder } from "@uitripled/react-shadcn/src/components/sections/browse-folder.tsx";

export function BrowseFolderDemo() {
    return <BrowseFolder />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/browse-folder-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Browse Folder` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="browse-folder-shadcnui" title="@uitripled/react-shadcn/src/components/sections/browse-folder.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { BrowseFolder } from "@uitripled/react-shadcn/src/components/sections/browse-folder.tsx";
```

```tsx showLineNumbers
<BrowseFolder />;
```

## Component Details

- **Category**: components

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { BrowseFolder } from "@uitripled/react-shadcn/src/components/sections/browse-folder.tsx";

export function BasicExample() {
    return <BrowseFolder />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Animated List
description: List with staggered item animations
component: true
---

```tsx
"use client";

import * as React from "react";

import { AnimatedList } from "@/components/components/lists/animated-list.tsx";

export function AnimatedListDemo() {
    return <AnimatedList />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/animated-list
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Animated List` component uses the following components. Make sure you have
them installed in your project.

- card

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="animated-list" title="@/components/components/lists/animated-list.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { AnimatedList } from "@/components/components/lists/animated-list.tsx";
```

```tsx showLineNumbers
<AnimatedList />;
```

## Component Details

- **Category**: components
- **Tags**: list, stagger, checkmarks, shadcn

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`

**UI Components**:

- card

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { AnimatedList } from "@/components/components/lists/animated-list.tsx";

export function BasicExample() {
    return <AnimatedList />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [card](/docs/components/card)

---
title: Messenger
description: Glassmorphism messenger workspace with accessible motion and quick replies
component: true
---

```tsx
"use client";

import * as React from "react";

import { Messenger } from "@/components/components/chat/messenger.tsx";

export function MessengerDemo() {
    return <Messenger />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/messenger
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Messenger` component uses the following components. Make sure you have them
installed in your project.

- avatar
- badge
- button
- input
- textarea

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="messenger" title="@/components/components/chat/messenger.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { Messenger } from "@/components/components/chat/messenger.tsx";
```

```tsx showLineNumbers
<Messenger />;
```

## Component Details

- **Category**: components
- **Tags**: chat, messenger, communication, glassmorphism, shadcn

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- avatar
- badge
- button
- input
- textarea

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { Messenger } from "@/components/components/chat/messenger.tsx";

export function BasicExample() {
    return <Messenger />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [avatar](/docs/components/avatar)
- [badge](/docs/components/badge)
- [button](/docs/components/button)
- [input](/docs/components/input)
- [textarea](/docs/components/textarea)

---
title: AI Chat Interface
description: Chat input with attachments, model selector, and accessible controls
component: true
---

```tsx
"use client";

import * as React from "react";

import { AIChatInterface } from "@/components/components/chat/ai-chat-interface.tsx";

export function AIChatInterfaceDemo() {
    return <AIChatInterface />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/ai-chat-interface
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `AI Chat Interface` component uses the following components. Make sure you
have them installed in your project.

- button
- textarea

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="ai-chat-interface" title="@/components/components/chat/ai-chat-interface.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { AIChatInterface } from "@/components/components/chat/ai-chat-interface.tsx";
```

```tsx showLineNumbers
<AIChatInterface />;
```

## Component Details

- **Category**: components
- **Tags**: chat, ai, input, attachments, shadcn

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button
- textarea

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { AIChatInterface } from "@/components/components/chat/ai-chat-interface.tsx";

export function BasicExample() {
    return <AIChatInterface />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [textarea](/docs/components/textarea)

---
title: News Feed
description: Interactive news feed with categories, search, and animated cards
component: true
---

```tsx
"use client";

import * as React from "react";

import { NewsFeed } from "@/components/components/news-feed/news-feed.tsx";

export function NewsFeedDemo() {
    return <NewsFeed />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/news-feed
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `News Feed` component uses the following components. Make sure you have them
installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="news-feed" title="@/components/components/news-feed/news-feed.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { NewsFeed } from "@/components/components/news-feed/news-feed.tsx";
```

```tsx showLineNumbers
<NewsFeed />;
```

## Component Details

- **Category**: components
- **Tags**: news, feed, list, cards, social

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { NewsFeed } from "@/components/components/news-feed/news-feed.tsx";

export function BasicExample() {
    return <NewsFeed />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Comment Thread
description: Nested comment thread with rich interactions and animations
component: true
---

```tsx
"use client";

import * as React from "react";

import { CommentThread } from "@/components/components/comments/comment-thread.tsx";

export function CommentThreadDemo() {
    return <CommentThread />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/comment-thread
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Comment Thread` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="comment-thread" title="@/components/components/comments/comment-thread.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { CommentThread } from "@/components/components/comments/comment-thread.tsx";
```

```tsx showLineNumbers
<CommentThread />;
```

## Component Details

- **Category**: components
- **Tags**: comments, thread, social, discussion, feedback

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { CommentThread } from "@/components/components/comments/comment-thread.tsx";

export function BasicExample() {
    return <CommentThread />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Web Performance Page
description: Real-time analysis of web vitals and performance metrics
component: true
---

```tsx
"use client";

import * as React from "react";

import { WebPerformancePage } from "@/components/web-performance/web-performance-page.tsx";

export function WebPerformancePageDemo() {
    return <WebPerformancePage />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/web-performance-page
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Web Performance Page` component uses the following components. Make sure
you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="web-performance-page" title="@/components/web-performance/web-performance-page.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { WebPerformancePage } from "@/components/web-performance/web-performance-page.tsx";
```

```tsx showLineNumbers
<WebPerformancePage />;
```

## Component Details

- **Category**: components
- **Tags**: performance, web vitals, dashboard, metrics

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { WebPerformancePage } from "@/components/web-performance/web-performance-page.tsx";

export function BasicExample() {
    return <WebPerformancePage />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Course Content Page
description: Interactive course page with video player, instructor details, curriculum sections, and progress tracking
component: true
---

```tsx
"use client";

import * as React from "react";

import { CourseContentPage } from "@/components/components/course-content/course-content-page.tsx";

export function CourseContentPageDemo() {
    return <CourseContentPage />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/course-content-page
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Course Content Page` component uses the following components. Make sure you
have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="course-content-page" title="@/components/components/course-content/course-content-page.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { CourseContentPage } from "@/components/components/course-content/course-content-page.tsx";
```

```tsx showLineNumbers
<CourseContentPage />;
```

## Component Details

- **Category**: components
- **Tags**: course, education, video, instructor, curriculum, learning,
  dashboard

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { CourseContentPage } from "@/components/components/course-content/course-content-page.tsx";

export function BasicExample() {
    return <CourseContentPage />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Blog Typography
description: Beautiful blog post typography with text, links, images, blockquotes, and code examples
component: true
---

```tsx
"use client";

import * as React from "react";

import { BlogTypography } from "@/components/components/blog/blog-typography.tsx";

export function BlogTypographyDemo() {
    return <BlogTypography />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/blog-typography
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Blog Typography` component uses the following components. Make sure you
have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="blog-typography" title="@/components/components/blog/blog-typography.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { BlogTypography } from "@/components/components/blog/blog-typography.tsx";
```

```tsx showLineNumbers
<BlogTypography />;
```

## Component Details

- **Category**: components
- **Tags**: blog, typography, text, article, content, links, images

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { BlogTypography } from "@/components/components/blog/blog-typography.tsx";

export function BasicExample() {
    return <BlogTypography />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Draggable List
description: Reorderable list with drag and drop spring physics
component: true
---

```tsx
"use client";

import * as React from "react";

import { DraggableList } from "@/components/components/lists/draggable-list.tsx";

export function DraggableListDemo() {
    return <DraggableList />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/draggable-list
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Draggable List` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="draggable-list" title="@/components/components/lists/draggable-list.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { DraggableList } from "@/components/components/lists/draggable-list.tsx";
```

```tsx showLineNumbers
<DraggableList />;
```

## Component Details

- **Category**: components
- **Tags**: list, drag, reorder, sortable

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { DraggableList } from "@/components/components/lists/draggable-list.tsx";

export function BasicExample() {
    return <DraggableList />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Glass Sign-In Card
description: Glassmorphic sign-in panel with social auth buttons and email form
component: true
---

```tsx
"use client"

import * as React from "react"

import { GlassSign-InCard } from "@/components/components/forms/glass-sign-in.tsx"

export function GlassSign-InCardDemo() {
  return (
    <GlassSign-InCard />
  )
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glass-sign-in-card
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Glass Sign-In Card` component uses the following components. Make sure you
have them installed in your project.

- button
- checkbox
- input
- label

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glass-sign-in-card" title="@/components/components/forms/glass-sign-in.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassSign-InCard } from "@/components/components/forms/glass-sign-in.tsx"
```

```tsx showLineNumbers
<GlassSign-InCard />;
```

## Component Details

- **Category**: components
- **Tags**: auth, form, sign-in, glassmorphism, shadcn

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button
- checkbox
- input
- label

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client"

import * as React from "react"

import { GlassSign-InCard } from "@/components/components/forms/glass-sign-in.tsx"

export function BasicExample() {
  return (
    <GlassSign-InCard />
  )
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [checkbox](/docs/components/checkbox)
- [input](/docs/components/input)
- [label](/docs/components/label)

---
title: Glass Sign-Up Card
description: Glassmorphic sign-up flow with social providers, email fields, and terms checkbox
component: true
---

```tsx
"use client"

import * as React from "react"

import { GlassSign-UpCard } from "@/components/components/forms/glass-sign-up.tsx"

export function GlassSign-UpCardDemo() {
  return (
    <GlassSign-UpCard />
  )
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glass-sign-up-card
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Glass Sign-Up Card` component uses the following components. Make sure you
have them installed in your project.

- button
- checkbox
- input
- label

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glass-sign-up-card" title="@/components/components/forms/glass-sign-up.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassSign-UpCard } from "@/components/components/forms/glass-sign-up.tsx"
```

```tsx showLineNumbers
<GlassSign-UpCard />;
```

## Component Details

- **Category**: components
- **Tags**: auth, form, sign-up, glassmorphism, shadcn

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button
- checkbox
- input
- label

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client"

import * as React from "react"

import { GlassSign-UpCard } from "@/components/components/forms/glass-sign-up.tsx"

export function BasicExample() {
  return (
    <GlassSign-UpCard />
  )
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [checkbox](/docs/components/checkbox)
- [input](/docs/components/input)
- [label](/docs/components/label)

---
title: Glass Forgot Password Card
description: Reset-password screen with glassmorphic styling and status messaging
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassForgotPasswordCard } from "@/components/components/forms/glass-forgot-password.tsx";

export function GlassForgotPasswordCardDemo() {
    return <GlassForgotPasswordCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glass-forgot-password-card
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Glass Forgot Password Card` component uses the following components. Make
sure you have them installed in your project.

- button
- input
- label

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glass-forgot-password-card" title="@/components/components/forms/glass-forgot-password.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassForgotPasswordCard } from "@/components/components/forms/glass-forgot-password.tsx";
```

```tsx showLineNumbers
<GlassForgotPasswordCard />;
```

## Component Details

- **Category**: components
- **Tags**: auth, form, reset, password, glassmorphism

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button
- input
- label

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassForgotPasswordCard } from "@/components/components/forms/glass-forgot-password.tsx";

export function BasicExample() {
    return <GlassForgotPasswordCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [input](/docs/components/input)
- [label](/docs/components/label)

---
title: Glass Verification Code Card
description: Verification code entry with glassmorphic inputs, status messaging, and reduced-motion support
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassVerificationCodeCard } from "@/components/components/forms/glass-verification-code.tsx";

export function GlassVerificationCodeCardDemo() {
    return <GlassVerificationCodeCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glass-verification-code-card
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Glass Verification Code Card` component uses the following components. Make
sure you have them installed in your project.

- button
- input

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glass-verification-code-card" title="@/components/components/forms/glass-verification-code.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassVerificationCodeCard } from "@/components/components/forms/glass-verification-code.tsx";
```

```tsx showLineNumbers
<GlassVerificationCodeCard />;
```

## Component Details

- **Category**: components
- **Tags**: auth, verification, input, glassmorphism

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button
- input

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassVerificationCodeCard } from "@/components/components/forms/glass-verification-code.tsx";

export function BasicExample() {
    return <GlassVerificationCodeCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [input](/docs/components/input)

---
title: Glass Profile Settings Card
description: Glassmorphic profile settings form with avatar upload, bio, and notification preferences
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassProfileSettingsCard } from "@/components/components/forms/glass-profile-settings.tsx";

export function GlassProfileSettingsCardDemo() {
    return <GlassProfileSettingsCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glass-profile-settings-card
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Glass Profile Settings Card` component uses the following components. Make
sure you have them installed in your project.

- avatar
- badge
- button
- input
- label
- switch
- textarea

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glass-profile-settings-card" title="@/components/components/forms/glass-profile-settings.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassProfileSettingsCard } from "@/components/components/forms/glass-profile-settings.tsx";
```

```tsx showLineNumbers
<GlassProfileSettingsCard />;
```

## Component Details

- **Category**: components
- **Tags**: profile, settings, form, glassmorphism

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- avatar
- badge
- button
- input
- label
- switch
- textarea

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassProfileSettingsCard } from "@/components/components/forms/glass-profile-settings.tsx";

export function BasicExample() {
    return <GlassProfileSettingsCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [avatar](/docs/components/avatar)
- [badge](/docs/components/badge)
- [button](/docs/components/button)
- [input](/docs/components/input)
- [label](/docs/components/label)
- [switch](/docs/components/switch)
- [textarea](/docs/components/textarea)

---
title: Glass Account Settings Card
description: Account management card with subscription overview and billing actions in glassmorphic style
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassAccountSettingsCard } from "@/components/components/forms/glass-account-settings.tsx";

export function GlassAccountSettingsCardDemo() {
    return <GlassAccountSettingsCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glass-account-settings-card
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Glass Account Settings Card` component uses the following components. Make
sure you have them installed in your project.

- badge
- button
- label
- switch

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glass-account-settings-card" title="@/components/components/forms/glass-account-settings.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassAccountSettingsCard } from "@/components/components/forms/glass-account-settings.tsx";
```

```tsx showLineNumbers
<GlassAccountSettingsCard />;
```

## Component Details

- **Category**: components
- **Tags**: account, subscription, billing, form, glassmorphism

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- badge
- button
- label
- switch

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassAccountSettingsCard } from "@/components/components/forms/glass-account-settings.tsx";

export function BasicExample() {
    return <GlassAccountSettingsCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [badge](/docs/components/badge)
- [button](/docs/components/button)
- [label](/docs/components/label)
- [switch](/docs/components/switch)

---
title: Command Palette
description: Command palette with search and keyboard navigation
component: true
---

```tsx
"use client";

import * as React from "react";

import { CommandPalette } from "@/components/search/command-palette.tsx";

export function CommandPaletteDemo() {
    return <CommandPalette />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/command-palette
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Command Palette` component uses the following components. Make sure you
have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="command-palette" title="@/components/search/command-palette.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { CommandPalette } from "@/components/search/command-palette.tsx";
```

```tsx showLineNumbers
<CommandPalette />;
```

## Component Details

- **Category**: components
- **Tags**: command, search, keyboard, shortcuts, shadcn

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { CommandPalette } from "@/components/search/command-palette.tsx";

export function BasicExample() {
    return <CommandPalette />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Multiple Accounts Switcher
description: Glassmorphic account switcher with animated dropdown and accessible listbox controls
component: true
---

```tsx
"use client";

import * as React from "react";

import { MultipleAccountsSwitcher } from "@/components/components/account-switcher/multiple-accounts.tsx";

export function MultipleAccountsSwitcherDemo() {
    return <MultipleAccountsSwitcher />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/multiple-accounts
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Multiple Accounts Switcher` component uses the following components. Make
sure you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="multiple-accounts" title="@/components/components/account-switcher/multiple-accounts.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { MultipleAccountsSwitcher } from "@/components/components/account-switcher/multiple-accounts.tsx";
```

```tsx showLineNumbers
<MultipleAccountsSwitcher />;
```

## Component Details

- **Category**: components
- **Tags**: accounts, dropdown, switcher, glassmorphism

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { MultipleAccountsSwitcher } from "@/components/components/account-switcher/multiple-accounts.tsx";

export function BasicExample() {
    return <MultipleAccountsSwitcher />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Context Menu
description: Right-click context menu with nested items animation
component: true
---

```tsx
"use client";

import * as React from "react";

import { ContextMenu } from "@/components/navigation/context-menu.tsx";

export function ContextMenuDemo() {
    return <ContextMenu />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/context-menu
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Context Menu` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="context-menu" title="@/components/navigation/context-menu.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { ContextMenu } from "@/components/navigation/context-menu.tsx";
```

```tsx showLineNumbers
<ContextMenu />;
```

## Component Details

- **Category**: components
- **Tags**: menu, context, right-click, dropdown

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { ContextMenu } from "@/components/navigation/context-menu.tsx";

export function BasicExample() {
    return <ContextMenu />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Projects Block
description: Animated project card with hover effects, image zoom, and link buttons
component: true
---

```tsx
"use client";

import * as React from "react";

import { ProjectsBlock } from "@uitripled/react-shadcn/src/components/sections/projects-block.tsx";

export function ProjectsBlockDemo() {
    return <ProjectsBlock />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/projects-block-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Projects Block` component uses the following components. Make sure you have
them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="projects-block-shadcnui" title="@uitripled/react-shadcn/src/components/sections/projects-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { ProjectsBlock } from "@uitripled/react-shadcn/src/components/sections/projects-block.tsx";
```

```tsx showLineNumbers
<ProjectsBlock />;
```

## Component Details

- **Category**: components

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { ProjectsBlock } from "@uitripled/react-shadcn/src/components/sections/projects-block.tsx";

export function BasicExample() {
    return <ProjectsBlock />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Interactive Timeline
description: Vertical timeline where elements animate and connect with lines on scroll
component: true
---

```tsx
"use client";

import * as React from "react";

import { InteractiveTimeline } from "@/components/motion-core/interactive-timeline.tsx";

export function InteractiveTimelineDemo() {
    return <InteractiveTimeline />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/interactive-timeline
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Interactive Timeline` component uses the following components. Make sure
you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="interactive-timeline" title="@/components/motion-core/interactive-timeline.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { InteractiveTimeline } from "@/components/motion-core/interactive-timeline.tsx";
```

```tsx showLineNumbers
<InteractiveTimeline />;
```

## Component Details

- **Category**: components
- **Tags**: timeline, scroll, connect, animate

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { InteractiveTimeline } from "@/components/motion-core/interactive-timeline.tsx";

export function BasicExample() {
    return <InteractiveTimeline />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Context Menu Bubble
description: Right-click reveals circular expanding radial menu with icons
component: true
---

```tsx
"use client";

import * as React from "react";

import { ContextMenuBubble } from "@/components/motion-core/context-menu-bubble.tsx";

export function ContextMenuBubbleDemo() {
    return <ContextMenuBubble />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/context-menu-bubble
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Context Menu Bubble` component uses the following components. Make sure you
have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="context-menu-bubble" title="@/components/motion-core/context-menu-bubble.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { ContextMenuBubble } from "@/components/motion-core/context-menu-bubble.tsx";
```

```tsx showLineNumbers
<ContextMenuBubble />;
```

## Component Details

- **Category**: components
- **Tags**: context, menu, radial, bubble, expand

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { ContextMenuBubble } from "@/components/motion-core/context-menu-bubble.tsx";

export function BasicExample() {
    return <ContextMenuBubble />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Expanding Search Dock
description: Minimal search icon that expands into full input with blur
component: true
---

```tsx
"use client";

import * as React from "react";

import { ExpandingSearchDock } from "@/components/motion-core/expanding-search-dock.tsx";

export function ExpandingSearchDockDemo() {
    return <ExpandingSearchDock />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/expanding-search-dock
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Expanding Search Dock` component uses the following components. Make sure
you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="expanding-search-dock" title="@/components/motion-core/expanding-search-dock.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { ExpandingSearchDock } from "@/components/motion-core/expanding-search-dock.tsx";
```

```tsx showLineNumbers
<ExpandingSearchDock />;
```

## Component Details

- **Category**: components
- **Tags**: search, expand, dock, input, blur

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { ExpandingSearchDock } from "@/components/motion-core/expanding-search-dock.tsx";

export function BasicExample() {
    return <ExpandingSearchDock />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: AI Response Typing Stream
description: Character-by-character typing animation with natural pauses and thinking states
component: true
---

```tsx
"use client";

import * as React from "react";

import { AIResponseTypingStream } from "@/components/motion-core/ai-response-typing.tsx";

export function AIResponseTypingStreamDemo() {
    return <AIResponseTypingStream />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/ai-response-typing
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `AI Response Typing Stream` component uses the following components. Make
sure you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="ai-response-typing" title="@/components/motion-core/ai-response-typing.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { AIResponseTypingStream } from "@/components/motion-core/ai-response-typing.tsx";
```

```tsx showLineNumbers
<AIResponseTypingStream />;
```

## Component Details

- **Category**: components
- **Tags**: ai, typing, stream, chatbot, response, animation, text

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { AIResponseTypingStream } from "@/components/motion-core/ai-response-typing.tsx";

export function BasicExample() {
    return <AIResponseTypingStream />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Synced Lyric Captions
description: Bottom-to-top timed captions with play/pause controls and optional audio sync for songs or voiceovers.
component: true
---

```tsx
"use client";

import * as React from "react";

import { SyncedLyricCaptions } from "@/components/motion-core/synced-lyric-captions.tsx";

export function SyncedLyricCaptionsDemo() {
    return <SyncedLyricCaptions />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/synced-lyric-captions
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Synced Lyric Captions` component uses the following components. Make sure
you have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="synced-lyric-captions" title="@/components/motion-core/synced-lyric-captions.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { SyncedLyricCaptions } from "@/components/motion-core/synced-lyric-captions.tsx";
```

```tsx showLineNumbers
<SyncedLyricCaptions />;
```

## Component Details

- **Category**: components
- **Tags**: lyrics, captions, audio, script, timeline, framer-motion, text

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { SyncedLyricCaptions } from "@/components/motion-core/synced-lyric-captions.tsx";

export function BasicExample() {
    return <SyncedLyricCaptions />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Currency Converter Card
description: Finance conversion widget with animated inputs, simulated exchange updates, and contextual feedback
component: true
---

```tsx
"use client";

import * as React from "react";

import { CurrencyConverterCard } from "@uitripled/react-shadcn/src/components/sections/currency-converter-card.tsx";

export function CurrencyConverterCardDemo() {
    return <CurrencyConverterCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/currency-converter-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Currency Converter Card` component uses the following components. Make sure
you have them installed in your project.

- button
- card

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="currency-converter-card-shadcnui" title="@uitripled/react-shadcn/src/components/sections/currency-converter-card.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { CurrencyConverterCard } from "@uitripled/react-shadcn/src/components/sections/currency-converter-card.tsx";
```

```tsx showLineNumbers
<CurrencyConverterCard />;
```

## Component Details

- **Category**: components

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button
- card

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { CurrencyConverterCard } from "@uitripled/react-shadcn/src/components/sections/currency-converter-card.tsx";

export function BasicExample() {
    return <CurrencyConverterCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [card](/docs/components/card)

---
title: Glassmorphism Statistics Card
description: Interactive statistics card with hover reveal and smooth transitions
component: true
---

```tsx
"use client";

import * as React from "react";

import { GlassmorphismStatisticsCard } from "@uitripled/react-shadcn/src/components/sections/glassmorphism-statistics-card.tsx";

export function GlassmorphismStatisticsCardDemo() {
    return <GlassmorphismStatisticsCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/glassmorphism-statistics-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Glassmorphism Statistics Card` component uses the following components.
Make sure you have them installed in your project.

- button
- card

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="glassmorphism-statistics-card-shadcnui" title="@uitripled/react-shadcn/src/components/sections/glassmorphism-statistics-card.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GlassmorphismStatisticsCard } from "@uitripled/react-shadcn/src/components/sections/glassmorphism-statistics-card.tsx";
```

```tsx showLineNumbers
<GlassmorphismStatisticsCard />;
```

## Component Details

- **Category**: components

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button
- card

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GlassmorphismStatisticsCard } from "@uitripled/react-shadcn/src/components/sections/glassmorphism-statistics-card.tsx";

export function BasicExample() {
    return <GlassmorphismStatisticsCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [card](/docs/components/card)

---
title: Floating Chat Widget
description: Floating chat widget with AI agent selection dropdown and animations
component: true
---

```tsx
"use client";

import * as React from "react";

import { FloatingChatWidget } from "@/components/components/chat/floating-chat-widget.tsx";

export function FloatingChatWidgetDemo() {
    return <FloatingChatWidget />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/floating-chat-widget
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Floating Chat Widget` component uses the following components. Make sure
you have them installed in your project.

- button
- select
- avatar

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="floating-chat-widget" title="@/components/components/chat/floating-chat-widget.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { FloatingChatWidget } from "@/components/components/chat/floating-chat-widget.tsx";
```

```tsx showLineNumbers
<FloatingChatWidget />;
```

## Component Details

- **Category**: components
- **Tags**: chat, widget, floating, ai, dropdown, animated

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button
- select
- avatar

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { FloatingChatWidget } from "@/components/components/chat/floating-chat-widget.tsx";

export function BasicExample() {
    return <FloatingChatWidget />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [select](/docs/components/select)
- [avatar](/docs/components/avatar)

---
title: Volume Component
description: A smooth, draggable volume slider component with framer-motion animations and shadcn styling.
component: true
---

```tsx
"use client";

import * as React from "react";

import { VolumeComponent } from "@/components/components/sliders/volume-component.tsx";

export function VolumeComponentDemo() {
    return <VolumeComponent />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/volume-component
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Volume Component` component uses the following components. Make sure you
have them installed in your project.

- button

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="volume-component" title="@/components/components/sliders/volume-component.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { VolumeComponent } from "@/components/components/sliders/volume-component.tsx";
```

```tsx showLineNumbers
<VolumeComponent />;
```

## Component Details

- **Category**: components
- **Tags**: volume, slider, input, framer-motion, shadcn, draggable

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

**UI Components**:

- button

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { VolumeComponent } from "@/components/components/sliders/volume-component.tsx";

export function BasicExample() {
    return <VolumeComponent />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)

---
title: Staggered Text Hero
description: Hero section with staggered text reveal
component: true
---

```tsx
"use client";

import * as React from "react";

import { StaggeredTextHero } from "@/components/page/hero/staggered-text.tsx";

export function StaggeredTextHeroDemo() {
    return <StaggeredTextHero />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/staggered-hero
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="staggered-hero" title="@/components/page/hero/staggered-text.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { StaggeredTextHero } from "@/components/page/hero/staggered-text.tsx";
```

```tsx showLineNumbers
<StaggeredTextHero />;
```

## Component Details

- **Category**: page
- **Tags**: hero, text, stagger

### Technical Specifications

**Dependencies**:

- `framer-motion`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { StaggeredTextHero } from "@/components/page/hero/staggered-text.tsx";

export function BasicExample() {
    return <StaggeredTextHero />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Profile Page
description: User profile with gradient cover, stats, and posts feed
component: true
---

```tsx
"use client";

import * as React from "react";

import { ProfilePage } from "@/components/components/profile/profile-page.tsx";

export function ProfilePageDemo() {
    return <ProfilePage />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/profile-page
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="profile-page" title="@/components/components/profile/profile-page.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { ProfilePage } from "@/components/components/profile/profile-page.tsx";
```

```tsx showLineNumbers
<ProfilePage />;
```

## Component Details

- **Category**: page
- **Tags**: profile, user, social, feed, cover

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { ProfilePage } from "@/components/components/profile/profile-page.tsx";

export function BasicExample() {
    return <ProfilePage />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Hero Section
description: Hero section with staggered text and button reveal
component: true
---

```tsx
"use client";

import * as React from "react";

import { HeroSection } from "@uitripled/react-shadcn/src/components/sections/hero-section.tsx";

export function HeroSectionDemo() {
    return <HeroSection />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/hero-section-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="hero-section-shadcnui" title="@uitripled/react-shadcn/src/components/sections/hero-section.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { HeroSection } from "@uitripled/react-shadcn/src/components/sections/hero-section.tsx";
```

```tsx showLineNumbers
<HeroSection />;
```

## Component Details

- **Category**: page

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { HeroSection } from "@uitripled/react-shadcn/src/components/sections/hero-section.tsx";

export function BasicExample() {
    return <HeroSection />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Accessible Cash Flow Chart
description: Interactive cash flow bar chart with keyboard focus, tooltips, and screen reader support
component: true
---

```tsx
"use client";

import * as React from "react";

import { AccessibleCashFlowChart } from "@uitripled/react-shadcn/src/components/data/charts/cash-flow-chart.tsx";

export function AccessibleCashFlowChartDemo() {
    return <AccessibleCashFlowChart />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/cash-flow-chart
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="cash-flow-chart" title="@uitripled/react-shadcn/src/components/data/charts/cash-flow-chart.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { AccessibleCashFlowChart } from "@uitripled/react-shadcn/src/components/data/charts/cash-flow-chart.tsx";
```

```tsx showLineNumbers
<AccessibleCashFlowChart />;
```

## Component Details

- **Category**: data

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { AccessibleCashFlowChart } from "@uitripled/react-shadcn/src/components/data/charts/cash-flow-chart.tsx";

export function BasicExample() {
    return <AccessibleCashFlowChart />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Interactive Resume Card
description: Professional resume template with animated sections and interactive elements
component: true
---

```tsx
"use client";

import * as React from "react";

import { InteractiveResumeCard } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/resume-card.tsx";

export function InteractiveResumeCardDemo() {
    return <InteractiveResumeCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/resume-card-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="resume-card-shadcnui" title="@uitripled/react-shadcn/src/components/components/resumes/shadcnui/resume-card.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { InteractiveResumeCard } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/resume-card.tsx";
```

```tsx showLineNumbers
<InteractiveResumeCard />;
```

## Component Details

- **Category**: resumes

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { InteractiveResumeCard } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/resume-card.tsx";

export function BasicExample() {
    return <InteractiveResumeCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Professional Resume
description: Clean, formal resume template suitable for corporate applications
component: true
---

```tsx
"use client";

import * as React from "react";

import { ProfessionalResume } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/professional-resume.tsx";

export function ProfessionalResumeDemo() {
    return <ProfessionalResume />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/professional-resume-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="professional-resume-shadcnui" title="@uitripled/react-shadcn/src/components/components/resumes/shadcnui/professional-resume.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { ProfessionalResume } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/professional-resume.tsx";
```

```tsx showLineNumbers
<ProfessionalResume />;
```

## Component Details

- **Category**: resumes

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { ProfessionalResume } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/professional-resume.tsx";

export function BasicExample() {
    return <ProfessionalResume />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Minimal Resume
description: Vercel-inspired minimal resume with clean typography and grid layout
component: true
---

```tsx
"use client";

import * as React from "react";

import { MinimalResume } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/minimal-resume.tsx";

export function MinimalResumeDemo() {
    return <MinimalResume />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/minimal-resume-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="minimal-resume-shadcnui" title="@uitripled/react-shadcn/src/components/components/resumes/shadcnui/minimal-resume.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { MinimalResume } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/minimal-resume.tsx";
```

```tsx showLineNumbers
<MinimalResume />;
```

## Component Details

- **Category**: resumes

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { MinimalResume } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/minimal-resume.tsx";

export function BasicExample() {
    return <MinimalResume />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Standard Resume
description: A standard, professional resume layout with a sidebar, suitable for most industries.
component: true
---

```tsx
"use client";

import * as React from "react";

import { StandardResume } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/standard-resume.tsx";

export function StandardResumeDemo() {
    return <StandardResume />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/standard-resume-shadcnui
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="standard-resume-shadcnui" title="@uitripled/react-shadcn/src/components/components/resumes/shadcnui/standard-resume.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { StandardResume } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/standard-resume.tsx";
```

```tsx showLineNumbers
<StandardResume />;
```

## Component Details

- **Category**: resumes

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { StandardResume } from "@uitripled/react-shadcn/src/components/components/resumes/shadcnui/standard-resume.tsx";

export function BasicExample() {
    return <StandardResume />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Gradient Animation
description: Smoothly transitioning gradient background
component: true
---

```tsx
"use client";

import * as React from "react";

import { GradientAnimation } from "@/components/decorative/backgrounds/gradient-animation.tsx";

export function GradientAnimationDemo() {
    return <GradientAnimation />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/gradient-animation
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="gradient-animation" title="@/components/decorative/backgrounds/gradient-animation.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { GradientAnimation } from "@/components/decorative/backgrounds/gradient-animation.tsx";
```

```tsx showLineNumbers
<GradientAnimation />;
```

## Component Details

- **Category**: decorative
- **Tags**: gradient, background, color

### Technical Specifications

**Dependencies**:

- `framer-motion`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { GradientAnimation } from "@/components/decorative/backgrounds/gradient-animation.tsx";

export function BasicExample() {
    return <GradientAnimation />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Floating Gradient
description: Animated floating gradient background effect
component: true
---

```tsx
"use client";

import * as React from "react";

import { FloatingGradient } from "@/components/decorative/background/floating-gradient.tsx";

export function FloatingGradientDemo() {
    return <FloatingGradient />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/floating-gradient
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="floating-gradient" title="@/components/decorative/background/floating-gradient.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { FloatingGradient } from "@/components/decorative/background/floating-gradient.tsx";
```

```tsx showLineNumbers
<FloatingGradient />;
```

## Component Details

- **Category**: decorative
- **Tags**: gradient, background, floating, animation

### Technical Specifications

**Dependencies**:

- `framer-motion`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { FloatingGradient } from "@/components/decorative/background/floating-gradient.tsx";

export function BasicExample() {
    return <FloatingGradient />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Dynamic Tag Cloud
description: Floating cluster of tags that drift and rearrange when hovered
component: true
---

```tsx
"use client";

import * as React from "react";

import { DynamicTagCloud } from "@/components/motion-core/dynamic-tag-cloud.tsx";

export function DynamicTagCloudDemo() {
    return <DynamicTagCloud />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/dynamic-tag-cloud
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="dynamic-tag-cloud" title="@/components/motion-core/dynamic-tag-cloud.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { DynamicTagCloud } from "@/components/motion-core/dynamic-tag-cloud.tsx";
```

```tsx showLineNumbers
<DynamicTagCloud />;
```

## Component Details

- **Category**: decorative
- **Tags**: tags, cloud, float, drift, interactive

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { DynamicTagCloud } from "@/components/motion-core/dynamic-tag-cloud.tsx";

export function BasicExample() {
    return <DynamicTagCloud />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Animated Quote Block
description: Quote that types itself in, pauses, then subtly breathes
component: true
---

```tsx
"use client";

import * as React from "react";

import { AnimatedQuoteBlock } from "@/components/motion-core/animated-quote-block.tsx";

export function AnimatedQuoteBlockDemo() {
    return <AnimatedQuoteBlock />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/animated-quote-block
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="animated-quote-block" title="@/components/motion-core/animated-quote-block.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { AnimatedQuoteBlock } from "@/components/motion-core/animated-quote-block.tsx";
```

```tsx showLineNumbers
<AnimatedQuoteBlock />;
```

## Component Details

- **Category**: decorative
- **Tags**: quote, typewriter, breathing, pulse

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { AnimatedQuoteBlock } from "@/components/motion-core/animated-quote-block.tsx";

export function BasicExample() {
    return <AnimatedQuoteBlock />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Floating Info Panel
description: Info tooltip that drifts up/down while fading in/out intermittently
component: true
---

```tsx
"use client";

import * as React from "react";

import { FloatingInfoPanel } from "@/components/motion-core/floating-info-panel.tsx";

export function FloatingInfoPanelDemo() {
    return <FloatingInfoPanel />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/floating-info-panel
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="floating-info-panel" title="@/components/motion-core/floating-info-panel.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { FloatingInfoPanel } from "@/components/motion-core/floating-info-panel.tsx";
```

```tsx showLineNumbers
<FloatingInfoPanel />;
```

## Component Details

- **Category**: decorative
- **Tags**: info, tooltip, float, drift, fade

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { FloatingInfoPanel } from "@/components/motion-core/floating-info-panel.tsx";

export function BasicExample() {
    return <FloatingInfoPanel />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Holographic Wall
description: Black wall with Pharaonic hieroglyphs and golden cursor light reflection
component: true
---

```tsx
"use client";

import * as React from "react";

import { HolographicWall } from "@/components/motion-core/holographic-wall.tsx";

export function HolographicWallDemo() {
    return <HolographicWall />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/holographic-wall
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="holographic-wall" title="@/components/motion-core/holographic-wall.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { HolographicWall } from "@/components/motion-core/holographic-wall.tsx";
```

```tsx showLineNumbers
<HolographicWall />;
```

## Component Details

- **Category**: decorative
- **Tags**: holographic, wall, cursor, glow, golden, hieroglyphs, pharaonic

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { HolographicWall } from "@/components/motion-core/holographic-wall.tsx";

export function BasicExample() {
    return <HolographicWall />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

---
title: Wizard Form
description: Multi-step wizard form with animated transitions, validation, and progress tracking
component: true
---

```tsx
"use client";

import * as React from "react";

import { WizardForm } from "@/components/forms/wizard-form.tsx";

export function WizardFormDemo() {
    return <WizardForm />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/wizard-form
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Add the required components to your project.</Step>

The `Wizard Form` component uses the following components. Make sure you have
them installed in your project.

- button
- input
- label

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="wizard-form" title="@/components/forms/wizard-form.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { WizardForm } from "@/components/forms/wizard-form.tsx";
```

```tsx showLineNumbers
<WizardForm />;
```

## Component Details

- **Category**: forms
- **Tags**: form, wizard, multi-step, validation, progress, animated

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

**UI Components**:

- button
- input
- label

This component uses **Framer Motion** for animations and motion effects.

This component is built on top of **shadcn/ui** component primitives.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { WizardForm } from "@/components/forms/wizard-form.tsx";

export function BasicExample() {
    return <WizardForm />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

- [button](/docs/components/button)
- [input](/docs/components/input)
- [label](/docs/components/label)

---
title: Preview Details Card
description: Link card that reveals a smooth detail preview box on hover
component: true
---

```tsx
"use client";

import * as React from "react";

import { PreviewDetailsCard } from "@/components/micro/links/preview-details-card.tsx";

export function PreviewDetailsCardDemo() {
    return <PreviewDetailsCard />;
}
```

## Installation

<CodeTabs>

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @uitripled/preview-details-card
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="preview-details-card" title="@/components/micro/links/preview-details-card.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx showLineNumbers
import { PreviewDetailsCard } from "@/components/micro/links/preview-details-card.tsx";
```

```tsx showLineNumbers
<PreviewDetailsCard />;
```

## Component Details

- **Category**: microinteractions
- **Tags**: link, hover, preview, card, minimal

### Technical Specifications

**Dependencies**:

- `framer-motion`
- `lucide-react`
- `react`

This component uses **Framer Motion** for animations and motion effects.

## Customization

This component can be customized by modifying the following:

- **Styling**: The component uses Tailwind CSS for styling. Customize colors,
  spacing, and other design tokens through Tailwind classes.
- **Props**: Pass custom props to configure the component's behavior and
  appearance.
- **Variants**: Create custom variants by extending the component's base styles.

## Accessibility

The component follows accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Examples

### Basic Example

```tsx
"use client";

import * as React from "react";

import { PreviewDetailsCard } from "@/components/micro/links/preview-details-card.tsx";

export function BasicExample() {
    return <PreviewDetailsCard />;
}
```

## API Reference

This component is part of the UI TripleD component library, a collection of
production-ready components built with Framer Motion, shadcn/ui, and Tailwind
CSS.

## Best Practices

1. **Performance**: Consider lazy loading if used in large lists or
   below-the-fold content.
2. **Theming**: Ensure your theme configuration includes the necessary CSS
   variables.
3. **Testing**: Test keyboard navigation and screen reader compatibility.
4. **Customization**: Use props for configuration rather than modifying source
   code.

## Related Components

No related components.

Install the @efferd/dashboard-1 block into this project.

Steps:

1. Install the shadcn skill if missing: npx skills add shadcn/ui
2. Ensure this is a shadcn project (has components.json). If not, run: npx
   shadcn@latest init
3. Add the @efferd registry to components.json (if missing): { "registries": {
   "@efferd": "https://efferd.com/r/{style}/{name}.json" } }
4. Run: npx shadcn@latest add @efferd/dashboard-1

After install, summarize what was added and any next steps.

Install the @efferd/dashboard-2 block into this project.

Steps:

1. Install the shadcn skill if missing: npx skills add shadcn/ui
2. Ensure this is a shadcn project (has components.json). If not, run: npx
   shadcn@latest init
3. Add the @efferd registry to components.json (if missing): { "registries": {
   "@efferd": "https://efferd.com/r/{style}/{name}.json" } }
4. Run: npx shadcn@latest add @efferd/dashboard-2

After install, summarize what was added and any next steps.

Install the @efferd/dashboard-3 block into this project.

Steps:

1. Install the shadcn skill if missing: npx skills add shadcn/ui
2. Ensure this is a shadcn project (has components.json). If not, run: npx
   shadcn@latest init
3. Add the @efferd registry to components.json (if missing): { "registries": {
   "@efferd": "https://efferd.com/r/{style}/{name}.json" } }
4. Run: npx shadcn@latest add @efferd/dashboard-3

After install, summarize what was added and any next steps.

Install the @efferd/dashboard-4 block into this project.

Steps:

1. Install the shadcn skill if missing: npx skills add shadcn/ui
2. Ensure this is a shadcn project (has components.json). If not, run: npx
   shadcn@latest init
3. Add the @efferd registry to components.json (if missing): { "registries": {
   "@efferd": "https://efferd.com/r/{style}/{name}.json" } }
4. Run: npx shadcn@latest add @efferd/dashboard-4

After install, summarize what was added and any next steps.

Install the @efferd/dashboard-5 block into this project.

Steps:

1. Install the shadcn skill if missing: npx skills add shadcn/ui
2. Ensure this is a shadcn project (has components.json). If not, run: npx
   shadcn@latest init
3. Add the @efferd registry to components.json (if missing): { "registries": {
   "@efferd": "https://efferd.com/r/{style}/{name}.json" } }
4. Run: npx shadcn@latest add @efferd/dashboard-5

After install, summarize what was added and any next steps.

Day Picker Preview Code day-picker.tsx

"use client"; import { Tick02Icon, CodeIcon, UnfoldMoreIcon, } from
"@hugeicons/core-free-icons"; import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react"; import { cn } from "@/lib/utils"; import {
AnimatePresence, motion } from "motion/react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; type options =
"Daily" | "Weekly" | "Monthly" | "Yearly"; // Change Here const options:
options[] = ["Daily", "Weekly", "Monthly", "Yearly"];

const springTransition = { type: "spring", damping: 30, stiffness: 400, mass: 1,
} as const;

export default function TwentyThreeFour() { const [day, setDay] = useState(1);
const [option, setOption] = useState<options>("Daily"); const [isOptionOpen,
setisOptionOpen] = useState(false); const [isSelectorOpen, setIsSelectorOpen] =
useState(true);

return (
<div className="w-full h-full  flex justify-center items-center font-medium text-sm">
<motion.div layout transition={springTransition} className="flex flex-col
gap-1.5 shadow-lg overflow-hidden rounded-3xl bg-muted p-1.5 max-w-xs w-full" >
<div className="flex justify-between items-center relative"> <motion.div layout
animate={{ filter: isOptionOpen ? "blur(8px)" : "blur(0px)", }}
transition={springTransition} className="px-3 text-muted-foreground h-full flex
items-center justify-center py-2 " > Frequency </motion.div> {isOptionOpen ? (
<div className="absolute w-full h-full flex justify-between gap-2 p-0">
<motion.div className="flex justify-between w-full relative items-center
rounded-3xl "> <motion.div layout transition={springTransition}
layoutId="options" className="absolute w-full rounded-3xl bg-background h-full"
></motion.div>

                <div className="flex justify-between px-1">
                  {options.map((op) => {
                    return (
                      <motion.div
                        key={op}
                        layout
                        initial={{
                          filter: "blur(8px)",
                          opacity: 0,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                        }}
                        onClick={() => {
                          setOption(op);
                          setIsSelectorOpen(true);
                        }}
                        className={cn(
                          "px-2 cursor-pointer py-1 rounded-[24px] text-muted-foreground relative transition-colors duration-300",
                          option === op && "text-foreground"
                        )}
                      >
                        {option === op && (
                          <motion.div
                            layoutId="optionToSelect"
                            transition={springTransition}
                            className="w-full h-full absolute inset-0 bg-secondary rounded-3xl"
                          ></motion.div>
                        )}
                        <span className="relative z-10">{op}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
              <AnimatePresence>
                <motion.div
                  key="check-button"
                  layoutId="button"
                  onClick={() => {
                    setisOptionOpen(false);
                    setIsSelectorOpen(false);
                  }}
                  initial={{
                    filter: "blur(1px)",
                    opacity: 0.6,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                  }}
                  exit={{
                    filter: "blur(1px)",
                    opacity: 0.6,
                  }}
                  transition={springTransition}
                  style={{ borderRadius: 24 }}
                  className="bg-primary px-[10px] justify-center text-primary-foreground flex h-full items-center cursor-pointer"
                >
                  <HugeiconsIcon icon={Tick02Icon} size={16} />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              onClick={() => setisOptionOpen(true)}
              className="rounded-full w-fit px-0 p-0 relative flex gap-0 items-center cursor-pointer"
            >
              <motion.div
                layout
                transition={springTransition}
                layoutId="options"
                className="absolute h-full w-full bg-background rounded-[24px]"
              ></motion.div>
              <motion.div
                initial={false}
                className="pl-3 py-0 relative cursor-default text-foreground"
                layoutId={option}
              >
                {option === "Weekly" ? option + ", " + days[day] : option}
              </motion.div>
              <AnimatePresence initial={false}>
                <motion.div
                  key="code-icon"
                  layoutId="button"
                  className="text-muted-foreground justify-center flex items-center w-fit h-fit px-3 pl-2 py-[10px]"
                >
                  <HugeiconsIcon
                    icon={UnfoldMoreIcon}
                    size={14}
                    className="-rotate-90"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
        <AnimatePresence mode="popLayout">
          {isSelectorOpen && option === "Weekly" && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -10,
                filter: "blur(8px)",
              }}
              transition={springTransition}
              className="flex justify-between text-muted-foreground px-2 bg-background overflow-hidden rounded-full py-1"
            >
              {days.map((d, index) => {
                return (
                  <motion.div
                    key={d}
                    layout
                    initial={{
                      filter: "blur(8px)",
                      opacity: 0,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                    }}
                    exit={{
                      filter: "blur(8px)",
                      opacity: 0,
                    }}
                    transition={{
                      ...springTransition,
                      delay: index * 0.03,
                    }}
                    onClick={() => setDay(index)}
                    className={cn(
                      "px-2 py-1 rounded-3xl relative transition-colors duration-300 cursor-pointer",
                      index === day
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="relative z-10">{d}</span>
                    {index === day && (
                      <motion.div
                        transition={springTransition}
                        layoutId="dayOptions"
                        className="absolute h-full w-full bg-secondary inset-0 rounded-3xl "
                      ></motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>

); } Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/day-picker.json" Usage
Customizing Content You can modify the frequency options by updating the options
array:

// Change Here const options = ["Daily", "Weekly", "Monthly", "Yearly"];

import FrequencySelector from "@/components/day-picker"; export default function
Page() { return <FrequencySelector />; } Features Multi-select: Intuitive
selection of multiple days of the week. Compact to Expanded: Collapses into a
summary view and expands for selection. Spring Animations: Smooth resizing and
selection effects. Semantic Design: specifically crafted for recurring schedule
or frequency interfaces. Clear Feedback: Active states distinguish selected days
instantly.

Delete Button Preview Code delete-button.tsx

"use client";

import { Undo03Icon } from "@hugeicons/core-free-icons"; import { HugeiconsIcon
} from "@hugeicons/react"; import { motion, AnimatePresence } from
"motion/react"; import React, { useEffect, useState } from "react";

const DeleteButton = () => { const [isDeleting, setIsDeleting] =
useState(false); const [count, setCount] = useState(10); const [isAnimating,
setIsAnimating] = useState(false);

useEffect(() => { if (!isDeleting) return;

    if (count === 0) return;

    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);

}, [isDeleting, count]);

const handleClick = (newState: boolean) => { if (isAnimating) return;
setIsAnimating(true); setIsDeleting(newState); if (newState) setCount(10);

    // Release lock after animation completes
    setTimeout(() => setIsAnimating(false), 400);

};

// Change Here const deleteText = "Delete Account"; const cancelText = "Cancel
Deletion";

return (
<div className="flex items-center justify-center">
<AnimatePresence mode="popLayout" initial={false}> {!isDeleting ? ( // STATE A
<motion.button key="delete" layoutId="deleteButton" onClick={() =>
handleClick(true)} whileTap={{ scale: 0.95 }} style={{ pointerEvents:
isAnimating ? "none" : "auto" }} initial={{ backgroundColor: "#FFEDF1", filter:
"blur(1px)", opacity: 1, }} animate={{ backgroundColor: "#FE322A", filter:
"blur(0px)", opacity: 1, }} exit={{ backgroundColor: "#FFEDF1", filter:
"blur(1px)", opacity: 0, }} className="text-white px-5 py-3 rounded-full flex
items-center justify-center overflow-hidden" transition={{ layout: { duration:
0.4, ease: [0.77, 0, 0.175, 1] }, backgroundColor: { duration: 0.4, ease:
"easeInOut" }, filter: { duration: 0.1, ease: "easeInOut" }, opacity: {
duration: 0.2, ease: "easeOut" }, }} > <motion.span layoutId="buttonText"
className="flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{
opacity: 0 }} transition={{ duration: 0.1 }} > {deleteText.split("").map((char,
i) => ( <motion.span key={`delete-${i}`} initial={{ y: 20, opacity: 0, scale:
0.3 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -20, opacity: 0,
scale: 0.3 }} transition={{ duration: 0.3, delay: i * 0.005, ease: [0.785,
0.135, 0.15, 0.86], }} style={{ display: "inline-block", whiteSpace: "pre" }} >
{char} </motion.span> ))} </motion.span> </motion.button> ) : ( // STATE B
<motion.button key="cancel" layoutId="deleteButton" onClick={() =>
handleClick(false)} whileTap={{ scale: 0.95 }} style={{ pointerEvents:
isAnimating ? "none" : "auto" }} initial={{ backgroundColor: "#FE322A", filter:
"blur(1px)", opacity: 0, }} animate={{ backgroundColor: "#FFEDF1", filter:
"blur(0px)", opacity: 1, }} exit={{ backgroundColor: "#FE322A", filter:
"blur(1px)", opacity: 0, }} className="px-3 py-3 rounded-full flex items-center
gap-2 overflow-hidden" transition={{ layout: { duration: 0.4, ease: [0.77, 0,
0.175, 1] }, backgroundColor: { duration: 0.4, ease: "easeInOut" }, filter: {
duration: 0.2, ease: "easeInOut" }, opacity: { duration: 0.2, ease: "easeIn" },
}} > <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1,
scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2,
delay: 0.05 }} className="bg-[#FE322A] p-1.5 rounded-full flex items-center
justify-center shrink-0" >
<HugeiconsIcon icon={Undo03Icon} className="h-4 w-4 text-white" /> </motion.div>

            <motion.span
              layoutId="buttonText"
              className="text-[#FE322A] font-medium flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {cancelText.split("").map((char, i) => (
                <motion.span
                  key={`cancel-${i}`}
                  initial={{ y: 20, opacity: 0, scale: 0.3 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.3 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.006,
                    ease: [0.785, 0.135, 0.15, 0.86],
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            <motion.div
              className="bg-[#FE322A] text-white px-4 py-3 rounded-full text-sm font-semibold flex items-center justify-center relative overflow-hidden shrink-0 min-w-[32px]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={count}
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.8,
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.8,
                  }}
                  transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute"
                >
                  {count}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>

); };

export default DeleteButton; Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/delete-button.json" Usage
Customizing Content You can customize the labels by updating the deleteText and
cancelText variables inside the component:

// Change Here const deleteText = "Delete Account"; const cancelText = "Cancel
Deletion";

import DeleteButton from "@/components/delete-button"; export default function
Page() { return <DeleteButton />; } Features Confirmation Timer: Visual
countdown ring prevents accidental deletions. Undo Capability: User can cancel
the action during the countdown phase. State Feedback: Clear visual states for
idle, processing, and completion. Customizable Duration: Easy to adjust the
countdown timer length. Micro-interactions: Subtle scale and color animations
enhance the user experience.

Discrete Tabs Preview Code discrete-tabs.tsx

"use client";

import { SetStateAction, useState, useEffect } from "react"; import { motion,
AnimatePresence } from "motion/react"; import { cn } from "@/lib/utils";

const Calendar: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
className, size = 20, ...props }) => { return ( <svg
xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20
20" className={className} {...props} >
<g fill="currentColor">
<path d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75V12ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10Zm.75 1.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H10ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H12ZM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V12Zm.75 1.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V10Zm.75 1.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H14Z" />
<path
          fillRule="evenodd"
          d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
          clipRule="evenodd"
        />
</g>
</svg> ); };

const Alert: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
className, size = 20, ...props }) => { return ( <svg
xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24
24" className={className} {...props} >
<path
        fill="currentColor"
        d="M17.1 12.6v-1.8A5.4 5.4 0 0 0 13 5.6V3a1 1 0 0 0-2 0v2.4a5.4 5.4 0 0 0-4 5.5v1.8c0 2.4-1.9 3-1.9 4.2c0 .6 0 1.2.5 1.2h13c.5 0 .5-.6.5-1.2c0-1.2-1.9-1.8-1.9-4.2ZM8.8 19a3.5 3.5 0 0 0 6.4 0z"
      />
</svg> ); };

const Inbox: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
className, size = 20, ...props }) => { return ( <svg
xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24
24" className={className} {...props} >
<g id="evaEmailFill0">
<g id="evaEmailFill1">
<path
            id="evaEmailFill2"
            fill="currentColor"
            d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm0 2l-6.5 4.47a1 1 0 0 1-1 0L5 6Z"
          />
</g>
</g>
</svg> ); };

// Change Here const TABS = [ { id: "Inbox", title: "Inbox", icon: Inbox }, {
id: "Planner", title: "Planner", icon: Calendar }, { id: "Alerts", title:
"Alerts", icon: Alert }, ];

export default function DiscreteTabs() { const [activeButton, setActiveButton] =
useState(TABS[0].id); return (
<div className="flex gap-4 items-center"> {TABS.map((tab) => ( <Button
key={tab.id} title={tab.title} ButtonIcon={tab.icon} isActive={activeButton ===
tab.id} setActiveButton={setActiveButton} /> ))}
</div> ); }

function Button({ title, ButtonIcon, isActive, setActiveButton, }: { title:
string; ButtonIcon: React.ComponentType< React.SVGProps<SVGSVGElement> & {
size?: number }

> ; isActive: boolean; setActiveButton: React.Dispatch<SetStateAction<string>>;
> }) { const [showShine, setShowShine] = useState(false); const [isLoaded,
> setIsLoaded] = useState(false);

useEffect(() => { if (isActive && isLoaded) { setShowShine(true); const timer =
setTimeout(() => setShowShine(false), 800); return () => clearTimeout(timer); }
}, [isActive, isLoaded]);

const activeColor = "text-primary";

return ( <motion.div layoutId={"button-id-" + title} transition={{ layout: {
type: "spring", damping: 20, stiffness: 230, mass: 1.2, ease: [0.215, 0.61,
0.355, 1], }, }} onClick={() => { setActiveButton(title), setIsLoaded(true); }}
className="w-fit h-fit flex" style={{ willChange: "transform" }} > <motion.div
layout transition={{ layout: { type: "spring", damping: 20, stiffness: 230,
mass: 1.2, }, }} className={cn( "flex items-center font-mono uppercase gap-1.5
bg-secondary outline outline-2 outline-background overflow-hidden shadow-md
transition-colors duration-75 ease-out p-3 cursor-pointer", isActive &&
activeColor, isActive ? "px-4" : "px-3" )} style={{ borderRadius: "25px", //
paddingTop: "12px", // paddingBottom: "12px", // paddingLeft: isActive ? "15px"
: "12px", // paddingRight: isActive ? "15px" : "12px", }} > <motion.div
layoutId={"icon-id" + title} className="shrink-0" style={{ willChange:
"transform" }} >
<ButtonIcon size={22} /> </motion.div> {isActive && ( <motion.div
className="flex items-center" initial={isLoaded ? { opacity: 0, filter:
"blur(4px)" } : false} animate={{ opacity: 1, filter: "blur(0px)" }}
transition={{ duration: isLoaded ? 0.2 : 0, ease: [0.86, 0, 0.07, 1], }} >
<motion.span layoutId={"text-id-" + title} className="text-sm font-medium
font-mono uppercase whitespace-nowrap relative inline-block" style={{
willChange: "transform" }} > {title} </motion.span> </motion.div> )}
</motion.div> </motion.div> ); } Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/discrete-tabs.json" Usage
Customizing Content You can easily add or remove tabs by modifying the TABS
array at the top of the component:

// Change Here const TABS = [ { id: "Inbox", title: "Inbox", icon: Inbox }, {
id: "Planner", title: "Planner", icon: Calendar }, { id: "Alerts", title:
"Alerts", icon: Alert }, ];

import DiscreteTabs from "@/components/discrete-tabs"; export default function
Page() { return <DiscreteTabs />; } Features Discrete Animations: Subtle motion
effects that provide feedback without distraction. SVG Icons: Lightweight,
scalable icons for clear visual communication. Notification Badge: Support for
unread status indicators or alerts. Visual Polish: High-quality "shiny text"
effects on active states. Minimalist Aesthetic: Clean design suitable for
modern, content-focused interfaces.

Dynamic Toolbar Preview Code dynamic-toolbar.tsx

"use client"; import { delay, motion } from "motion/react"; import React, {
useEffect, useRef, useState } from "react"; import { InboxIcon, Message01Icon,
PaintBoardIcon, Tag01Icon, Image01Icon, Archive02Icon,
ArrowReloadHorizontalIcon, Delete02Icon, ArrowRight01Icon, ArrowLeft01Icon, }
from "@hugeicons/core-free-icons"; import { HugeiconsIcon } from
"@hugeicons/react"; import useMeasure from "@/hooks/use-measure";

const ICON_SIZE = 24;

// Change Here const primaryTools = [ { icon: InboxIcon, label: "Inbox" }, {
icon: Message01Icon, label: "Messages" }, { icon: PaintBoardIcon, label: "Paint"
}, { icon: Tag01Icon, label: "Tags", blur: true }, ];

const secondaryTools = [ { icon: Image01Icon, label: "Image", blur: true }, {
icon: Archive02Icon, label: "Archive" }, { icon: ArrowReloadHorizontalIcon,
label: "Reload", className: "-scale-x-100", }, { icon:
ArrowReloadHorizontalIcon, label: "Reload", className: "-scale-x-100", }, {
icon: Delete02Icon, label: "Delete", className: "text-red-500" }, ];

function ToolbarButton({ icon, size = ICON_SIZE, blur = false, isBlurred =
false, className = "", }: { icon: any; size?: number; blur?: boolean;
isBlurred?: boolean; className?: string; }) { const iconElement = (
<HugeiconsIcon icon={icon} className={`text-foreground ${className}`}
width={size} height={size} /> );

if (blur) { return (
<button className="p-1 rounded-md hover:bg-accent/50 transition-colors hover:cursor-pointer">
<motion.div initial={{ filter: "blur(0px)" }} animate={{ filter: isBlurred ?
"blur(1px)" : "blur(0px)" }} > {iconElement} </motion.div>
</button> ); }

return (
<button className="p-1 rounded-md hover:bg-accent/50 transition-colors hover:cursor-pointer ">
{iconElement}
</button> ); }

function ExtendedToolbar() { const [isExpanded, setIsExpanded] =
useState(false); const [isMounted, setIsMounted] = useState(false); const
[primaryRef, primaryBounds] = useMeasure(); const [secondaryRef,
secondaryBounds] = useMeasure();

useEffect(() => { setIsMounted(true); }, []);

const currentWidth = isExpanded ? secondaryBounds.width : primaryBounds.width;
const hasMeasurements = primaryBounds.width > 0;

const initialWidth = hasMeasurements ? primaryBounds.width : "auto";

const springTransition = { type: "spring" as const, stiffness: 200, damping: 20,
mass: 0.8, bounce: 0.9, duration: isExpanded ? 0.4 : 1.2, delay: isExpanded ? 0
: 0.015, };

return ( <motion.div className="relative h-14 rounded-full bg-muted border
border-border overflow-hidden" initial={{ width: initialWidth }} animate={
hasMeasurements ? { width: currentWidth } : { width: initialWidth } }
transition={isMounted ? springTransition : { duration: 0 }} > <motion.div
className="h-full flex" initial={false} animate={{ x: isExpanded ?
-primaryBounds.width : 0 }} transition={isMounted ? springTransition : {
duration: 0 }} > {/* Primary Tools Panel */} <div ref={primaryRef as
React.RefObject<HTMLDivElement>} className="flex items-center gap-1 p-1.5 pl-3
pr-2 flex-shrink-0" > {primaryTools.map((item, index) => (
<ToolbarButton
              key={index}
              icon={item.icon}
              blur={item.blur}
              isBlurred={isExpanded}
            /> ))} <motion.button whileTap={{ scale: 0.9 }} onClick={() =>
setIsExpanded(true)} className="h-full aspect-square flex justify-center
items-center bg-background rounded-full" >
<HugeiconsIcon
              icon={ArrowRight01Icon}
              className="text-muted-foreground"
              width={24}
              height={24}
            /> </motion.button>
</div>

        {/* Secondary Tools Panel */}
        <div
          ref={secondaryRef as React.RefObject<HTMLDivElement>}
          className="flex items-center gap-1 p-1.5 pl-2 pr-3 flex-shrink-0"
          style={{
            position: isExpanded ? "relative" : "absolute",
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? "auto" : "none",
          }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(false)}
            className="h-full aspect-square flex justify-center items-center bg-background rounded-full"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              className="text-muted-foreground"
              width={24}
              height={24}
            />
          </motion.button>
          {secondaryTools.map((item, index) => (
            <ToolbarButton
              key={index}
              icon={item.icon}
              blur={item.blur}
              isBlurred={!isExpanded}
              className={item.className}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>

); }

export default ExtendedToolbar; Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/dynamic-toolbar.json" Usage
Customizing Content You can easily modify the available tools by updating the
primaryTools and secondaryTools arrays at the top of the file:

// Change Here const primaryTools = [ { icon: InboxIcon, label: "Inbox" }, {
icon: Message01Icon, label: "Messages" }, // ... ];

import ExpandedToolbar from "@/components/dynamic-toolbar"; export default
function Page() { return (
<div className="flex items-center justify-center h-[200px] w-full">
<ExpandedToolbar />
</div> ); } Features Spring animations - Smooth, natural-feeling transitions
using Framer Motion springs Dynamic width - Toolbar width adjusts based on the
active panel using useMeasure Blur effect - Icons blur when transitioning
between panels for a polished feel Two-panel design - Primary and secondary tool
sets with navigation buttons

Folder Interaction Note: The backdrop blur effect may not appear in this
documentation preview due to MDX rendering limitations. However, when you
install and use this component in your project, the blur effect will work
correctly. View demo video → to see the full effect with blur.

Preview Code folder-interaction.tsx

"use client"; import { motion } from "motion/react"; import { useState } from
"react";

function FolderInteraction() { const [isOpen, setIsOpen] = useState(false);

const pageVariants = { spring: { type: "spring" as const, duration: 0.6 }, };

return (
<div className="w-full  flex justify-center items-center"> <div onClick={() =>
setIsOpen(!isOpen)} className="w-80 h-52 relative wrapper" > <div
className="folder relative w-[87.5%] mx-auto items-center h-full flex
justify-center " style={{ background: "#18151B", boxShadow: "0px 0px
15.699999809265137px 16px rgba(79, 73, 85, 0.30) inset", borderRadius: 10, }} >
{[ { initial: { rotate: -3, x: -38, y: 2 }, open: { rotate: -8, x: -70, y: -55
}, transition: { ...pageVariants.spring, bounce: 0.15, stiffness: 160, damping:
22, }, className: "z-10 shadow-md", }, { initial: { rotate: 0, x: 0, y: 0 },
open: { rotate: 1, x: 2, y: -75 }, transition: { ...pageVariants.spring,
duration: 0.55, bounce: 0.12, stiffness: 190, damping: 24, }, className: "z-20
shadow-lg", }, { initial: { rotate: 3.5, x: 42, y: 1 }, open: { rotate: 9, x:
75, y: -60 }, transition: { ...pageVariants.spring, duration: 0.58, bounce:
0.17, stiffness: 170, damping: 21, }, className: "z-10 shadow-md", },
].map((page, i) => ( <motion.div key={i} initial={page.initial} animate={isOpen
? page.open : page.initial} transition={page.transition}
className={`absolute top-2 w-32 h-fit rounded-xl ${page.className}`} >
<Page /> </motion.div> ))}
</div>

        <motion.div
          animate={{ rotateX: isOpen ? -40 : 0 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="absolute -left-[1px] -right-[1px] -bottom-[1px] z-20 h-44 rounded-3xl origin-bottom flex justify-center items-center overflow-visible"
        >
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 235 121"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <foreignObject x="-13" y="-13" width="262.4" height="148.4">
              <div
                style={{
                  backdropFilter: "blur(6.5px)",
                  clipPath: "url(#bgblur_0_1_106_clip_path)",
                  height: "100%",
                  width: "100%",
                }}
              ></div>
            </foreignObject>
            <path
              id="Vector"
              data-figma-bg-blur-radius="13"
              d="M104.615 0.350494L33.1297 0.838776C32.7542 0.841362 32.3825 0.881463 32.032 0.918854C31.6754 0.956907 31.3392 0.992086 31.0057 0.992096H31.0047C30.6871 0.99235 30.3673 0.962051 30.0272 0.929596C29.6927 0.897686 29.3384 0.863802 28.9803 0.866119L13.2693 0.967682H13.2527L13.2352 0.969635C13.1239 0.981406 13.0121 0.986674 12.9002 0.986237H9.91388C8.33299 0.958599 6.76052 1.22345 5.27423 1.76651H5.27325C4.33579 2.11246 3.48761 2.66213 2.7879 3.37393L2.49689 3.68839L2.492 3.69424C1.62667 4.73882 1.00023 5.96217 0.656067 7.27725C0.653324 7.28773 0.654065 7.29886 0.652161 7.30948C0.3098 8.62705 0.257231 10.0048 0.499817 11.3446L12.2147 114.399L12.2156 114.411L12.2176 114.423C12.6046 116.568 13.7287 118.508 15.3934 119.902C17.058 121.297 19.1572 122.056 21.3231 122.049V122.05H215.379C217.76 122.02 220.064 121.192 221.926 119.698V119.697C223.657 118.384 224.857 116.485 225.305 114.35L225.307 114.339L235.914 53.3798L235.968 53.1093L235.97 53.0985L235.971 53.0888C236.134 51.8978 236.044 50.685 235.705 49.5321C235.307 48.1669 234.63 46.9005 233.717 45.8144L233.383 45.4296C232.58 44.5553 231.614 43.8449 230.539 43.3398C229.311 42.7628 227.971 42.4685 226.616 42.4774H146.746C144.063 42.4705 141.423 41.8004 139.056 40.5263C136.691 39.2522 134.671 37.4127 133.175 35.1689L113.548 5.05948L113.544 5.05362L113.539 5.04776C112.545 3.65165 111.238 2.51062 109.722 1.72061C108.266 0.886502 106.627 0.422235 104.952 0.365143V0.364166L104.633 0.350494H104.615Z"
              fill="url(#paint0_linear_1_106)"
              fillOpacity="0.3"
              stroke="url(#paint1_linear_1_106)"
              strokeWidth="0.7"
            />
            <defs>
              <clipPath
                id="bgblur_0_1_106_clip_path"
                transform="translate(13 13)"
              >
                <path d="M104.615 0.350494L33.1297 0.838776C32.7542 0.841362 32.3825 0.881463 32.032 0.918854C31.6754 0.956907 31.3392 0.992086 31.0057 0.992096H31.0047C30.6871 0.99235 30.3673 0.962051 30.0272 0.929596C29.6927 0.897686 29.3384 0.863802 28.9803 0.866119L13.2693 0.967682H13.2527L13.2352 0.969635C13.1239 0.981406 13.0121 0.986674 12.9002 0.986237H9.91388C8.33299 0.958599 6.76052 1.22345 5.27423 1.76651H5.27325C4.33579 2.11246 3.48761 2.66213 2.7879 3.37393L2.49689 3.68839L2.492 3.69424C1.62667 4.73882 1.00023 5.96217 0.656067 7.27725C0.653324 7.28773 0.654065 7.29886 0.652161 7.30948C0.3098 8.62705 0.257231 10.0048 0.499817 11.3446L12.2147 114.399L12.2156 114.411L12.2176 114.423C12.6046 116.568 13.7287 118.508 15.3934 119.902C17.058 121.297 19.1572 122.056 21.3231 122.049V122.05H215.379C217.76 122.02 220.064 121.192 221.926 119.698V119.697C223.657 118.384 224.857 116.485 225.305 114.35L225.307 114.339L235.914 53.3798L235.968 53.1093L235.97 53.0985L235.971 53.0888C236.134 51.8978 236.044 50.685 235.705 49.5321C235.307 48.1669 234.63 46.9005 233.717 45.8144L233.383 45.4296C232.58 44.5553 231.614 43.8449 230.539 43.3398C229.311 42.7628 227.971 42.4685 226.616 42.4774H146.746C144.063 42.4705 141.423 41.8004 139.056 40.5263C136.691 39.2522 134.671 37.4127 133.175 35.1689L113.548 5.05948L113.544 5.05362L113.539 5.04776C112.545 3.65165 111.238 2.51062 109.722 1.72061C108.266 0.886502 106.627 0.422235 104.952 0.365143V0.364166L104.633 0.350494H104.615Z" />
              </clipPath>
              <linearGradient
                id="paint0_linear_1_106"
                x1="114.7"
                y1="0.700104"
                x2="114.7"
                y2="121.7"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2D2535" />
                <stop offset="1" stopColor="#2A2A2A" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1_106"
                x1="114.7"
                y1="0.700104"
                x2="114.7"
                y2="121.7"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#424242" stopOpacity="0.04" />
                <stop offset="1" stopColor="#212121" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </div>

); }

export default FolderInteraction;

const Page = () => (

<div className="w-full h-full bg-gradient-to-b from-[#E8E7F0] to-[#DCDAE8] rounded-xl shadow-lg p-3 sm:p-4">
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <div className="w-full h-1 sm:h-1.5 bg-[#CFCDE0] rounded-full" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-1.5 sm:gap-2">
          <div className="flex-1 h-1 sm:h-1.5 bg-[#CFCDE0] rounded-full" />
          <div className="flex-1 h-1 sm:h-1.5 bg-[#CFCDE0] rounded-full" />
        </div>
      ))}
    </div>
  </div>
);
Installation
CLI
Manual

npx shadcn@latest add "https://uselayouts.com/r/folder-interaction.json" Usage

import FolderInteraction from "@/components/folder-interaction"; export default
function Page() { return (
<div className="flex items-center justify-center min-h-[400px] w-full">
<FolderInteraction />
</div> ); } Features 3D folder opening - Realistic folder flip animation with
perspective Document fan-out - Three documents spread out with staggered spring
animations Glassmorphism - Frosted glass effect on the folder front using
backdrop blur Click to toggle - Simple click interaction to open/close the
folder SVG folder design - Custom SVG folder shape with gradient fills Important
Note The backdrop blur effect uses CSS backdrop-filter which may not render
correctly in MDX documentation previews due to browser security restrictions
with SVG foreignObject elements. When you install this component in your
project, the blur effect will work perfectly.

For the best experience, check out the live demo to see the component with full
blur effects.

Inline Edit Preview Code inline-edit.tsx

"use client";

import { AnimatePresence, motion } from "motion/react"; import { useRef,
useState } from "react"; import { Edit01Icon, Tick02Icon } from
"@hugeicons/core-free-icons"; import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input"; import { cn } from "@/lib/cn";

function SaveInput() { const [isEditing, setIsEditing] = useState(false); const
[value, setValue] = useState("this.urvish");

const inputRef = useRef<HTMLInputElement>(null);

return (
<div className="w-full flex justify-center items-center text-xl"> <motion.div
layout initial={{ boxShadow: "0px 0px 2px hsl(var(--foreground) / 0.1)", }}
animate={{ boxShadow: isEditing ? " none border border-foreground" : "0px 0px
2px hsl(var(--foreground) / 0.1)", }} className={cn( "flex items-center relative
overflow-hidden border-2 bg-background", isEditing && "outline-none ring-2
ring-ring ring-offset-2 ring-offset-background" )} style={{ borderRadius: 60 }}
> <Input ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)}
readOnly={!isEditing} className={cn( "h-12 border-0 shadow-none
focus-visible:ring-0 bg-transparent p-0 text-base w-full min-w-32 pl-4 pr-12",
isEditing ? "text-foreground" : "text-muted-foreground" )}
placeholder="username" />
<AnimatePresence initial={false}> {!isEditing ? ( <motion.span key="pen"
layout="position" initial={{ x: 50 }} animate={{ x: 0 }} exit={{ x: 50 }}
transition={{ type: "spring", bounce: 0.1 }} onClick={() => {
setIsEditing(true);

                if (inputRef.current) inputRef.current.select();
              }}
              className="absolute right-1 flex items-center justify-center h-10 w-10 rounded-full bg-card/80 border border-[0.2px] hover:bg-card cursor-pointer text-muted-foreground"
            >
              <HugeiconsIcon icon={Edit01Icon} size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="check"
              layout="position"
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              exit={{ x: 50 }}
              transition={{ type: "spring", bounce: 0.1 }}
              onClick={() => setIsEditing(false)}
              className="absolute z-20 right-1 flex items-center justify-center h-10 w-10 rounded-full border-[0.2px]  bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground"
            >
              <HugeiconsIcon icon={Tick02Icon} size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>

); }

export default SaveInput; Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/inline-edit.json" Usage

import SaveInput from "@/components/inline-edit"; export default function Page()
{ return <SaveInput />; } Features Read/Edit Modes: Distinct visual states for
viewing and editing content. Seamless Transition: Smooth morphing animation
between text display and input field. Contextual Actions: Edit and Save buttons
appear only when relevant. Focus Management: Automatically focuses the input
field when entering edit mode. Visual Feedback: Ring and shadow effects indicate
active editing state.

Filter Interaction Preview Code list-item.tsx

"use client"; import { motion, MotionConfig } from "motion/react"; import {
Dispatch, SetStateAction, useState } from "react"; import clsx from "clsx";

import { Appointment01Icon, BalloonsIcon, GoogleMapsIcon, ZoomIcon,
ReminderIcon, TaskDaily01Icon, Tick02Icon, FilterHorizontalIcon, } from
"@hugeicons/core-free-icons"; import { HugeiconsFreeIcons } from
"@hugeicons/core-free-icons"; import { HugeiconsIcon } from "@hugeicons/react";

export type FilterKey = (typeof filterKeys)[number];

// Change Here export const filterKeys = [ { name: "tasks", Icon: ({ size }: {
size: number }) => (
<HugeiconsIcon icon={TaskDaily01Icon} size={size} /> ), }, { name: "events",
Icon: ({ size }: { size: number }) => (
<HugeiconsIcon icon={GoogleMapsIcon} size={size} /> ), }, { name: "reminders",
Icon: ({ size }: { size: number }) => (
<HugeiconsIcon icon={ReminderIcon} size={size} /> ), }, { name: "appointments",
Icon: ({ size }: { size: number }) => (
<HugeiconsIcon icon={Appointment01Icon} size={size} /> ), }, { name: "meetings",
Icon: ({ size }: { size: number }) => (
<HugeiconsIcon icon={ZoomIcon} size={size} /> ), }, { name: "celebrations",
Icon: ({ size }: { size: number }) => (
<HugeiconsIcon icon={BalloonsIcon} size={size} /> ), }, ];

function ListItem(props: { index: number; filterKey: FilterKey;
selectedFilterKey: FilterKey; setSelectedFilterKey:
Dispatch<SetStateAction<FilterKey>>; setIsOpened:
Dispatch<SetStateAction<boolean>>; }) { const { index, filterKey,
selectedFilterKey, setSelectedFilterKey, setIsOpened, } = props; const delay =
(index + 8) * 0.025;

return ( <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0
}} transition={{ type: "spring", bounce: 0.1, duration: 0.25, delay, ease:
[0.215, 0.61, 0.355, 1], }} onClick={() => { setSelectedFilterKey(filterKey);

        setTimeout(() => {
          setIsOpened(false);
        }, 150);
      }}
      className="px-3 py-2 rounded-2xl flex justify-between items-center cursor-default hover:bg-accent  text-foreground"
    >
      <div className="flex items-center gap-x-3">
        <span className="text-muted-foreground">
          <filterKey.Icon size={24} />
        </span>
        <span className="capitalize">{filterKey.name}</span>
      </div>
      <div
        className={clsx(
          "relative border-border w-6 h-6 overflow-hidden rounded-full",
          selectedFilterKey.name == filterKey.name
            ? "border-none"
            : "border-[2px]"
        )}
      >
        {selectedFilterKey.name == filterKey.name && (
          <div className="absolute inset-0 bg-primary flex justify-center items-center text-primary-foreground">
            <HugeiconsIcon icon={Tick02Icon} size={16} />
          </div>
        )}
      </div>
    </motion.div>

); }

const FilterInteraction = () => { const [selectedFilterKey,
setSelectedFilterKey] = useState(filterKeys[0]); const [isOpened, setIsOpened] =
useState(false);

return (
<section className="flex justify-center items-center fill-muted-foreground/70">
<MotionConfig transition={{ type: "spring", duration: 0.85, bounce: 0.35 }} >
<div onClick={() => setIsOpened(true)} className="relative left-2.5 w-20 h-20
flex justify-center items-center" >
<HugeiconsIcon
            icon={FilterHorizontalIcon}
            className="text-foreground relative z-10 fill-none"
            size={36}
          /> <motion.div layoutId="wrapper" className="absolute inset-0 z-[2]
bg-background border-border" style={{ borderRadius: 40, borderWidth: 1 }} />
</div> <motion.div initial={{ x: 0 }} animate={{ x: isOpened ? -20 : 0, //
transition: { delay: isOpened ? 0 : 0.2 }, }} transition={{ type: "spring",
bounce: 0.3, duration: 1.5 }} className="relative right-2.5 w-20 h-20 border
border-border rounded-full flex justify-center items-center bg-background" >
<span className="text-muted-foreground"> <selectedFilterKey.Icon size={36} />
</span> </motion.div>

        {isOpened && (
          <motion.section
            layoutId="wrapper"
            className="absolute z-20 w-72 px-1 py-1 bg-card border border-border text-xl overflow-hidden "
            style={{ borderRadius: 20, borderWidth: 1 }}
          >
            <div className="flex flex-col gap-1">
              {filterKeys.map((item, index) => (
                <ListItem
                  key={item.name}
                  index={index}
                  filterKey={item}
                  selectedFilterKey={selectedFilterKey}
                  setSelectedFilterKey={setSelectedFilterKey}
                  setIsOpened={setIsOpened}
                />
              ))}
            </div>
          </motion.section>
        )}
      </MotionConfig>
    </section>

); };

export default FilterInteraction; Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/list-item.json" Usage
Customizing Content You can easily add or remove filter options by modifying the
filterKeys array:

// Change Here export const filterKeys = [ { name: "tasks", icon: FolderIcon, },
// ... ];

import FilterInteraction from "@/components/filter-interaction"; export default
function Page() { return (
<div className="flex items-center justify-center h-[400px] w-full">
<FilterInteraction />
</div> ); } Features Shared layout animation - Morphing container using Framer
Motion's layoutId Staggered list items - Each filter option animates in with a
calculated delay Selection indicator - Checkmark appears on selected item with
primary color Two-button design - Filter button and selected value displayed
side by side Spring physics - Natural-feeling animations with configurable
bounce and duration Hover states - Subtle accent background on hover for better
feedback

Magnified Bento Preview Code magnified-bento.tsx

"use client"; import React from "react"; import { HugeiconsIcon } from
"@hugeicons/react"; import { Search01Icon, UserGroupIcon, HierarchyIcon,
UserIcon, RotateLeftIcon, Settings02Icon, CpuIcon, CodeIcon, Chart01Icon,
FlashIcon, Link01Icon, SmartPhone01Icon, CloudIcon, DatabaseIcon, LockIcon, }
from "@hugeicons/core-free-icons"; import { motion, useMotionValue,
useMotionTemplate } from "motion/react"; import { cn } from "@/lib/utils";

// change here const TAG_ROWS = [ [ { id: "discovery", icon: Search01Icon,
label: "Discovery" }, { id: "client-review", icon: UserGroupIcon, label: "Client
Review" }, { id: "system-design", icon: HierarchyIcon, label: "System Design" },
{ id: "devops-integration", icon: UserIcon, label: "DevOps Integration" }, { id:
"post-launch", icon: RotateLeftIcon, label: "Post-Launch Support" }, ], [ { id:
"qa-optimization", icon: Settings02Icon, label: "QA & Optimization" }, { id:
"launch-deploy", icon: CpuIcon, label: "Launch & Deploy" }, { id: "full-stack",
icon: CodeIcon, label: "Full-Stack Development" }, { id: "analytics", icon:
Chart01Icon, label: "Analytics" }, { id: "mvp-engineering", icon: FlashIcon,
label: "MVP Engineering" }, ], [ { id: "api-backend", icon: Link01Icon, label:
"API & Backend" }, { id: "mobile-dev", icon: SmartPhone01Icon, label: "Mobile
Development" }, { id: "cloud-infrastructure", icon: CloudIcon, label: "Cloud
Infrastructure", }, { id: "database-design", icon: DatabaseIcon, label:
"Database Design" }, { id: "security", icon: LockIcon, label: "Security" }, ],
];

// change here const CONFIG = { title: "Intelligent Workflows", description:
"Automatically categorize and search through your team's diverse skillsets and
project phases with contextual awareness.", containerHeight: "h-[200px]
sm:h-[240px]", lensSize: 92, };

const MagnifiedBento = () => { const containerRef =
React.useRef<HTMLDivElement>(null); const lensX = useMotionValue(0); const lensY
= useMotionValue(0);

const clipPath =
useMotionTemplate`circle(30px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px))`;
const inverseMask =
useMotionTemplate`radial-gradient(circle 30px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px), transparent 100%, black 100%)`;

return (
<div className="flex items-center justify-center p-4 sm:p-6 w-full not-prose">
<div className="group relative w-full max-w-[420px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border bg-card p-1.5 sm:p-2 shadow-2xl shadow-primary/5 transition-all duration-500 hover:shadow-primary/10 hover:-translate-y-1">
<div ref={containerRef} className={cn( "relative w-full overflow-hidden
rounded-[1.6rem] sm:rounded-[2rem] bg-muted/30", CONFIG.containerHeight )} >
<div className="relative h-full w-full flex flex-col items-center justify-center">
{/* base layer */} <motion.div style={{ WebkitMaskImage: inverseMask, maskImage:
inverseMask }} className="flex flex-col gap-4 w-full h-full justify-center" >
{TAG_ROWS.map((row, rowIndex) => ( <motion.div key={`row-${rowIndex}`}
className="flex gap-4 w-max" animate={{ x: rowIndex % 2 === 0 ? ["0%",
"-33.333%"] : ["-33.333%", "0%"], }} transition={{ duration: 25, ease: "linear",
repeat: Infinity, }} > {[...row, ...row, ...row].map((item, idx) => ( <div
key={`${item.id}-${idx}`} className="flex gap-2 bg-background/50
backdrop-blur-sm whitespace-nowrap w-fit text-muted-foreground p-2 px-3
items-center border border-border/50 rounded-full text-xs" >
<HugeiconsIcon icon={item.icon} size={14} />
<span>{item.label}</span>
</div> ))} </motion.div> ))} </motion.div>

            {/* reveal layer */}
            <motion.div
              className="absolute inset-0 flex flex-col gap-4 justify-center pointer-events-none select-none z-10"
              style={{
                clipPath,
              }}
            >
              {TAG_ROWS.map((row, rowIndex) => (
                <motion.div
                  key={`row-reveal-${rowIndex}`}
                  className="flex gap-4 w-max"
                  animate={{
                    x:
                      rowIndex % 2 === 0
                        ? ["0%", "-33.333%"]
                        : ["-33.333%", "0%"],
                  }}
                  transition={{
                    duration: 25,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {[...row, ...row, ...row].map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}-reveal`}
                      className="flex gap-2 bg-background whitespace-nowrap w-fit text-foreground p-2 px-3 items-center border border-primary/20 shadow-sm rounded-full text-xs scale-125 ml-6"
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        size={14}
                        className="text-primary"
                      />
                      <span className="font-medium text-primary">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              ))}
            </motion.div>

            {/* lens */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 cursor-grab active:cursor-grabbing drop-shadow-xl"
              drag
              dragMomentum={false}
              dragConstraints={containerRef}
              style={{ x: lensX, y: lensY }}
            >
              <div className="relative">
                <MagnifyingLens size={CONFIG.lensSize} />
                <div className="absolute top-[6px] left-[6px] w-[60px] h-[60px] rounded-full bg-white/10 pointer-events-none" />
              </div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background to-transparent z-20"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background to-transparent z-20"></div>
        </div>

        <div className="p-4 sm:p-6 px-4 pb-6 sm:pb-8">
          <h3 className="text-xl font-medium tracking-tight text-foreground">
            {CONFIG.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {CONFIG.description}
          </p>
        </div>
      </div>
    </div>

); };

export default MagnifiedBento;

const MagnifyingLens = ({ size = 92 }: { size?: number }) => { return (
<svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
<path
        d="M365.424 335.392L342.24 312.192L311.68 342.736L334.88 365.936L365.424 335.392Z"
        fill="#B0BDC6"
      />
<path
        d="M358.08 342.736L334.88 319.552L319.04 335.392L342.24 358.584L358.08 342.736Z"
        fill="#DFE9EF"
      />
<path
        d="M352.368 321.808L342.752 312.192L312.208 342.752L321.824 352.36L352.368 321.808Z"
        fill="#B0BDC6"
      />
<path
        d="M332 332C260 404 142.4 404 69.6001 332C-2.3999 260 -2.3999 142.4 69.6001 69.6C141.6 -3.20003 259.2 -2.40002 332 69.6C404.8 142.4 404.8 260 332 332ZM315.2 87.2C252 24 150.4 24 88.0001 87.2C24.8001 150.4 24.8001 252 88.0001 314.4C151.2 377.6 252.8 377.6 315.2 314.4C377.6 252 377.6 150.4 315.2 87.2Z"
        fill="#DFE9EF"
      />
<path
        d="M319.2 319.2C254.4 384 148.8 384 83.2001 319.2C18.4001 254.4 18.4001 148.8 83.2001 83.2C148 18.4 253.6 18.4 319.2 83.2C384 148.8 384 254.4 319.2 319.2ZM310.4 92C250.4 32 152 32 92.0001 92C32.0001 152 32.0001 250.4 92.0001 310.4C152 370.4 250.4 370.4 310.4 310.4C370.4 250.4 370.4 152 310.4 92Z"
        fill="#7A858C"
      />
<path
        d="M484.104 428.784L373.8 318.472L318.36 373.912L428.672 484.216L484.104 428.784Z"
        fill="#333333"
      />
<path
        d="M471.664 441.224L361.344 330.928L330.8 361.48L441.12 471.76L471.664 441.224Z"
        fill="#575B5E"
      />
<path
        d="M495.2 423.2C504 432 432.8 504 423.2 495.2L417.6 489.6C408.8 480.8 480 408.8 489.6 417.6L495.2 423.2Z"
        fill="#B0BDC6"
      />
<path
        d="M483.2 435.2C492 444 444.8 492 435.2 483.2L429.6 477.6C420.8 468.8 468 420.8 477.6 429.6L483.2 435.2Z"
        fill="#DFE9EF"
      />
</svg> ); }; Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/magnified-bento.json" Usage
Customizing Content To change the chips, modify the TAG_ROWS array at the top of
the component:

// change here const TAG_ROWS = [ [ { id: "1", icon: Search01Icon, label:
"Discovery" }, { id: "2", icon: UserGroupIcon, label: "Client Review" }, // ...
add more items ], // ... add more rows ]; Basic Implementation

import MagnifiedBento from "@/components/magnified-bento"; export default
function Page() { return (
<div className="h-screen flex items-center justify-center">
<MagnifiedBento />
</div> ); } Understanding the Logic This component uses a Revealing Lens
approach where two identical layers of content move in perfect synchronization,
creating a magnified visual effect visible only through a magnifying glass.

1. The CONFIG Object At the top of the file, you'll find the CONFIG object. This
   is your primary control center:

title: The main heading of the bento card. description: The subtext explaining
the feature. containerHeight: Controls how tall the chip animation area is.
lensSize: Adjusts the overall scaling of the magnifying glass SVG. 2. The Base
Layer This layer is always visible but has an Inverse Mask applied. The
inverseMask makes the base chips disappear exactly where the magnifying lens is
positioned, preventing any "ghosting" or overlapping with the zoomed content.

3. The Reveal Layer Essentially a "secret" version of the chips that is only
   visible through the clipPath of the lens.

It features larger chips (scale-125). It uses the same transition duration (25s)
as the base layer to maintain perfect alignment while providing a "zoom" feel.
4. The Lens A draggable motion.div that tracks lensX and lensY. These motion
values are fed directly into the clipPath and maskImage templates, ensuring the
magnification effect is perfectly synced with the SVG's position.

Features Interactive Magnification: Draggable lens with high-fidelity reveal
effects. Synchronized Layers: Dual-layer animation that stays perfectly aligned.
Glassmorphism: Subtle highlights and shadows on the lens for realism. Infinite
Scroll: Multi-row chip animations moving in opposite directions. Easy
Customization: Centrally managed data and config objects for rapid editing.

Morphing Input Preview Code morphing-input.tsx

"use client";

import { useState } from "react"; import { motion, AnimatePresence } from
"motion/react"; import { Input } from "../../../components/ui/input"; import {
HugeiconsIcon } from "@hugeicons/react"; import { ArrowRight02Icon,
UnfoldMoreIcon, Album02Icon, SparklesIcon, } from "@hugeicons/core-free-icons";

interface PlaceholderConfig { id: number; placeholder: string; icon: any; }

// Change Here const placeholderOptions: PlaceholderConfig[] = [ { id: 1,
placeholder: "Search anything...", icon: SparklesIcon }, { id: 2, placeholder:
"Generate Image", icon: Album02Icon }, ];

const AnimatedPlaceholder = ({ text }: { text: string }) => { const letters =
text.split("");

return ( <motion.span className="inline-flex overflow-hidden">
{letters.map((letter, index) => ( <motion.span key={`${text}-${index}`}
initial={{ opacity: 0, rotateX: "80deg", y: 8, filter: "blur(3px)", }} exit={{
opacity: 0, rotateX: "-80deg", filter: "blur(3px)", y: -8, }} animate={{
opacity: 1, rotateX: "0deg", y: 0, filter: "blur(0px)", }} transition={{ delay:
0.015 * index,

            type: "spring",
            damping: 16,
            stiffness: 240,
            mass: 1.2,
          }}
          style={{
            willChange: "transform",
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>

); };

const InputSwitch = () => { const [activeIndex, setActiveIndex] = useState(0);
const [inputValue, setInputValue] = useState(""); const currentConfig =
placeholderOptions[activeIndex];

const handleIconClick = () => { setActiveIndex((prev) => (prev + 1) %
placeholderOptions.length); };

const IconComponent = currentConfig.icon;

return (
<div className="bg-muted w-full max-w-sm py-1 flex justify-center items-center rounded-full px-1">
<motion.button className="bg-background p-2.5 px-2.5 rounded-full flex
items-center justify-center gap-1.5 transition-colors overflow-hidden
cursor-default shadow-sm" onClick={handleIconClick} whileTap={{ scale: 0.9 }} >
<AnimatePresence mode="popLayout" initial={false}> <motion.div
key={currentConfig.id} exit={{ filter: "blur(5px)", opacity: 0, }} initial={{
opacity: 0, filter: "blur(5px)", }} animate={{ filter: "blur(0px)", opacity: 1,
}} transition={{ ease: "easeInOut",

              duration: 0.35,
            }}
            className="flex items-center justify-center gap-1"
          >
            <HugeiconsIcon
              icon={IconComponent}
              className="w-5 h-5 text-foreground"
            />
          </motion.div>
        </AnimatePresence>
        <HugeiconsIcon
          icon={UnfoldMoreIcon}
          className="w-3 h-3 text-muted-foreground"
        />
      </motion.button>
      <div className="flex-1 relative min-w-0">
        {!inputValue && (
          <div className="absolute left-0 top-0 w-full h-full flex items-center pointer-events-none pl-1.5 bg-transparent overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentConfig.id}
                className="text-sm text-muted-foreground whitespace-nowrap"
              >
                <AnimatedPlaceholder text={currentConfig.placeholder} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        <Input
          type="text"
          value={inputValue}
          onChange={(e: any) => setInputValue(e.target.value)}
          className="!border-0 outline-none border-none bg-transparent! m-0 !pl-1.5 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground"
        />
      </div>
      <button className="bg-background py-2.5 px-3 rounded-full flex shadow-sm items-center justify-center self-stretch cursor-pointer active:scale-95 transition-transform ease-in-out duration-150">
        <HugeiconsIcon
          icon={ArrowRight02Icon}
          className="h-4 w-4 text-foreground"
        />
      </button>
    </div>

); };

export default InputSwitch; Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/morphing-input.json" Usage
Customizing Content Adjust the placeholder text and icons by modifying the
placeholderOptions array:

// Change Here const placeholderOptions = [ { id: 1, placeholder: "Search
anything...", icon: SparklesIcon }, { id: 2, placeholder: "Generate Image",
icon: Album02Icon }, // ... ];

import InputSwitch from "@/components/morphing-input"; export default function
Page() { return <InputSwitch />; } Features Mode Switch: Toggles between
specific preset inputs (e.g., Search, Image Gen) and free text. Animated
Placeholder: Placeholder text animates character-by-character. Search/Command
Ready: Ideal for command palettes or multi-purpose search bars. Compact to
Detailed: Expands to show more controls or details when active. Icon
Integration: Visual icons clearly denote the current input mode.

Multi Step Form Preview Code multi-step-form.tsx

"use client";

import React, { useState, useMemo } from "react"; import { format } from
"date-fns"; import { Check, ChevronRight, ChevronLeft, CalendarIcon } from
"lucide-react"; import { useForm, FormProvider as Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; import { z } from "zod";
import { toast } from "sonner"; import { Field, FieldLabel, FieldDescription,
FieldError, } from "@/components/ui/field"; import { Card, CardHeader,
CardTitle, CardDescription, CardContent, CardFooter, } from
"@/components/ui/card"; import { Button } from "@/components/ui/button"; import
{ Input } from "@/components/ui/input"; import { Textarea } from
"@/components/ui/textarea"; import { Select, SelectContent, SelectItem,
SelectTrigger, SelectValue, } from "@/components/ui/select"; import { Badge }
from "@/components/ui/badge"; import { Calendar } from
"@/components/ui/calendar"; import { Popover, PopoverContent, PopoverTrigger, }
from "@/components/ui/popover"; import { cn } from "@/lib/utils"; import {
AnimatePresence, motion, MotionConfig } from "motion/react"; import useMeasure
from "react-use-measure";

const TEAM_SIZE_OPTIONS = [ { label: "Select team size", value: null }, { label:
"1-5 Members", value: "1-5" }, { label: "5-10 Members", value: "5-10" }, {
label: "10+ Members", value: "10+" }, ];

const PRIORITY_OPTIONS = [ { label: "Select priority", value: null }, { label:
"Low", value: "Low" }, { label: "Medium", value: "Medium" }, { label: "High",
value: "High" }, { label: "Critical", value: "Critical" }, ];

const formSchema = z.object({ "project-name": z.string().optional(), "due-date":
z.date().optional(), description: z.string().optional(), "team-size":
z.string().nullable().optional(), priority: z.string().nullable().optional(),
tag: z.array(z.string()).optional(), mood: z.string().optional(), comment:
z.string().optional(), });

type FormValues = z.infer<typeof formSchema>;

export default function MultiStepFormDemo() { const [currentStep,
setCurrentStep] = useState(0); const [direction, setDirection] =
useState<number>(); const [ref, bounds] = useMeasure();

const form = useForm<FormValues>({ resolver: zodResolver(formSchema),
defaultValues: { "project-name": "", "due-date": undefined, description: "",
"team-size": null, priority: null, tag: [], mood: "", comment: "", }, });

function onSubmit(values: FormValues) { try { console.log(values); toast(
<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
<code className="text-white">{JSON.stringify(values, null, 2)}</code>
</pre> ); } catch (error) { console.error("Form submission error", error);
toast.error("Failed to submit the form. Please try again."); } }

const nextStep = () => { if (currentStep === 2) { form.handleSubmit(onSubmit)();
return; } if (currentStep < 2) { setDirection(1); setCurrentStep((prev) =>
prev + 1); } };

const prevStep = () => { if (currentStep > 0) { setDirection(-1);
setCurrentStep((prev) => prev - 1); } };

// Change Here const stepTitles = [ { title: "Create New Project", description:
"Start by providing the essential details for your workspace.", }, { title:
"Configuration", description: "Define team access and project priority
settings.", }, { title: "Project Kickoff Mood", description: "How confident do
you feel about this new project?", }, ];

const watchedValues = form.watch();

const content = useMemo(() => { switch (currentStep) { case 0: return (
<div className="space-y-6 py-4">
<Field>
<FieldLabel htmlFor="project-name">Project Name</FieldLabel> <Input
id="project-name" placeholder="e.g Website Design"
{...form.register("project-name")} />
<FieldError> {form.formState.errors["project-name"]?.message}
</FieldError>
</Field>

            <Field>
              <FieldLabel htmlFor="due-date">Due Date</FieldLabel>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchedValues["due-date"] && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedValues["due-date"] ? (
                        format(watchedValues["due-date"] as Date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  }
                />
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={watchedValues["due-date"]}
                    onSelect={(date) => form.setValue("due-date", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FieldError>
                {form.formState.errors["due-date"]?.message}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="Describe the project goals and scope..."
                className="min-h-[100px]"
                {...form.register("description")}
              />
              <FieldError>
                {form.formState.errors.description?.message}
              </FieldError>
            </Field>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="team-size">Team Size</FieldLabel>
                <Select
                  items={TEAM_SIZE_OPTIONS}
                  value={watchedValues["team-size"] ?? null}
                  onValueChange={(val) => form.setValue("team-size", val)}
                >
                  <SelectTrigger id="team-size" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.label} value={opt.value as any}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>
                  {form.formState.errors["team-size"]?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="priority">Priority</FieldLabel>
                <Select
                  items={PRIORITY_OPTIONS}
                  value={watchedValues["priority"] ?? null}
                  onValueChange={(val) => form.setValue("priority", val)}
                >
                  <SelectTrigger id="priority" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.label} value={opt.value as any}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>
                  {form.formState.errors.priority?.message}
                </FieldError>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="tag">Tags</FieldLabel>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {watchedValues["tag"]?.map((t, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {t}
                      <button
                        type="button"
                        onClick={() => {
                          const tags = form.getValues("tag") || [];
                          form.setValue(
                            "tag",
                            tags.filter((_, index) => index !== i)
                          );
                        }}
                        className="hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  id="tag"
                  placeholder="e.g. Design, Marketing"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const val = e.currentTarget.value.trim();
                      if (val) {
                        const tags = form.getValues("tag") || [];
                        if (!tags.includes(val)) {
                          form.setValue("tag", [...tags, val]);
                        }
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>
              <FieldError>{form.formState.errors.tag?.message}</FieldError>
            </Field>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 py-4">
            <div className="rounded-xl border bg-background overflow-hidden relative">
              <div className="flex w-full border-b divide-x bg-muted/5">
                {[
                  { emoji: "😰", value: "anxious", label: "Anxious" },
                  { emoji: "😟", value: "worried", label: "Worried" },
                  { emoji: "😐", value: "neutral", label: "Neutral" },
                  { emoji: "🙂", value: "good", label: "Good" },
                  { emoji: "🤩", value: "excited", label: "Excited" },
                ].map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "flex-1 p-3 md:p-4 text-2xl md:text-3xl transition-all hover:bg-muted focus:outline-none",
                      watchedValues["mood"] === option.value
                        ? "bg-primary/10 grayscale-0"
                        : "grayscale-[1] hover:grayscale-0"
                    )}
                    type="button"
                    title={option.label}
                    onClick={() => form.setValue("mood", option.value)}
                  >
                    {option.emoji}
                  </button>
                ))}
              </div>
              <Textarea
                id="comment"
                placeholder="Add a comment..."
                className="min-h-[140px] resize-none border-0 focus-visible:ring-0 rounded-none bg-transparent p-4 placeholder:text-muted-foreground/60"
                {...form.register("comment")}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Your feedback helps us understand the project kickoff vibe.
            </p>
          </div>
        );
      default:
        return null;
    }

}, [currentStep, form, watchedValues]);

const variants = { initial: (direction: number) => { return { x:
`${110 * direction}%`, opacity: 0 }; }, animate: { x: "0%", opacity: 1 }, exit:
(direction: number) => { return { x: `${-110 * direction}%`, opacity: 0 }; }, };

return ( <Form {...form}> <MotionConfig transition={{ duration: 0.5, type:
"spring", bounce: 0, }} >
<div className="flex w-full items-center justify-center bg-muted/10 p-4">
<Card className="w-full max-w-xl shadow-none border overflow-hidden bg-background">
<motion.div layout>
<CardHeader className="flex flex-row items-start justify-between space-y-0 px-6 py-4">
<div className="flex flex-col gap-1">
<CardTitle className="text-xl"> {stepTitles[currentStep].title}
</CardTitle>
<CardDescription> {stepTitles[currentStep].description}
</CardDescription>
</div>
<div className="flex items-center gap-1.5 pt-1"> {stepTitles.map((_, index) => (
<div key={index} className={cn( "h-2 rounded-full transition-all duration-300",
currentStep === index ? "w-8 bg-primary" : "w-2 bg-primary/20" )} /> ))}
</div>
</CardHeader>

              <motion.div
                animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
                className="relative overflow-hidden"
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              >
                <div ref={ref}>
                  <CardContent className="px-6 py-2 relative">
                    <AnimatePresence
                      mode="popLayout"
                      initial={false}
                      custom={direction}
                    >
                      <motion.div
                        key={currentStep}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full"
                        custom={direction}
                      >
                        {content}
                      </motion.div>
                    </AnimatePresence>
                  </CardContent>
                </div>
              </motion.div>

              <CardFooter className="flex justify-between items-center border-t py-4">
                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button type="button" onClick={nextStep}>
                  {currentStep === stepTitles.length - 1 ? (
                    <>
                      Finish <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Continue <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </motion.div>
          </Card>
        </div>
      </MotionConfig>
    </Form>

); } Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/multi-step-form.json" Usage
Customizing Content You can easily update the step titles and descriptions by
modifying the stepTitles array inside the component:

// Change Here const stepTitles = [ { title: "Create New Project", description:
"Start by providing the essential details.", }, // ... ]; Step Content The
actual form fields for each step are defined in the content useMemo block. You
can add or modify fields here:

const content = useMemo(() => { switch (currentStep) { case 0: return (
<div className="space-y-6 py-4">
<Field>
<FieldLabel htmlFor="project-name">Project Name</FieldLabel> <Input
id="project-name" {...form.register("project-name")} />
</Field> {/* Add more fields for Step 1 */}
</div> ); // Add more cases for each step index... } }, [currentStep, form]);

import MultiStepForm from "@/components/multi-step-form"; export default
function Page() { return (
<div className="max-w-xl mx-auto py-12">
<MultiStepForm />
</div> ); } Features Progress Tracking: Clear visual indication of the current
step and overall progress. Animated Transitions: Smooth spring-based animations
between steps using Framer Motion. Form Validation: Integrated with React Hook
Form and Zod for robust client-side validation. Responsive Height: Automatically
adjusts its height based on the content of each step. Customizable: Easily add
or remove steps to fit your workflow. Interactive Elements: Includes a custom
tag input and mood selector.

Pricing Card Preview Code pricing-card.tsx

"use client";

import { Add01Icon, MinusPlus01Icon, MinusSignIcon, Tick02Icon, UserGroupIcon,
UserStoryIcon, } from "@hugeicons/core-free-icons"; import { HugeiconsIcon }
from "@hugeicons/react"; import NumberFlow from "@number-flow/react"; import {
AnimatePresence, motion, LayoutGroup } from "motion/react"; import { useState }
from "react";

// Change Here const plans = [ { id: "plus", name: "Plus", description: "solo",
monthlyPrice: 8.99, yearlyPrice: 6.99, features: [ "1TB of Space", "30 days of
file recovery", "256-bit AES and SSL/TLS", ], }, { id: "standard", name:
"Standard", description: "startup", monthlyPrice: 12.99, yearlyPrice: 9.99,
features: [ "1TB of Space", "30 days of file recovery", "256-bit AES and
SSL/TLS", ], }, { id: "advanced", name: "Advanced", description: "teams",
monthlyPrice: 24.99, yearlyPrice: 19.99, features: [ "1TB of Space", "30 days of
file recovery", "256-bit AES and SSL/TLS", ], }, ];

const TRANSITION = { type: "spring" as const, stiffness: 300, damping: 30, mass:
0.8, };

function PricingCard() { const [billingCycle, setBillingCycle] =
useState<"monthly" | "yearly">( "monthly" ); const [selectedPlan,
setSelectedPlan] = useState("standard"); const [userCount, setUserCount] =
useState(3);

return (
<div className="w-full max-w-[450px] flex flex-col gap-6 p-5 px-4 sm:p-6 rounded-4xl sm:rounded-2xl border border-border bg-background shadow-sm transition-colors duration-300 not-prose">
<div className="flex flex-col gap-4 mb-2">
<h1 className="text-2xl font-semibold text-foreground tracking-tight"> Select a
Plan
</h1>

        <div className="bg-muted p-1 h-10 w-full rounded-xl ring-1 ring-border flex">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`flex-1 h-full rounded-lg text-base font-medium  relative transition-colors duration-300 ${
              billingCycle === "monthly"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {billingCycle === "monthly" && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-background rounded-lg shadow-sm ring-1 ring-border"
                transition={TRANSITION}
              />
            )}
            <span className="relative z-10">Monthly</span>
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`flex-1 h-full rounded-lg text-base font-medium relative transition-colors duration-300 flex items-center justify-center gap-2 ${
              billingCycle === "yearly"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {billingCycle === "yearly" && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-background rounded-lg shadow-sm ring-1 ring-border"
                transition={TRANSITION}
              />
            )}
            <span className="relative z-10">Yearly</span>
            <span className="relative z-10 bg-primary text-xs font-black px-1.5 py-0.5 rounded-full uppercase text-primary-foreground tracking-tight whitespace-nowrap font-light">
              20% OFF
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const price =
            billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className="relative cursor-pointer"
            >
              <div
                className={`relative rounded-xl bg-card border border-foreground/10 transition-colors duration-300 ${
                  isSelected ? "z-10 border-primary border-2" : ""
                }`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="mt-1 shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "border-primary"
                              : "border-muted-foreground/15"
                          }`}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="w-4 h-4 rounded-full bg-primary"
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25,
                                  duration: 0.2,
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-foreground leading-tight">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-muted-foreground lowercase">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-medium text-foreground">
                        <NumberFlow
                          value={price}
                          format={{ style: "currency", currency: "USD" }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground/60 flex items-center justify-end gap-1 ">
                        {billingCycle === "monthly" ? "Month" : "Year"}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        className="overflow-hidden w-full"
                      >
                        <div className="pt-6 flex flex-col gap-6">
                          <div className="flex flex-col gap-3.5">
                            {plan.features.map((feature, idx) => (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: idx * 0.05,
                                  duration: 0.3,
                                }}
                                key={idx}
                                className="flex items-center gap-3 text-sm text-foreground/80 "
                              >
                                <HugeiconsIcon
                                  icon={Tick02Icon}
                                  size={16}
                                  className="text-primary"
                                />
                                {feature}
                              </motion.div>
                            ))}
                          </div>

                          <div className="h-px bg-muted" />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-muted shrink-0 flex items-center justify-center">
                                <HugeiconsIcon
                                  icon={UserStoryIcon}
                                  size={30}
                                  className="text-muted-foreground"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-base font-medium  text-foreground leading-none">
                                  Users
                                </span>
                                <span className="text-sm text-muted-foreground mt-0.5">
                                  Starting at {userCount} users
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 bg-muted p-1.5 rounded-xl border border-border">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUserCount(Math.max(1, userCount - 1));
                                }}
                                className="p-1.5 rounded-lg hover:bg-background hover:shadow-sm transition-all text-muted-foreground/60 hover:text-foreground active:scale-95"
                              >
                                <HugeiconsIcon icon={MinusSignIcon} size={14} />
                              </button>
                              <span className="text-sm  w-4 text-center tabular-nums text-foreground/80">
                                <NumberFlow value={userCount} />
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUserCount(userCount + 1);
                                }}
                                className="p-1.5 rounded-lg hover:bg-background hover:shadow-sm transition-all text-muted-foreground/60 hover:text-foreground active:scale-95"
                              >
                                <HugeiconsIcon icon={Add01Icon} size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

); }

export default PricingCard; Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/pricing-card.json" Usage
Customizing Content Update the plans array to set your own pricing and features:

// Change Here const plans = [ { id: "plus", name: "Plus", description: "solo",
monthlyPrice: 8.99, yearlyPrice: 6.99, features: ["1TB Space", "30 days
recovery"], }, // ... ];

import PricingCard from "@/components/pricing-card"; export default function
Page() { return (
<div className="flex items-center justify-center py-10 w-full">
<PricingCard />
</div> ); } Features Period Switching: Seamlessly toggle between monthly and
yearly billing with shared layout animations. Animated Pricing: Utilizes
NumberFlow for smooth, high-quality transitions between price points.
Interactive Selection: Plan selection is highlighted with animated borders and
checkmarks. Responsive Layout: Designed to look great on both mobile and desktop
within a 320px-384px container. Modern Aesthetic: Minimalist UI with subtle
shadows, rounded corners, and premium typography. Popular Choice Badge: Easily
highlight specific plans with a "Popular" tag.

Shake Testimonial Card Preview Code shake-testimonial-card.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react"; import {
motion, AnimatePresence } from "motion/react"; import { cn } from "@/lib/utils";

interface Testimonial { id: number; name: string; role: string; avatar: string;
content: string; color: string; textColor: string; }

// Change Here const testimonials: Testimonial[] = [ { id: 1, name: "Marcus
Thorne", role: "Head of Product, EcoStream", avatar: "/ui/memoji/1.svg",
content: "The interface is so intuitive that our team was up and running in
hours. Highly recommended for fast-moving startups.", color: "#E0F2FE",
textColor: "#1E3A8A", }, { id: 2, name: "Elena Rodriguez", role: "Director of
UX, CreativeFlow", avatar: "/ui/memoji/6.svg", content: "We've tried dozens of
tools, but this one stands out for its elegant design. It's a game-changer for
our workflow.", color: "#F3E8FF", textColor: "#581C87", }, { id: 3, name: "Sarah
Jenkins", role: "CEO, TechNova", avatar: "/ui/memoji/4.svg", content: "Scaling
our infrastructure used to be a nightmare until we found this platform. Now we
can focus on building features.", color: "#DCFCE7", textColor: "#064E3B", }, {
id: 4, name: "David Kim", role: "CTO, NextGen Solutions", avatar:
"/ui/memoji/6.svg", content: "The security features alone are worth every penny.
Our clients feel safer knowing their data is protected by encryption.", color:
"#FEF9C3", textColor: "#713F12", }, ];

export default function ShakeTestimonial() { const [cards, setCards] =
useState(testimonials); const [isAnimating, setIsAnimating] = useState(false);

const handleNext = useCallback(() => { if (isAnimating) return;
setIsAnimating(true);

    setTimeout(() => {
      setCards((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setIsAnimating(false);
    }, 600);

}, [isAnimating]);

useEffect(() => { const interval = setInterval(() => { handleNext(); }, 1500);
return () => clearInterval(interval); }, [handleNext]);

return (
<div className="flex items-center justify-center w-full bg-transparent p-4 overflow-hidden py-4 min-h-[650px] max-sm:min-h-[500px]">
<div className="relative w-full max-w-[370px] h-[240px] lg:max-w-[440px]
lg:h-[310px] md:h-[320px]" style={{ perspective: "1200px" }} >
<AnimatePresence mode="popLayout"> {cards.map((card, index) => { const isTop =
index === 0;

            return (
              <motion.div
                key={card.id}
                layout
                style={{
                  backgroundColor: card.color,
                  zIndex: testimonials.length - index,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transformOrigin: "center center",
                  borderColor: `${card.textColor}20`,
                }}
                initial={{
                  scale: 0.7,
                  opacity: 0,
                  y: 40,
                  rotateX: -20,
                }}
                animate={{
                  scale:
                    isTop && isAnimating
                      ? [1, 1.05, 1, 1.05, 1, 1, 0.9]
                      : 1 - index * 0.05,
                  y:
                    isTop && isAnimating
                      ? [0, 0, 0, 0, 0, 0, -300]
                      : index * 15,
                  rotateX:
                    isTop && isAnimating ? [0, 0, 0, 0, 0, 0, 15] : -index * 2,
                  x: isTop && isAnimating ? [0, -12, 12, -12, 12, 0, 0] : 0,
                  rotate: isTop && isAnimating ? [0, -2, 2, -2, 2, 0, -5] : 0,

                  opacity: index < 4 ? 1 : 0,

                  transition:
                    isTop && isAnimating
                      ? {
                          duration: 0.6,
                          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                          ease: "easeOut",
                        }
                      : {
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                          mass: 0.6,
                        },
                }}
                className={cn(
                  "w-full h-full rounded-[48px] p-8 md:p-10  shadow-[0_12px_20px_rgba(0,0,0,0.03)]",
                  "border flex flex-col justify-between overflow-hidden",
                  "cursor-pointer select-none ring-1 ring-black/5 backdrop-blur-3xl",
                  "preserve-3d transition-shadow duration-500 hover:shadow-[0_13px_60px_rgba(0,0,0,0.1)]"
                )}
                onClick={handleNext}
              >
                <div className="flex flex-col gap-4 md:gap-6 ">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/50 rounded-2xl shadow-inner border border-black/5 overflow-hidden shrink-0 lg:w-14 lg:h-14 max-sm:rounded-xl">
                      <img
                        src={card.avatar}
                        className="w-full h-full object-contain"
                        alt={card.name}
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <h3
                        className="font-bold text-lg md:text-xl leading-tight !p-0 !m-0 max-sm:text-base "
                        style={{ color: card.textColor }}
                      >
                        {card.name}
                      </h3>
                      <p
                        className="text-xs lg:text-sm opacity-60  !p-0 !m-0  max-sm:text-xss"
                        style={{ color: card.textColor }}
                      >
                        {card.role}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-xl font-serif font-medium leading-[1.3] tracking-tight italic  lg:text-2xl md:text-2xl max-sm:text-lg !p-0 !m-0"
                    style={{ color: card.textColor }}
                  >
                    "{card.content}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>

); } Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/shake-testimonial-card.json"
Usage Customizing Content You can easily swap out the testimonials by modifying
the testimonials array at the top of the file:

// Change Here const testimonials = [ { id: 1, name: "Marcus Thorne", role:
"Head of Product", avatar: "/ui/memoji/1.svg", content: "The interface is so
intuitive...", color: "#E0F2FE", textColor: "#1E3A8A", }, // ... ];

import ShakeTestimonial from "@/components/shake-testimonial-card"; export
default function Page() { return (
<div className="h-[500px] w-full flex items-center justify-center">
<ShakeTestimonial />
</div> ); } Features Shake & Toss Animation: A unique, playful animation where
cards shake before being "tossed" to the back of the stack. Auto-play:
Automatically cycles through testimonials with a configurable interval. Depth
Effect: Uses 3D perspective and scaling to create a realistic sense of a stacked
deck. Interactive: Allows users to manually skip to the next testimonial by
clicking on the stack. Responsive: Adapts perfectly to mobile and desktop
screens. Premium Feel: Uses spring-based physics for all movements, ensuring a
natural and high-quality feel.

Smooth Dropdown Preview Code smooth-dropdown.tsx

"use client";

import { useState, useRef, useEffect } from "react"; import { motion } from
"motion/react"; import { HugeiconsIcon } from "@hugeicons/react"; import
useMeasure from "react-use-measure"; import { UserIcon, CreditCardIcon,
FolderIcon, File01Icon, SettingsIcon, HelpCircleIcon, LogoutIcon,
MoreHorizontalCircle01Icon, } from "@hugeicons/core-free-icons";

// Change Here const menuItems = [ { id: "profile", label: "Profile", icon:
UserIcon }, { id: "upgrade", label: "Upgrade", icon: CreditCardIcon }, { id:
"projects", label: "Projects", icon: FolderIcon }, { id: "documentation", label:
"Documentation", icon: File01Icon }, { id: "divider", label: "", icon: null }, {
id: "settings", label: "Settings", icon: SettingsIcon }, { id: "help", label:
"Get Help", icon: HelpCircleIcon }, { id: "logout", label: "Logout", icon:
LogoutIcon }, ];

const easeOutQuint: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function TwentyTwelveOne() { const [isOpen, setIsOpen] =
useState(false); const [activeItem, setActiveItem] = useState("profile"); const
[hoveredItem, setHoveredItem] = useState<string | null>(null); const
containerRef = useRef<HTMLDivElement>(null);

const [contentRef, contentBounds] = useMeasure();

useEffect(() => { const handleClickOutside = (event: MouseEvent) => { if (
containerRef.current && !containerRef.current.contains(event.target as Node) ) {
setIsOpen(false); } };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);

}, [isOpen]);

const openHeight = Math.max(40, Math.ceil(contentBounds.height)); return (
<div ref={containerRef} className="relative h-10 w-10 not-prose"> <motion.div
layout initial={false} animate={{ width: isOpen ? 220 : 40, height: isOpen ?
openHeight : 40, borderRadius: isOpen ? 14 : 12, }} transition={{ type: "spring"
as const, damping: 34, stiffness: 380, mass: 0.8, }} className="absolute top-0
right-0 bg-popover border border-border shadow-lg overflow-hidden cursor-pointer
origin-top-right " onClick={() => !isOpen && setIsOpen(true)} > <motion.div
initial={false} animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.8 : 1, }}
transition={{ duration: 0.15 }} className="absolute inset-0 flex items-center
justify-center" style={{ pointerEvents: isOpen ? "none" : "auto", willChange:
"transform", }} >
<HugeiconsIcon
            icon={MoreHorizontalCircle01Icon}
            className="w-6 h-6 text-muted-foreground"
          /> </motion.div>

        {/* Menu Content - visible when open */}
        <div ref={contentRef}>
          <motion.div
            layout
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
              delay: isOpen ? 0.08 : 0,
            }}
            className="p-2"
            style={{
              pointerEvents: isOpen ? "auto" : "none",
              willChange: "transform",
            }}
          >
            <ul className="flex flex-col gap-0.5 m-0! p-0! list-none!">
              {menuItems.map((item, index) => {
                if (item.id === "divider") {
                  return (
                    <motion.hr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isOpen ? 1 : 0 }}
                      transition={{ delay: isOpen ? 0.12 + index * 0.015 : 0 }}
                      className="border-border my-1.5!"
                    />
                  );
                }

                const iconRef = item.icon!;
                const isActive = activeItem === item.id;
                const isLogout = item.id === "logout";
                const showIndicator = hoveredItem
                  ? hoveredItem === item.id
                  : isActive;

                const itemDuration = item.id === "logout" ? 0.12 : 0.15;
                const itemDelay = isOpen ? 0.06 + index * 0.02 : 0;

                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      x: isOpen ? 0 : 8,
                    }}
                    transition={{
                      delay: itemDelay,
                      duration: itemDuration,
                      ease: easeOutQuint,
                    }}
                    onClick={() => {
                      setActiveItem(item.id);
                      if (item.id === "logout") {
                        setIsOpen(false);
                      }
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative flex items-center gap-3 rounded-lg text-sm cursor-pointer transition-colors duration-200 ease-out m-0! pl-3! py-2! ${
                      isLogout && showIndicator
                        ? "text-red-600"
                        : isActive
                        ? "text-foreground"
                        : isLogout
                        ? "text-muted-foreground hover:text-red-600"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {/* Hover/Active background indicator */}
                    {showIndicator && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={`absolute inset-0 rounded-lg ${
                          isLogout ? "bg-red-50" : "bg-muted"
                        }`}
                        transition={{
                          type: "spring",
                          damping: 30,
                          stiffness: 520,
                          mass: 0.8,
                        }}
                      />
                    )}
                    {/* Left bar indicator */}
                    {showIndicator && (
                      <motion.div
                        layoutId="leftBar"
                        className={`absolute left-0 top-0 bottom-0 my-auto w-[3px] h-5 rounded-full ${
                          isLogout ? "bg-red-500" : "bg-foreground"
                        }`}
                        transition={{
                          type: "spring",
                          damping: 30,
                          stiffness: 520,
                          mass: 0.8,
                        }}
                      />
                    )}
                    <HugeiconsIcon
                      icon={iconRef}
                      className="w-[18px] h-[18px] relative z-10"
                    />
                    <span className="font-medium relative z-10">
                      {item.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>

); } Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/smooth-dropdown.json" Usage
Customizing Content Modify the menuItems array to customize your dropdown
options:

// Change Here const menuItems = [ { id: "profile", label: "Profile", icon:
UserIcon }, { id: "upgrade", label: "Upgrade", icon: CreditCardIcon }, // ... ];

import MenuInteraction from "@/components/smooth-dropdown"; export default
function Page() { return (
<div className="flex items-center justify-center h-[400px] w-full">
<MenuInteraction />
</div> ); } Features Morphing Background: The menu container morphs shape
smoothly to fit changing content. Staggered Animations: List items animate in
sequentially for a polished feel. Active States: Clear visual indicators for
active and hovered items. Outside Click Handling: Automatically closes the menu
when clicking outside. Spring Physics: Uses spring animations for natural,
non-linear motion.

Stacked List Preview Code stacked-list.tsx

"use client";

import { cn } from "@/lib/utils"; import { motion, AnimatePresence } from
"motion/react"; import { useState, useMemo } from "react"; import { Input } from
"@/components/ui/input"; import { Button } from "@/components/ui/button"; import
{ HugeiconsIcon } from "@hugeicons/react"; import { ProfileIcon, Search01Icon,
Cancel01Icon, Add01Icon, Briefcase01Icon, PaintBoardIcon, Database01Icon,
QuillWrite01Icon, } from "@hugeicons/core-free-icons";

interface Member { id: string; name: string; status: string; online: boolean;
role: string; roleType: "pm" | "designer" | "data" | "creator"; avatar: string;
}

const ALL_MEMBERS: Member[] = [ { id: "01", name: "Oliver Smith", status:
"Online", online: true, role: "Project Manager", roleType: "pm", avatar:
"https://tapback.co/api/avatar/Oliver.webp", }, { id: "02", name: "Sophie Chen",
status: "17m ago", online: false, role: "Designer", roleType: "designer",
avatar: "https://tapback.co/api/avatar/Sophie.webp", }, { id: "03", name: "Noah
Wilson", status: "29m ago", online: false, role: "Data Specialist", roleType:
"data", avatar: "https://tapback.co/api/avatar/Noah.webp", }, { id: "04", name:
"Emma Davis", status: "48m ago", online: false, role: "Creator", roleType:
"creator", avatar: "https://tapback.co/api/avatar/Emma.webp", }, { id: "05",
name: "Leo Garcia", status: "Online", online: true, role: "Designer", roleType:
"designer", avatar: "https://tapback.co/api/avatar/Leo.webp", }, { id: "06",
name: "Mia Thompson", status: "Online", online: true, role: "Project Manager",
roleType: "pm", avatar: "https://tapback.co/api/avatar/Mia.webp", }, { id: "07",
name: "Ethan Wright", status: "5h ago", online: false, role: "Data Specialist",
roleType: "data", avatar: "https://tapback.co/api/avatar/Ethan.webp", }, ];

const ACTIVE_MEMBERS = ALL_MEMBERS.filter((m) => m.online);

const sweepSpring = { type: "spring" as const, stiffness: 400, damping: 35,
mass: 0.5, };

const RoleBadge = ({ type, label, }: { type: Member["roleType"]; label: string;
}) => { const styles = { pm: { bg: "bg-[#FFFCEB]", text: "text-[#856404]",
border: "border-[#FFEBA5]", icon: Briefcase01Icon, }, designer: { bg:
"bg-[#F0F7FF]", text: "text-[#004085]", border: "border-[#B8DAFF]", icon:
PaintBoardIcon, }, data: { bg: "bg-[#F3FAF4]", text: "text-[#155724]", border:
"border-[#C3E6CB]", icon: Database01Icon, }, creator: { bg: "bg-[#FCF5FF]",
text: "text-[#522785]", border: "border-[#E8D1FF]", icon: QuillWrite01Icon, },
};

const style = styles[type]; const Icon = style.icon;

return ( <div
className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${style.bg} ${style.text} ${style.border} shrink-0`}
>
<HugeiconsIcon icon={Icon} size={12} strokeWidth={1.8} />
<span className="text-xs font-regular tracking-tight uppercase whitespace-nowrap truncate max-w-[60px] sm:max-w-none">
{label}
</span>
</div> ); };

const MemberItem = ({ member }: { member: Member }) => ( <motion.div variants={{
hidden: { opacity: 0, x: 10, y: 15, rotate: 1 }, visible: { opacity: 1, x: 0, y:
0, rotate: 0 }, }} transition={sweepSpring} style={{ originX: 1, originY: 1 }}
className="flex items-center group py-4 first:pt-0 border-b border-border/40
last:border-0"



    <div className="relative mr-4 shrink-0">
      <img
        src={member.avatar}
        alt={member.name}
        className="w-12 h-12 rounded-full ring-2 ring-background shadow-sm grayscale-[0.1] group-hover:grayscale-0 transition-all duration-300"
      />
      {member.online && (
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-background rounded-full flex items-center justify-center shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-base font-semibold text-foreground tracking-tight leading-none mb-1.5 truncate">
        {member.name}
      </h3>
      <div className="flex items-center gap-1.5 opacity-80">
        {member.online && (
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
        )}
        <p
          className={`text-sm font-medium leading-none ${
            member.online ? "text-green-600" : "text-muted-foreground"
          }`}
        >
          {member.status}
        </p>
      </div>
    </div>
    <div className=" shrink-0">
      <RoleBadge type={member.roleType} label={member.role} />
    </div>

</motion.div> );

export default function StackedList() { const [isExpanded, setIsExpanded] =
useState(false); const [searchQuery, setSearchQuery] = useState("");

const filteredAllMembers = useMemo( () => ALL_MEMBERS.filter( (m) =>
m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
m.role.toLowerCase().includes(searchQuery.toLowerCase()) ), [searchQuery] );

return (
<div className="flex items-center justify-center min-h-screen w-full bg-muted/50 p-6 font-sans not-prose">
<div className="relative w-full max-w-[440px] pb-6 bg-background rounded-[40px] border border-border flex flex-col overflow-hidden shadow-none">
<div className="flex flex-col h-full bg-background">
<div className="p-8 pb-3">
<div className="flex items-center justify-between mb-5">
<h2 className="text-lg font-semibold text-foreground tracking-tight flex items-center gap-2">
Active Members
<span className="text-xs bg-muted px-2 py-1 mt-0.5 rounded-full text-muted-foreground leading-none font-normal">
{ACTIVE_MEMBERS.length}
</span>
</h2>
<Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border-border/50 text-muted-foreground hover:bg-muted/50"
              >
<HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={2.5} />
</Button>
</div>

            <div className="relative mb-4">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 z-10"
                size={16}
              />
              <Input
                placeholder="Search teammates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-11 pr-4 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-border rounded-2xl text-base text-foreground placeholder:text-muted-foreground/50 transition-all w-full box-border"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-20 custom-scrollbar scroll-visible">
            <motion.div
              initial={false}
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="space-y-0.5"
            >
              {ACTIVE_MEMBERS.map((member) => (
                <MemberItem key={`active-${member.id}`} member={member} />
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          layout
          initial={false}
          animate={{
            height: isExpanded ? "calc(100% - 20px)" : "68px",
            width: isExpanded ? "calc(100% - 20px)" : "calc(100% - 40px)",
            bottom: isExpanded ? "10px" : "20px",
            left: isExpanded ? "10px" : "20px",
            borderRadius: isExpanded ? "32px" : "24px",
          }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 30,
            mass: 0.8,
            ease: "easeInOut",
          }}
          className="absolute z-50 overflow-hidden border border-border shadow-none flex flex-col group/bar bg-card"
          style={{ cursor: isExpanded ? "default" : "pointer" }}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          <div
            className={`flex items-center justify-between px-3 h-[68px] shrink-0 transition-colors ${
              isExpanded ? "border-b border-border/40" : "hover:bg-muted/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform group-hover/bar:scale-105`}
              >
                <HugeiconsIcon icon={ProfileIcon} size={20} strokeWidth={2} />
              </div>
              <motion.div layout="position">
                <h4 className="text-base font-medium text-foreground tracking-tight leading-none  ">
                  Member Directory
                </h4>
                <p className="text-xs font-regular leading-none text-muted-foreground  mt-1">
                  8 Members Registered
                </p>
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              {!isExpanded && (
                <div className="flex items-center gap-0">
                  <div className="flex -space-x-3">
                    {ALL_MEMBERS.slice(0, 3).map((m) => (
                      <motion.img
                        key={`sum-${m.id}`}
                        layoutId={`avatar-${m.id}`}
                        src={m.avatar}
                        className="w-10 h-10 rounded-full ring-1 ring-background shadow-sm z-1"
                        alt="avatar"
                      />
                    ))}
                    <div className="w-10 h-10 rounded-full ring-1 ring-background bg-muted flex items-center justify-center shadow-sm relative z-0">
                      <span className="text-sm font-regular leading-none text-muted-foreground">
                        +{ALL_MEMBERS.length - 3}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {isExpanded && (
                <button
                  className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground transition-all flex items-center justify-center bg-muted/60 active:scale-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={18}
                    strokeWidth={2.5}
                  />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="px-6 py-4"
                >
                  <div className="relative">
                    <HugeiconsIcon
                      icon={Search01Icon}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 z-10"
                      size={15}
                    />
                    <Input
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 transition-all w-full box-border pl-10"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 overflow-y-auto px-6 py-2 custom-scrollbar scroll-visible">
              <motion.div
                initial="hidden"
                animate={isExpanded ? "visible" : "hidden"}
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
                  },
                  hidden: {
                    transition: { staggerChildren: 0.02, staggerDirection: -1 },
                  },
                }}
                className="space-y-0.5"
              >
                {filteredAllMembers.map((member) => (
                  <MemberItem key={`list-${member.id}`} member={member} />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

); } Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/stacked-list.json" Usage
Customizing Content The component is designed to be highly flexible. You can
represent any type of list (members, files, projects, etc.) by updating the
ALL_MEMBERS array:

// Change Here const ALL_MEMBERS = [ { id: "01", name: "Oliver Smith", status:
"Online", online: true, role: "Project Manager", roleType: "pm", avatar:
"https://...", }, // ... add more members ]; The component automatically filters
ACTIVE_MEMBERS for the primary view and uses ALL_MEMBERS for the expandable list
view.

import StackedList from "@/components/stacked-list"; export default function
Page() { return <StackedList />; } Features Stacked Layout: A unique interaction
where a secondary directory "morphs" out from the bottom of the main view.
Micro-animations: Staggered entry animations for list items and smooth layout
transitions using Framer Motion. Searchable: Integrated search functionality in
both the expanded and collapsed states. Categorization: Support for different
item categories with custom badges and icons. Responsive Design: Handles long
text and varying screen sizes with elegant truncations and flexible layouts.
Interactive UI: Hover states, active indicators, and satisfying spring-based
animations.

Vertical Tabs Preview Code vertical-tabs.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react"; import {
motion, AnimatePresence } from "motion/react"; import { cn } from "@/lib/utils";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

// Change Here const SERVICES = [ { id: "01", title: "Web Design", description:
"Creating beautiful, functional, and user-centric digital experiences.", image:
"https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200", }, {
id: "02", title: "Framer Development", description: "Building high-performance,
animated websites with Framer.", image:
"https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200", }, {
id: "03", title: "Branding", description: "Defining your brand's visual identity
and voice for a lasting impression.", image:
"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200", }, ];

const AUTO_PLAY_DURATION = 5000;

export default function VerticalTabs() { const [activeIndex, setActiveIndex] =
useState(0); const [direction, setDirection] = useState(0); const [isPaused,
setIsPaused] = useState(false);

const handleNext = useCallback(() => { setDirection(1); setActiveIndex((prev) =>
(prev + 1) % SERVICES.length); }, []);

const handlePrev = useCallback(() => { setDirection(-1); setActiveIndex((prev)
=> (prev - 1 + SERVICES.length) % SERVICES.length); }, []);

const handleTabClick = (index: number) => { if (index === activeIndex) return;
setDirection(index > activeIndex ? 1 : -1); setActiveIndex(index);
setIsPaused(false); };

useEffect(() => { if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);

}, [activeIndex, isPaused, handleNext]);

const variants = { enter: (direction: number) => ({ y: direction > 0 ? "-100%" :
"100%", opacity: 0, }), center: { zIndex: 1, y: 0, opacity: 1, }, exit:
(direction: number) => ({ zIndex: 0, y: direction > 0 ? "100%" : "-100%",
opacity: 0, }), };

return (
<section className="w-full bg-background py-8 md:py-16 lg:py-24">
<div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
{/* Left Column: Content */}
<div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
<div className="space-y-1 mb-12">
<h2 className="tracking-tighter text-balance text-3xl font-medium md:text-4xl lg:text-5xl text-foreground">
How I can help you
</h2>
<span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.3em] block ml-0.5">
(SERVICES)
</span>
</div>

            <div className="flex flex-col space-y-0">
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-4 py-6 md:py-8 text-left transition-all duration-500 border-t border-border/50 first:border-0",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/60 hover:text-foreground"
                    )}
                  >
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-muted">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-foreground origin-top"
                          initial={{ height: "0%" }}
                          animate={
                            isPaused ? { height: "0%" } : { height: "100%" }
                          }
                          transition={{
                            duration: AUTO_PLAY_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>

                    <span className="text-[9px] md:text-[10px] font-medium mt-1 tabular-nums opacity-50">
                      /{service.id}
                    </span>

                    <div className="flex flex-col gap-2 flex-1">
                      <span
                        className={cn(
                          "text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight transition-colors duration-500",
                          isActive ? "text-foreground" : ""
                        )}
                      >
                        {service.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-muted-foreground text-sm md:text-base font-normal leading-relaxed max-w-sm pb-2">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
            <div
              className="relative group/gallery"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-4/5 md:aspect-4/3 lg:aspect-16/11 rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-muted/30 border border-border/40">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={SERVICES[activeIndex].image}
                      alt={SERVICES[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 m-0! p-0! block"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-all active:scale-90"
                    aria-label="Previous"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-all active:scale-90"
                    aria-label="Next"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

); } Installation CLI Manual

npx shadcn@latest add "https://uselayouts.com/r/vertical-tabs.json" Usage
Customizing Content Modify the SERVICES array at the top of the file to add your
own sections:

// Change Here const SERVICES = [ { id: "01", title: "Web Design", description:
"Creating beautiful digital experiences.", image:
"https://images.unsplash.com...", }, // ... ];

import VerticalTabs from "@/components/vertical-tabs"; export default function
Page() { return <VerticalTabs />; } Features Progress Indicators: Visual
progress bars show auto-play status on active items. Content Synchronization:
Updates image and text content based on the selected item. Auto-cycle:
Automatically rotates through the collection (pauses on hover). Smooth
Transitions: Slide animations for content changes. Interactive Navigation: Click
to jump to any item in the collection.

# 3d Wrapper

URL: /docs/components/3d-wrapper

This component transforms any content into an immersive, interactive 3D
experience. It tracks cursor movements to animate a smooth rotation, creating a
captivating depth effect.

---

## title: 3d Wrapper description: This component transforms any content into an immersive, interactive 3D experience. It tracks cursor movements to animate a smooth rotation, creating a captivating depth effect. component: true

<ComponentPreview name="3d-wrapper-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="This component transforms any content into an immersive, interactive 3D experience. It tracks cursor movements to animate a smooth rotation, creating a captivating depth effect." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/3d-wrapper.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge motion
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="3d-wrapper" title="components/ui/3d-wrapper.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { Wrapper3D } from "@/components/ui/wrapper-3d";
```

```tsx showLineNumbers
<Wrapper3D>
    {content}
</Wrapper3D>;
```

## Props

`Wrapper3D` props.

<TypeTable type={{ children: { type: "ReactNode", description: "The elements to
be wrapped with the 3D effect." }, damping: { type: "number", description:
"Controls the damping of the animation, affecting how quickly it settles.",
default: "20" }, swiftness: { type: "number", description: "Controls the speed
of the animation.", default: "80" }, mass: { type: "number", description:
"Affects the virtual mass of the animation, influencing its behavior.", default:
"1.5" }, maxRotation: { type: "number", description: "The maximum rotation in
degrees that the element can achieve.", default: "100" }, translateZ: { type:
"number", description: "The depth of translation in pixels for the 3D effect.",
default: "75" }, perspective: { type: "boolean", description: "Enables or
disables the 3D perspective (1000px if enabled).", default: "true" }, className:
{ type: "string", description: "Additional CSS classes to apply to the main
container." } }} />

# Animated Keyboard

URL: /docs/components/animated-keyboard

Displays an animated keyboard with keycaps that can be customized with different
colors and variants.

---

## title: Animated Keyboard description: Displays an animated keyboard with keycaps that can be customized with different colors and variants. component: true

<ComponentPreview name="animated-keyboard-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="Displays an animated keyboard with keycaps that can be customized with different colors and variants" align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/animated-keyboard.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge framer-motion class-variance-authority
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="animated-keyboard" title="components/ui/animated-keyboard.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Examples

<ComponentPreview name="animated-keyboard-rgb-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="Displays an animated keyboard with keycaps that can be customized with different colors and variants" align="center" />

<ComponentPreview name="mini-keyboard-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="Displays an animated keyboard with keycaps that can be customized with different colors and variants" align="center" />

## Usage

```tsx showLineNumbers
import { Keyboard, Keycap, KeyRow } from "@/components/ui/animated-keyboard";
```

```tsx showLineNumbers
<Keyboard className="w-full max-w-lg">
    <KeyRow>
        <Keycap char="Q" height="42px" />
        <Keycap char="W" height="42px" />
        <Keycap char="E" height="42px" />
        <Keycap char="R" height="42px" />
        <Keycap char="T" height="42px" />
        <Keycap char="Y" height="42px" />
        <Keycap char="U" height="42px" />
        <Keycap char="I" height="42px" />
        <Keycap char="O" height="42px" />
        <Keycap char="P" height="42px" />
    </KeyRow>
</Keyboard>;
```

## Props

`Keyboard` props.

<TypeTable type={{ children: { type: "React.ReactNode", description: "The
keyboard rows and keys to render." }, className: { type: "string", description:
"Additional custom classes." } }} />

`KeyRow` props.

<TypeTable type={{ children: { type: "React.ReactNode", description: "The
keycaps to render in this row." }, className: { type: "string", description:
"Additional custom classes." } }} />

`Keycap` props.

<TypeTable type={{ char: { type: "string", description: "The main character to
display on the key." }, secondaryChar: { type: "string", description: "Secondary
character (usually top-left)." }, height: { type: "string", description: "Height
of the keycap in CSS units." }, variant: { type: '"default" | "double" | "tab" |
"caps" | "shift" | "command" | "space"', description: "The keycap variant
affecting its width.", default: '"default"' }, keylightColor: { type: '"default"
| "red" | "blue" | "green" | "purple" | "rgb"', description: "Color theme for
the key lighting effect.", default: '"default"' }, className: { type: "string",
description: "Additional custom classes." } }} />

# Animated List

URL: /docs/components/animated-list.tsx

A sophisticated animation component that creates dynamic column-based
transitions with scaling effects. Perfect for showcasing notifications,
messages, or any sequential content with smooth formation, scrolling, and reset
animations.

---

## title: Animated List description: A sophisticated animation component that creates dynamic column-based transitions with scaling effects. Perfect for showcasing notifications, messages, or any sequential content with smooth formation, scrolling, and reset animations. component: true

<ComponentPreview name="animated-list-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="A list of notifications with an animated list" align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/animated-list.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge motion
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="animated-list" title="components/ui/animated-list.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { AnimatedList } from "@/components/ui/animated-list";
```

```tsx showLineNumbers
<AnimatedList>
    {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
    ))}
</AnimatedList>;
```

## Props

`animated-list` props.

<TypeTable type={{ children: { type: "React.ReactNode", description: "The
content to be displayed in the animated list." }, className: { type: "string",
description: "Additional CSS classes for custom styling." }, stackGap: { type:
"number", description: "Vertical spacing between items in the initial stack
formation.", default: "20" }, columnGap: { type: "number", description:
"Vertical spacing between items in the column formation.", default: "85" },
scaleFactor: { type: "number", description: "Factor used to scale items in the
initial stack formation.", default: "0.05" }, scrollDownDuration: { type:
"number", description: "Duration of the scroll down animation in seconds.",
default: "5" }, formationDuration: { type: "number", description: "Duration of
the column formation animation in seconds.", default: "1" } }} />

`animated-list-item` props.

<TypeTable type={{ children: { type: "React.ReactNode", description: "The
content of the list item." }, className: { type: "string", description:
"Additional CSS classes for custom styling." }, index: { type: "number",
description: "The position of the item in the list." }, listLength: { type:
"number", description: "The total number of items in the list." }, stackGap: {
type: "number", description: "Vertical spacing between items in the initial
stack formation.", default: "10" }, columnGap: { type: "number", description:
"Vertical spacing between items in the column formation.", default: "100" },
scaleFactor: { type: "number", description: "Factor used to scale items in the
initial stack formation.", default: "0.1" }, formationDuration: { type:
"number", description: "Duration of the column formation animation in seconds.",
default: "1" }, visibleItemsCount: { type: "number", description: "Number of
items visible in the initial stack.", default: "4" }, resetSpringStiffness: {
type: "number", description: "Spring animation stiffness for reset animation.",
default: "120" }, resetSpringDamping: { type: "number", description: "Spring
animation damping for reset animation.", default: "20" } }} />

# Border Beam

URL: /docs/components/border-beam

Displays an animated border effect with a glowing beam around the content that
adapts to the size of the container.

---

## title: Border Beam description: Displays an animated border effect with a glowing beam around the content that adapts to the size of the container. component: true

<ComponentPreview name="border-beam-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="Displays an animated border effect with a glowing beam" align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/border-beam.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge motion
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="border-beam" title="components/ui/border-beam.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { BorderBeam } from "@/components/ui/border-beam";
```

```tsx showLineNumbers
<div className="relative rounded-lg shadow-sm">
    <BorderBeam lightColor="#FAFAFA" lightWidth={350} duration={8} />
    <div className="h-full w-full py-4 px-6 max-w-72 space-y-2">
        <h3 className="font-gilroy text-2xl">Border Beam</h3>
        <p className="text-sm">
            This card showcases a dynamic border beam effect, adding a subtle,
            animated glow around the edges.
        </p>
    </div>
</div>;
```

## Props

`border-beam` props.

<TypeTable type={{ lightWidth: { type: "number", description: "Width of the
light beam effect in pixels.", default: "200" }, duration: { type: "number",
description: "Duration of the animation in seconds.", default: "10" },
lightColor: { type: "string", description: "Color of the light beam effect.",
default: '"#FAFAFA"' }, borderWidth: { type: "number", description: "Width of
the border in pixels.", default: "1" }, className: { type: "string",
description: "Additional custom classes." }, props: { type: "Record<string,
any>", description: "Additional HTML attributes for the component's wrapper
div." } }} />

## Credits

This component is inspired by [Resend](https://resend.com/home)

# Cloud Orbit

URL: /docs/components/cloud-orbit

This component creates a dynamic and interactive experience, where each icon
orbits in a fluid motion. Fully customizable, it's ideal for showcasing your
tech stack or the tools your product uses.

---

## title: Cloud Orbit description: This component creates a dynamic and interactive experience, where each icon orbits in a fluid motion. Fully customizable, it's ideal for showcasing your tech stack or the tools your product uses. component: true

<ComponentPreview name="cloud-orbit-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="A cloud orbit component" align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/cloud-orbit.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge motion
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="cloud-orbit" title="components/ui/cloud-orbit.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { CloudOrbit, OrbitingImage } from "@/registry/components/cloud-orbit";
```

```tsx showLineNumbers
const orbitingImagesData = [
  {
    speed: 20,
    radius: 119,
    size: 53,
    startAt: 0.15625,
    images: [
      {
        name: "Deepseek Logo",
        url: "/images/components/cloud-orbit/deepseek-logo.webp",
      },
      {
        name: "Drizzle ORM Logo",
        url: "/images/components/cloud-orbit/drizzle-orm-logo.webp",
      },
    ],
  },
  ...
];
```

```tsx showLineNumbers
<CloudOrbit
    duration={3}
    size={160}
    images={[
        {
            name: "Charlie Avatar",
            url: "/images/components/cloud-orbit/avatar-1.webp",
        },
        {
            name: "Tommy Avatar",
            url: "/images/components/cloud-orbit/avatar-2.webp",
        },
    ]}
    className=""
>
    {orbitingImagesData.map((orbit, index) => (
        <OrbitingImage
            key={index}
            speed={orbit.speed}
            radius={orbit.radius}
            size={orbit.size}
            startAt={orbit.startAt}
            images={orbit.images}
        />
    ))}
</CloudOrbit>;
```

<Callout>
  Placing the icons at the correct angle can be a bit tricky. For easier setup, use the positions from the demo and adjust them visually. If you need help, just reach out!
</Callout>

## Props

`cloud-orbit` props.

<TypeTable type={{ duration: { type: "number", description: "Duration of the
animation cycle in seconds.", default: "3" }, children: { type:
"React.ReactNode", description: "Child elements to be rendered inside the
component." }, size: { type: "number", description: "Size of the main orbit
container in pixels.", default: "160" }, className: { type: "string",
description: "Additional custom classes for styling." }, images: { type:
"Array<Object>", description: "Array of image objects, each containing a `url`
and `name`.", default: "[]" }, props: { type: "Record<string, any>",
description: "Additional HTML attributes for the component's wrapper div." } }}
/>

`orbiting-image` props.

<TypeTable type={{ speed: { type: "number", description: "Speed of the orbiting
motion (lower is slower).", default: "20" }, radius: { type: "number",
description: "Radius of the orbit path in pixels.", default: "100" }, startAt: {
type: "number", description: "Delay before animation starts, in seconds.",
default: "0" }, size: { type: "number", description: "Size of each orbiting
image in pixels.", default: "80" }, className: { type: "string", description:
"Additional custom classes for styling." }, images: { type: "Array<Object>",
description: "Array of image objects, each containing a `url` and `name`.",
default: "[]" }, duration: { type: "number", description: "Duration of the
animation cycle for each orbiting image.", default: "3" }, props: { type:
"Record<string, any>", description: "Additional HTML attributes for the
component's wrapper div." } }} />

## Disclaimer

We are not affiliated with any of the brands whose logos are used in this
component. These logos are displayed for demonstration purposes only.

# Cursor Cards

URL: /docs/components/cursor-card

Interactive cards with animated gradient borders that respond to cursor movement
and proximity. Inspired by Cursor's website.

---

## title: Cursor Cards description: Interactive cards with animated gradient borders that respond to cursor movement and proximity. Inspired by Cursor's website. component: true

<ComponentPreview name="cursor-card-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="Displays a card with a cursor effect that adapts to the size of the container." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/cursor-cards.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge motion
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="cursor-cards" title="components/ui/cursor-cards.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { CursorCard, CursorCardsContainer } from "@/components/ui/cursor-cards";
```

```tsx showLineNumbers
<CursorCardsContainer>
    <CursorCard>
        <div className="h-full w-full py-4 px-6 max-w-72 space-y-2">
            <h3 className="font-gilroy text-2xl">Cursor Card</h3>
            <p className="text-sm">
                This is a cursor card component.
            </p>
        </div>
    </CursorCard>
</CursorCardsContainer>;
```

## Props

`cursor-cards-container` props.

<TypeTable type={{ children: { type: "React.ReactNode", description: "The child
components to render inside the container." }, className: { type: "string",
description: "Additional custom classes." }, proximityRange: { type: "number",
description: "Range in pixels for detecting mouse proximity.", default: "400" }
}} />

`cursor-card` props.

<TypeTable type={{ children: { type: "React.ReactNode", description: "The
content to render inside the card." }, className: { type: "string", description:
"Additional custom classes." }, illuminationRadius: { type: "number",
description: "Radius of the illumination effect in pixels.", default: "200" },
illuminationColor: { type: "string", description: "Color of the illumination
effect.", default: '"#FFFFFF10"' }, illuminationOpacity: { type: "number",
description: "Opacity of the illumination effect (0-1).", default: "0.8" },
primaryHue: { type: "string", description: "Primary color for the gradient
border.", default: '"#93C5FD"' }, secondaryHue: { type: "string", description:
"Secondary color for the gradient border.", default: '"#2563EB"' }, borderColor:
{ type: "string", description: "Default border color when not hovering.",
default: '"#E5E5E5"' } }} />

## Credits

This component is inspired by [Cursor](https://www.cursor.com/).

# Dock

URL: /docs/components/dock

An interactive icon dock that smoothly scales icons/images on hover, providing a
responsive and engaging visual effect.

---

## title: Dock description: An interactive icon dock that smoothly scales icons/images on hover, providing a responsive and engaging visual effect. component: true

<ComponentPreview name="dock-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="Displays a dock with a smooth scaling effect that adapts to the size of the container." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/dock.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge motion
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="dock" title="components/ui/dock.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { Dock, DockIcon } from "@/components/ui/dock";
```

```tsx showLineNumbers
<Dock>
    <DockIcon
        src="/images/components/dock/tailwindcss-logo.webp"
        name="TailwindCSS"
        href="#tailwindcss"
    />
    <DockIcon
        name="Edge"
        src="/images/components/dock/edge-logo.webp"
        href="#linear"
    />
    <DockIcon
        name="Motion"
        src="/images/components/dock/motion-logo.webp"
        href="#motion"
    />
    ...
</Dock>;
```

<Callout>
  You can also pass icons as children if you don't want to use an image.
</Callout>

```tsx showLineNumbers
<Dock className="[&_svg]:size-6">
  <DockIcon name="Settings" href="#setings">
    <SettingsIcon>
  </DockIcon>
  ...
</Dock>
```

## Props

`Dock` props.

<TypeTable type={{ className: { type: "string", description: "Additional custom
classes for styling." }, children: { type: "React.ReactNode", description:
"Child elements to be rendered inside the Dock." }, maxAdditionalSize: { type:
"number", description: "Maximum additional size applied when hovering over
icons.", default: "5" }, iconSize: { type: "number", description: "Default size
of the icons in pixels.", default: "55" } }} />

`DockIcon` props.

<TypeTable type={{ className: { type: "string", description: "Additional custom
classes for styling." }, src: { type: "string", description: "The source URL for
the icon image." }, href: { type: "string", description: "The link the icon
should navigate to when clicked." }, name: { type: "string", description: "The
name of the icon, displayed as a tooltip on hover." }, handleIconHover: { type:
"(e: React.MouseEvent<HTMLLIElement>) => void", description: "Function to handle
hover events on the icon." }, children: { type: "React.ReactNode", description:
"Alternative to `src`: allows passing custom JSX elements." }, iconSize: { type:
"number", description: "The size of the icon in pixels.", default: "55" } }} />

## Disclaimer

We are not affiliated with any of the brands whose logos are used in this
component. These logos are displayed for demonstration purposes only.

# Expandable Card

URL: /docs/components/expandable-card

A versatile and engaging UI component that allows users to explore content in a
more immersive way.

---

## title: Expandable Card description: A versatile and engaging UI component that allows users to explore content in a more immersive way. component: true

<ComponentPreview name="expandable-card-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="Displays an expandable card." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/expandable-card.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge motion
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="expandable-card" title="components/ui/expandable-card.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { ExpandableCard } from "@/components/ui/expandable-card";
```

```tsx showLineNumbers
<ExpandableCard
    title="Whispering Forest"
    src="/images/components/expandable-card/haunted-house.webp"
    description="A Yokai Tale"
>
    {content}
</ExpandableCard>;
```

## Props

`ExpandableCard` props.

<TypeTable type={{ title: { type: "string", description: "The title displayed on
the card." }, src: { type: "string", description: "The URL of the image
displayed at the top of the card." }, description: { type: "string",
description: "A short description displayed below the title." }, children: {
type: "React.ReactNode", description: "Additional content displayed inside the
expanded card." }, className: { type: "string", description: "Custom CSS classes
for styling the card." }, classNameExpanded: { type: "string", description: "CSS
classes applied when the card is expanded." }, "[key: string]": { type: "any",
description: "Any additional props passed to the parent component." } }} />

## Credits

This component is inspired by [Linear](https://linear.app/).

# Flipping Card

URL: /docs/components/flipping-card

A two-sided card component that flips on hover, revealing content on its back
face. Ideal for interactive displays or showcasing additional information.

---

## title: Flipping Card description: A two-sided card component that flips on hover, revealing content on its back face. Ideal for interactive displays or showcasing additional information. component: true

<ComponentPreview name="flipping-card-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="A flipping card with a front and back face" align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/flipping-card.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="flipping-card" title="components/ui/flipping-card.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { FlippingCard } from "@/components/ui/flipping-card";
```

```tsx showLineNumbers
<FlippingCard
    frontContent={<div>Front Content</div>}
    backContent={<div>Back Content</div>}
/>;
```

## Props

`FlippingCard` props.

<TypeTable type={{ className: { type: "string", description: "Additional CSS
classes for styling the flipping card." }, height: { type: "number",
description: "Height of the card in pixels.", default: "300" }, width: { type:
"number", description: "Width of the card in pixels.", default: "350" },
frontContent: { type: "React.ReactNode", description: "Content to display on the
front face of the card." }, backContent: { type: "React.ReactNode", description:
"Content to display on the back face of the card." } }} />

# Animated Card 1

URL: /docs/animated-cards/animated-card-1

An animated hover card that can showcase almost anything—it all comes down to
the caption you choose.

---

## title: Animated Card 1 description: An animated hover card that can showcase almost anything—it all comes down to the caption you choose. component: true

<ComponentPreview name="animated-card-1-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="An animated hover card that can showcase almost anything—it all comes down to the caption you choose." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/animated-card-1.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="animated-card-1" title="components/ui/animated-card.tsx" />

      <ComponentSource name="animated-card-1" className="mt-20" fileName="visual-1" title="components/ui/visual-1.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import {
    AnimatedCard,
    CardBody,
    CardDescription,
    CardTitle,
    CardVisual,
} from "@/components/ui/animated-card";
import { Visual1 } from "@/components/ui/visual-1";
```

```tsx showLineNumbers
<AnimatedCard>
    <CardVisual>
        <Visual1 mainColor="#ff6900" secondaryColor="#f54900" />
    </CardVisual>
    <CardBody>
        <CardTitle>Just find the right caption</CardTitle>
        <CardDescription>
            This card will tell everything you want
        </CardDescription>
    </CardBody>
</AnimatedCard>;
```

## Props

`animated-card` props.

<TypeTable type={{ className: { type: "string", description: "Additional custom
classes." }, props: { type: "React.HTMLAttributes<HTMLDivElement>", description:
"Additional HTML attributes." } }} />

`visual-1` props.

<TypeTable type={{ mainColor: { type: "string", description: "Main color used
for certain elements in the component.", default: '"#8b5cf6"' }, secondaryColor:
{ type: "string", description: "Secondary color used for other elements in the
component.", default: '"#fbbf24"' }, gridColor: { type: "string", description:
"Grid background color for the component.", default: '"#80808015"' } }} />

## Note

- Many more cards are coming in the future. If you need a card for a specific
  theme, feel free to send me a request. If it's something that could benefit
  many people, I'll build it.

## Credits

This component is inspired by [Wope](https://wope.com/)

# Animated Card 2

URL: /docs/animated-cards/animated-card-2

An animated hover card that can showcase almost anything—it all comes down to
the caption you choose.

---

## title: Animated Card 2 description: An animated hover card that can showcase almost anything—it all comes down to the caption you choose. component: true

<ComponentPreview name="animated-card-2-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="An animated hover card that can showcase almost anything—it all comes down to the caption you choose." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/animated-card-2.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="animated-card-2" title="components/ui/animated-card.tsx" />

      <ComponentSource name="animated-card-2" className="mt-20" fileName="visual-2" title="components/ui/visual-2.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import {
    AnimatedCard,
    CardBody,
    CardDescription,
    CardTitle,
    CardVisual,
} from "@/components/ui/animated-card";
import { Visual2 } from "@/components/ui/visual-2";
```

```tsx showLineNumbers
<AnimatedCard>
    <CardVisual>
        <Visual2 mainColor="#ff6900" secondaryColor="#f54900" />
    </CardVisual>
    <CardBody>
        <CardTitle>Just find the right caption</CardTitle>
        <CardDescription>
            This card will tell everything you want
        </CardDescription>
    </CardBody>
</AnimatedCard>;
```

## Props

`animated-card` props.

<TypeTable type={{ className: { type: "string", description: "Additional custom
classes." }, props: { type: "React.HTMLAttributes<HTMLDivElement>", description:
"Additional HTML attributes." } }} />

`visual-2` props.

<TypeTable type={{ mainColor: { type: "string", description: "Main color used
for certain elements in the component.", default: '"#8b5cf6"' }, secondaryColor:
{ type: "string", description: "Secondary color used for other elements in the
component.", default: '"#fbbf24"' }, gridColor: { type: "string", description:
"Grid background color for the component.", default: '"#80808015"' } }} />

## Note

- Many more cards are coming in the future. If you need a card for a specific
  theme, feel free to send me a request. If it's something that could benefit
  many people, I'll build it.

## Credits

This component is inspired by [Wope](https://wope.com/)

# Animated Card 3

URL: /docs/animated-cards/animated-card-3

An animated hover card that can showcase almost anything—it all comes down to
the caption you choose.

---

## title: Animated Card 3 description: An animated hover card that can showcase almost anything—it all comes down to the caption you choose. component: true

<ComponentPreview name="animated-card-3-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="An animated hover card that can showcase almost anything—it all comes down to the caption you choose." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/animated-card-3.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="animated-card-3" title="components/ui/animated-card.tsx" />

      <ComponentSource name="animated-card-3" className="mt-20" fileName="visual-3" title="components/ui/visual-3.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import {
    AnimatedCard,
    CardBody,
    CardDescription,
    CardTitle,
    CardVisual,
} from "@/components/ui/animated-card";
import { Visual3 } from "@/components/ui/visual-3";
```

```tsx showLineNumbers
<AnimatedCard>
    <CardVisual>
        <Visual3 mainColor="#ff6900" secondaryColor="#f54900" />
    </CardVisual>
    <CardBody>
        <CardTitle>Just find the right caption</CardTitle>
        <CardDescription>
            This card will tell everything you want
        </CardDescription>
    </CardBody>
</AnimatedCard>;
```

## Props

`animated-card` props.

<TypeTable type={{ className: { type: "string", description: "Additional custom
classes." }, props: { type: "React.HTMLAttributes<HTMLDivElement>", description:
"Additional HTML attributes." } }} />

`visual-2` props.

<TypeTable type={{ mainColor: { type: "string", description: "Main color used
for certain elements in the component.", default: '"#8b5cf6"' }, secondaryColor:
{ type: "string", description: "Secondary color used for other elements in the
component.", default: '"#fbbf24"' }, gridColor: { type: "string", description:
"Grid background color for the component.", default: '"#80808015"' } }} />

## Note

- Many more cards are coming in the future. If you need a card for a specific
  theme, feel free to send me a request. If it's something that could benefit
  many people, I'll build it.

## Credits

This component is inspired by [Wope](https://wope.com/)

# Blur Reveal

URL: /docs/text-effects/blur-reveal

A text component that reveals its content with a smooth blur-to-focus animation,
activated by default when the text enters the viewport.

---

## title: Blur Reveal description: A text component that reveals its content with a smooth blur-to-focus animation, activated by default when the text enters the viewport. component: true

<ComponentPreview replayable name="blur-reveal-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="A text component that reveals its content with a smooth blur-to-focus animation, activated by default when the text enters the viewport." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/blur-reveal.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="blur-reveal" title="components/ui/blur-reveal.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { BlurReveal } from "@/components/ui/blur-reveal";
```

```tsx showLineNumbers
<BlurReveal>This is a title</BlurReveal>;
```

## Props

`BlurReveal` props.

<TypeTable type={{ className: { type: "string", description: "Additional custom
classes for styling." }, children: { type: "React.ReactNode", description:
"Child elements to be rendered inside the component." }, delay: { type:
"number", description: "Delay before the animation starts, in seconds.",
default: "0" }, duration: { type: "number", description: "Duration of the
animation effect, in seconds.", default: "1" } }} />

## Credits

This component is inspired by [Linear](https://linear.app/)

# Fade Up Word

URL: /docs/text-effects/fade-up-word

A text component that reveals its content with a smooth fade-up animation,
activated by default when the text enters the viewport.

---

## title: Fade Up Word description: A text component that reveals its content with a smooth fade-up animation, activated by default when the text enters the viewport. component: true

<ComponentPreview replayable name="fade-up-word-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="A text component that reveals its content with a smooth fade-up animation, activated by default when the text enters the viewport." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/fade-up-word.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="fade-up-word" title="components/ui/fade-up-word.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { FadeUpWord } from "@/components/ui/fade-up-word";
```

```tsx showLineNumbers
<FadeUpWord>Lorem ipsum dolor sit amet</FadeUpWord>;
```

## Props

`FadeUpWord` props.

<TypeTable type={{ as: { type: '"h1" | "h2" | "h3" | "h4"', description: "HTML
heading level to use.", default: '"h2"' }, className: { type: "string",
description: "Additional CSS classes for custom styling." }, children: { type:
"string", description: "Text to animate (each word will be animated
separately)." } }} />

# Stagger Blur Effect

URL: /docs/text-effects/stagger-blur-effect

Inspired by Vercel's homepage, this text component creates a 3D rotation effect
with blur on hover, revealing text with a staggered animation.

---

## title: Stagger Blur Effect description: Inspired by Vercel's homepage, this text component creates a 3D rotation effect with blur on hover, revealing text with a staggered animation. component: true

<ComponentPreview name="stagger-blur-effect-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="Inspired by Vercel's homepage, this text component creates a 3D rotation effect with blur on hover, revealing text with a staggered animation." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/stagger-blur-effect.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="stagger-blur-effect" title="components/ui/stagger-blur-effect.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { StaggerBlurEffect } from "@/components/ui/stagger-blur-effect";
```

```tsx showLineNumbers
<StaggerBlurEffect>I &lt;3 Vercel</StaggerBlurEffect>;
```

## Props

`StaggerBlurEffect` props.

<TypeTable type={{ className: { type: "string", description: "Additional CSS
classes for custom styling." }, children: { type: "ReactNode", description:
"Text content to animate." }, duration: { type: "number", description: "Duration
of the animation in seconds.", default: "0.3" }, staggerDelay: { type: "number",
description: "Delay between each letter animation in seconds.", default: "0.05"
}, height: { type: "number", description: "Height of the text container in
pixels.", default: "56" } }} />

# Shuffle Button

URL: /docs/buttons/shuffle-button

A dynamic button that shuffles the characters of its text when hovered over,
creating an engaging animation.

---

## title: Shuffle Button description: A dynamic button that shuffles the characters of its text when hovered over, creating an engaging animation. component: true

<ComponentPreview name="shuffle-button-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="A dynamic button that shuffles the characters of its text when hovered over, creating an engaging animation." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/shuffle-button.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="shuffle-button" title="components/ui/shuffle-button.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { ShuffleButton } from "@/components/ui/shuffle-button";
```

```tsx showLineNumbers
<ShuffleButton>Hover Me</ShuffleButton>;
```

<Callout type="warning">
  For the best effect, we recommend using a monospace font or applying a fixed width.
</Callout>

## Props

`ShuffleButton` props.

<TypeTable type={{ children: { type: "React.ReactNode", description: "The
content inside the button.", required: true }, className: { type: "string",
description: "Additional custom classes for styling." }, angle: { type:
"number", description: "The direction in which the confetti is fired, in
degrees.", default: "90" }, particleCount: { type: "number", description: "The
number of confetti particles emitted on click.", default: "75" }, startVelocity:
{ type: "number", description: "The initial velocity of the confetti
particles.", default: "35" }, spread: { type: "number", description: "The spread
angle of the confetti explosion.", default: "70" } }} />

# Stagger Button

URL: /docs/buttons/stagger-button

A dynamic button that animates on hover, where each letter of the text flips in
3D with a staggered effect.

---

## title: Stagger Button description: A dynamic button that animates on hover, where each letter of the text flips in 3D with a staggered effect. component: true

<ComponentPreview name="stagger-button-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="A dynamic button that animates on hover, where each letter of the text flips in 3D with a staggered effect." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/stagger-button.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge motion
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="stagger-button" title="components/ui/stagger-button.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { StaggerButton } from "@/components/ui/stagger-button";
```

```tsx showLineNumbers
<StaggerButton>
    Hover Me
</StaggerButton>;
```

## Props

`StaggerButton` props.

<TypeTable type={{ children: { type: "ReactNode", description: "The text or
elements to display and animate inside the button." }, className: { type:
"string", description: "Additional custom classes for styling." }, duration: {
type: "number", description: "Duration of the animation for each character flip
(in seconds).", default: "0.2" }, staggerDelay: { type: "number", description:
"Delay between the animations of each character (in seconds).", default: "0.05"
}, height: { type: "number", description: "The height of the button, affecting
the 3D flip effect.", default: "26" } }} />

# Like Button

URL: /docs/buttons/like-button

A dynamic button that animates on click, creating a burst of heart icons that
randomly scatter before fading out.

---

## title: Like Button description: A dynamic button that animates on click, creating a burst of heart icons that randomly scatter before fading out. component: true

<ComponentPreview name="like-button-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[80%] **:[.preview]:min-h-[400px]" description="A dynamic button that animates on click, creating a burst of heart icons that randomly scatter before fading out." align="center" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="cli">
    ```bash
    npx shadcn@latest add https://badtz-ui.com/r/like-button.json
    ```
  </TabsContent>

<TabsContent value="manual">
    <Steps>
      <Step>Install the following dependencies:</Step>

      ```bash
      npm install clsx tailwind-merge motion
      ```

      <Step>Add the `utils` file to the `@/lib` folder</Step>

      ```tsx showLineNumbers
      import { ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";

      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
      ```

      <Step>Copy and paste the following code into your project.</Step>

      <ComponentSource name="like-button" title="components/ui/like-button.tsx" />

      <Step>Update the import paths to match your project setup.</Step>
    </Steps>

</TabsContent>
</CodeTabs>

## Usage

```tsx showLineNumbers
import { LikeButton } from "@/components/ui/buttons/like-button";
```

```tsx showLineNumbers
<LikeButton>
    Like
</LikeButton>;
```

## Props

`LikeButton` props.

<TypeTable type={{ children: { type: "ReactNode", description: "The text or
elements to display inside the button." }, className: { type: "string",
description: "Additional custom classes for styling." }, iconCount: { type:
"number", description: "The number of heart icons to animate when the button is
clicked.", default: "20" } }} />

import { Card } from '@/components/ui/card' import { Shield } from
'lucide-react' import { Vercel } from '@/components/ui/svgs/vercel' import {
Supabase } from '@/components/ui/svgs/supabase' import { Linear } from
'@/components/ui/svgs/linear' import { Slack } from '@/components/ui/svgs/slack'
import { Firebase } from '@/components/ui/svgs/firebase' import { ClerkIconDark
as Clerk } from '@/components/ui/svgs/clerk'

export default function Features() { return (
<section className="bg-background @container py-24">
<div className="mx-auto max-w-2xl px-6">
<div>
<h2 className="text-balance font-serif text-4xl font-medium">Powerful Features
for Modern Teams</h2>
<p className="text-muted-foreground mt-4 text-balance">Everything you need to
build, connect, and scale your integrations effortlessly.</p>
</div>
<div className="@xl:grid-cols-2 mt-12 grid gap-3 *:p-6">
<Card
                        variant="outline"
                        className="row-span-2 grid grid-rows-subgrid">
<div className="space-y-2">
<h3 className="text-foreground font-medium">Seamless Integrations</h3>
<p className="text-muted-foreground text-sm">Connect your favorite tools and
services with just a few clicks.</p>
</div>
<div
                            aria-hidden
                            className="**:fill-foreground flex h-44 flex-col justify-between pt-8">
<div className="relative flex h-10 items-center gap-12 px-6">
<div className="bg-border absolute inset-0 my-auto h-px"></div>

                                <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                                    <Vercel className="size-3.5" />
                                </div>
                                <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                                    <Slack className="size-3.5" />
                                </div>
                            </div>
                            <div className="pl-17 relative flex h-10 items-center justify-between gap-12 pr-6">
                                <div className="bg-border absolute inset-0 my-auto h-px"></div>

                                <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                                    <Clerk className="size-3.5" />
                                </div>
                                <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                                    <Linear className="size-3.5" />
                                </div>
                            </div>
                            <div className="relative flex h-10 items-center gap-20 px-8">
                                <div className="bg-border absolute inset-0 my-auto h-px"></div>

                                <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                                    <Supabase className="size-3.5" />
                                </div>
                                <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                                    <Firebase className="size-3.5" />
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card
                        variant="outline"
                        className="row-span-2 grid grid-rows-subgrid overflow-hidden">
                        <div className="space-y-2">
                            <h3 className="text-foreground font-medium">Real-time Sync</h3>
                            <p className="text-muted-foreground text-sm">Keep your data synchronized across all platforms automatically.</p>
                        </div>
                        <div
                            aria-hidden
                            className="relative h-44 translate-y-6">
                            <div className="bg-foreground/15 absolute inset-0 mx-auto w-px"></div>
                            <div className="absolute -inset-x-16 top-6 aspect-square rounded-full border"></div>
                            <div className="border-primary mask-l-from-50% mask-l-to-90% mask-r-from-50% mask-r-to-50% absolute -inset-x-16 top-6 aspect-square rounded-full border"></div>
                            <div className="absolute -inset-x-8 top-24 aspect-square rounded-full border"></div>
                            <div className="mask-r-from-50% mask-r-to-90% mask-l-from-50% mask-l-to-50% absolute -inset-x-8 top-24 aspect-square rounded-full border border-lime-500"></div>
                        </div>
                    </Card>
                    <Card
                        variant="outline"
                        className="row-span-2 grid grid-rows-subgrid overflow-hidden">
                        <div className="space-y-2">
                            <h3 className="text-foreground font-medium">Developer First</h3>
                            <p className="text-muted-foreground mt-2 text-sm">Built with developers in mind, featuring comprehensive APIs and SDKs.</p>
                        </div>
                        <div
                            aria-hidden
                            className="*:bg-foreground/15 flex h-44 justify-between pb-6 pt-12 *:h-full *:w-px">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="bg-primary!"></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="bg-primary!"></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="bg-primary!"></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="bg-primary!"></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="bg-primary!"></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="bg-primary!"></div>
                        </div>
                    </Card>
                    <Card
                        variant="outline"
                        className="row-span-2 grid grid-rows-subgrid">
                        <div className="space-y-2">
                            <h3 className="font-medium">Enterprise Ready</h3>
                            <p className="text-muted-foreground text-sm">Scale confidently with enterprise-grade security and reliability.</p>
                        </div>

                        <div className="pointer-events-none relative -ml-7 flex size-44 items-center justify-center pt-5">
                            <Shield className="absolute inset-0 top-2.5 size-full stroke-[0.1px] opacity-15" />
                            <Shield className="size-32 stroke-[0.1px]" />
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )

}

"use client";

import "@/components/kibo-ui/typography"; import Image from "next/image";

const Example = () => (

<div className="size-full overflow-y-auto">
    <div className="typography">
      <h1>Styling the Web: A Modern CSS Journey</h1>

      <p>
        CSS has come a long way since its inception. From simple layout tweaks
        to complex responsive designs, it's become an essential tool for
        crafting delightful web experiences. In this article, we’ll explore
        various HTML elements commonly styled with modern CSS utility systems
        like <code>tailwindcss</code>
        and component libraries.
      </p>

      <h2>Introduction</h2>
      <p>
        Web design today is more accessible than ever. Thanks to utility-first
        frameworks and component-based architectures, developers can build
        beautiful UIs with less effort.
      </p>

      <h3>Key Benefits of Utility CSS</h3>
      <ul>
        <li>Faster development</li>
        <li>Consistent design system</li>
        <li>Better collaboration between dev and design</li>
      </ul>

      <h3>What You Need</h3>
      <ol>
        <li>Basic HTML/CSS knowledge</li>
        <li>Code editor (e.g., VS Code)</li>
        <li>Modern browser for testing</li>
      </ol>

      <h2>Checklist</h2>
      <ul>
        <li>
          <input checked disabled type="checkbox" /> <p>Install Tailwind CSS</p>
        </li>
        <li>
          <input disabled type="checkbox" /> <p>Configure PostCSS</p>
        </li>
        <li>
          <input disabled type="checkbox" /> <p>Create base components</p>
        </li>
      </ul>

      <h2>Sample Image</h2>
      <p>
        Here's a sample image to test image styling. Make sure it scales well on
        all screen sizes.
      </p>
      <center>
        <Image
          alt="Cute kitten"
          height={400}
          src="https://placehold.co/600x400"
          unoptimized
          width={600}
        />
      </center>

      <h2>Code Example</h2>
      <pre>
        <code>{`/* Tailwind example */

.button { @apply px-4 py-2 bg-blue-600 text-white rounded; }`}</code>
</pre>

      <h2>Blockquote</h2>
      <blockquote>
        "Design is not just what it looks like and feels like. Design is how it
        works." — Steve Jobs
      </blockquote>

      <h2>Table Example</h2>
      <table>
        <thead>
          <tr>
            <th>Framework</th>
            <th>Type</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tailwind CSS</td>
            <td>Utility-First</td>
            <td>70k+</td>
          </tr>
          <tr>
            <td>Bootstrap</td>
            <td>Component-Based</td>
            <td>160k+</td>
          </tr>
          <tr>
            <td>Bulma</td>
            <td>Utility/Component Hybrid</td>
            <td>45k+</td>
          </tr>
        </tbody>
      </table>

      <h2>Inline Elements</h2>
      <p>
        You can <strong>bold</strong> text, <em>italicize</em> it,{" "}
        <u>underline</u> it, or even add <a href="https://example.com">links</a>
        . Here’s some <code>inline code</code> too.
      </p>

      <h2>Definition List</h2>
      <dl>
        <dt>CSS</dt>
        <dd>Cascading Style Sheets</dd>
        <dt>HTML</dt>
        <dd>HyperText Markup Language</dd>
        <dt>JS</dt>
        <dd>JavaScript</dd>
      </dl>

      <h2>Details and Summary</h2>
      <details>
        <summary>Click to expand additional info</summary>
        <p>
          Utility CSS simplifies the process of managing and scaling CSS in
          large projects.
        </p>
      </details>

      <h2>Inline Elements</h2>
      <p>
        You can <strong>bold</strong> text, <em>italicize</em> it,{" "}
        <u>underline</u> it, or even add <a href="https://example.com">links</a>
        . Here’s some <code>inline code</code> too.{" "}
        <mark>Highlight important info</mark> and <small>small text size</small>
        . <abbr title="HyperText Markup Language">HTML</abbr> is the foundation
        of the web.
      </p>

      <h2>Superscript & Subscript</h2>
      <p>
        E = mc<sup>2</sup> is Einstein's mass-energy equivalence. Water is H
        <sub>2</sub>O.
      </p>

      <h2>Conclusion</h2>
      <p>
        Whether you're using Tailwind, vanilla CSS, or any other system, a solid
        understanding of how HTML elements behave is key to great styling. Test
        extensively to ensure consistent, accessible results across devices.
      </p>
    </div>

</div>
);

export default Example;

"use client";

import type { Editor, JSONContent } from "@/components/kibo-ui/editor"; import {
EditorBubbleMenu, EditorCharacterCount, EditorClearFormatting,
EditorFloatingMenu, EditorFormatBold, EditorFormatCode, EditorFormatItalic,
EditorFormatStrike, EditorFormatSubscript, EditorFormatSuperscript,
EditorFormatUnderline, EditorLinkSelector, EditorNodeBulletList, EditorNodeCode,
EditorNodeHeading1, EditorNodeHeading2, EditorNodeHeading3,
EditorNodeOrderedList, EditorNodeQuote, EditorNodeTable, EditorNodeTaskList,
EditorNodeText, EditorProvider, EditorSelector, EditorTableColumnAfter,
EditorTableColumnBefore, EditorTableColumnDelete, EditorTableColumnMenu,
EditorTableDelete, EditorTableFix, EditorTableGlobalMenu,
EditorTableHeaderColumnToggle, EditorTableHeaderRowToggle, EditorTableMenu,
EditorTableMergeCells, EditorTableRowAfter, EditorTableRowBefore,
EditorTableRowDelete, EditorTableRowMenu, EditorTableSplitCell, } from
"@/components/kibo-ui/editor"; import { useState } from "react";

const Example = () => { const [content, setContent] = useState<JSONContent>({
type: "doc", content: [ { type: "heading", attrs: { level: 1 }, content: [{
type: "text", text: "Heading 1" }], }, { type: "heading", attrs: { level: 2 },
content: [{ type: "text", text: "Heading 2" }], }, { type: "heading", attrs: {
level: 3 }, content: [{ type: "text", text: "Heading 3" }], }, { type:
"heading", attrs: { level: 4 }, content: [{ type: "text", text: "Heading 4" }],
}, { type: "heading", attrs: { level: 5 }, content: [{ type: "text", text:
"Heading 5" }], }, { type: "heading", attrs: { level: 6 }, content: [{ type:
"text", text: "Heading 6" }], }, { type: "paragraph" }, { type: "paragraph",
content: [{ type: "text", text: "Hello, world." }] }, { type: "paragraph" }, {
type: "taskList", content: [ { type: "taskItem", attrs: { checked: false },
content: [ { type: "paragraph", content: [{ type: "text", text: "This is a todo
list" }], }, ], }, { type: "taskItem", attrs: { checked: false }, content: [ {
type: "paragraph", content: [{ type: "text", text: "With two items" }], }, ], },
], }, { type: "paragraph" }, { type: "bulletList", content: [ { type:
"listItem", content: [ { type: "paragraph", content: [{ type: "text", text:
"This is an unordered list" }], }, { type: "bulletList", content: [ { type:
"listItem", content: [ { type: "paragraph", content: [{ type: "text", text:
"With a nested item" }], }, ], }, ], }, ], }, ], }, { type: "paragraph" }, {
type: "orderedList", attrs: { start: 1 }, content: [ { type: "listItem",
content: [ { type: "paragraph", content: [{ type: "text", text: "This is an
ordered list" }], }, ], }, { type: "listItem", content: [ { type: "paragraph",
content: [{ type: "text", text: "With two items" }], }, ], }, ], }, { type:
"paragraph" }, { type: "blockquote", content: [ { type: "paragraph", content: [
{ type: "text", text: "This is a quote, probably by someone famous.", }, ], },
], }, { type: "paragraph" }, { type: "paragraph", content: [ { type: "text",
text: "This is some " }, { type: "text", marks: [{ type: "code" }], text:
"inline code" }, { type: "text", text: ", while this is a code block:" }, ], },
{ type: "paragraph" }, { type: "codeBlock", attrs: { language: null }, content:
[ { type: "text", text: "function x () {\\n console.log('hello, world.');\\n}",
}, ], }, { type: "paragraph" }, { type: "paragraph", content: [ { type: "text",
text: "You can also create complex tables, like so:", }, ], }, { type: "table",
content: [ { type: "tableRow", content: [ { type: "tableHeader", attrs: {
colspan: 1, rowspan: 1, colwidth: null }, content: [ { type: "paragraph",
content: [{ type: "text", text: "Here’s a column" }], }, ], }, { type:
"tableHeader", attrs: { colspan: 1, rowspan: 1, colwidth: null }, content: [ {
type: "paragraph", content: [{ type: "text", text: "Another column" }], }, ], },
{ type: "tableHeader", attrs: { colspan: 1, rowspan: 1, colwidth: null },
content: [ { type: "paragraph", content: [{ type: "text", text: "Yet another"
}], }, ], }, ], }, { type: "tableRow", content: [ { type: "tableCell", attrs: {
colspan: 1, rowspan: 1, colwidth: null }, content: [ { type: "paragraph",
content: [{ type: "text", text: "Cell 1A" }], }, ], }, { type: "tableCell",
attrs: { colspan: 1, rowspan: 1, colwidth: null }, content: [ { type:
"paragraph", content: [{ type: "text", text: "Cell 2A" }], }, ], }, { type:
"tableCell", attrs: { colspan: 1, rowspan: 1, colwidth: null }, content: [ {
type: "paragraph", content: [{ type: "text", text: "Cell 3A" }], }, ], }, ], },
{ type: "tableRow", content: [ { type: "tableCell", attrs: { colspan: 1,
rowspan: 1, colwidth: null }, content: [ { type: "paragraph", content: [{ type:
"text", text: "Cell 1B" }], }, ], }, { type: "tableCell", attrs: { colspan: 1,
rowspan: 1, colwidth: null }, content: [ { type: "paragraph", content: [{ type:
"text", text: "Cell 2B" }], }, ], }, { type: "tableCell", attrs: { colspan: 1,
rowspan: 1, colwidth: null }, content: [ { type: "paragraph", content: [{ type:
"text", text: "Cell 3B" }], }, ], }, ], }, ], }, ], });

const handleUpdate = ({ editor }: { editor: Editor }) => { const json =
editor.getJSON();

    setContent(json);
    console.log(JSON.stringify(json));

};

return (
<EditorProvider
      className="h-full w-full overflow-y-auto rounded-lg border bg-background p-4"
      content={content}
      onUpdate={handleUpdate}
      placeholder="Start typing..."
    >
<EditorFloatingMenu>
<EditorNodeHeading1 hideName />
<EditorNodeBulletList hideName />
<EditorNodeQuote hideName />
<EditorNodeCode hideName />
<EditorNodeTable hideName />
</EditorFloatingMenu>
<EditorBubbleMenu>
<EditorSelector title="Text">
<EditorNodeText />
<EditorNodeHeading1 />
<EditorNodeHeading2 />
<EditorNodeHeading3 />
<EditorNodeBulletList />
<EditorNodeOrderedList />
<EditorNodeTaskList />
<EditorNodeQuote />
<EditorNodeCode />
</EditorSelector>
<EditorSelector title="Format">
<EditorFormatBold />
<EditorFormatItalic />
<EditorFormatUnderline />
<EditorFormatStrike />
<EditorFormatCode />
<EditorFormatSuperscript />
<EditorFormatSubscript />
</EditorSelector>
<EditorLinkSelector />
<EditorClearFormatting />
</EditorBubbleMenu>
<EditorTableMenu>
<EditorTableColumnMenu>
<EditorTableColumnBefore />
<EditorTableColumnAfter />
<EditorTableColumnDelete />
</EditorTableColumnMenu>
<EditorTableRowMenu>
<EditorTableRowBefore />
<EditorTableRowAfter />
<EditorTableRowDelete />
</EditorTableRowMenu>
<EditorTableGlobalMenu>
<EditorTableHeaderColumnToggle />
<EditorTableHeaderRowToggle />
<EditorTableDelete />
<EditorTableMergeCells />
<EditorTableSplitCell />
<EditorTableFix />
</EditorTableGlobalMenu>
</EditorTableMenu> <EditorCharacterCount.Words>Words:
</EditorCharacterCount.Words>
</EditorProvider> ); };

export default Example;

"use client";

import { Pill, PillAvatar, PillAvatarGroup, PillButton, PillDelta, PillIcon,
PillIndicator, PillStatus, } from "@/components/kibo-ui/pill"; import {
CheckCircleIcon, UsersIcon, XIcon } from "lucide-react";

const Example = () => (

<div className="flex flex-wrap items-center justify-center gap-2">
    <Pill>
      <PillAvatar
        fallback="HB"
        src="https://pbs.twimg.com/profile_images/1748718473595789312/PbqJh9hk_400x400.jpg"
      />
      @haydenbleasel
    </Pill>
    <Pill>
      <PillStatus>
        <CheckCircleIcon className="text-emerald-500" size={12} />
        Passed
      </PillStatus>
      Approval Status
    </Pill>
    <Pill>
      #kibo-ui
      <PillButton size="icon" variant="ghost">
        <XIcon size={12} />
      </PillButton>
    </Pill>
    <Pill>
      <PillIndicator pulse variant="success" />
      Active
    </Pill>
    <Pill>
      <PillIndicator variant="error" />
      Error
    </Pill>
    <Pill>
      <PillDelta delta={10} />
      Up 10%
    </Pill>
    <Pill>
      <PillDelta delta={-5} />
      Down 5%
    </Pill>
    <Pill>
      <PillDelta delta={0} />
      No change
    </Pill>
    <Pill>
      <PillIcon icon={UsersIcon} />
      17 users
    </Pill>
    <Pill>
      <PillAvatarGroup>
        <PillAvatar
          fallback="HB"
          src="https://pbs.twimg.com/profile_images/1748718473595789312/PbqJh9hk_400x400.jpg"
        />
        <PillAvatar
          fallback="SC"
          src="https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg"
        />
        <PillAvatar
          fallback="LR"
          src="https://pbs.twimg.com/profile_images/1862717563311968256/xfgt1L9l_400x400.jpg"
        />
      </PillAvatarGroup>
      Loved by millions
    </Pill>
  </div>
);

export default Example;

"use client";

import { QRCode } from "@/components/kibo-ui/qr-code";

const Example = () => <QRCode data="https://www.haydenbleasel.com/" />;

export default Example;

"use client";

import { Rating, RatingButton } from "@/components/kibo-ui/rating";

const Example = () => (
<Rating defaultValue={3}> {Array.from({ length: 5 }).map((_, index) => (
<RatingButton key={index} /> ))}
</Rating> );

export default Example;

"use client";

import { RelativeTime, RelativeTimeZone, RelativeTimeZoneDate,
RelativeTimeZoneDisplay, RelativeTimeZoneLabel, } from
"@/components/kibo-ui/relative-time";

const timezones = [ { label: "EST", zone: "America/New_York" }, { label: "GMT",
zone: "Europe/London" }, { label: "JST", zone: "Asia/Tokyo" }, ];

const Example = () => (

<div className="rounded-md border bg-background p-4">
    <RelativeTime>
      {timezones.map(({ zone, label }) => (
        <RelativeTimeZone key={zone} zone={zone}>
          <RelativeTimeZoneLabel>{label}</RelativeTimeZoneLabel>
          <RelativeTimeZoneDate />
          <RelativeTimeZoneDisplay />
        </RelativeTimeZone>
      ))}
    </RelativeTime>
  </div>
);

export default Example;

Spinner The Spinner component expands the shadcn spinner component with
additional variants.

Code Preview

"use client"; import { Spinner } from "@/components/kibo-ui/spinner"; const
Example = () => <Spinner />; export default Example; Installation Kibo UI CLI
shadcn CLI

npx kibo-ui add spinner You can replace the shadcn spinner with this component
to get the additional variants.

import { Spinner } from "@/components/ui/spinner"; import { Spinner } from
"@/components/kibo-ui/spinner"; Features Multiple size variants (sm, default,
lg) Multiple variants (throbber, pinwheel, circle-filled, etc.) Default variant
is the shadcn spinner Customizable colors and styles Accessible loading
indicator Examples Variants Code Preview

"use client"; import { Spinner, type SpinnerProps } from
"@/components/kibo-ui/spinner"; const variants: SpinnerProps["variant"][] = [
"default", "throbber", "pinwheel", "circle-filled", "ellipsis", "ring", "bars",
"infinite", ]; const Example = () => (

<div className="grid h-screen w-full grid-cols-4 items-center justify-center gap-8">
    {variants.map((variant) => (
      <div
        className="flex flex-col items-center justify-center gap-4"
        key={variant}
      >
        <Spinner key={variant} variant={variant} />
        <span className="font-mono text-muted-foreground text-xs">
          {variant}
        </span>
      </div>
    ))}
  </div>
);
export default Example;
Customization
Code
Preview

"use client"; import { Spinner } from "@/components/kibo-ui/spinner"; const
Example = () => <Spinner className="text-blue-500" size={64} />; export default
Example;

Status Status components are used to display the uptime of a service.

Code Preview

"use client"; import { Status, StatusIndicator, StatusLabel } from
"@/components/kibo-ui/status"; const Example = () => (

<div className="flex gap-2">
    <Status status="online">
      <StatusIndicator />
      <StatusLabel />
    </Status>
    <Status status="offline">
      <StatusIndicator />
      <StatusLabel />
    </Status>
    <Status status="maintenance">
      <StatusIndicator />
      <StatusLabel />
    </Status>
    <Status status="degraded">
      <StatusIndicator />
      <StatusLabel />
    </Status>
  </div>
);
export default Example;
Installation
Kibo UI CLI
shadcn CLI

npx kibo-ui add status Features Displays the status of a service Automatic
colors based on the status Customizable colors and labels Ping animation for the
indicator Examples Custom styles Code Preview

"use client"; import { Status, StatusIndicator, StatusLabel } from
"@/components/kibo-ui/status"; const Example = () => ( <Status className="gap-4
rounded-full px-6 py-2 text-sm" status="online" variant="outline"



    <StatusIndicator />
    <StatusLabel className="font-mono">Fully operational</StatusLabel>

</Status>
);
export default Example;

Tree A composable tree component with animated expand/collapse and customizable
nodes for displaying hierarchical data structures.

Code Preview

"use client"; import { TreeExpander, TreeIcon, TreeLabel, TreeNode,
TreeNodeContent, TreeNodeTrigger, TreeProvider, TreeView, } from
"@/components/kibo-ui/tree"; import { FileCode, FileJson, FileText } from
"lucide-react"; export default function TreeExample() { return ( <TreeProvider
defaultExpandedIds={["src", "components", "ui"]} onSelectionChange={(ids) =>
console.log("Selected:", ids)} >
<TreeView>
<TreeNode nodeId="src">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>src</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={1} nodeId="components">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>components</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="ui">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>ui</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={3} nodeId="button.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>button.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode level={3} nodeId="card.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>card.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={3} nodeId="dialog.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>dialog.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode isLast level={2} nodeId="layout">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>layout</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={3} nodeId="header.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>header.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={3} nodeId="footer.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>footer.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode nodeId="public">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>public</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode isLast level={1} nodeId="images">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>images</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="logo.svg">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileText className="h-4 w-4" />} />
<TreeLabel>logo.svg</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="hero.png">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileText className="h-4 w-4" />} />
<TreeLabel>hero.png</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode nodeId="package.json">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileJson className="h-4 w-4" />} />
<TreeLabel>package.json</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode nodeId="tsconfig.json">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileJson className="h-4 w-4" />} />
<TreeLabel>tsconfig.json</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast nodeId="README.md">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileText className="h-4 w-4" />} />
<TreeLabel>README.md</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeView>
</TreeProvider> ); } Installation Kibo UI CLI shadcn CLI

npx kibo-ui add tree Features Animated expand/collapse with configurable
animations Customizable node icons and labels Single and multi-selection support
Optional tree lines for visual hierarchy Keyboard navigation support (Ctrl/Cmd
for multi-select) Fully composable API for custom tree nodes Built-in
folder/file icons with open/closed states Examples Simple tree Code Preview

"use client"; import { TreeExpander, TreeIcon, TreeLabel, TreeNode,
TreeNodeContent, TreeNodeTrigger, TreeProvider, TreeView, } from
"@/components/kibo-ui/tree"; export default function TreeSimpleExample() {
return (
<TreeProvider>
<TreeView>
<TreeNode nodeId="documents">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Documents</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={1} nodeId="work">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Work</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="project-a">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Project A.pdf</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="project-b">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Project B.pdf</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode isLast level={1} nodeId="personal">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Personal</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="resume">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Resume.docx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="cover-letter">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Cover Letter.docx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode isLast nodeId="downloads">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Downloads</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={1} nodeId="installer">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>installer.exe</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={1} nodeId="update">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>update.zip</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeView>
</TreeProvider> ); } Custom icons Code Preview

"use client"; import { TreeExpander, TreeIcon, TreeLabel, TreeNode,
TreeNodeContent, TreeNodeTrigger, TreeProvider, TreeView, } from
"@/components/kibo-ui/tree"; import { Database, Globe, Key, Lock, Server,
Shield, Table, User, Users, } from "lucide-react"; export default function
TreeCustomIconsExample() { return ( <TreeProvider
defaultExpandedIds={["database", "users-table", "roles-table", "api"]} >
<TreeView>
<TreeNode nodeId="database">
<TreeNodeTrigger>
<TreeExpander hasChildren /> <TreeIcon hasChildren
icon={<Database className="h-4 w-4 text-blue-500" />} />
<TreeLabel>Database</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={1} nodeId="users-table">
<TreeNodeTrigger>
<TreeExpander hasChildren /> <TreeIcon hasChildren
icon={<Table className="h-4 w-4 text-green-500" />} />
<TreeLabel>Users</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="id-field">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<Key className="h-4 w-4 text-yellow-500" />} />
<TreeLabel>id</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode level={2} nodeId="email-field">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<Globe className="h-4 w-4 text-purple-500" />}
/>
<TreeLabel>email</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="password-field">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<Lock className="h-4 w-4 text-red-500" />} />
<TreeLabel>password</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode isLast level={1} nodeId="roles-table">
<TreeNodeTrigger>
<TreeExpander hasChildren /> <TreeIcon hasChildren
icon={<Table className="h-4 w-4 text-green-500" />} />
<TreeLabel>Roles</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="admin-role">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<Shield className="h-4 w-4 text-orange-500" />}
/>
<TreeLabel>Admin</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="user-role">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<User className="h-4 w-4 text-blue-400" />} />
<TreeLabel>User</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode isLast nodeId="api">
<TreeNodeTrigger>
<TreeExpander hasChildren /> <TreeIcon hasChildren
icon={<Server className="h-4 w-4 text-indigo-500" />} />
<TreeLabel>API</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={1} nodeId="auth-endpoint">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<Lock className="h-4 w-4 text-red-500" />} />
<TreeLabel>Authentication</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={1} nodeId="users-endpoint">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<Users className="h-4 w-4 text-blue-500" />} />
<TreeLabel>Users Management</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeView>
</TreeProvider> ); } Without lines Code Preview

"use client"; import { TreeExpander, TreeIcon, TreeLabel, TreeNode,
TreeNodeContent, TreeNodeTrigger, TreeProvider, TreeView, } from
"@/components/kibo-ui/tree"; export default function TreeNoLinesExample() {
return ( <TreeProvider defaultExpandedIds={["projects", "website-redesign"]}
showLines={false} >
<TreeView>
<TreeNode nodeId="projects">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Projects</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={1} nodeId="website-redesign">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Website Redesign</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="homepage">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Homepage</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode level={2} nodeId="about-page">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>About Page</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="contact-form">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Contact Form</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode isLast level={1} nodeId="mobile-app">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Mobile App</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="ios-version">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>iOS Version</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="android-version">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Android Version</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode isLast nodeId="resources">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Resources</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={1} nodeId="documentation">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Documentation</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode level={1} nodeId="api-reference">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>API Reference</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={1} nodeId="examples">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Examples</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeView>
</TreeProvider> ); } Controlled selection Code Preview

"use client"; import { TreeExpander, TreeIcon, TreeLabel, TreeNode,
TreeNodeContent, TreeNodeTrigger, TreeProvider, TreeView, } from
"@/components/kibo-ui/tree"; import { useState } from "react"; import { Button }
from "@/components/ui/button"; export default function TreeControlledExample() {
const [selectedIds, setSelectedIds] = useState<string[]>([]); const
[expandedIds] = useState<string[]>([ "team", "engineering", "design", "product",
]); const handleClearSelection = () => { setSelectedIds([]); }; const
handleSelectAll = () => { const allIds = ["alice", "bob", "carol", "david",
"eve", "frank"]; setSelectedIds(allIds); }; return (
<div className="space-y-4">
<div className="flex gap-2">
<Button onClick={handleSelectAll} size="sm" variant="outline"> Select All Team
Members
</Button>
<Button onClick={handleClearSelection} size="sm" variant="outline"> Clear
Selection
</Button>
</div>
<TreeProvider
        defaultExpandedIds={expandedIds}
        multiSelect
        onSelectionChange={setSelectedIds}
        selectedIds={selectedIds}
      >
<TreeView>
<TreeNode isLast nodeId="team">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Team</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={1} nodeId="engineering">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Engineering</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="alice">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Alice Johnson</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="bob">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Bob Smith</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode level={1} nodeId="design">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Design</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="carol">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Carol Williams</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="david">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>David Brown</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode isLast level={1} nodeId="product">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>Product</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="eve">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Eve Davis</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="frank">
<TreeNodeTrigger>
<TreeExpander />
<TreeIcon />
<TreeLabel>Frank Miller</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeView>
</TreeProvider> {selectedIds.length > 0 && (
<div className="text-muted-foreground text-sm"> Selected: {selectedIds.join(",
")}
</div> )}
</div> ); } Theme Switcher

A component to switch between light, dark and system theme.

AI Elements

Attachments A flexible, composable attachment component for displaying files,
images, videos, audio, and source documents.

The Attachment component provides a unified way to display file attachments and
source documents with multiple layout variants.

PreviewCode "use client";

import { Attachment, AttachmentPreview, AttachmentRemove, Attachments, } from
"@/components/ai-elements/attachments"; import { nanoid } from "nanoid"; import
{ memo, useCallback, useState } from "react";

const initialAttachments = [ { filename: "mountain-landscape.jpg", id: nanoid(),
mediaType: "image/jpeg", type: "file" as const, url:
"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
}, { filename: "ocean-sunset.jpg", id: nanoid(), mediaType: "image/jpeg", type:
"file" as const, url:
"https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop",
}, { filename: "document.pdf", id: nanoid(), mediaType: "application/pdf", type:
"file" as const, url: "", }, { filename: "video.mp4", id: nanoid(), mediaType:
"video/mp4", type: "file" as const, url: "", }, ];

interface AttachmentItemProps { attachment: (typeof initialAttachments)[0];
onRemove: (id: string) => void; }

const AttachmentItem = memo(({ attachment, onRemove }: AttachmentItemProps) => {
const handleRemove = useCallback( () => onRemove(attachment.id), [onRemove,
attachment.id] ); return (
<Attachment data={attachment} onRemove={handleRemove}>
<AttachmentPreview />
<AttachmentRemove />
</Attachment> ); });

AttachmentItem.displayName = "AttachmentItem";

const Example = () => { const [attachments, setAttachments] =
useState(initialAttachments);

const handleRemove = useCallback((id: string) => { setAttachments((prev) =>
prev.filter((a) => a.id !== id)); }, []);

return (
<div className="flex items-center justify-center p-8">
<Attachments variant="grid"> {attachments.map((attachment) => (
<AttachmentItem
            attachment={attachment}
            key={attachment.id}
            onRemove={handleRemove}
          /> ))}
</Attachments>
</div> ); };

export default Example;

Installation AI Elementsshadcn CLIManual npx ai-elements@latest add attachments

Usage with AI SDK Display user-uploaded files in chat messages or input areas.

app/page.tsx

"use client"; import { Attachments, Attachment, AttachmentPreview,
AttachmentInfo, AttachmentRemove, } from "@/components/ai-elements/attachments";
import type { FileUIPart } from "ai"; interface MessageProps { attachments:
(FileUIPart & { id: string })[]; onRemove?: (id: string) => void; } const
MessageAttachments = ({ attachments, onRemove }: MessageProps) => (
<Attachments variant="grid"> {attachments.map((file) => ( <Attachment
key={file.id} data={file} onRemove={onRemove ? () => onRemove(file.id) :
undefined} >
<AttachmentPreview />
<AttachmentRemove />
</Attachment> ))}
</Attachments> ); export default MessageAttachments; Features Three display
variants: grid (thumbnails), inline (badges), and list (rows) Supports both
FileUIPart and SourceDocumentUIPart from the AI SDK Automatic media type
detection (image, video, audio, document, source) Hover card support for inline
previews Remove button with customizable callback Composable architecture for
maximum flexibility Accessible with proper ARIA labels TypeScript support with
exported utility functions Examples Grid Variant Best for displaying attachments
in messages with visual thumbnails.

PreviewCode "use client";

import { Attachment, AttachmentPreview, AttachmentRemove, Attachments, } from
"@/components/ai-elements/attachments"; import { nanoid } from "nanoid"; import
{ memo, useCallback, useState } from "react";

const initialAttachments = [ { filename: "mountain-landscape.jpg", id: nanoid(),
mediaType: "image/jpeg", type: "file" as const, url:
"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
}, { filename: "ocean-sunset.jpg", id: nanoid(), mediaType: "image/jpeg", type:
"file" as const, url:
"https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop",
}, { filename: "document.pdf", id: nanoid(), mediaType: "application/pdf", type:
"file" as const, url: "", }, { filename: "video.mp4", id: nanoid(), mediaType:
"video/mp4", type: "file" as const, url: "", }, ];

interface AttachmentItemProps { attachment: (typeof initialAttachments)[0];
onRemove: (id: string) => void; }

const AttachmentItem = memo(({ attachment, onRemove }: AttachmentItemProps) => {
const handleRemove = useCallback( () => onRemove(attachment.id), [onRemove,
attachment.id] ); return (
<Attachment data={attachment} onRemove={handleRemove}>
<AttachmentPreview />
<AttachmentRemove />
</Attachment> ); });

AttachmentItem.displayName = "AttachmentItem";

const Example = () => { const [attachments, setAttachments] =
useState(initialAttachments);

const handleRemove = useCallback((id: string) => { setAttachments((prev) =>
prev.filter((a) => a.id !== id)); }, []);

return (
<div className="flex items-center justify-center p-8">
<Attachments variant="grid"> {attachments.map((attachment) => (
<AttachmentItem
            attachment={attachment}
            key={attachment.id}
            onRemove={handleRemove}
          /> ))}
</Attachments>
</div> ); };

export default Example;

Inline Variant Best for compact badge-style display in input areas with hover
previews.

PreviewCode "use client";

import { Attachment, AttachmentHoverCard, AttachmentHoverCardContent,
AttachmentHoverCardTrigger, AttachmentInfo, AttachmentPreview, AttachmentRemove,
Attachments, getAttachmentLabel, getMediaCategory, } from
"@/components/ai-elements/attachments"; import { nanoid } from "nanoid"; import
{ memo, useCallback, useState } from "react";

const initialAttachments = [ { filename: "mountain-landscape.jpg", id: nanoid(),
mediaType: "image/jpeg", type: "file" as const, url:
"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
}, { filename: "quarterly-report.pdf", id: nanoid(), mediaType:
"application/pdf", type: "file" as const, url: "", }, { id: nanoid(), mediaType:
"text/html", title: "React Documentation", type: "source-document" as const,
url: "https://react.dev", }, { filename: "podcast-episode.mp3", id: nanoid(),
mediaType: "audio/mp3", type: "file" as const, url: "", }, ];

interface AttachmentItemProps { attachment: (typeof initialAttachments)[0];
onRemove: (id: string) => void; }

const AttachmentItem = memo(({ attachment, onRemove }: AttachmentItemProps) => {
const handleRemove = useCallback( () => onRemove(attachment.id), [onRemove,
attachment.id] ); const mediaCategory = getMediaCategory(attachment); const
label = getAttachmentLabel(attachment);

return (
<AttachmentHoverCard key={attachment.id}>
<AttachmentHoverCardTrigger asChild>
<Attachment data={attachment} onRemove={handleRemove}>
<div className="relative size-5 shrink-0">
<div className="absolute inset-0 transition-opacity group-hover:opacity-0">
<AttachmentPreview />
</div>
<AttachmentRemove className="absolute inset-0" />
</div>
<AttachmentInfo />
</Attachment>
</AttachmentHoverCardTrigger>
<AttachmentHoverCardContent>
<div className="space-y-3"> {mediaCategory === "image" && attachment.type ===
"file" && attachment.url && (
<div className="flex max-h-96 w-80 items-center justify-center overflow-hidden rounded-md border">
<img
                  alt={label}
                  className="max-h-full max-w-full object-contain"
                  height={384}
                  src={attachment.url}
                  width={320}
                />
</div> )}
<div className="space-y-1 px-0.5">
<h4 className="font-semibold text-sm leading-none">{label}</h4>
{attachment.mediaType && (
<p className="font-mono text-muted-foreground text-xs"> {attachment.mediaType}
</p> )}
</div>
</div>
</AttachmentHoverCardContent>
</AttachmentHoverCard> ); });

AttachmentItem.displayName = "AttachmentItem";

const Example = () => { const [attachments, setAttachments] =
useState(initialAttachments);

const handleRemove = useCallback((id: string) => { setAttachments((prev) =>
prev.filter((a) => a.id !== id)); }, []);

return (
<div className="flex items-center justify-center p-8">
<Attachments variant="inline"> {attachments.map((attachment) => (
<AttachmentItem
            attachment={attachment}
            key={attachment.id}
            onRemove={handleRemove}
          /> ))}
</Attachments>
</div> ); };

export default Example;

List Variant Best for file lists with full metadata display.

PreviewCode "use client";

import { Attachment, AttachmentInfo, AttachmentPreview, AttachmentRemove,
Attachments, } from "@/components/ai-elements/attachments"; import { nanoid }
from "nanoid"; import { memo, useCallback, useState } from "react";

const initialAttachments = [ { filename: "mountain-landscape.jpg", id: nanoid(),
mediaType: "image/jpeg", type: "file" as const, url:
"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
}, { filename: "quarterly-report-2024.pdf", id: nanoid(), mediaType:
"application/pdf", type: "file" as const, url: "", }, { filename:
"product-demo.mp4", id: nanoid(), mediaType: "video/mp4", type: "file" as const,
url: "", }, { filename: "api-reference", id: nanoid(), mediaType: "text/html",
title: "API Documentation", type: "source-document" as const, url:
"https://docs.example.com/api", }, { filename: "meeting-recording.mp3", id:
nanoid(), mediaType: "audio/mpeg", type: "file" as const, url: "", }, ];

interface AttachmentItemProps { attachment: (typeof initialAttachments)[0];
onRemove: (id: string) => void; }

const AttachmentItem = memo(({ attachment, onRemove }: AttachmentItemProps) => {
const handleRemove = useCallback( () => onRemove(attachment.id), [onRemove,
attachment.id] ); return (
<Attachment data={attachment} key={attachment.id} onRemove={handleRemove}>
<AttachmentPreview />
<AttachmentInfo showMediaType />
<AttachmentRemove />
</Attachment> ); });

AttachmentItem.displayName = "AttachmentItem";

const Example = () => { const [attachments, setAttachments] =
useState(initialAttachments);

const handleRemove = useCallback((id: string) => { setAttachments((prev) =>
prev.filter((a) => a.id !== id)); }, []);

return (
<div className="flex items-center justify-center p-8">
<Attachments className="w-full max-w-md" variant="list">
{attachments.map((attachment) => (
<AttachmentItem
            attachment={attachment}
            key={attachment.id}
            onRemove={handleRemove}
          /> ))}
</Attachments>
</div> ); };

export default Example;

Props
<Attachments /> Container component that sets the layout variant.

Prop

Type

variant? "grid" | "inline" | "list"

...props? React.HTMLAttributes<HTMLDivElement>
<Attachment /> Individual attachment item wrapper.

Prop

Type

data? (FileUIPart & { id: string }) | (SourceDocumentUIPart & { id: string })

onRemove? () => void

...props? React.HTMLAttributes<HTMLDivElement>
<AttachmentPreview /> Displays the media preview (image, video, or icon).

Prop

Type

fallbackIcon? React.ReactNode

...props? React.HTMLAttributes<HTMLDivElement>
<AttachmentInfo /> Displays the filename and optional media type.

Prop

Type

showMediaType? boolean

...props? React.HTMLAttributes<HTMLDivElement>
<AttachmentRemove /> Remove button that appears on hover.

Prop

Type

label? string

...props? React.ComponentProps<typeof Button>
<AttachmentHoverCard /> Wrapper for hover preview functionality.

Prop

Type

openDelay? number

closeDelay? number

...props? React.ComponentProps<typeof HoverCard>
<AttachmentHoverCardTrigger /> Trigger element for the hover card.

Prop

Type

...props? React.ComponentProps<typeof HoverCardTrigger>
<AttachmentHoverCardContent /> Content displayed in the hover card.

Prop

Type

align? "start" | "center" | "end"

...props? React.ComponentProps<typeof HoverCardContent>
<AttachmentEmpty /> Empty state component when no attachments are present.

Prop

Type

...props? React.HTMLAttributes<HTMLDivElement> Utility Functions
getMediaCategory(data) Returns the media category for an attachment.

import { getMediaCategory } from "@/components/ai-elements/attachments"; const
category = getMediaCategory(attachment); // Returns: "image" | "video" | "audio"
| "document" | "source" | "unknown"

getAttachmentLabel(data) Returns the display label for an attachment.

import { getAttachmentLabel } from "@/components/ai-elements/attachments"; const
label = getAttachmentLabel(attachment); // Returns filename or fallback like
"Image" or "Attachment"

Chain of Thought

A collapsible component that visualizes AI reasoning steps with support for
search results, images, and step-by-step progress ind

# Multi Step Forms

URL: /docs/forms/multistep

Multi-step forms are used to break down long forms into smaller, manageable
sections. They improve user experience by guiding users through the form
completion process step by step.

---

## title: Multi Step Forms description: Multi-step forms are used to break down long forms into smaller, manageable sections. They improve user experience by guiding users through the form completion process step by step. root: forms

import {ComponentPreview} from "@/components/preview/component-preview"; import
{extractSourceCode} from "@/lib/code"; import { Tab, Tabs } from
"fumadocs-ui/components/tabs"; import { Step, Steps } from
"fumadocs-ui/components/steps"; import { TypeTable } from
"fumadocs-ui/components/type-table";

## Features

- **Step-by-Step Progress**: Visual indicators show users their progress through
  the form
- **Form Validation**: Built-in validation using React Hook Form and Zod
- **Smooth Animations**: Transitions between steps with Framer Motion
- **Responsive Design**: Works on all screen sizes
- **Customizable**: Easily modify steps, fields, and validation rules

## Preview

<ComponentPreview name="multi-step-form" classNameComponentContainer="h-[600px]"
code={(await extractSourceCode('multi-step-form')).code} lang="tsx"
fromDocs={true} />

### Installation

<Steps>
  <Step>
    <Tabs items={["npm", "pnpm", "yarn", "bun"]}>
      <Tab>
        ```bash
        npm install framer-motion react-hook-form zod @hookform/resolvers
        ```
      </Tab>

      <Tab>
        ```bash
        pnpm install framer-motion react-hook-form zod @hookform/resolvers
        ```
      </Tab>

      <Tab>
        ```bash
        yarn add framer-motion react-hook-form zod @hookform/resolvers
        ```
      </Tab>

      <Tab>
        ```bash
        bun add framer-motion react-hook-form zod @hookform/resolvers
        ```
      </Tab>
    </Tabs>

</Step>

<Step>
    #### Copy and paste the following code into your project.

    `components/ui/multi-step-form.tsx`

    ```tsx title="multi-step-form.tsx"
    "use client";

    import React, { useState } from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import { z } from "zod";
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { cn } from "@/lib/utils";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Progress } from "@/components/ui/progress";
    import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

    // Define the form schema for each step
    const personalInfoSchema = z.object({
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
    });

    const addressSchema = z.object({
      address: z.string().min(5, "Address must be at least 5 characters"),
      city: z.string().min(2, "City must be at least 2 characters"),
      zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
    });

    const accountSchema = z.object({
      username: z.string().min(3, "Username must be at least 3 characters"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
      confirmPassword: z.string(),
    }).refine(data => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

    // Combine all schemas for the final form data
    const formSchema = z.object({
      ...personalInfoSchema.shape,
      ...addressSchema.shape,
      ...accountSchema._def.schema.shape,
    });

    type FormData = z.infer<typeof formSchema>;

    interface MultiStepFormProps {
      className?: string;
      onSubmit?: (data: FormData) => void;
    }

    export default function MultiStepForm({ className, onSubmit }: MultiStepFormProps) {
      const [step, setStep] = useState(0);
      const [formData, setFormData] = useState<Partial<FormData>>({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [isComplete, setIsComplete] = useState(false);

      // Define the steps
      const steps = [
        {
          id: "personal",
          title: "Personal Information",
          description: "Tell us about yourself",
          schema: personalInfoSchema,
          fields: [
            { name: "firstName", label: "First Name", type: "text", placeholder: "John" },
            { name: "lastName", label: "Last Name", type: "text", placeholder: "Doe" },
            { name: "email", label: "Email", type: "email", placeholder: "john.doe@example.com" },
          ],
        },
        {
          id: "address",
          title: "Address Information",
          description: "Where do you live?",
          schema: addressSchema,
          fields: [
            { name: "address", label: "Address", type: "text", placeholder: "123 Main St" },
            { name: "city", label: "City", type: "text", placeholder: "New York" },
            { name: "zipCode", label: "Zip Code", type: "text", placeholder: "10001" },
          ],
        },
        {
          id: "account",
          title: "Account Setup",
          description: "Create your account",
          schema: accountSchema,
          fields: [
            { name: "username", label: "Username", type: "text", placeholder: "johndoe" },
            { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
            { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
          ],
        },
      ];

      // Get the current step schema
      const currentStepSchema = steps[step].schema;

      // Setup form with the current step schema
      const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<any>({
        resolver: zodResolver(currentStepSchema as z.ZodType<any>),
        defaultValues: formData,
      });

      // Calculate progress percentage
      const progress = ((step + 1) / steps.length) * 100;

      // Handle next step
      const handleNextStep = (data: any) => {
        const updatedData = { ...formData, ...data };
        setFormData(updatedData);

        if (step < steps.length - 1) {
          setStep(step + 1);
          // Reset form with the updated data for the next step
          reset(updatedData);
        } else {
          // Final step submission
          setIsSubmitting(true);
          setTimeout(() => {
            if (onSubmit) {
              onSubmit(updatedData as FormData);
            }
            setIsComplete(true);
            setIsSubmitting(false);
          }, 1500);
        }
      };

      // Handle previous step
      const handlePrevStep = () => {
        if (step > 0) {
          setStep(step - 1);
        }
      };

      // Animation variants
      const variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
      };

      return (
        <div className={cn("w-full max-w-md mx-auto p-6 rounded-lg shadow-lg bg-card/40", className)}>
          {!isComplete ? (
            <>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Step {step + 1} of {steps.length}</span>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Step indicators */}
              <div className="flex justify-between mb-8">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                        i < step
                          ? "bg-primary text-primary-foreground"
                          : i === step
                          ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className="text-xs mt-1 hidden sm:block">{s.title}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-bold">{steps[step].title}</h2>
                    <p className="text-sm text-muted-foreground">{steps[step].description}</p>
                  </div>

                  <form onSubmit={handleSubmit(handleNextStep)} className="space-y-4">
                    {steps[step].fields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <Input
                          id={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          {...register(field.name as any)}
                          className={cn(errors[field.name as string] && "border-destructive")}
                        />
                        {errors[field.name as string] && (
                          <p className="text-sm text-destructive">
                            {errors[field.name as string]?.message as string}
                          </p>
                        )}
                      </div>
                    ))}

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                        disabled={step === 0}
                        className={cn(step === 0 && "invisible")}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {step === steps.length - 1 ? (
                          isSubmitting ? "Submitting..." : "Submit"
                        ) : (
                          <>
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Form Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for completing the form. We&apos;ll be in touch soon.
              </p>
              <Button onClick={() => {
                setStep(0);
                setFormData({});
                setIsComplete(false);
                reset({});
              }}>
                Start Over
              </Button>
            </motion.div>
          )}
        </div>
      );
    }
    ```

</Step>
</Steps>

### Usage

The multi-step form component can be customized to fit your specific needs.
Here's how to use it:

```tsx
<MultiStepForm
    className="max-w-md mx-auto"
    onSubmit={(data) => {
        // Handle form submission
        console.log("Form data:", data);
    }}
/>;
```

### Customization

You can customize the form steps, fields, and validation rules by modifying the
component code. The form is built using React Hook Form and Zod for validation,
making it easy to add or modify fields and validation rules.

#### Adding Custom Steps

To add or modify steps, update the `steps` array in the component:

```tsx
const steps = [
    {
        id: "personal",
        title: "Personal Information",
        description: "Tell us about yourself",
        schema: personalInfoSchema,
        fields: [
            {
                name: "firstName",
                label: "First Name",
                type: "text",
                placeholder: "John",
            },
            {
                name: "lastName",
                label: "Last Name",
                type: "text",
                placeholder: "Doe",
            },
            {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "john.doe@example.com",
            },
        ],
    },
    // Add more steps here
];
```

#### Customizing Validation

The form uses Zod for validation. You can customize the validation rules by
modifying the schema for each step:

```tsx
const personalInfoSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
});
```

### Accessibility

The multi-step form is built with accessibility in mind:

- Proper form labels and ARIA attributes
- Keyboard navigation support
- Error messages for form validation
- Focus management between steps

### Props

<TypeTable type={{ className: { description: "Additional CSS classes to apply to
the form container.", type: "string", default: "undefined", }, onSubmit: {
description: "Callback function called when the form is submitted.", type:
"(data: FormData) => void", default: "undefined", }, }} />

"use client";

import { NativeMorphingButton } from "../native-morphing-button-shadcnui";
import { FileText, FolderPlus, Plus, Users } from "lucide-react";

export function NativeMorphingButtonDefault() { return (
<div className="relative h-48 w-full"> <NativeMorphingButton actions={[ { label:
"New Task", icon: <Plus className="h-4 w-4" />, onClick: () => {}, }, { label:
"New Project", icon: <FolderPlus className="h-4 w-4" />, onClick: () => {}, }, {
label: "New Team", icon: <Users className="h-4 w-4" />, onClick: () => {}, }, ]}
/>
</div> ); }

export function NativeMorphingButtonCustomIcon() { return (
<div className="relative h-48 w-full"> <NativeMorphingButton
icon={<FileText className="h-5 w-5" />} actions={[ { label: "Draft", icon:
<FileText className="h-4 w-4" />, onClick: () => {}, }, { label: "Template",
icon: <FileText className="h-4 w-4" />, onClick: () => {}, }, ]} />
</div> ); }

export function NativeMorphingButtonDemo() { return (
<div className="flex flex-col gap-8 w-full">
<div className="grid gap-6 md:grid-cols-2">
<div className="space-y-2">
<h3 className="font-semibold text-muted-foreground text-sm"> Default
</h3>
<NativeMorphingButtonDefault />
</div>
<div className="space-y-2">
<h3 className="font-semibold text-muted-foreground text-sm"> Custom Icon
</h3>
<NativeMorphingButtonCustomIcon />
</div>
</div>
</div> ); }

"use client";

import { NativeAvatarExpand } from "../native-avatar-expand-shadcnui";

export function NativeAvatarExpandDefault() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarExpand src="https://github.com/shadcn.png" name="John Doe" />
</div> ); }

export function NativeAvatarExpandSmall() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarExpand
        src="https://github.com/shadcn.png"
        name="Jane Smith"
        size="sm"
      />
</div> ); }

export function NativeAvatarExpandLarge() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarExpand
        src="https://github.com/shadcn.png"
        name="Alex Johnson"
        size="lg"
      />
</div> ); }

export function NativeAvatarExpandExtraLarge() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarExpand
        src="https://github.com/shadcn.png"
        name="Sarah Williams"
        size="xl"
      />
</div> ); }

export function NativeAvatarExpandNoImage() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarExpand name="No Image User" />
</div> ); }

export function NativeAvatarExpandDemo() { return <NativeAvatarExpandDefault />;
}

"use client";

import { NativeAvatarWithName } from "../native-avatar-with-name-shadcnui";

export function NativeAvatarWithNameDefault() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarWithName
        src="https://github.com/shadcn.png"
        name="John Doe"
      />
</div> ); }

export function NativeAvatarWithNameTop() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarWithName
        src="https://github.com/shadcn.png"
        name="Jane Smith"
        direction="top"
      />
</div> ); }

export function NativeAvatarWithNameLeft() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarWithName
        src="https://github.com/shadcn.png"
        name="Alex Johnson"
        direction="left"
      />
</div> ); }

export function NativeAvatarWithNameRight() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarWithName
        src="https://github.com/shadcn.png"
        name="Sarah Williams"
        direction="right"
      />
</div> ); }

export function NativeAvatarWithNameSmall() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarWithName
        src="https://github.com/shadcn.png"
        name="Small Avatar"
        size="sm"
      />
</div> ); }

export function NativeAvatarWithNameLarge() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarWithName
        src="https://github.com/shadcn.png"
        name="Large Avatar"
        size="lg"
      />
</div> ); }

export function NativeAvatarWithNameNoImage() { return (
<div className="flex items-center justify-center p-4">
<NativeAvatarWithName name="No Image User" />
</div> ); }

export function NativeAvatarWithNameDemo() { return
<NativeAvatarWithNameDefault />; }

"use client";

import { NativeImageCheckbox } from "../native-image-checkbox-shadcnui"; import
{ useState } from "react";

export function NativeImageCheckboxDefault() { const [selected, setSelected] =
useState(false); return (
<div className="flex items-center justify-center p-4">
<NativeImageCheckbox
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="Portrait"
        selected={selected}
        onSelect={setSelected}
      />
</div> ); }

export function NativeImageCheckboxSmall() { const [selected, setSelected] =
useState(false); return (
<div className="flex items-center justify-center p-4">
<NativeImageCheckbox
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        alt="Portrait Small"
        selected={selected}
        onSelect={setSelected}
        size="sm"
      />
</div> ); }

export function NativeImageCheckboxLarge() { const [selected, setSelected] =
useState(false); return (
<div className="flex items-center justify-center p-4">
<NativeImageCheckbox
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        alt="Portrait Large"
        selected={selected}
        onSelect={setSelected}
        size="lg"
      />
</div> ); }

export function NativeImageCheckboxExtraLarge() { const [selected, setSelected]
= useState(false); return (
<div className="flex items-center justify-center p-4">
<NativeImageCheckbox
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        alt="Portrait XL"
        selected={selected}
        onSelect={setSelected}
        size="xl"
      />
</div> ); }

export function NativeImageCheckboxSelected() { const [selected, setSelected] =
useState(true); return (
<div className="flex items-center justify-center p-4">
<NativeImageCheckbox
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
        alt="Selected Portrait"
        selected={selected}
        onSelect={setSelected}
      />
</div> ); }

export function NativeImageCheckboxGrid() { const [selected1, setSelected1] =
useState(false); const [selected2, setSelected2] = useState(true); const
[selected3, setSelected3] = useState(false); const [selected4, setSelected4] =
useState(false);

return (
<div className="flex items-center justify-center p-4">
<div className="grid grid-cols-2 gap-4">
<NativeImageCheckbox
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="Image 1"
          selected={selected1}
          onSelect={setSelected1}
        />
<NativeImageCheckbox
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
          alt="Image 2"
          selected={selected2}
          onSelect={setSelected2}
        />
<NativeImageCheckbox
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
          alt="Image 3"
          selected={selected3}
          onSelect={setSelected3}
        />
<NativeImageCheckbox
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
          alt="Image 4"
          selected={selected4}
          onSelect={setSelected4}
        />
</div>
</div> ); }

export function NativeImageCheckboxDemo() { return
<NativeImageCheckboxDefault />; }

"use client";

import { NativeDelete } from "../native-delete-shadcnui"; import { useState }
from "react";

export function NativeDeleteDefault() { const [deleted, setDeleted] =
useState(false); return (
<div className="flex items-center justify-center p-4"> {!deleted ? (
<NativeDelete onConfirm={() => { // Handle confirmation UI shown }} onDelete={()
=> { setDeleted(true); setTimeout(() => setDeleted(false), 2000); }} /> ) : (
<div className="text-sm text-muted-foreground">Deleted!</div> )}
</div> ); }

export function NativeDeleteSmall() { const [deleted, setDeleted] =
useState(false); return (
<div className="flex items-center justify-center p-4"> {!deleted ? (
<NativeDelete size="sm" onConfirm={() => { // Handle confirmation UI shown }}
onDelete={() => { setDeleted(true); setTimeout(() => setDeleted(false), 2000);
}} /> ) : (
<div className="text-sm text-muted-foreground">Deleted!</div> )}
</div> ); }

export function NativeDeleteLarge() { const [deleted, setDeleted] =
useState(false); return (
<div className="flex items-center justify-center p-4"> {!deleted ? (
<NativeDelete size="lg" onConfirm={() => { // Handle confirmation UI shown }}
onDelete={() => { setDeleted(true); setTimeout(() => setDeleted(false), 2000);
}} /> ) : (
<div className="text-sm text-muted-foreground">Deleted!</div> )}
</div> ); }

export function NativeDeleteCustomText() { const [deleted, setDeleted] =
useState(false); return (
<div className="flex items-center justify-center p-4"> {!deleted ? (
<NativeDelete buttonText="Remove Item" confirmText="Yes, Remove" onConfirm={()
=> { // Handle confirmation UI shown }} onDelete={() => { setDeleted(true);
setTimeout(() => setDeleted(false), 2000); }} /> ) : (
<div className="text-sm text-muted-foreground">Removed!</div> )}
</div> ); }

export function NativeDeleteNoIcon() { const [deleted, setDeleted] =
useState(false); return (
<div className="flex items-center justify-center p-4"> {!deleted ? (
<NativeDelete showIcon={false} onConfirm={() => { // Handle confirmation UI
shown }} onDelete={() => { setDeleted(true); setTimeout(() => setDeleted(false),
2000); }} /> ) : (
<div className="text-sm text-muted-foreground">Deleted!</div> )}
</div> ); }

export function NativeDeleteDisabled() { return (
<div className="flex items-center justify-center p-4"> <NativeDelete disabled
onConfirm={() => {}} onDelete={() => {}} />
</div> ); }

export function NativeDeleteDemo() { return <NativeDeleteDefault />; }

"use client";

import { NativeStartNow } from "../native-start-now-shadcnui"; import { Heart,
Rocket, Star, Zap } from "lucide-react";

export function NativeStartNowDefault() { return ( <NativeStartNow
onStart={async () => { await new Promise((resolve) => setTimeout(resolve,
1500)); }} /> ); }

export function NativeStartNowGradient() { return ( <NativeStartNow
variant="gradient" onStart={async () => { await new Promise((resolve) =>
setTimeout(resolve, 1500)); }} /> ); }

export function NativeStartNowSolid() { return ( <NativeStartNow variant="solid"
onStart={async () => { await new Promise((resolve) => setTimeout(resolve,
1500)); }} /> ); }

export function NativeStartNowOutline() { return ( <NativeStartNow
variant="outline" onStart={async () => { await new Promise((resolve) =>
setTimeout(resolve, 1500)); }} /> ); }

export function NativeStartNowSmall() { return ( <NativeStartNow size="sm"
onStart={async () => { await new Promise((resolve) => setTimeout(resolve,
1500)); }} /> ); }

export function NativeStartNowLarge() { return ( <NativeStartNow size="lg"
onStart={async () => { await new Promise((resolve) => setTimeout(resolve,
1500)); }} /> ); }

export function NativeStartNowNoSparkles() { return ( <NativeStartNow
showRocket={false} onStart={async () => { await new Promise((resolve) =>
setTimeout(resolve, 1500)); }} /> ); }

export function NativeStartNowCustomLabels() { return ( <NativeStartNow
label="Get Started" loadingLabel="Preparing..." successLabel="Ready!"
onStart={async () => { await new Promise((resolve) => setTimeout(resolve,
1500)); }} /> ); }

export function NativeStartNowDisabled() { return ( <NativeStartNow disabled
onStart={async () => { await new Promise((resolve) => setTimeout(resolve,
1500)); }} /> ); }

export function NativeStartNowStarIcon() { return ( <NativeStartNow
icon={<Star className="h-3 w-3 text-primary fill-primary" />} onStart={async ()
=> { await new Promise((resolve) => setTimeout(resolve, 1500)); }} /> ); }

export function NativeStartNowZapIcon() { return ( <NativeStartNow
icon={<Zap className="h-3 w-3 text-primary fill-primary" />} onStart={async ()
=> { await new Promise((resolve) => setTimeout(resolve, 1500)); }} /> ); }

export function NativeStartNowHeartIcon() { return ( <NativeStartNow
icon={<Heart className="h-3 w-3 text-primary fill-primary" />} onStart={async ()
=> { await new Promise((resolve) => setTimeout(resolve, 1500)); }} /> ); }

export function NativeStartNowRocketIcon() { return ( <NativeStartNow
icon={<Rocket className="h-3 w-3 text-primary fill-primary" />} onStart={async
() => { await new Promise((resolve) => setTimeout(resolve, 1500)); }} /> ); }

export function NativeStartNowDemo() { return <NativeStartNowDefault />; }

"use client";

import { NativeHoverCard } from "../native-hover-card-shadcnui"; import { Button
} from "@/components/ui/button"; import { MessageCircle, UserPlus } from
"lucide-react";

export function NativeHoverCardDefault() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="John Doe" username="johndoe" description="Software engineer passionate
about building beautiful user interfaces and creating delightful experiences."
onButtonClick={() => console.log("View Profile clicked")} />
</div> ); }

export function NativeHoverCardGlass() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="Jane Smith" username="janesmith" description="Designer and developer
focused on creating accessible and inclusive digital products." variant="glass"
onButtonClick={() => console.log("View Profile clicked")} />
</div> ); }

export function NativeHoverCardBordered() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="Alex Johnson" username="alexjohnson" description="Full-stack developer
with expertise in React, Node.js, and cloud infrastructure." variant="bordered"
onButtonClick={() => console.log("View Profile clicked")} />
</div> ); }

export function NativeHoverCardSmall() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="Sarah Williams" username="sarahw" description="Product manager and UX
enthusiast." size="sm" onButtonClick={() => console.log("View Profile clicked")}
/>
</div> ); }

export function NativeHoverCardLarge() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="Michael Chen" username="michaelchen" description="Engineering lead
building scalable systems and mentoring the next generation of developers."
size="lg" onButtonClick={() => console.log("View Profile clicked")} />
</div> ); }

export function NativeHoverCardExtraLarge() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="Emily Davis" username="emilydavis" description="Creative director and
brand strategist with over 10 years of experience in digital marketing and brand
development." size="xl" onButtonClick={() => console.log("View Profile
clicked")} />
</div> ); }

export function NativeHoverCardNoUsername() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="David Brown" description="Entrepreneur and startup founder focused on
building innovative solutions." onButtonClick={() => console.log("View Profile
clicked")} />
</div> ); }

export function NativeHoverCardNoDescription() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="Lisa Anderson" username="lisaanderson" onButtonClick={() =>
console.log("View Profile clicked")} />
</div> ); }

export function NativeHoverCardCustomButton() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="Robert Taylor" username="roberttaylor" description="Community manager and
content creator." buttonContent={
<div className="flex gap-2 w-full">
<Button size="sm" variant="outline" className="flex-1">
<MessageCircle className="h-4 w-4 mr-2" /> Message
</Button>
<Button size="sm" className="flex-1">
<UserPlus className="h-4 w-4 mr-2" /> Follow
</Button>
</div> } />
</div> ); }

export function NativeHoverCardCustomButtonText() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://github.com/shadcn.png" imageAlt="Profile"
name="Olivia Martinez" username="oliviamartinez" description="Data scientist and
machine learning engineer." buttonText="Connect" onButtonClick={() =>
console.log("Connect clicked")} />
</div> ); }

export function NativeHoverCardMinimal() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard
        imageSrc="https://github.com/shadcn.png"
        imageAlt="Profile"
        name="James Wilson"
        buttonContent={null}
      />
</div> ); }

export function NativeHoverCardWithFallback() { return (
<div className="flex items-center justify-center p-8 min-h-[300px]">
<NativeHoverCard imageSrc="https://invalid-url-that-will-fail.png"
imageAlt="Profile" name="Thomas Anderson" username="thomasa" description="This
demonstrates the Avatar fallback with initials when the image fails to load."
onButtonClick={() => console.log("View Profile clicked")} />
</div> ); }

export function NativeHoverCardDemo() { return <NativeHoverCardDefault />; }

<BottomModal />

"use client";

import { type ListItem, NativeNestedList, } from
"../native-nested-list-shadcnui"; import { File, Folder, FolderOpen, Globe,
Image, MoreHorizontal, MousePointerClick, } from "lucide-react";

const items: ListItem[] = [ { id: "1", label: "Documents", icon:
<Folder className="h-4 w-4 text-blue-500" />, children: [ { id: "1-1", label:
"Project Specs", icon: <File className="h-4 w-4 text-gray-400" />, }, { id:
"1-2", label: "Design System", icon: <File className="h-4 w-4 text-gray-400" />,
}, ], }, { id: "2", label: "Images", icon:
<FolderOpen className="h-4 w-4 text-yellow-500" />, children: [ { id: "2-1",
label: "Vacation", icon: <Folder className="h-4 w-4 text-yellow-500" />,
children: [ { id: "2-1-1", label: "img_001.jpg", icon:
<Image className="h-4 w-4 text-purple-500" />, }, { id: "2-1-2", label:
"img_002.jpg", icon: <Image className="h-4 w-4 text-purple-500" />, }, ], }, {
id: "2-2", label: "Work", icon: <Folder className="h-4 w-4 text-yellow-500" />,
}, ], }, { id: "3", label: "Settings", icon:
<MoreHorizontal className="h-4 w-4 text-gray-500" />, children: [ { id: "3-1",
label: "Google", icon: <Globe className="h-4 w-4 text-blue-500" />, href:
"https://google.com", }, { id: "3-2", label: "Click Me", icon:
<MousePointerClick className="h-4 w-4 text-green-500" />, onClick: (e) => {
e.stopPropagation(); alert("Clicked!"); }, }, ], }, ];

export function NativeNestedListDemo() { return (
<div className="w-full max-w-sm border rounded-lg p-4 bg-background">
<NativeNestedList items={items} />
</div> ); }

"use client";

import { NativeProfileNotch } from "../native-profile-notch-shadcnui";

export function NativeProfileNotchDefault() { return (
<div className="h-[500px] w-full flex items-center justify-center   rounded-xl relative">

      <NativeProfileNotch
        imageSrc="https://github.com/shadcn.png"
        name="Shadcn"
        username="shadcn"
      >
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col items-center p-3 rounded-xl bg-primary-accent/5 border border-primary-accent/5">
            <span className="text-xs text-primary-accent/40 uppercase tracking-wider font-semibold">
              Role
            </span>
            <span className="text-sm text-primary-accent font-medium mt-1 text-center">
              Maintainer
            </span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-primary-accent/5 border border-primary-accent/5">
            <span className="text-xs text-primary-accent/40 uppercase tracking-wider font-semibold">
              Commits
            </span>
            <span className="text-sm text-primary-accent font-medium mt-1 text-center">
              1,240
            </span>
          </div>
        </div>
      </NativeProfileNotch>
    </div>

); }

export function NativeProfileNotchOverlay() { return (
<div className="h-[500px] w-full flex items-center justify-center   rounded-xl relative">

      {/* Background content to demonstrate overlay behavior */}
      <div className="flex flex-col gap-4 max-w-sm text-center z-0 px-4">
        <h3 className="text-2xl font-bold text-foreground">
          Content Below Profile
        </h3>
        <p className="text-muted-foreground">
          This content stays in place when the profile expands because the notch
          uses absolute positioning. Try clicking the profile above!
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="h-24 bg-muted/50 rounded-lg" />
          <div className="h-24 bg-muted/50 rounded-lg" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <NativeProfileNotch
          variant="overlay"
          imageSrc="https://github.com/shadcn.png"
          name="Shadcn"
          username="shadcn"
        >
          <div className="border-t border-primary-accent/10 pt-4 mt-2">
            <p className="text-sm text-primary-accent/70 text-center italic">
              "Overlay variant example."
            </p>
          </div>
        </NativeProfileNotch>
      </div>
    </div>

); }

"use client";

import { AnimatePresence, motion } from "framer-motion"; import { Check,
ChevronDown, Filter, Search } from "lucide-react"; import { useMemo, useState }
from "react";

import { Badge } from "@/components/ui/badge"; import { Button } from
"@/components/ui/button"; import { Input } from "@/components/ui/input";

type LogLevel = "info" | "warning" | "error";

interface Log { id: string; timestamp: string; level: LogLevel; service: string;
message: string; duration: string; status: string; tags: string[]; }

type Filters = { level: string[]; service: string[]; status: string[]; };

const SAMPLE_LOGS: Log[] = [ { id: "1", timestamp: "2024-11-08T14:32:45Z",
level: "info", service: "api-gateway", message: "Request processed
successfully", duration: "245ms", status: "200", tags: ["api", "success"], }, {
id: "2", timestamp: "2024-11-08T14:32:42Z", level: "warning", service:
"cache-service", message: "Cache miss ratio exceeds threshold", duration:
"1.2s", status: "warning", tags: ["cache", "performance"], }, { id: "3",
timestamp: "2024-11-08T14:32:40Z", level: "error", service: "database", message:
"Connection timeout to replica", duration: "5.1s", status: "503", tags: ["db",
"error"], }, { id: "4", timestamp: "2024-11-08T14:32:38Z", level: "info",
service: "auth-service", message: "User session created", duration: "156ms",
status: "201", tags: ["auth", "session"], }, { id: "5", timestamp:
"2024-11-08T14:32:35Z", level: "info", service: "api-gateway", message: "Webhook
delivered", duration: "432ms", status: "200", tags: ["webhook", "integration"],
}, { id: "6", timestamp: "2024-11-08T14:32:32Z", level: "error", service:
"payment-service", message: "Payment gateway unavailable", duration: "2.3s",
status: "502", tags: ["payment", "error"], }, { id: "7", timestamp:
"2024-11-08T14:32:30Z", level: "info", service: "search-service", message:
"Index updated", duration: "876ms", status: "200", tags: ["search", "index"], },
{ id: "8", timestamp: "2024-11-08T14:32:28Z", level: "warning", service:
"api-gateway", message: "Rate limit approaching", duration: "145ms", status:
"429", tags: ["rate-limit", "warning"], }, ];

const levelStyles: Record<LogLevel, string> = { info: "bg-blue-500/10
text-blue-600 dark:text-blue-400", warning: "bg-yellow-500/10 text-yellow-600
dark:text-yellow-400", error: "bg-red-500/10 text-red-600 dark:text-red-400", };

const statusStyles: Record<string, string> = { "200": "text-green-600
dark:text-green-400", "201": "text-green-600 dark:text-green-400", "429":
"text-yellow-600 dark:text-yellow-400", "502": "text-red-600 dark:text-red-400",
"503": "text-red-600 dark:text-red-400", warning: "text-yellow-600
dark:text-yellow-400", };

function LogRow({ log, expanded, onToggle, }: { log: Log; expanded: boolean;
onToggle: () => void; }) { const formattedTime = new
Date(log.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute:
"2-digit", second: "2-digit", });

return ( <> <motion.button onClick={onToggle} className="w-full p-4 text-left
transition-colors hover:bg-muted/50 active:bg-muted/70" whileHover={{
backgroundColor: "rgba(0,0,0,0.02)" }} >
<div className="flex items-center gap-4"> <motion.div animate={{ rotate:
expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0" >
<ChevronDown className="h-4 w-4 text-muted-foreground" /> </motion.div>

          <Badge
            variant="secondary"
            className={`flex-shrink-0 capitalize ${levelStyles[log.level]}`}
          >
            {log.level}
          </Badge>

          <time className="w-20 flex-shrink-0 font-mono text-xs text-muted-foreground">
            {formattedTime}
          </time>

          <span className="flex-shrink-0 min-w-max text-sm font-medium text-foreground">
            {log.service}
          </span>

          <p className="flex-1 truncate text-sm text-muted-foreground">
            {log.message}
          </p>

          <span
            className={`flex-shrink-0 font-mono text-sm font-semibold ${
              statusStyles[log.status] ?? "text-muted-foreground"
            }`}
          >
            {log.status}
          </span>

          <span className="w-16 flex-shrink-0 text-right font-mono text-xs text-muted-foreground">
            {log.duration}
          </span>
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-muted/50"
          >
            <div className="space-y-4 p-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Message
                </p>
                <p className="rounded bg-background p-3 font-mono text-sm text-foreground">
                  {log.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Duration
                  </p>
                  <p className="font-mono text-foreground">{log.duration}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Timestamp
                  </p>
                  <p className="font-mono text-xs text-foreground">
                    {log.timestamp}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {log.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>

); }

function FilterPanel({ filters, onChange, logs, }: { filters: Filters; onChange:
(filters: Filters) => void; logs: Log[]; }) { const levels = Array.from(new
Set(logs.map((log) => log.level))); const services = Array.from(new
Set(logs.map((log) => log.service))); const statuses = Array.from(new
Set(logs.map((log) => log.status)));

const toggleFilter = (category: keyof Filters, value: string) => { const current
= filters[category]; const updated = current.includes(value) ?
current.filter((entry) => entry !== value) : [...current, value];

    onChange({
      ...filters,
      [category]: updated,
    });

};

const clearAll = () => { onChange({ level: [], service: [], status: [], }); };

const hasActiveFilters = Object.values(filters).some( (group) => group.length >
0 );

return ( <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{
opacity: 0 }} transition={{ delay: 0.05 }} className="flex h-full flex-col
space-y-6 overflow-y-auto bg-card p-4" >
<div className="flex items-center justify-between">
<h3 className="text-sm font-semibold text-foreground">Filters</h3>
{hasActiveFilters && (
<Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-6 text-xs"
          > Clear
</Button> )}
</div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Level
        </p>
        <div className="space-y-2">
          {levels.map((level) => {
            const selected = filters.level.includes(level);

            return (
              <motion.button
                key={level}
                type="button"
                whileHover={{ x: 2 }}
                onClick={() => toggleFilter("level", level)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between gap-2 border rounded-md px-3 py-2 text-sm transition-colors ${
                  selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/40"
                }`}
              >
                <span className="capitalize">{level}</span>
                {selected && <Check className="h-3.5 w-3.5" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Service
        </p>
        <div className="space-y-2">
          {services.map((service) => {
            const selected = filters.service.includes(service);

            return (
              <motion.button
                key={service}
                type="button"
                whileHover={{ x: 2 }}
                onClick={() => toggleFilter("service", service)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between gap-2 border rounded-md px-3 py-2 text-sm transition-colors ${
                  selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/40"
                }`}
              >
                <span>{service}</span>
                {selected && <Check className="h-3.5 w-3.5" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Status
        </p>
        <div className="space-y-2">
          {statuses.map((status) => {
            const selected = filters.status.includes(status);

            return (
              <motion.button
                key={status}
                type="button"
                whileHover={{ x: 2 }}
                onClick={() => toggleFilter("status", status)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between gap-2 border rounded-md px-3 py-2 text-sm transition-colors ${
                  selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/40"
                }`}
              >
                <span>{status}</span>
                {selected && <Check className="h-3.5 w-3.5" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>

); }

export function InteractiveLogsTable() { const [searchQuery, setSearchQuery] =
useState(""); const [expandedId, setExpandedId] = useState<string | null>(null);
const [showFilters, setShowFilters] = useState(false); const [filters,
setFilters] = useState<Filters>({ level: [], service: [], status: [], });

const filteredLogs = useMemo(() => { return SAMPLE_LOGS.filter((log) => { const
lowerQuery = searchQuery.toLowerCase();

      const matchSearch =
        log.message.toLowerCase().includes(lowerQuery) ||
        log.service.toLowerCase().includes(lowerQuery);

      const matchLevel =
        filters.level.length === 0 || filters.level.includes(log.level);
      const matchService =
        filters.service.length === 0 || filters.service.includes(log.service);
      const matchStatus =
        filters.status.length === 0 || filters.status.includes(log.status);

      return matchSearch && matchLevel && matchService && matchStatus;
    });

}, [filters, searchQuery]);

const activeFilters = filters.level.length + filters.service.length +
filters.status.length;

return (
<main className="h-screen w-full bg-background">
<div className="flex h-full flex-col">
<div className="border-b border-border bg-card p-6">
<div className="space-y-4">
<div>
<h1 className="text-2xl font-semibold text-foreground">Logs</h1>
<p className="text-sm text-muted-foreground"> {filteredLogs.length} of
{SAMPLE_LOGS.length} logs
</p>
</div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search logs by message or service..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-9 pl-9 text-sm"
                />
              </div>
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters((current) => !current)}
                className="relative"
              >
                <Filter className="h-4 w-4" />
                {activeFilters > 0 && (
                  <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs bg-destructive">
                    {activeFilters}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                key="filters"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-r border-border"
              >
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  logs={SAMPLE_LOGS}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.02,
                      }}
                    >
                      <LogRow
                        log={log}
                        expanded={expandedId === log.id}
                        onToggle={() =>
                          setExpandedId((current) =>
                            current === log.id ? null : log.id
                          )
                        }
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 text-center"
                  >
                    <p className="text-muted-foreground">
                      No logs match your filters.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>

); }

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; import { motion } from
"framer-motion"; import { Calendar, MapPin, QrCode, Sparkles } from
"lucide-react";

export function ConferenceTicket() { return (
<div className="flex min-h-[600px] w-full items-center justify-center p-8 perspective-1000">
<motion.div initial={{ opacity: 0, rotateX: -10, y: 40, scale: 0.9 }} animate={{
opacity: 1, rotateX: 0, y: 0, scale: 1 }} transition={{ duration: 1.2, type:
"spring", bounce: 0.2, damping: 20, stiffness: 90, }} whileHover={{ scale: 1.02,
rotateX: 2, rotateY: 2, transition: { duration: 0.4 }, }} className="relative
flex w-full max-w-3xl flex-col md:flex-row" style={{ transformStyle:
"preserve-3d" }} role="article" aria-label="Conference Ticket for Design &
Motion Summit" > {/* Main Ticket Content (Left Side) */}
<div className="relative flex-1 p-8 md:p-10 overflow-hidden rounded-3xl md:rounded-r-none md:rounded-l-3xl border border-border/50 border-b-0 md:border-b md:border-r-0 bg-background/30 backdrop-blur-xl">
<div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary via-transparent to-primary opacity-5" />
<div className="absolute -inset-full animate-[shimmer_4s_infinite] bg-gradient-to-r from-transparent via-primary to-transparent opacity-5" />

          {/* Dashed Line (Right Border for Desktop) */}
          <div className="absolute top-0 bottom-0 right-0 hidden md:block border-r-2 border-dashed border-border/50" />

          {/* Cutout Circles (Desktop) */}
          <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-background z-10 hidden md:block" />
          <div className="absolute -right-3 -bottom-3 h-6 w-6 rounded-full bg-background z-10 hidden md:block" />

          {/* Dashed Line (Bottom Border for Mobile) */}
          <div className="absolute left-0 right-0 bottom-0 block md:hidden border-b-2 border-dashed border-border/50" />

          {/* Cutout Circles (Mobile) */}
          <div className="absolute -left-3 -bottom-3 h-6 w-6 rounded-full bg-background z-10 block md:hidden" />
          <div className="absolute -right-3 -bottom-3 h-6 w-6 rounded-full bg-background z-10 block md:hidden" />
          {/* Decorative Circles */}
          <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary blur-3xl opacity-10" />
          <div className="absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-accent blur-3xl opacity-10" />

          <div className="relative z-10 flex h-full flex-col justify-between space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="border-primary/30 bg-primary/10 text-primary backdrop-blur-md"
                >
                  <Sparkles className="mr-1 h-3 w-3" /> VIP ACCESS
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  #TRIPLE-D-2025
                </span>
              </div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
                >
                  Design &<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Motion Summit
                  </span>
                </motion.h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  The future of interactive interfaces.
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  DATE
                </div>
                <p className="text-foreground font-medium">Oct 24-26, 2025</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  LOCATION
                </div>
                <p className="text-foreground font-medium">San Francisco, CA</p>
              </div>
            </div>

            {/* Attendee Info */}
            <div className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card/30 p-4 backdrop-blur-md">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Moumen Soliman"
                />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Moumen Soliman
                </p>
                <p className="text-xs text-muted-foreground">
                  Senior Product Designer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stub / QR Code (Right Side) */}
        <motion.div
          whileHover={{
            x: 15,
            rotate: 5,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          className="relative flex w-full flex-col items-center justify-center p-8 backdrop-blur-md md:w-64 rounded-3xl md:rounded-l-none md:rounded-r-3xl border border-border/50 border-t-0 md:border-t md:border-l-0 bg-card/10"
        >
          <div className="space-y-6 text-center">
            <div
              className="rounded-xl bg-white p-4 shadow-lg"
              aria-label="QR Code"
            >
              <QrCode className="h-32 w-32 text-black" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Ticket No.
              </p>
              <p className="font-mono text-xl font-bold text-foreground">
                A1-8842
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Confirmed</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>

); }

"use client";

import { Badge } from "@/components/ui/badge"; import { motion } from
"framer-motion"; import { Calendar, Clock, MapPin, Star, Ticket } from
"lucide-react";

export function TheaterTicket() { return (
<div className="flex min-h-[400px] w-full items-center justify-center p-8">
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }} whileHover={{ scale: 1.02 }}
className="group relative flex w-full max-w-2xl flex-col md:flex-row
overflow-hidden rounded-xl bg-card border border-border shadow-2xl"
role="article" aria-label="Theater Ticket for The Phantom of the Opera" > {/*
Main Ticket Section _/}
<div className="relative flex-1 p-6 md:p-8 overflow-hidden"> {/_ Gradient
Background */}
<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-card z-0" />

          {/* Background Texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay z-0" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
            <div className="flex justify-between items-start">
              <Badge
                variant="outline"
                className="border-primary/50 text-primary bg-primary/10"
              >
                <Star className="w-3 h-3 mr-1 fill-current" /> PREMIERE
              </Badge>
              <Ticket className="w-6 h-6 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <motion.h2
                className="text-3xl md:text-4xl font-serif font-bold text-card-foreground tracking-wide"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                THE PHANTOM
                <br />
                <span className="text-primary">OF THE OPERA</span>
              </motion.h2>
              <p className="text-muted-foreground text-sm tracking-widest uppercase">
                Royal Albert Hall
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">
                  Date
                </p>
                <p className="text-card-foreground font-medium flex items-center">
                  <Calendar className="w-3 h-3 mr-2 text-primary" />
                  Dec 12
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">
                  Time
                </p>
                <p className="text-card-foreground font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-2 text-primary" />
                  19:30
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase mb-1">
                  Seat
                </p>
                <p className="text-card-foreground font-medium flex items-center">
                  <MapPin className="w-3 h-3 mr-2 text-primary" />
                  A-24
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rip Line (Desktop) */}
        <div className="relative hidden w-8 flex-col items-center justify-center bg-card md:flex">
          <div className="absolute -top-3 w-6 h-6 rounded-full bg-background z-20 border-b border-border" />
          <div className="h-full border-l-2 border-dashed border-border mx-auto" />
          <div className="absolute -bottom-3 w-6 h-6 rounded-full bg-background z-20 border-t border-border" />
        </div>

        {/* Rip Line (Mobile) */}
        <div className="relative flex h-8 w-full items-center justify-center bg-card md:hidden">
          <div className="absolute -left-3 h-6 w-6 rounded-full bg-background z-20 border-r border-border" />
          <div className="w-full border-t-2 border-dashed border-border my-auto" />
          <div className="absolute -right-3 h-6 w-6 rounded-full bg-background z-20 border-l border-border" />
        </div>

        {/* Ticket Stub */}
        <motion.div
          className="relative w-full md:w-32 bg-muted/50 p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-border"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Barcode Lines */}
          <div
            className="flex md:flex-col justify-center space-x-1 md:space-x-0 md:space-y-1 h-12 md:h-24 w-full opacity-70"
            role="img"
            aria-label="Barcode"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`bg-foreground ${i % 3 === 0 || i % 2 === 0 ? "w-1 h-full md:w-full md:h-1" : "w-2 h-full md:w-full md:h-2"}`}
              />
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground md:rotate-90 origin-center whitespace-nowrap mt-2 md:mt-8">
              ADMIT ONE
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>

); }

"use client";

import { Badge } from "@/components/ui/badge"; import { motion } from
"framer-motion"; import { Calendar, Clock, Film, MapPin, QrCode, Star } from
"lucide-react";

export function CinemaTicket() { return (
<div className="flex min-h-[600px] w-full items-center justify-center p-8">
<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, type: "spring", bounce: 0.3 }} whileHover={{ y: -10
}} className="group relative flex w-full max-w-sm flex-col overflow-hidden
rounded-3xl bg-card border border-border" role="article" aria-label="Cinema
Ticket for Interstellar" > {/* Poster Section */}
<div className="relative h-96 w-full overflow-hidden bg-neutral-900">
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
<motion.img
src="https://images.unsplash.com/photo-1628126235206-5260b9ea6441?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
alt="Interstellar Movie Poster" className="h-full w-full object-cover
transition-transform duration-700 group-hover:scale-110" />

          <div className="absolute top-4 right-4 z-20">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
              IMAX 3D
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                INTERSTELLAR
              </h2>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{" "}
                  8.9
                </span>
                <span>•</span>
                <span>Sci-Fi / Adventure</span>
                <span>•</span>
                <span>2h 49m</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ticket Details Section */}
        <div className="relative flex-1 bg-card p-6 flex flex-col">
          <div className="flex-1">
            <div className="mt-2 grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Date
                </p>
                <div className="flex items-center gap-2 font-medium text-card-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Nov 14, 2025</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Time
                </p>
                <div className="flex items-center gap-2 font-medium text-card-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>20:00</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Cinema
                </p>
                <div className="flex items-center gap-2 font-medium text-card-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Odeon Luxe</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Seat
                </p>
                <div className="flex items-center gap-2 font-medium text-card-foreground">
                  <Film className="w-4 h-4 text-primary" />
                  <span>Row H, Seat 12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rip Line */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute -left-6 h-12 w-12 rounded-full bg-transparent z-20" />
            <div className="w-full border-t-2 border-dashed border-border/50" />
            <div className="absolute -right-6 h-12 w-12 rounded-full bg-transparent z-20" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Ticket ID
              </p>
              <p className="font-mono text-lg font-bold text-card-foreground">
                #9938421
              </p>
            </div>
            <div className="bg-white p-2 rounded-lg" aria-label="QR Code">
              <QrCode className="w-12 h-12 text-black" aria-hidden="true" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>

); }

"use client";

import { Badge } from "@/components/ui/badge"; import { Card } from
"@/components/ui/card"; import { cn } from "@/lib/utils"; import { motion } from
"framer-motion"; import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps { title?: string; description?: string; tags?:
string[]; image?: string; links?: { demo?: string; github?: string; };
className?: string; }

const defaultProject = { title: "E-Commerce Platform", description: "Full-stack
online store with payment integration and inventory management", tags: ["React",
"Node.js", "PostgreSQL", "Stripe"], image:
"https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
links: { demo: "#", github: "#" }, };

export function ProjectCard({ title = defaultProject.title, description =
defaultProject.description, tags = defaultProject.tags, image =
defaultProject.image, links = defaultProject.links, className, }:
ProjectCardProps) { return ( <motion.div initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
className={cn("w-full max-w-[400px]", className)} >
<Card className="group relative h-full overflow-hidden rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
<div className="relative aspect-video overflow-hidden"> <motion.img src={image}
alt={title} className="h-full w-full object-cover transition-transform
duration-500 group-hover:scale-110" />
<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
            {links?.demo && (
              <motion.a
                href={links.demo}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 backdrop-blur-md"
                title="View Demo"
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            )}
            {links?.github && (
              <motion.a
                href={links.github}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg backdrop-blur-md"
                title="View Code"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
          </div>
        </div>

        <div className="p-5">
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-secondary/50 px-2 py-0.5 text-xs font-normal hover:bg-secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>

); }

"use client";

import { Button } from "@/components/ui/button"; import { Card } from
"@/components/ui/card"; import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; import { motion } from "framer-motion"; import
{ ArrowRight, CreditCard, ShoppingBag } from "lucide-react";

interface OrderItem { id: string; name: string; price: number; image: string;
quantity: number; variant?: string; }

interface GlassOrderSummaryProps { items?: OrderItem[]; subtotal?: number; tax?:
number; shipping?: number; total?: number; className?: string; }

const defaultItems: OrderItem[] = [ { id: "1", name: "Premium Icon Pack", price:
29.0, image:
"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80",
quantity: 1, variant: "Pro License", }, { id: "2", name: "UI Design Kit", price:
49.0, image:
"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80",
quantity: 1, variant: "Dark Mode", }, ];

export function GlassOrderSummary({ items = defaultItems, subtotal = 78.0, tax =
7.8, shipping = 0, total = 85.8, className, }: GlassOrderSummaryProps) { return
( <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }} className={cn("w-full max-w-[400px]", className)}
>
<Card className="group relative overflow-hidden rounded-2xl border-border/50 bg-card/30 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
<div className="p-6">
<div className="mb-6 flex items-center gap-2">
<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
<ShoppingBag className="h-4 w-4" />
</div>
<h3 className="text-lg font-semibold text-foreground"> Order Summary
</h3>
</div>

          <div className="space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-background/40"
              >
                <div className="h-12 w-12 overflow-hidden rounded-md border border-border/50 bg-background/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.variant}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    x{item.quantity}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Separator className="my-6 bg-border/50" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {shipping > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            )}
            <div className="mt-4 flex justify-between text-base font-semibold text-foreground">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button className="group/btn mt-6 w-full gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40">
            <CreditCard className="h-4 w-4" />
            Pay Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </Card>
    </motion.div>

); }

"use client";

import { Button } from "@/components/ui/button"; import { Card } from
"@/components/ui/card"; import { Input } from "@/components/ui/input"; import {
Label } from "@/components/ui/label"; import { cn } from "@/lib/utils"; import {
motion } from "framer-motion"; import { Calendar, CreditCard, Lock } from
"lucide-react"; import { useState } from "react";

interface GlassCheckoutCardProps { amount?: number; className?: string; }

export function GlassCheckoutCard({ amount = 85.8, className, }:
GlassCheckoutCardProps) { const [paymentMethod, setPaymentMethod] =
useState("card");

return ( <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0
}} transition={{ duration: 0.4 }} className={cn("w-full max-w-[400px]",
className)} >
<Card className="group relative overflow-hidden rounded-2xl border-border/50 bg-card/30 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
<div className="p-6">
<div className="mb-6">
<h3 className="text-lg font-semibold text-foreground"> Payment Details
</h3>
<p className="text-sm text-muted-foreground"> Complete your purchase securely
</p>
</div>

          {/* Payment Methods */}
          <div className="mb-6 grid grid-cols-3 gap-2">
            {["card", "paypal", "apple"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={cn(
                  "flex h-12 items-center justify-center rounded-lg border border-border/50 bg-background/50 transition-all hover:bg-background/80",
                  paymentMethod === method &&
                    "border-primary bg-primary/10 text-primary"
                )}
              >
                {method === "card" && <CreditCard className="h-5 w-5" />}
                {method === "paypal" && (
                  <span className="font-bold italic">Pay</span>
                )}
                {method === "apple" && (
                  <span className="font-semibold">Pay</span>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  className="border-border/50 bg-background/50 pl-10 backdrop-blur-sm focus:border-primary/50 focus:bg-background/80"
                />
                <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <div className="relative">
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="border-border/50 bg-background/50 pl-10 backdrop-blur-sm focus:border-primary/50 focus:bg-background/80"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <div className="relative">
                  <Input
                    id="cvc"
                    placeholder="123"
                    className="border-border/50 bg-background/50 pl-10 backdrop-blur-sm focus:border-primary/50 focus:bg-background/80"
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:bg-background/80"
              />
            </div>
          </div>

          <Button className="mt-6 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40">
            Pay ${amount.toFixed(2)}
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            <Lock className="inline-block h-3 w-3 mr-1" />
            Payments are secure and encrypted
          </p>
        </div>
      </Card>
    </motion.div>

); }

"use client";

import { Badge } from "@/components/ui/badge"; import { motion, useReducedMotion
} from "framer-motion";

export function HoverExpandCard() { const shouldReduceMotion =
useReducedMotion();

return (
<div className=""> <motion.div whileHover={shouldReduceMotion ? undefined : { y:
-10, scale: 1.015 }} whileFocus={shouldReduceMotion ? undefined : { y: -10,
scale: 1.015 }} transition={{ type: "spring", stiffness: 260, damping: 26 }}
className="group rounded-3xl border border-border/60 bg-card/80 p-6
backdrop-blur-xl transition-shadow duration-300
hover:shadow-[0_28px_90px_-40px_rgba(15,23,42,0.75)] focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
focus-visible:ring-offset-background" tabIndex={0} role="group"
aria-label="Hover expand card demonstrating glassmorphic elevation." >
<div className="relative mb-4 h-40 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-foreground/10 via-background/40 to-transparent">
<motion.div aria-hidden className="absolute inset-0
bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(79,70,229,0.45),transparent_60%)]
transition-transform duration-500" whileHover={shouldReduceMotion ? undefined :
{ scale: 1.05 }} />
</div>
<Badge
          variant="outline"
          className="mb-3 w-fit rounded-full border-border/60 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        > Feature
</Badge>
<h3 className="mb-2 text-xl font-semibold text-foreground"> Beautiful Card
</h3>
<p className="text-sm leading-relaxed text-muted-foreground"> Hover or focus to
gently lift and expand the surface. Animations stay calm but responsive,
matching the glassmorphic system.
</p> </motion.div>
</div> ); }

"use client";

import { Badge } from "@/components/ui/badge"; import { Button } from
"@/components/ui/button"; import { Card, CardContent, CardDescription,
CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"; import {
DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from
"@/components/ui/dropdown-menu"; import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; import { AnimatePresence,
motion } from "framer-motion"; import { Bold, ChevronDown, Italic, List,
ListOrdered, Plus, RotateCcw, Save, Underline, X, } from "lucide-react"; import
{ useMemo, useState } from "react";

type Priority = "high" | "medium" | "low";

type TeamMember = { id: string; name: string; role: string; initials: string;
accent: string; };

const allMembers: TeamMember[] = [ { id: "sophia", name: "Sophia Williams",
role: "Product Designer", initials: "SW", accent: "ring-foreground
text-foreground", }, { id: "liam", name: "Liam Johnson", role: "Design Manager",
initials: "LJ", accent: "ring-foreground text-foreground", }, { id: "olivia",
name: "Olivia Smith", role: "UX Researcher", initials: "OS", accent:
"ring-foreground text-foreground", }, { id: "mia", name: "Mia Chen", role:
"Product Owner", initials: "MC", accent: "ring-foreground text-foreground", }, {
id: "ethan", name: "Ethan Davis", role: "UI Engineer", initials: "ED", accent:
"ring-foreground text-foreground", }, ];

const priorityMap: Record< Priority, { label: string; badge: string; dot:
string; description: string }

> = { high: { label: "High", badge: "border border-destructive/40
> bg-destructive/20 text-destructive dark:text-red-400", dot: "bg-destructive",
> description: "Requires immediate focus and dedicated resources", }, medium: {
> label: "Medium", badge: "border border-amber-500/30 bg-amber-500/20
> text-amber-600 dark:text-amber-400", dot: "bg-amber-500", description:
> "Important but not blocking other work", }, low: { label: "Low", badge:
> "border border-emerald-500/30 bg-emerald-500/20 text-emerald-600
> dark:text-emerald-400", dot: "bg-emerald-500", description: "Nice-to-have
> improvements to schedule later", }, };

const defaultDescription = "The goal is to update the current design system with
the latest components and styles. This includes reviewing existing elements,
identifying areas for improvement, and implementing changes to ensure
consistency and usability across all platforms."; const maxDescriptionLength =
200;

export function DetailTaskCard() { const [title, setTitle] = useState("Edit
Design System"); const [priority, setPriority] = useState<Priority>("high");
const [assignees, setAssignees] = useState<TeamMember[]>( allMembers.slice(0, 3)
); const [description, setDescription] = useState(defaultDescription); const
[reminderEnabled, setReminderEnabled] = useState(true); const [isSaving,
setIsSaving] = useState(false); const [isSaved, setIsSaved] = useState(false);

const remainingCharacters = maxDescriptionLength - description.length;

const availableMembers = useMemo( () => allMembers.filter( (member) =>
!assignees.some((assigned) => assigned.id === member.id) ), [assignees] );

const handleRemoveAssignee = (id: string) => { setAssignees((prev) =>
prev.filter((member) => member.id !== id)); };

const handleAddPerson = () => { if (availableMembers.length === 0) return; const
[nextMember] = availableMembers; setAssignees((prev) => [...prev, nextMember]);
};

const handleReset = () => { setTitle("Edit Design System"); setPriority("high");
setAssignees(allMembers.slice(0, 3)); setDescription(defaultDescription);
setReminderEnabled(true); setIsSaved(false); };

const handleSave = () => { if (isSaving) return; setIsSaving(true);
setIsSaved(false); setTimeout(() => { setIsSaving(false); setIsSaved(true);
setTimeout(() => setIsSaved(false), 2000); }, 900); };

const toolbarIcons = [Bold, Italic, Underline, List, ListOrdered];

return (
<div className="">
<Card className="group relative w-full overflow-hidden rounded-2xl border border-border/40 bg-background/60 text-foreground backdrop-blur transition-all hover:border-border/60 hover:shadow-lg">
<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

        <CardHeader className="relative gap-3 border-b border-border/40 bg-background/40 px-6 py-6">
          <Badge className="w-fit rounded-full bg-primary/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            Task Manager
          </Badge>
          <CardTitle className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
            Detail Task Overview
          </CardTitle>
          <CardDescription className="text-sm text-foreground/70">
            Keep your task aligned with team priorities and deliverables.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-10 px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid gap-6 md:grid-cols-2"
          >
            <div className="space-y-3">
              <label
                htmlFor="task-title"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60"
              >
                Title Task
              </label>
              <Input
                id="task-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="rounded-xl border-border/40 bg-background/40 text-sm transition-colors focus-visible:border-border/60 focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-describedby="task-title-description"
              />
              <p
                id="task-title-description"
                className="text-xs text-foreground/60"
              >
                Keep it short and goal oriented.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                Priority
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-between gap-3 rounded-xl border-border/40 bg-background/40 text-sm font-medium text-foreground transition-all hover:border-border/60 hover:bg-background/60"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${priorityMap[priority].dot}`}
                        aria-hidden="true"
                      />
                      <span>{priorityMap[priority].label}</span>
                    </span>
                    <ChevronDown
                      className="h-4 w-4 text-foreground/60"
                      aria-hidden="true"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-44 rounded-xl border border-border/40 bg-background/70 backdrop-blur"
                >
                  {(Object.keys(priorityMap) as Priority[]).map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onSelect={() => setPriority(option)}
                      className="flex items-center justify-between gap-2 rounded-lg text-sm text-foreground/80 focus:bg-background/60 focus:text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${priorityMap[option].dot}`}
                          aria-hidden="true"
                        />
                        {priorityMap[option].label}
                      </span>
                      {priority === option ? (
                        <Badge
                          className={`rounded-full px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] ${priorityMap[option].badge}`}
                        >
                          Selected
                        </Badge>
                      ) : null}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-xs text-foreground/60">
                {priorityMap[priority].description}
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                Assign Task To
              </span>
              <Badge className="rounded-full border border-border/40 bg-background/50 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-foreground/70 backdrop-blur transition-colors hover:border-border/60 hover:bg-background/70 hover:text-foreground">
                Team
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {assignees.map((member) => (
                  <motion.div
                    layout
                    key={member.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/40 px-3 py-2 backdrop-blur transition-colors hover:border-border/60"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-xs font-semibold tracking-tight ring-1 ring-border/40 ring-offset-2 ring-offset-background ${member.accent}`}
                    >
                      {member.initials}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-medium text-foreground">
                        {member.name}
                      </span>
                      <span className="text-xs text-foreground/60">
                        {member.role}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAssignee(member.id)}
                      className="h-8 w-8 rounded-lg text-foreground/60 transition-colors hover:text-foreground"
                      aria-label={`Remove ${member.name} from this task`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddPerson}
                disabled={availableMembers.length === 0}
                className="flex items-center gap-2 rounded-xl border border-dashed border-border/50 bg-transparent text-sm text-foreground/80 transition-all hover:border-border/70 hover:bg-background/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Plus className="h-4 w-4" />
                Add another person
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                Description
              </span>
              <span className="text-xs text-foreground/60">
                {Math.max(0, remainingCharacters)} / {maxDescriptionLength}
              </span>
            </div>

            <div className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur">
              <div className="flex items-center gap-1 border-b border-border/40 px-3 py-2 text-foreground/60">
                {toolbarIcons.map((Icon, index) => (
                  <Button
                    key={Icon.displayName ?? index}
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 rounded-lg text-foreground/60 transition-colors hover:bg-background/60 hover:text-foreground"
                    aria-label={`Formatting option ${Icon.displayName ?? index + 1}`}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <Textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value.slice(0, maxDescriptionLength)
                  )
                }
                className="h-32 resize-none border-0 bg-transparent px-3 py-3 text-sm text-foreground/80 focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Task description"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border/40 bg-background/40 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="md:flex space-y-2 md:space-y-0 items-center gap-3">
              <motion.button
                type="button"
                role="switch"
                aria-label="Toggle reminder task"
                aria-checked={reminderEnabled}
                onClick={() => setReminderEnabled((prev) => !prev)}
                className={`relative flex h-6 w-12 items-center rounded-full border border-border/50 transition-all ${
                  reminderEnabled ? "bg-primary/20" : "bg-background/60"
                }`}
              >
                <motion.span
                  layout
                  className="absolute left-1 top-1 h-4 w-4 rounded-full bg-primary shadow-lg"
                  animate={{ x: reminderEnabled ? 22 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              </motion.button>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Reminder Task
                </p>
                <p className="text-xs text-foreground/60">
                  {reminderEnabled
                    ? "We will notify the assignees 24 hours before the due date."
                    : "Enable reminders to keep everyone on track."}
                </p>
              </div>
            </div>

            <Badge className="rounded-full border border-border/40 bg-background/60 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-foreground/70 backdrop-blur transition-colors hover:border-border/60 hover:bg-background/70 hover:text-foreground">
              Sprint Q4
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t border-border/40 bg-background/50 px-6 py-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Need to start over?</span>
            <Button
              type="button"
              variant="link"
              className="px-0 text-sm text-foreground hover:text-primary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {isSaved ? (
                <motion.span
                  key="saved"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-emerald-600 dark:text-emerald-400"
                >
                  Saved!
                </motion.span>
              ) : null}
            </AnimatePresence>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl text-sm transition-all hover:brightness-105"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>

); }

"use client";

import { Badge } from "@/components/ui/badge"; import { Button } from
"@/components/ui/button"; import { Card, CardContent, CardDescription,
CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"; import {
Separator } from "@/components/ui/separator"; import { AnimatePresence, motion,
useReducedMotion } from "framer-motion"; import { Check, ShieldCheck, Sparkles,
Star, Truck } from "lucide-react"; import { useState } from "react";

type Plan = { id: string; title: string; price: string; description: string;
promise: string; };

const plans: Plan[] = [ { id: "essential", title: "Essential", price: "$48.00",
description: "Everyday comfort with signature cushioning and durable
materials.", promise: "Ships in 2 business days • 30-day returns", }, { id:
"plus", title: "Plus", price: "$68.00", description: "Upgraded foam footbed,
recycled laces, and breathable knit upper.", promise: "Ships next business day •
45-day returns", }, { id: "premium", title: "Premium", price: "$92.00",
description: "Adaptive arch support and antimicrobial lining for long days on
your feet.", promise: "Priority fulfillment • 60-day returns", }, ];

const highlights = [ { icon: Sparkles, label: "Best Seller", }, { icon:
ShieldCheck, label: "2-year warranty", }, ];

export function EcommerceHighlightCard() { const [activePlan, setActivePlan] =
useState<Plan>(plans[1]); const shouldReduceMotion = useReducedMotion();

return (
<div className="w-full"> <motion.div initial={shouldReduceMotion ? false : {
opacity: 0, y: 24 }} animate={shouldReduceMotion ? { opacity: 1 } : { opacity:
1, y: 0 }} transition={ shouldReduceMotion ? undefined : { duration: 0.45, ease:
"easeOut" } } className="relative z-10" >
<Card className="group relative overflow-hidden rounded-[28px] border border-border/40 bg-background text-foreground">
<div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
          />

          <CardHeader className="relative space-y-4 pb-0">
            <Badge className="w-fit rounded-full bg-primary/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
              Nimbus Collection
            </Badge>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Nimbus Pace Runner
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Lightweight performance kicks engineered for all-day comfort and
                momentum.
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-primary">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-muted-foreground">4.9 • 1,240 reviews</span>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-6 pt-6">
            <div className="flex flex-wrap gap-2">
              {highlights.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
                >
                  <Icon
                    className="h-3.5 w-3.5 text-primary"
                    aria-hidden="true"
                  />
                  {label}
                </span>
              ))}
            </div>

            <div className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Choose your bundle
              </span>
              <div className="flex flex-wrap gap-2">
                {plans.map((plan) => {
                  const isActive = plan.id === activePlan.id;
                  return (
                    <Button
                      key={plan.id}
                      type="button"
                      variant="outline"
                      onClick={() => setActivePlan(plan)}
                      aria-pressed={isActive}
                      className={`rounded-full border-border/60 px-4 py-2 text-sm font-medium transition-all ${
                        isActive
                          ? "border-primary/40 bg-primary text-primary-foreground shadow-lg"
                          : "bg-background/80 text-foreground hover:border-primary/30 hover:bg-muted"
                      }`}
                    >
                      {plan.title}
                    </Button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                }
                exit={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 0.32,
                        ease: "easeOut",
                        opacity: { duration: 0.25 },
                      }
                }
                className="space-y-3 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {activePlan.title}
                    </p>
                    <p className="text-base font-semibold text-foreground">
                      {activePlan.price}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    Selected
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {activePlan.description}
                </p>
                <p className="text-xs font-medium text-foreground">
                  {activePlan.promise}
                </p>
              </motion.div>
            </AnimatePresence>

            <Separator className="bg-border/60" />

            <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/50 p-4 text-sm text-muted-foreground backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>Free express shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  className="h-4 w-4 text-primary"
                  aria-hidden="true"
                />
                <span>Extended warranty included with every bundle</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="relative flex flex-col gap-4 border-t border-border/50 bg-muted/40 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm">
              <p className="font-medium text-foreground">
                Arrives before Friday
              </p>
              <p className="text-xs text-muted-foreground">
                Checkout before 2PM local time
              </p>
            </div>
            <Button size="lg" className="w-full rounded-full sm:w-auto">
              Add to bag • {activePlan.price}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>

); }

"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants, } from
"framer-motion"; import { ChevronLeft, ChevronRight } from "lucide-react";
import { useId, useMemo, useState } from "react";

interface Slide { id: number; image: string; title: string; description: string;
}

const slides: Slide[] = [ { id: 1, image:
"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
title: "Minimalist Design", description: "Clean lines and simple forms create
timeless elegance.", }, { id: 2, image:
"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
title: "Modern Simplicity", description: "Less is more in contemporary visual
language.", }, { id: 3, image:
"https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80",
title: "Pure Essence", description: "Stripped down to the essential elements.",
}, ];

export function ImageSliderCard() { const [currentIndex, setCurrentIndex] =
useState(0); const shouldReduceMotion = useReducedMotion();

const headingId = useId(); const descriptionId = useId(); const tablistId =
useId();

const slideCount = slides.length;

const imageVariants = useMemo((): Variants => { if (shouldReduceMotion) { return
{ enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 }, }; }
return { enter: { opacity: 0, scale: 0.98 }, center: { opacity: 1, scale: 1 },
exit: { opacity: 0, scale: 1.02 }, }; }, [shouldReduceMotion]);

const paginate = (newDirection: number) => { setCurrentIndex((prevIndex) => {
const nextIndex = prevIndex + newDirection; if (nextIndex < 0) return
slideCount - 1; if (nextIndex >= slideCount) return 0; return nextIndex; }); };

const goToSlide = (index: number) => { if (index === currentIndex) return;
setCurrentIndex(index); };

const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => { switch
(event.key) { case "ArrowLeft": { event.preventDefault(); paginate(-1); break; }
case "ArrowRight": { event.preventDefault(); paginate(1); break; } case "Home":
{ event.preventDefault(); goToSlide(0); break; } case "End": {
event.preventDefault(); goToSlide(slideCount - 1); break; } default: break; } };

return ( <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0
}} transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
className="rounded-2xl w-full max-w-3xl bg-card border border-border
overflow-hidden focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-ring focus-visible:ring-offset-2
focus-visible:ring-offset-background" role="group"
aria-roledescription="carousel" aria-label="Design inspiration image carousel"
aria-live="polite" aria-atomic="true" tabIndex={0} onKeyDown={handleKeyDown} >
{/* Image Slider */}
<div className="relative h-96 bg-muted overflow-hidden">
<AnimatePresence initial={false} mode="wait"> <motion.img key={currentIndex}
src={slides[currentIndex]?.image} variants={imageVariants} initial="enter"
animate="center" exit="exit" transition={{ duration: shouldReduceMotion ? 0 :
0.35, ease: "easeInOut", }} className="absolute w-full h-full object-cover
grayscale focus-visible:outline-none transition-opacity"
alt={slides[currentIndex]?.title} role="img" aria-describedby={descriptionId}
aria-labelledby={headingId} />
</AnimatePresence>

        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          className=" absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          className=" absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
          aria-label="Next slide"
        >
          <ChevronRight
            className="w-5 h-5 text-foreground"
            aria-hidden="true"
          />
        </button>

        <span className="sr-only" role="status">
          Slide {currentIndex + 1} of {slideCount}
        </span>
      </div>

      {/* Content */}
      <div
        className="p-8 border-t border-border"
        role="tablist"
        aria-label="Slide navigation"
        id={tablistId}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            role="tabpanel"
            aria-labelledby={headingId}
            id={`slide-panel-${slides[currentIndex]?.id ?? "unknown"}`}
          >
            <h2
              id={headingId}
              className="text-2xl font-semibold text-foreground mb-2"
            >
              {slides[currentIndex]?.title}
            </h2>
            <p
              id={descriptionId}
              className="text-muted-foreground leading-relaxed"
              aria-live="polite"
            >
              {slides[currentIndex]?.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2 mt-6">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`rounded-full h-1.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-muted hover:bg-muted/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`slide-panel-${slide.id}`}
                tabIndex={isActive ? 0 : -1}
                id={`slide-tab-${slide.id}`}
              >
                <span className="sr-only">
                  {slide.title} ({index + 1} of {slideCount})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>

); }

"use client";

import { NativeUserCard } from "../native-user-card-shadcnui";

export function NativeUserCardDemo() { return (
<div className="flex w-full flex-col items-center gap-8 p-8">
<div className="w-full max-w-[250px]">
<NativeUserCard
          imageSrc="https://github.com/shadcn.png"
          name="shadcn"
          handle="@shadcn"
          href="#"
        />
</div>
</div> ); }

"use client";

import { Button } from "@/components/ui/button"; import { Card } from
"@/components/ui/card"; import { cn } from "@/lib/utils"; import {
AnimatePresence, motion, useReducedMotion } from "framer-motion"; import {
AlertCircle, AlertTriangle, CheckCircle, ChevronDown, Info, LucideIcon, X, }
from "lucide-react"; import { useCallback, useState } from "react";

type NotificationType = "success" | "error" | "warning" | "info";

type NotificationConfig = { title: string; message: string; description: string;
action: { label: string; onClick: () => void; }; icon: LucideIcon;
toneClassName: string; };

type ActiveNotification = { id: string; type: NotificationType; };

const NOTIFICATION_CONFIGS: Record<NotificationType, NotificationConfig> = {
success: { title: "Success", message: "Operation completed successfully",
description: "Your changes have been saved to the database. All updates are now
live.", action: { label: "View Details", onClick: () => console.log("View
details"), }, icon: CheckCircle, toneClassName: "text-green-500", }, error: {
title: "Error Occurred", message: "Something went wrong", description: "Failed
to process your request. Please try again or contact support if the issue
persists.", action: { label: "Retry", onClick: () => console.log("Retry") },
icon: AlertCircle, toneClassName: "text-red-500", }, warning: { title:
"Warning", message: "Please review this action", description: "This action may
have unintended consequences. Review the details before proceeding.", action: {
label: "Learn More", onClick: () => console.log("Learn more") }, icon:
AlertTriangle, toneClassName: "text-yellow-500", }, info: { title:
"Information", message: "New feature available", description: "Check out our new
notification system with expandable details. Click to see more information.",
action: { label: "Explore", onClick: () => console.log("Explore") }, icon: Info,
toneClassName: "text-blue-500", }, };

const BUTTON_CONFIGS: Array<{ type: NotificationType; label: string }> = [ {
type: "success", label: "Success" }, { type: "error", label: "Error" }, { type:
"warning", label: "Warning" }, { type: "info", label: "Info" }, ];

export function NotificationCenter() { const [notifications, setNotifications] =
useState<ActiveNotification[]>([]); const prefersReducedMotion =
useReducedMotion() ?? false;

const addNotification = useCallback((type: NotificationType) => { const id =
Math.random().toString(36).slice(2, 9); setNotifications((prev) => [...prev, {
id, type }]);

    window.setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 8000);

}, []);

const removeNotification = useCallback((id: string) => { setNotifications((prev)
=> prev.filter((notification) => notification.id !== id) ); }, []);

return (
<div className="min-h-screen bg-background">
<div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 p-4 sm:p-6"
      >
<div className="pointer-events-auto mx-auto flex max-w-md flex-col gap-3">
<AnimatePresence initial={false}> {notifications.map((notification) => { const
config = NOTIFICATION_CONFIGS[notification.type];

              return (
                <NotificationBar
                  key={notification.id}
                  config={config}
                  type={notification.type}
                  notificationId={notification.id}
                  onDismiss={() => removeNotification(notification.id)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {BUTTON_CONFIGS.map(({ type, label }) => (
            <motion.button
              key={type}
              type="button"
              onClick={() => addNotification(type)}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/60 p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-foreground/[0.04] via-transparent to-transparent" />
              <div className="relative flex flex-col items-center gap-3 text-center">
                <ButtonIcon type={type} />
                <span className="text-sm font-semibold text-foreground">
                  {label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>

); }

type NotificationBarProps = { config: NotificationConfig; type:
NotificationType; notificationId: string; onDismiss: () => void;
prefersReducedMotion: boolean; };

function NotificationBar({ config, type, notificationId, onDismiss,
prefersReducedMotion, }: NotificationBarProps) { const [isExpanded,
setIsExpanded] = useState(false); const { action, description, icon: Icon,
message, title, toneClassName, } = config;

return ( <motion.div role="listitem" initial={{ opacity: 0, y:
prefersReducedMotion ? 0 : -20 }} animate={{ opacity: 1, y: 0 }} exit={{
opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }} transition={{ duration:
prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }} >
<Card className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/30 p-4 backdrop-blur">
<div aria-hidden="true" className={cn( "flex h-10 w-10 shrink-0 items-center
justify-center rounded-full bg-muted/80", toneClassName )} >
<Icon className="h-5 w-5" />
</div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-foreground/80">{message}</p>
            </div>
            <motion.button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-controls={`notification-details-${notificationId}`}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/40 text-foreground/60 transition-colors hover:text-foreground"
            >
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.2,
                  ease: "easeOut",
                }}
                className="flex"
              >
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </motion.span>
              <span className="sr-only">
                {isExpanded ? "Hide details" : "Show details"}
              </span>
            </motion.button>
          </div>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="details"
                id={`notification-details-${notificationId}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.25,
                  ease: "easeOut",
                }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-3 border-t border-border/40 pt-3 text-sm text-foreground/70">
                  <p>{description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={action.onClick}
                      className="rounded-full text-xs"
                    >
                      {action.label}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-xs"
                      onClick={() => {
                        console.log("Remind me later");
                        onDismiss();
                      }}
                    >
                      Remind me later
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          onClick={onDismiss}
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
          className="rounded-full p-1 text-foreground/60 transition-colors hover:text-foreground"
          aria-label={`Dismiss ${type} notification`}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      </Card>
    </motion.div>

); }

type ButtonIconProps = { type: NotificationType; };

function ButtonIcon({ type }: ButtonIconProps) { const Icon =
NOTIFICATION_CONFIGS[type].icon; const prefersReducedMotion = useReducedMotion()
?? false;

return ( <motion.div aria-hidden="true" whileHover={{ scale:
prefersReducedMotion ? 1 : 1.1 }} className="flex h-10 w-10 items-center
justify-center rounded-full border border-border/60 bg-muted/60
text-foreground/70" >
<Icon className="h-5 w-5" /> </motion.div> ); }

"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge"; import { Button } from
"@/components/ui/button"; import { motion, type Variants } from "framer-motion";
import { CalendarDays, Cloud, CloudLightning, CloudRain, Droplets, Gauge,
LucideIcon, MapPin, RefreshCcw, Sun, Sunrise, Sunset, Umbrella, Wind, } from
"lucide-react"; import { useMemo } from "react"; import { Area, AreaChart,
CartesianGrid, ResponsiveContainer, Tooltip, XAxis, } from "recharts";

type WeatherCondition = "sunny" | "rain" | "cloudy" | "storm";

type HourlyForecast = { time: string; temperature: number; feelsLike: number;
precipitationChance: number; windSpeed: number; condition: WeatherCondition; };

type WeeklyForecast = { day: string; high: number; low: number;
precipitationChance: number; condition: WeatherCondition; };

type WeatherMetric = { label: string; value: string; description: string; icon:
LucideIcon; };

type AirQualityMetric = { label: string; value: string; status: string;
description: string; };

type AlertSeverity = "Advisory" | "Watch" | "Warning";

type WeatherAlert = { title: string; description: string; severity:
AlertSeverity; icon: LucideIcon; };

type WeatherData = { location: string; updatedAt: string; current: {
temperature: number; feelsLike: number; summary: string; condition:
WeatherCondition; humidity: number; precipitationChance: number; windSpeed:
number; pressure: number; sunrise: string; sunset: string; }; hourly:
HourlyForecast[]; weekly: WeeklyForecast[]; airQuality: AirQualityMetric[];
alerts: WeatherAlert[]; };

const STATIC_WEATHER_DATA: WeatherData = { location: "San Francisco, CA",
updatedAt: "2024-07-12T16:00:00.000Z", current: { temperature: 64, feelsLike:
62, summary: "Mostly sunny with a coastal breeze", condition: "sunny", humidity:
62, precipitationChance: 15, windSpeed: 12, pressure: 1016, sunrise:
"2024-07-12T13:58:00.000Z", sunset: "2024-07-13T03:33:00.000Z", }, hourly: [ {
time: "2024-07-12T16:00:00.000Z", temperature: 60, feelsLike: 59,
precipitationChance: 10, windSpeed: 10, condition: "sunny", }, { time:
"2024-07-12T17:00:00.000Z", temperature: 61, feelsLike: 60, precipitationChance:
12, windSpeed: 11, condition: "sunny", }, { time: "2024-07-12T18:00:00.000Z",
temperature: 62, feelsLike: 61, precipitationChance: 12, windSpeed: 12,
condition: "sunny", }, { time: "2024-07-12T19:00:00.000Z", temperature: 63,
feelsLike: 62, precipitationChance: 15, windSpeed: 13, condition: "sunny", }, {
time: "2024-07-12T20:00:00.000Z", temperature: 64, feelsLike: 63,
precipitationChance: 18, windSpeed: 14, condition: "sunny", }, { time:
"2024-07-12T21:00:00.000Z", temperature: 65, feelsLike: 64, precipitationChance:
20, windSpeed: 14, condition: "sunny", }, { time: "2024-07-12T22:00:00.000Z",
temperature: 66, feelsLike: 65, precipitationChance: 20, windSpeed: 13,
condition: "sunny", }, { time: "2024-07-12T23:00:00.000Z", temperature: 65,
feelsLike: 64, precipitationChance: 18, windSpeed: 12, condition: "sunny", }, {
time: "2024-07-13T00:00:00.000Z", temperature: 63, feelsLike: 62,
precipitationChance: 15, windSpeed: 11, condition: "cloudy", }, { time:
"2024-07-13T01:00:00.000Z", temperature: 61, feelsLike: 60, precipitationChance:
12, windSpeed: 10, condition: "cloudy", }, { time: "2024-07-13T02:00:00.000Z",
temperature: 59, feelsLike: 58, precipitationChance: 10, windSpeed: 9,
condition: "cloudy", }, { time: "2024-07-13T03:00:00.000Z", temperature: 58,
feelsLike: 57, precipitationChance: 8, windSpeed: 8, condition: "cloudy", }, ],
weekly: [ { day: "2024-07-12", high: 66, low: 56, precipitationChance: 20,
condition: "sunny", }, { day: "2024-07-13", high: 65, low: 55,
precipitationChance: 25, condition: "sunny", }, { day: "2024-07-14", high: 64,
low: 54, precipitationChance: 30, condition: "cloudy", }, { day: "2024-07-15",
high: 63, low: 54, precipitationChance: 40, condition: "cloudy", }, { day:
"2024-07-16", high: 62, low: 53, precipitationChance: 45, condition: "rain", },
{ day: "2024-07-17", high: 64, low: 54, precipitationChance: 30, condition:
"sunny", }, { day: "2024-07-18", high: 67, low: 55, precipitationChance: 15,
condition: "sunny", }, ], airQuality: [ { label: "US AQI", value: "42", status:
"Good", description: "Clear coastal air with minimal particulate matter
detected.", }, { label: "PM2.5", value: "8.6 µg/m³", status: "Low particulate
levels", description: "Fine particulates remain well below daily thresholds.",
}, { label: "Dust Index", value: "18.4 µg/m³", status: "Minimal dust",
description: "Marine influence keeps airborne dust concentrations low.", }, ],
alerts: [ { title: "Mild onshore breeze continues", description: "Expect a
gentle westerly wind through the afternoon with choppy bay waters.", severity:
"Advisory", icon: Wind, }, { title: "Low rain chance through weekend",
description: "Stray mist possible near the coast late nights, but dry for most
plans.", severity: "Watch", icon: Umbrella, }, ], };

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: {
opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2, }, }, };

const itemVariants: Variants = { hidden: { opacity: 0, y: 16 }, visible: {
opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" }, }, };

const listItemVariants: Variants = { hidden: { opacity: 0, y: 12 }, visible: {
opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" }, }, };

const SEVERITY_STYLES: Record<AlertSeverity, string> = { Advisory:
"bg-blue-500/20 text-blue-600 dark:text-blue-400", Watch: "bg-amber-500/20
text-amber-600 dark:text-amber-400", Warning: "bg-red-500/20 text-red-600
dark:text-red-400", };

const CONDITION_ICONS: Record<WeatherCondition, LucideIcon> = { sunny: Sun,
rain: CloudRain, cloudy: Cloud, storm: CloudLightning, };

function formatHour(timestamp: string, timezone?: string) { return new
Intl.DateTimeFormat(undefined, { hour: "numeric", hour12: true, timeZone:
timezone, }).format(new Date(timestamp)); }

function formatDay(timestamp: string, timezone?: string) { return new
Intl.DateTimeFormat(undefined, { weekday: "short", timeZone: timezone,
}).format(new Date(timestamp)); }

function formatTime(timestamp: string, timezone?: string) { return new
Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", hour12:
true, timeZone: timezone, }).format(new Date(timestamp)); }

function describeHumidity(value: number) { if (value >= 70) return "Humid –
expect a touch of mugginess"; if (value <= 30) return "Dry air – hydrate
frequently"; return "Comfortable humidity for outdoor plans"; }

function describeWind(speed: number) { if (speed >= 25) return "Breezy with
gusts – secure loose items"; if (speed >= 15) return "Noticeable breeze across
the bay"; return "Light winds – calm conditions"; }

function describePressure(value: number) { if (value >= 1020) return "High
pressure holding – skies stay stable"; if (value <= 1005) return "Low pressure
developing – expect shifts"; return "Steady pressure – minimal change expected";
}

function describePrecipitation(chance: number) { if (chance >= 60) return "Keep
rain gear handy"; if (chance >= 30) return "Spotty showers possible"; return
"Minimal chance of precipitation"; }

export function WeatherDashboard(): React.ReactElement { const activeView =
"today"; const weatherData = STATIC_WEATHER_DATA;

const weatherMetrics = useMemo<WeatherMetric[]>(() => { return [ { label:
"Humidity", value: weatherData.current.humidity + "%", description:
describeHumidity(weatherData.current.humidity), icon: Droplets, }, { label:
"Wind", value: weatherData.current.windSpeed + " mph", description:
describeWind(weatherData.current.windSpeed), icon: Wind, }, { label: "Pressure",
value: weatherData.current.pressure + " hPa", description:
describePressure(weatherData.current.pressure), icon: Gauge, }, { label:
"Precipitation", value: weatherData.current.precipitationChance + "%",
description: describePrecipitation( weatherData.current.precipitationChance ),
icon: Umbrella, }, ]; }, [weatherData]);

const hourlyChartData = useMemo( () => weatherData.hourly.slice(0,
12).map((hour) => ({ name: formatHour(hour.time), temperature: hour.temperature,
feelsLike: hour.feelsLike, })), [weatherData] );

const hourlyForecast = weatherData.hourly.slice(0, 8); const weeklyForecast =
weatherData.weekly.slice(0, 7); const airQualityMetrics =
weatherData.airQuality; const alerts = weatherData.alerts;

const updatedMinutesAgo = useMemo(() => { const updatedDate = new
Date(weatherData.updatedAt); const diffMinutes = Math.floor( (Date.now() -
updatedDate.getTime()) / (1000 * 60) ); if (diffMinutes <= 1) return "Updated
moments ago"; if (diffMinutes < 60) return "Updated " + diffMinutes + " minutes
ago"; const diffHours = Math.floor(diffMinutes / 60); if (diffHours === 1)
return "Updated about an hour ago"; return "Updated " + diffHours + " hours
ago"; }, [weatherData.updatedAt]);

return (
<main className="relative min-h-screen overflow-hidden bg-background">
<div className="relative mx-auto flex min-h-screen flex-col gap-8 py-12 lg:gap-12 lg:py-16">
<header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
<div className="space-y-3">
<Badge
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full border-border/50 bg-background/55 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur"
            >
<CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> 7-Day Coastal
Outlook
</Badge>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Coastal Weather Overview
              </h1>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-foreground/70">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {weatherData.location}
                <span aria-live="polite" className="text-foreground/50">
                  · {updatedMinutesAgo}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["today", "week", "radar"].map((view) => (
              <Button
                key={view}
                type="button"
                variant={view === activeView ? "default" : "ghost"}
                aria-pressed={view === activeView}
                className="rounded-lg px-4 py-2 text-sm uppercase tracking-[0.1em]"
              >
                {view === "today" && "Today"}
                {view === "week" && "Week"}
                {view === "radar" && "Radar"}
              </Button>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => undefined}
              className="gap-2 rounded-lg text-xs uppercase tracking-[0.15em]"
            >
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              Refresh
            </Button>
          </div>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:gap-8 lg:grid-cols-1"
          aria-busy={false}
          aria-live="polite"
        >
          <motion.article
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-6 backdrop-blur transition-all hover:border-border/60 hover:shadow-lg"
            role="article"
            aria-label="Current weather conditions"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

            <div className="relative flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-border/40 bg-background/60 p-3">
                    <Sun className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/70">
                      Right Now
                    </p>
                    <p className="text-sm text-foreground/60">
                      {weatherData.current.summary}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
                      {weatherData.current.temperature}°
                    </span>
                    <span className="text-sm text-foreground/60">
                      Feels like {weatherData.current.feelsLike}°
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70">
                    {"Chance of rain " +
                      weatherData.current.precipitationChance +
                      "% · Sunrise " +
                      formatTime(weatherData.current.sunrise) +
                      " · Sunset " +
                      formatTime(weatherData.current.sunset)}
                  </p>
                </div>
              </div>

              <motion.div
                role="list"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {weatherMetrics.map((metric) => (
                  <motion.div
                    key={metric.label}
                    role="listitem"
                    variants={listItemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 rounded-xl border border-border/30 bg-background/40 p-4 transition-all hover:border-border/50 hover:bg-background/60"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/60 text-foreground/70">
                      <metric.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                        {metric.label}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {metric.value}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {metric.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex flex-col gap-3 rounded-xl border border-border/30 bg-background/30 p-4">
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Sunrise className="h-4 w-4" aria-hidden="true" />
                    Sunrise
                  </div>
                  <span className="text-foreground">
                    {formatTime(weatherData.current.sunrise)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Sunset className="h-4 w-4" aria-hidden="true" />
                    Sunset
                  </div>
                  <span className="text-foreground">
                    {formatTime(weatherData.current.sunset)}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-6 backdrop-blur transition-all hover:border-border/60 hover:shadow-lg "
            role="article"
            aria-label="Hourly forecast chart"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

            <div className="relative flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                    Hourly Forecast
                  </h2>
                  <p className="text-xs text-foreground/60">
                    Temperature trend and precipitation chance through the
                    evening
                  </p>
                </div>
                <Badge className="rounded-full bg-primary/20 text-xs uppercase tracking-[0.2em] text-primary">
                  Live radar calibrated
                </Badge>
              </div>

              <div style={{ width: "100%", height: 260 }} className="relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={hourlyChartData}
                    margin={{ top: 10, right: 16, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="temperatureGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.45}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      opacity={0.25}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--foreground))"
                      opacity={0.6}
                      style={{ fontSize: "11px" }}
                    />
                    <Tooltip
                      cursor={{ stroke: "hsl(var(--primary) / 0.3)" }}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background) / 0.8)",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                        backdropFilter: "blur(12px)",
                        padding: "10px 12px",
                      }}
                      labelStyle={{
                        color: "hsl(var(--foreground))",
                        fontWeight: 600,
                      }}
                      formatter={(value: any, key: any) => [
                        value?.toString() + "°",
                        key === "feelsLike" ? "Feels like" : "Temperature",
                      ]}
                    />
                    <Area
                      type="natural"
                      dataKey="temperature"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2.5}
                      fill="url(#temperatureGradient)"
                      activeDot={{ r: 5 }}
                    />
                    <Area
                      type="natural"
                      dataKey="feelsLike"
                      stroke="hsl(var(--foreground) / 0.4)"
                      strokeDasharray="6 4"
                      strokeWidth={2}
                      fillOpacity={0}
                      activeDot={{ r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <motion.ul
                role="list"
                className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {hourlyForecast.map((hour) => {
                  const Icon = CONDITION_ICONS[hour.condition];
                  return (
                    <motion.li
                      key={hour.time}
                      role="listitem"
                      variants={listItemVariants}
                      className="group/hour flex flex-col gap-2 rounded-xl border border-border/30 bg-background/40 p-4 text-left transition-all hover:border-border/50 hover:bg-background/60"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                        {formatHour(hour.time)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-foreground">
                          {hour.temperature}°
                        </span>
                        <span className="text-xs text-foreground/60">
                          {hour.feelsLike}° feels
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-foreground/70">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-background/50 text-foreground/70">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span>{hour.windSpeed} mph winds</span>
                        </div>
                        <span className="text-xs text-foreground/60">
                          {hour.precipitationChance}% rain
                        </span>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </motion.article>

          <motion.article
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-6 backdrop-blur transition-all hover:border-border/60 hover:shadow-lg "
            role="article"
            aria-label="7 day extended forecast"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

            <div className="relative flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                    Weekly Outlook
                  </h2>
                  <p className="text-xs text-foreground/60">
                    Plan ahead with precipitation risk and temperature swings
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 rounded-lg text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground"
                >
                  Export
                </Button>
              </div>

              <motion.ul
                role="list"
                className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {weeklyForecast.map((day, index) => {
                  const Icon = CONDITION_ICONS[day.condition];
                  return (
                    <motion.li
                      key={day.day + "-" + index}
                      role="listitem"
                      variants={listItemVariants}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-3 rounded-xl border border-border/30 bg-background/40 p-4 transition-all hover:border-border/50 hover:bg-background/60"
                    >
                      <div className="flex items-center justify-between text-sm text-foreground/70">
                        <span className="text-xs uppercase tracking-[0.2em]">
                          {formatDay(day.day)}
                        </span>
                        <span>{day.precipitationChance}% rain</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/50 text-foreground/70">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-lg font-semibold text-foreground">
                              {day.high}°
                            </p>
                            <p className="text-xs text-foreground/60">
                              Low {day.low}°
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="rounded-full border-border/40 bg-background/50 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-foreground/60"
                        >
                          {day.condition === "sunny" && "Clear"}
                          {day.condition === "cloudy" && "Clouds"}
                          {day.condition === "rain" && "Showers"}
                          {day.condition === "storm" && "Storm"}
                        </Badge>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </motion.article>

          <motion.article
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-6 backdrop-blur transition-all hover:border-border/60 hover:shadow-lg"
            role="article"
            aria-label="Air quality and weather alerts"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

            <div className="relative flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground">
                    Air Quality & Alerts
                  </h2>
                  <p className="text-xs text-foreground/60">
                    Live monitoring for coastal neighborhoods
                  </p>
                </div>
                <Badge className="rounded-full bg-emerald-500/20 text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  {airQualityMetrics[0]?.status ?? "Stable"}
                </Badge>
              </div>

              <motion.ul
                role="list"
                className="grid gap-3"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {airQualityMetrics.map((metric) => (
                  <motion.li
                    key={metric.label}
                    role="listitem"
                    variants={listItemVariants}
                    className="rounded-xl border border-border/30 bg-background/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                        {metric.label}
                      </p>
                      <span className="text-sm font-semibold text-foreground">
                        {metric.value}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-foreground/70">
                      {metric.status}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {metric.description}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                  Local alerts
                </h3>
                <motion.ul
                  role="list"
                  className="mt-3 space-y-3"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {alerts.map((alert) => {
                    const Icon = alert.icon;
                    return (
                      <motion.li
                        key={alert.title}
                        role="listitem"
                        variants={listItemVariants}
                        className="flex items-start gap-3 rounded-xl border border-border/30 bg-background/40 p-4"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/60 text-foreground/70">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">
                              {alert.title}
                            </p>
                            <span
                              className={
                                SEVERITY_STYLES[alert.severity] +
                                " rounded-full px-2 py-1 text-[11px] uppercase tracking-[0.15em]"
                              }
                            >
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/60">
                            {alert.description}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </main>

); }

"use client";

import { Badge } from "@/components/ui/badge"; import { Button } from
"@/components/ui/button"; import { Tabs, TabsContent, TabsList, TabsTrigger }
from "@/components/ui/tabs"; import { motion } from "framer-motion"; import {
ChevronRight, Folder } from "lucide-react"; import type React from "react";
import { useState } from "react";

interface FolderItem { name: string; content: React.ReactNode; }

interface FolderBrowserProps { folders?: FolderItem[]; initialFolder?: string; }

export function FolderBrowser({ folders = [], initialFolder, }:
FolderBrowserProps) { const [activeTab, setActiveTab] = useState(() => { if
(initialFolder) return initialFolder; if (folders && folders.length > 0 &&
folders[0]?.name) { return folders[0].name; } return ""; });

return ( <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0
}} transition={{ duration: 0.4 }} className="group relative overflow-hidden
rounded-2xl border border-border/40 bg-background/60 backdrop-blur
transition-all hover:border-border/60 hover:shadow-lg" role="region"
aria-label="Folder browser" > {/* Gradient overlay */}
<div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

      {/* Content */}
      <div className="relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="relative flex h-10 w-full items-end justify-start overflow-x-auto overflow-y-hidden border-b border-border/40 bg-transparent p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {folders?.map((folder) => (
              <TabsTrigger
                key={folder.name}
                value={folder.name}
                className="group/trigger relative flex h-10 flex-shrink-0 items-center gap-2 px-3 text-xs font-medium text-foreground/70 transition-all sm:px-4 sm:text-sm data-[state=active]:h-[calc(2.5rem+1px)] data-[state=active]:rounded-t-lg data-[state=active]:border data-[state=active]:border-border/40 data-[state=active]:border-b-transparent data-[state=active]:bg-background/60 data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:text-foreground"
              >
                <Folder
                  className="h-4 w-4 text-foreground/40 group-hover/trigger:text-foreground/70"
                  aria-hidden="true"
                />
                {folder.name}
                <ChevronRight
                  className="h-4 w-4 text-foreground/40 opacity-0 transition-opacity group-hover/trigger:opacity-100"
                  aria-hidden="true"
                />
              </TabsTrigger>
            ))}
          </TabsList>
          {folders?.map((folder) => (
            <TabsContent
              key={folder.name}
              value={folder.name}
              className="p-6"
              role="tabpanel"
              aria-labelledby={`tab-${folder.name}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {folder.name} Contents
                  </h3>
                  <Badge
                    variant="outline"
                    className="rounded-full border-border/50 bg-background/55 px-3 py-1 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur"
                  >
                    {folder.name.split(" ").pop()}
                  </Badge>
                </div>
                <div className="text-foreground/70">{folder.content}</div>
                <Button
                  variant="default"
                  className="gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label={`Explore ${folder.name}`}
                >
                  Explore More
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </motion.div>

); }

// Example usage (remove if not needed, this is for demonstration) export const
BrowseFolder = () => { const sampleFolders: FolderItem[] = [ { name:
"Documents", content: (
<ul className="list-disc space-y-2 pl-4">
<li>Report.pdf</li>
<li>Notes.txt</li>
<li>Spreadsheet.xlsx</li>
</ul> ), }, { name: "Images", content: (
<ul className="list-disc space-y-2 pl-4">
<li>Photo1.jpg</li>
<li>Photo2.png</li>
<li>Graphic.svg</li>
</ul> ), }, { name: "Projects", content: (
<ul className="list-disc space-y-2 pl-4">
<li>App.zip</li>
<li>Design.fig</li>
<li>Code.ts</li>
</ul> ), }, ];

return <FolderBrowser folders={sampleFolders} initialFolder="Documents" />; };

"use client";

import { Card } from "@/components/ui/card"; import { motion, type Variants }
from "framer-motion"; import { CheckCircle2 } from "lucide-react";

const checklistItems = [ "Define the experience", "Design high-fidelity flows",
"Develop interactive states", "Test accessibility scenarios", "Deploy with
confidence", ];

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: {
opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2, }, }, };

const listItemVariants: Variants = { hidden: { opacity: 0, x: -20 }, visible: {
opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" }, }, };

const iconVariants: Variants = { hidden: { scale: 0 }, visible: { scale: 1,
transition: { type: "spring", stiffness: 200, damping: 16, delay: 0.1 }, }, };

export function AnimatedList() { return (
<div className="">
<Card
        role="article"
        aria-label="Workflow checklist"
        className="group relative w-full overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-6 backdrop-blur transition-all hover:border-border/60 hover:shadow-lg"
      >
<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

        <motion.div
          className="relative space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/70">
              Workflow
            </p>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Project Checklist
            </h3>
            <p className="text-sm text-foreground/70">
              Guide your team through each phase with confidence and clarity.
            </p>
          </div>

          <motion.ul
            role="list"
            aria-label="Project workflow steps"
            className="space-y-3"
            variants={containerVariants}
          >
            {checklistItems.map((item) => (
              <motion.li
                key={item}
                variants={listItemVariants}
                className="group/list flex items-center gap-3 rounded-xl border border-border/30 bg-background/40 p-3 transition-all duration-300 hover:border-border/50 hover:bg-background/60"
              >
                <motion.span
                  variants={iconVariants}
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 transition-colors dark:text-emerald-400"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </motion.span>

                <span className="text-sm text-foreground">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Card>
    </div>

); }

"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar"; import { Badge
} from "@/components/ui/badge"; import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; import { Textarea } from
"@/components/ui/textarea"; import { cn } from "@/lib/utils"; import {
AnimatePresence, motion, useReducedMotion } from "framer-motion"; import {
CheckCheck, MoreVertical, Paperclip, Phone, Search, Send, Video, } from
"lucide-react"; import { FormEvent, useEffect, useMemo, useRef, useState } from
"react";

type Message = { id: string; sender: "user" | "contact"; author: string; text:
string; timestamp: string; };

type Conversation = { id: string; name: string; title: string; status: "online"
| "offline"; unread: number; initials: string; messages: Message[];
quickReplies: string[]; autoReplies: string[]; };

const initialConversations: Conversation[] = [ { id: "product-updates", name:
"Morgan James", title: "Product Strategy", status: "online", unread: 2,
initials: "MJ", messages: [ { id: "product-1", sender: "contact", author:
"Morgan", text: "Thanks for the recap on the CashFlow release. The beta cohort
loves the motion work.", timestamp: "09:18", }, { id: "product-2", sender:
"user", author: "You", text: "Amazing to hear. Do we have a decision on the new
Messenger surface?", timestamp: "09:21", }, { id: "product-3", sender:
"contact", author: "Morgan", text: "Almost there. Design asked for one more pass
on the animation timings - soft ease on expand.", timestamp: "09:24", }, ],
quickReplies: [ "I can share a timing proposal.", "Let me know if you need a
demo recording.", "We can add an onboarding tooltip.", ], autoReplies: [ "That
would help so much - a short clip would be perfect.", "Can we confirm the
handoff checklist by tomorrow?", "Love the attention to accessibility details
here.", ], }, { id: "customer-success", name: "Leah Patel", title: "Customer
Success", status: "offline", unread: 0, initials: "LP", messages: [ { id:
"success-1", sender: "contact", author: "Leah", text: "Morning! Enterprise users
keep mentioning how clear the summary cards feel.", timestamp: "08:05", }, { id:
"success-2", sender: "user", author: "You", text: "Great sign. Do we need any
follow-up education for folks migrating from the legacy dashboard?", timestamp:
"08:08", }, { id: "success-3", sender: "contact", author: "Leah", text: "Maybe a
guided walkthrough. I can draft the outline if you can provide the animation
cues.", timestamp: "08:11", }, ], quickReplies: [ "Happy to add cues for the
walkthrough.", "Let us sync after the support standup.", "We can capture a Loom
covering the flows.", ], autoReplies: [ "Perfect. Support will love a
beat-by-beat cue list.", "Thanks - I will drop a doc in the shared folder
shortly.", "Appreciate you keeping motion accessible throughout.", ], }, { id:
"engineering-handoff", name: "Build Squad", title: "Engineering Handoff",
status: "offline", unread: 1, initials: "BS", messages: [ { id: "build-1",
sender: "contact", author: "Carson", text: "Do you have the reduced-motion
variants for Messenger handy?", timestamp: "Yesterday", }, { id: "build-2",
sender: "user", author: "You", text: "Yep - exporting now with notes on keyboard
focus states.", timestamp: "Yesterday", }, ], quickReplies: [ "Uploading the
reduced-motion recording now.", "Focus ring spec is ready if you need it.", "We
can pair on the final QA pass.", ], autoReplies: [ "Legend - the team will plug
that into the Storybook build tonight.", "Appreciate the extra detail on focus
management.", "We will ping if anything else blocks us.", ], }, ];

type ReplyCursorState = Record<string, number>;

export function Messenger() { const [selectedConversationId,
setSelectedConversationId] = useState<string>( initialConversations[0]?.id ?? ""
); const [conversations, setConversations] =
useState<Conversation[]>(initialConversations); const [draft, setDraft] =
useState(""); const [replyCursor, setReplyCursor] =
useState<ReplyCursorState>(() => { const cursor: ReplyCursorState = {};
initialConversations.forEach((conversation) => { cursor[conversation.id] = 0;
}); return cursor; }); const shouldReduceMotion = useReducedMotion(); const
messagesContainerRef = useRef<HTMLDivElement | null>(null); const liveRegionRef
= useRef<HTMLDivElement | null>(null); const selectedConversationRef =
useRef<string>(selectedConversationId); const replyTimeoutRef = useRef<number |
null>(null);

const activeConversation = useMemo(() => { return conversations.find(
(conversation) => conversation.id === selectedConversationId ); },
[conversations, selectedConversationId]);

useEffect(() => { selectedConversationRef.current = selectedConversationId;
setConversations((prev) => prev.map((conversation) => conversation.id ===
selectedConversationId ? { ...conversation, unread: 0 } : conversation ) ); },
[selectedConversationId]);

useEffect(() => { if (!messagesContainerRef.current) { return; } const container
= messagesContainerRef.current; const behavior = shouldReduceMotion ? "auto" :
"smooth";

    const scrollToBottom = () => {
      container.scrollTo({ top: container.scrollHeight, behavior });
    };

    if (behavior === "smooth") {
      requestAnimationFrame(scrollToBottom);
    } else {
      scrollToBottom();
    }

}, [ activeConversation?.messages, activeConversation?.id, shouldReduceMotion,
]);

useEffect(() => { return () => { if (replyTimeoutRef.current) {
window.clearTimeout(replyTimeoutRef.current); } }; }, []);

useEffect(() => { if (!liveRegionRef.current || !activeConversation) { return; }
const lastMessage =
activeConversation.messages[activeConversation.messages.length - 1]; if
(!lastMessage) { return; } liveRegionRef.current.textContent =
lastMessage.author + " at " + lastMessage.timestamp + ": " + lastMessage.text;
}, [activeConversation?.messages, activeConversation]);

const handleSelectConversation = (conversationId: string) => {
setSelectedConversationId(conversationId); };

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
event.preventDefault(); if (!draft.trim() || !activeConversation) { return; }

    const conversationId = activeConversation.id;
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const outgoing: Message = {
      id: "outgoing-" + Date.now().toString(),
      sender: "user",
      author: "You",
      text: draft.trim(),
      timestamp,
    };

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [...conversation.messages, outgoing],
              unread: 0,
            }
          : conversation
      )
    );
    setDraft("");

    const autoReplies = activeConversation.autoReplies;
    if (!autoReplies.length) {
      return;
    }

    const cursor = replyCursor[conversationId] ?? 0;
    const nextReply = autoReplies[cursor % autoReplies.length];
    const delay = shouldReduceMotion ? 0 : 900;

    replyTimeoutRef.current = window.setTimeout(() => {
      const safeTimestamp = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const incoming: Message = {
        id: "incoming-" + Date.now().toString(),
        sender: "contact",
        author: activeConversation.name,
        text: nextReply,
        timestamp: safeTimestamp,
      };

      const currentSelected = selectedConversationRef.current;
      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== conversationId) {
            return conversation;
          }
          const isActive = currentSelected === conversationId;
          return {
            ...conversation,
            messages: [...conversation.messages, incoming],
            unread: isActive ? 0 : conversation.unread + 1,
          };
        })
      );

      setReplyCursor((prev) => ({
        ...prev,
        [conversationId]: cursor + 1,
      }));
    }, delay);

};

if (!activeConversation) { return null; }

const statusDotColor: Record<Conversation["status"], string> = { online:
"bg-green-500", offline: "bg-red-500", };

return (
<section className="relative w-full py-6 sm:py-8 md:py-12 lg:py-16">
<div className="relative grid min-h-[500px] max-h-[calc(100vh-3rem)] grid-rows-[auto,1fr] gap-4 overflow-hidden rounded-[30px] border border-border/50 bg-background/70 p-4 backdrop-blur-xl sm:min-h-[600px] sm:max-h-[calc(100vh-4rem)] sm:gap-6 sm:p-6 md:min-h-[650px] md:max-h-[calc(100vh-5rem)] lg:h-[760px] lg:max-h-[calc(100vh-6rem)] lg:grid-rows-[1fr] lg:gap-8 lg:p-8 lg:[grid-template-columns:30%_1fr]">
<div className="flex flex-col gap-3 rounded-2xl border border-border/40 bg-background/75 p-3 backdrop-blur sm:gap-4 sm:rounded-3xl sm:p-4 lg:hidden">
<div className="flex items-center justify-between gap-2 sm:gap-3">
<div>
<p className="text-xs font-semibold text-foreground sm:text-sm"> Messenger
</p>
<p className="text-[0.65rem] text-muted-foreground sm:text-xs">
{conversations.length} active conversation {conversations.length === 1 ? "" :
"s"}
</p>
</div>
<Badge
              variant="outline"
              className="rounded-full border border-border/50 bg-primary/15 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary hover:bg-primary/15 hover:text-primary sm:px-3 sm:py-1 sm:text-[0.7rem] sm:tracking-[0.24em]"
            > Live
</Badge>
</div>
<div className="space-y-1.5 sm:space-y-2">
<label
              htmlFor="messenger-conversation"
              className="text-[0.65rem] font-medium text-muted-foreground sm:text-xs"
            > Conversation
</label> <select id="messenger-conversation" value={selectedConversationId}
onChange={(event) => handleSelectConversation(event.target.value)}
className="w-full rounded-xl border border-border/40 bg-background/70 px-2.5
py-1.5 text-xs text-foreground focus:border-primary/40 focus:outline-none
focus:ring-2 focus:ring-primary/30 sm:rounded-2xl sm:px-3 sm:py-2 sm:text-sm" >
{conversations.map((conversation) => (
<option key={conversation.id} value={conversation.id}> {conversation.name}
</option> ))}
</select>
</div>
</div>

        <div className="hidden h-full flex-col gap-5 overflow-hidden rounded-3xl border border-border/40 bg-background/75 p-4 backdrop-blur lg:flex lg:col-start-1 lg:col-end-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Messenger</p>
              <p className="text-xs text-muted-foreground">
                {conversations.length} active conversation
                {conversations.length === 1 ? "" : "s"}
              </p>
            </div>
            <Badge
              variant="outline"
              className="rounded-full border border-border/50 bg-primary/15 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-primary hover:bg-primary/15 hover:text-primary"
            >
              Live
            </Badge>
          </div>

          <label htmlFor="messenger-search" className="sr-only">
            Search conversations
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70"
              aria-hidden="true"
            />
            <Input
              id="messenger-search"
              type="search"
              placeholder="Search teammates or channels"
              className="w-full rounded-2xl border-border/40 bg-background/60 pl-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/40"
            />
          </div>

          <div
            className="flex-1 space-y-2 overflow-y-auto pr-1"
            aria-label="Conversation list"
            role="list"
          >
            {conversations.map((conversation) => {
              const isActive = conversation.id === selectedConversationId;
              const lastMessage =
                conversation.messages[conversation.messages.length - 1];
              return (
                <motion.button
                  key={conversation.id}
                  type="button"
                  onClick={() => handleSelectConversation(conversation.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "group relative flex w-full items-start gap-3 rounded-2xl border border-transparent p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "border-primary/40 bg-primary/10"
                      : "bg-background/70 hover:border-border/40 hover:bg-muted/40"
                  )}
                  role="listitem"
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-10 w-10 rounded-2xl border border-border/40 bg-background/80 text-foreground">
                      <AvatarFallback className="rounded-2xl bg-primary/15 text-sm font-medium text-primary">
                        {conversation.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 inline-flex h-3 w-3 rounded-full border-2 border-background",
                        statusDotColor[conversation.status]
                      )}
                      aria-label={
                        conversation.status === "online" ? "Online" : "Offline"
                      }
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          {conversation.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.title}
                        </p>
                      </div>
                    </div>
                    {lastMessage ? (
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {lastMessage.author}: {lastMessage.text}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        No messages yet
                      </p>
                    )}
                  </div>
                  {conversation.unread > 0 && (
                    <span className="ml-2 inline-flex min-h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-full bg-primary text-[0.7rem] font-semibold text-primary-foreground shadow-lg">
                      {conversation.unread}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeConversation.id}
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
            }
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="flex min-h-0 flex-col gap-4 overflow-hidden rounded-3xl border border-border/40 bg-background/80 p-4 backdrop-blur sm:gap-5 sm:p-5 md:gap-6 md:p-6 lg:col-start-2 lg:col-end-3"
          >
            <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 rounded-2xl border border-border/40 bg-card/80 text-foreground sm:h-12 sm:w-12 sm:rounded-3xl">
                    <AvatarFallback className="rounded-2xl bg-primary/20 text-sm font-semibold text-primary sm:rounded-3xl sm:text-base">
                      {activeConversation.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 inline-flex h-3 w-3 rounded-full border-2 border-background sm:h-3.5 sm:w-3.5",
                      statusDotColor[activeConversation.status]
                    )}
                    aria-label={
                      activeConversation.status === "online"
                        ? "Online"
                        : "Offline"
                    }
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground sm:text-base">
                    {activeConversation.name}
                  </p>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {activeConversation.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full border border-border/40 bg-background/60 text-muted-foreground transition hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-10"
                  aria-label="Start audio call"
                >
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full border border-border/40 bg-background/60 text-muted-foreground transition hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-10"
                  aria-label="Start video call"
                >
                  <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full border border-border/40 bg-background/60 text-muted-foreground transition hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-10"
                  aria-label="Open conversation menu"
                >
                  <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </header>

            <div
              ref={messagesContainerRef}
              className="relative flex-1 min-h-0 space-y-3 overflow-y-auto pr-2 sm:space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted"
              aria-live="off"
              aria-label={"Message thread with " + activeConversation.name}
            >
              <AnimatePresence initial={false}>
                {activeConversation.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 12, scale: 0.98 }
                    }
                    animate={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, scale: 1 }
                    }
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="flex flex-col gap-1"
                    role="group"
                    aria-label={message.author + " at " + message.timestamp}
                  >
                    <div
                      className={cn(
                        "relative max-w-[85%] rounded-xl border border-border/40 bg-background/80 px-3 py-2 text-xs leading-relaxed text-foreground backdrop-blur sm:max-w-[82%] sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm",
                        message.sender === "user" &&
                          "ml-auto border-primary/40 bg-primary text-primary-foreground"
                      )}
                    >
                      <p className="font-medium text-foreground/80 sm:text-sm">
                        {message.author}
                      </p>
                      <p
                        className={cn(
                          "mt-1 text-[0.875rem] sm:text-[0.95rem]",
                          message.sender === "user"
                            ? "text-primary-foreground/90"
                            : "text-foreground/90"
                        )}
                      >
                        {message.text}
                      </p>
                      <div className="mt-2 flex items-center justify-end gap-1.5 text-[0.65rem] sm:mt-3 sm:gap-2 sm:text-[0.7rem]">
                        <span
                          className={cn(
                            "text-muted-foreground",
                            message.sender === "user" &&
                              "text-primary-foreground/80"
                          )}
                        >
                          {message.timestamp}
                        </span>
                        {message.sender === "user" && (
                          <CheckCheck
                            className="h-3 w-3 text-primary-foreground/80 sm:h-3.5 sm:w-3.5"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-2 sm:space-y-3"
              aria-label="Reply composer"
            >
              <label htmlFor="messenger-editor" className="sr-only">
                Write a message
              </label>
              <div className="flex items-end gap-2 rounded-2xl border border-border/40 bg-background/80 p-3 backdrop-blur sm:gap-3 sm:rounded-3xl sm:p-4">
                <div className="flex-1 min-w-0">
                  <Textarea
                    id="messenger-editor"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder={"Message " + activeConversation.name}
                    rows={2}
                    className="min-h-[3rem] w-full resize-none border-none bg-transparent text-xs text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:outline-none sm:min-h-[4rem] sm:text-sm"
                    aria-label={"Message " + activeConversation.name}
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                    {activeConversation.quickReplies.map((reply) => (
                      <button
                        key={reply}
                        type="button"
                        onClick={() => setDraft(reply)}
                        className="rounded-full border border-border/50 bg-background/70 px-2.5 py-0.5 text-[0.65rem] text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-3 sm:py-1 sm:text-xs"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5 sm:w-24 sm:gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full border border-border/40 bg-background/70 text-muted-foreground transition hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-10"
                    aria-label="Attach a file"
                  >
                    <Paperclip className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    type="submit"
                    size="icon"
                    className="size-8 rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:size-10"
                    disabled={!draft.trim()}
                    aria-label="Send message"
                  >
                    <Send
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
      <div
        ref={liveRegionRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </section>

); }

"use client";

import { Button } from "@/components/ui/button"; import { Textarea } from
"@/components/ui/textarea"; import { AnimatePresence, motion, useReducedMotion }
from "framer-motion"; import { ArrowUpRight, ChevronDown, Clock, Link2, Mail,
MessageSquare, Share2, Sparkles, Star, Zap, } from "lucide-react"; import {
useEffect, useRef, useState } from "react";

type DropdownType = "share" | "quick" | "history" | "magic" | "model" | null;

type ActionOption = { icon: typeof Link2; label: string; action: string; };

const shareOptions: ActionOption[] = [ { icon: Link2, label: "Copy link",
action: "copy-link" }, { icon: Mail, label: "Email", action: "email" }, { icon:
MessageSquare, label: "Slack", action: "slack" }, ];

const quickOptions: ActionOption[] = [ { icon: Sparkles, label: "Summarize",
action: "summarize" }, { icon: Sparkles, label: "Improve", action: "improve" },
{ icon: Sparkles, label: "Translate", action: "translate" }, ];

const historyOptions: ActionOption[] = [ { icon: Clock, label: "Last hour",
action: "history-1h" }, { icon: Clock, label: "Today", action: "history-today"
}, { icon: Clock, label: "This week", action: "history-week" }, ];

const magicOptions: ActionOption[] = [ { icon: Sparkles, label: "Auto-complete",
action: "magic-complete" }, { icon: Sparkles, label: "Storyboard", action:
"magic-storyboard" }, { icon: Sparkles, label: "Rephrase", action:
"magic-rephrase" }, ];

const models = ["GPT 5.0", "GPT 4.5 Turbo", "GPT 4.0", "Claude 3.5 Sonnet"];

export function AIChatInterface() { const [inputValue, setInputValue] =
useState(""); const [isFocused, setIsFocused] = useState(false); const
[activeDropdown, setActiveDropdown] = useState<DropdownType>(null); const
[selectedModel, setSelectedModel] = useState(models[0]); const
prefersReducedMotion = useReducedMotion(); const textareaRef =
useRef<HTMLTextAreaElement>(null); const dropdownRef =
useRef<HTMLDivElement>(null);

const shouldAnimate = !prefersReducedMotion;

useEffect(() => { function handleClickOutside(event: MouseEvent) { if (
dropdownRef.current && !dropdownRef.current.contains(event.target as Node) ) {
setActiveDropdown(null); } }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

}, []);

const handleTextareaChange = ( event: React.ChangeEvent<HTMLTextAreaElement> )
=> { setInputValue(event.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

};

const renderDropdown = ( type: DropdownType, options: ActionOption[], align:
"left" | "right" = "left" ) => (
<AnimatePresence> {activeDropdown === type && ( <motion.div key={type}
initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity:
0, y: -8 }} transition={{ duration: 0.18, ease: "easeOut" }}
className={`absolute ${align === "right" ? "right-0" : "left-0"} mt-3 w-56 rounded-2xl border border-border/40 bg-background/85 py-2 shadow-[0_24px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl`}
role="menu" > {options.map((option) => ( <Button key={option.action} onClick={()
=> { console.log(`Action: ${option.action}`); setActiveDropdown(null); }}
className="flex w-full justify-start items-center gap-3 px-4 py-2 text-sm
text-foreground/85 transition-all hover:bg-foreground/[0.05]
hover:text-foreground" role="menuitem" type="button" variant="ghost" >
<option.icon size={16} className="text-foreground/60" />
<span>{option.label}</span>
</Button> ))} </motion.div> )}
</AnimatePresence> );

return ( <motion.section initial={shouldAnimate ? { opacity: 0, y: 20 } : {
opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={shouldAnimate ? {
duration: 0.5 } : { duration: 0 }} className="relative w-full" >
<div className="space-y-8"> <div
className={`relative rounded-[28px] border border-border/50 bg-background/70 px-6 py-6 backdrop-blur-xl transition w-full z-10 ${
            isFocused ? "shadow-[0_28px_80px_rgba(15,23,42,0.24)]" : ""
          }`}
>
<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20/20 via-transparent to-transparent" />
<div className="relative space-y-5">
<div className="flex flex-col gap-1 text-left">
<span className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/45">
Prompt
</span>
<p className="text-sm text-foreground/60"> Share goals, context, tone, and
desired output.
</p>
</div>
<label htmlFor="chat-input" className="sr-only"> Ask AI anything
</label> <Textarea id="chat-input" ref={textareaRef} value={inputValue}
onChange={handleTextareaChange} placeholder="Ask AI anything..."
className="w-full resize-none bg-transparent text-base text-foreground/90
placeholder:text-foreground/40 focus:outline-none" onFocus={() =>
setIsFocused(true)} onBlur={() => setIsFocused(false)} rows={1} aria-label="Chat
input" />

            <div
              className="flex flex-wrap items-center gap-2 border-t border-border/25 pt-3"
              ref={dropdownRef}
            >
              <div className="relative">
                <Button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "share" ? null : "share"
                    )
                  }
                  className="group rounded-xl p-2 bg-background/80 transition-all hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  aria-label="Share options"
                  aria-expanded={activeDropdown === "share"}
                  aria-haspopup="menu"
                  type="button"
                >
                  <Share2
                    size={18}
                    className="text-foreground/50 group-hover:text-foreground"
                    strokeWidth={2}
                  />
                </Button>
                {renderDropdown("share", shareOptions)}
              </div>

              <div className="relative">
                <Button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "quick" ? null : "quick"
                    )
                  }
                  className="group rounded-xl p-2 bg-background/80 transition-all hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  aria-label="Quick actions"
                  aria-expanded={activeDropdown === "quick"}
                  aria-haspopup="menu"
                  type="button"
                >
                  <Zap
                    size={18}
                    className="text-foreground/50 group-hover:text-foreground"
                    strokeWidth={2}
                  />
                </Button>
                {renderDropdown("quick", quickOptions)}
              </div>

              <div className="relative">
                <Button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "history" ? null : "history"
                    )
                  }
                  className="group rounded-xl p-2 bg-background/80 transition-all hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  aria-label="History"
                  aria-expanded={activeDropdown === "history"}
                  aria-haspopup="menu"
                  type="button"
                >
                  <Clock
                    size={18}
                    className="text-foreground/50 group-hover:text-foreground"
                    strokeWidth={2}
                  />
                </Button>
                {renderDropdown("history", historyOptions)}
              </div>

              <div className="relative">
                <Button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "magic" ? null : "magic"
                    )
                  }
                  className="group rounded-xl p-2 bg-background/80 transition-all hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  aria-label="Magic options"
                  aria-expanded={activeDropdown === "magic"}
                  aria-haspopup="menu"
                  type="button"
                >
                  <Sparkles
                    size={18}
                    className="text-foreground/50 group-hover:text-foreground"
                    strokeWidth={2}
                  />
                </Button>
                {renderDropdown("magic", magicOptions)}
              </div>

              <div className="relative ml-auto">
                <Button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "model" ? null : "model"
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border border-border/30 bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground/80 transition hover:border-border/40 hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  aria-label="Select AI model"
                  aria-expanded={activeDropdown === "model"}
                  aria-haspopup="listbox"
                  type="button"
                >
                  <span>{selectedModel}</span>
                  <ChevronDown size={16} className="text-foreground/50" />
                </Button>

                <AnimatePresence>
                  {activeDropdown === "model" && (
                    <motion.div
                      key="model-dropdown"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-56 rounded-2xl border border-border/40 bg-background/85 py-2 shadow-[0_24px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl z-50"
                      role="listbox"
                    >
                      {models.map((model) => (
                        <Button
                          key={model}
                          onClick={() => {
                            setSelectedModel(model);
                            setActiveDropdown(null);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-all ${
                            selectedModel === model
                              ? "bg-primary/15 font-medium text-primary hover:bg-primary/20"
                              : "text-foreground/80 hover:bg-foreground/[0.05]"
                          }`}
                          role="option"
                          aria-selected={selectedModel === model}
                          type="button"
                          variant={
                            selectedModel === model ? "default" : "ghost"
                          }
                        >
                          {model}
                          {selectedModel === model && (
                            <Star size={14} className="text-primary/80" />
                          )}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type="button"
                size="lg"
                className="inline-flex items-center gap-2 rounded-full px-5 text-xs uppercase tracking-[0.28em]"
                onClick={() => console.log("Action: send-message")}
              >
                Send
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>

); }

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; import { Button } from
"@/components/ui/button"; import { Input } from "@/components/ui/input"; import
{ AnimatePresence, motion } from "framer-motion"; import { ArrowRight, Bookmark,
Clock, Filter, MessageSquare, MoreHorizontal, Newspaper, Search, Share2,
TrendingUp, } from "lucide-react"; import { useState } from "react";

// ============================================================================
// TYPES //
============================================================================

interface NewsItem { id: string; title: string; summary: string; category:
"Technology" | "Design" | "Business" | "AI" | "Crypto"; author: { name: string;
avatar: string; role: string; }; publishedAt: string; readTime: string; likes:
number; comments: number; trending?: boolean; image?: string; }

// ============================================================================
// DUMMY DATA //
============================================================================

const NEWS_ITEMS: NewsItem[] = [ { id: "1", title: "The Future of AI in Modern
Interface Design", summary: "How artificial intelligence is reshaping the way we
interact with digital products and the role of designers in this new era.",
category: "AI", author: { name: "Sarah Chen", avatar:
"https://i.pravatar.cc/150?u=sarah", role: "Product Designer", }, publishedAt:
"2h ago", readTime: "5 min read", likes: 1240, comments: 86, trending: true,
image:
"https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
}, { id: "2", title: "WebAssembly: The Next Big Thing in Web Development?",
summary: "Exploring the potential of WebAssembly to bring desktop-class
performance to the web browser.", category: "Technology", author: { name: "Alex
Rivera", avatar: "https://i.pravatar.cc/150?u=alex", role: "Senior Dev", },
publishedAt: "4h ago", readTime: "8 min read", likes: 856, comments: 42, }, {
id: "3", title: "Sustainable Tech: Building Green Software", summary: "Why
energy efficiency in code matters and how developers can contribute to a more
sustainable future.", category: "Technology", author: { name: "Emma Wilson",
avatar: "https://i.pravatar.cc/150?u=emma", role: "Tech Lead", }, publishedAt:
"5h ago", readTime: "6 min read", likes: 623, comments: 28, }, { id: "4", title:
"Crypto Markets See Unprecedented Growth", summary: "Analysis of the latest
market trends and what it means for institutional investors.", category:
"Crypto", author: { name: "Michael Chang", avatar:
"https://i.pravatar.cc/150?u=michael", role: "Financial Analyst", },
publishedAt: "6h ago", readTime: "4 min read", likes: 2100, comments: 154,
trending: true, }, { id: "5", title: "Minimalism in 2024: Less is Still More",
summary: "A look at how minimalist design principles are evolving in the current
digital landscape.", category: "Design", author: { name: "Jessica Kim", avatar:
"https://i.pravatar.cc/150?u=jessica", role: "UX Researcher", }, publishedAt:
"8h ago", readTime: "3 min read", likes: 445, comments: 19, }, ];

const CATEGORIES = ["All", "Technology", "Design", "Business", "AI", "Crypto"];

// ============================================================================
// COMPONENTS //
============================================================================

function NewsCard({ item, index }: { item: NewsItem; index: number }) { return (
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.1, duration: 0.4 }} whileHover={{ y: -4 }}
className="group relative overflow-hidden rounded-xl border border-border/40
bg-background/60 p-5 backdrop-blur-sm transition-all hover:border-border/60
hover:shadow-lg hover:bg-background/80" > {/* Hover Gradient */}
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      <div className="flex flex-col gap-4">
        {/* Header: Author & Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-border/50">
              <AvatarImage src={item.author.avatar} alt={item.author.name} />
              <AvatarFallback>{item.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground">
                {item.author.name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {item.author.role}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {item.trending && (
              <Badge
                variant="secondary"
                className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 text-[10px] px-2 py-0 h-5 gap-1"
              >
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.publishedAt}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <Badge
              variant="outline"
              className="shrink-0 text-[10px] font-normal opacity-70"
            >
              {item.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {item.summary}
          </p>
        </div>

        {/* Footer: Actions & Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30 mt-2">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <MessageSquare className="h-3.5 w-3.5" />
              {item.comments}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {item.readTime}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 rounded-full hover:bg-primary/10 hover:text-primary"
            >
              <Bookmark className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 rounded-full hover:bg-primary/10 hover:text-primary"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>

); }

export function NewsFeed() { const [activeCategory, setActiveCategory] =
useState("All"); const [searchQuery, setSearchQuery] = useState("");

const filteredNews = NEWS_ITEMS.filter((item) => { const matchesCategory =
activeCategory === "All" || item.category === activeCategory; const
matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
item.summary.toLowerCase().includes(searchQuery.toLowerCase()); return
matchesCategory && matchesSearch; });

return (
<div className="w-full mx-auto space-y-8 min-h-[600px]"> {/* Header Section */}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="space-y-1">
<h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
<Newspaper className="h-6 w-6 text-primary" /> Latest Updates
</h2>
<p className="text-sm text-muted-foreground"> Stay informed with the most recent
news and insights.
</p>
</div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news..."
              className="pl-9 w-[200px] bg-background/50 backdrop-blur-sm border-border/50 focus:bg-background transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap
              ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-border/50"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredNews.length > 0 ? (
            filteredNews.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center space-y-3"
            >
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">
                No news found matching your criteria.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Load More */}
      {filteredNews.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
            Load More Stories
          </Button>
        </div>
      )}
    </div>

); }

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; import { DropdownMenu,
DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from
"@/components/ui/dropdown-menu"; import { Textarea } from
"@/components/ui/textarea"; import { cn } from "@/lib/utils"; import {
AnimatePresence, motion } from "framer-motion"; import { CornerDownRight, Heart,
Image as ImageIcon, MessageCircle, MoreHorizontal, Paperclip, Send, Share2,
Smile, } from "lucide-react"; import { useEffect, useRef, useState } from
"react";

// ============================================================================
// TYPES //
============================================================================

interface User { name: string; avatar: string; role?: string; }

interface Comment { id: string; user: User; content: string; timestamp: string;
likes: number; replies?: Comment[]; isLiked?: boolean; }

// ============================================================================
// DUMMY DATA //
============================================================================

const INITIAL_COMMENTS: Comment[] = [ { id: "1", user: { name: "Alex Morgan",
avatar: "https://i.pravatar.cc/150?u=alex", role: "Product Designer", },
content: "The new glassmorphism trend is really interesting. I love how it adds
depth without cluttering the interface. Has anyone tried implementing this with
pure CSS vs using backdrop-filter?", timestamp: "2h ago", likes: 24, isLiked:
true, replies: [ { id: "1-1", user: { name: "Sarah Chen", avatar:
"https://i.pravatar.cc/150?u=sarah", role: "Frontend Dev", }, content: "I've
been using backdrop-filter extensively. It's much more performant now across
modern browsers. The only catch is Firefox sometimes needs a fallback.",
timestamp: "1h ago", likes: 12, isLiked: false, replies: [], }, { id: "1-2",
user: { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=mike", },
content: "Agreed! It gives such a premium feel. I usually pair it with subtle
noise textures to avoid banding.", timestamp: "45m ago", likes: 8, isLiked:
false, replies: [], }, ], }, { id: "2", user: { name: "Emily Watson", avatar:
"https://i.pravatar.cc/150?u=emily", role: "UX Researcher", }, content: "Great
article! I'm curious about the accessibility implications of these high-contrast
dark modes. Do we have any data on user preference?", timestamp: "3h ago",
likes: 45, isLiked: false, replies: [], }, ];

// ============================================================================
// COMPONENTS //
============================================================================

function CommentInput({ placeholder = "What are your thoughts?", onSubmit,
onCancel, autoFocus = false, className, inputId, labelId, }: { placeholder?:
string; onSubmit: (content: string) => void; onCancel?: () => void; autoFocus?:
boolean; className?: string; inputId?: string; labelId?: string; }) { const
[content, setContent] = useState(""); const [isFocused, setIsFocused] =
useState(autoFocus); const textareaRef = useRef<HTMLTextAreaElement>(null);

useEffect(() => { if (autoFocus && textareaRef.current) {
textareaRef.current.focus(); } }, [autoFocus]);

const handleSubmit = () => { if (!content.trim()) return; onSubmit(content);
setContent(""); setIsFocused(false); };

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => { if
(e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault();
handleSubmit(); } else if (e.key === "Escape" && onCancel) { e.preventDefault();
onCancel(); } };

const uniqueId = inputId ||
`comment-input-${Math.random().toString(36).substr(2, 9)}`; const uniqueLabelId
= labelId || `comment-label-${Math.random().toString(36).substr(2, 9)}`;

return ( <div className={cn( "relative rounded-xl border bg-background/50
backdrop-blur-sm transition-all duration-200", isFocused ? "border-primary/50
ring-4 ring-primary/5 shadow-lg" : "border-border/40", className )} role="form"
aria-label="Comment input" >
<div className="p-4">
<div className="flex gap-4">
<Avatar
            className="h-8 w-8 border border-border/50"
            aria-hidden="true"
          >
<AvatarImage src="https://github.com/shadcn.png" alt="" />
<AvatarFallback>YO</AvatarFallback>
</Avatar>
<div className="flex-1">
<label htmlFor={uniqueId} id={uniqueLabelId} className="sr-only"> {placeholder}
</label> <Textarea id={uniqueId} ref={textareaRef} placeholder={placeholder}
value={content} onChange={(e) => setContent(e.target.value)} onFocus={() =>
setIsFocused(true)} onKeyDown={handleKeyDown} autoFocus={autoFocus}
aria-label={placeholder} aria-describedby={uniqueLabelId}
className="min-h-[60px] border-none bg-transparent p-0 resize-none
focus-visible:ring-0 placeholder:text-muted-foreground/70 text-sm" />
</div>
</div>
</div>

      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-t border-border/30 bg-muted/20 rounded-b-xl"
        role="toolbar"
        aria-label="Comment formatting options"
      >
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Attachments"
        >
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            aria-label="Add image"
            title="Add image"
          >
            <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            aria-label="Attach file"
            title="Attach file"
          >
            <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            aria-label="Add emoji"
            title="Add emoji"
          >
            <Smile className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {onCancel && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={onCancel}
              className="text-xs h-8"
              aria-label="Cancel reply"
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            size="sm"
            type="submit"
            className="gap-2 transition-all h-8 text-xs"
            aria-label={onCancel ? "Submit reply" : "Submit comment"}
          >
            {onCancel ? "Reply" : "Post"}
            <Send className="h-3 w-3" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>

); }

function CommentItem({ comment, isReply = false, activeReplyId,
setActiveReplyId, onAddReply, }: { comment: Comment; isReply?: boolean;
activeReplyId: string | null; setActiveReplyId: (id: string | null) => void;
onAddReply: (parentId: string, content: string) => void; }) { const [isLiked,
setIsLiked] = useState(comment.isLiked); const [likesCount, setLikesCount] =
useState(comment.likes); const [isExpanded, setIsExpanded] = useState(true);
const replyInputRef = useRef<HTMLDivElement>(null);

const handleLike = () => { if (isLiked) { setLikesCount((prev) => prev - 1); }
else { setLikesCount((prev) => prev + 1); } setIsLiked(!isLiked); };

const isReplying = activeReplyId === comment.id;

useEffect(() => { if (isReplying && replyInputRef.current) { const textarea =
replyInputRef.current.querySelector("textarea"); if (textarea) { setTimeout(()
=> textarea.focus(), 100); } } }, [isReplying]);

const commentId = `comment-${comment.id}`; const repliesId =
`replies-${comment.id}`;

return ( <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1,
y: 0 }} exit={{ opacity: 0, height: 0 }} className={cn( "relative group",
isReply ? "ml-8 pl-4 border-l-2 border-border/40" : "mb-6" )} id={commentId}
aria-label={`Comment by ${comment.user.name}`} >
<div className="flex gap-4"> <Avatar className={cn( "border border-border/50",
isReply ? "h-8 w-8" : "h-10 w-10" )} > <AvatarImage src={comment.user.avatar}
alt={`${comment.user.name}'s avatar`} />
<AvatarFallback aria-hidden="true"> {comment.user.name[0]}
</AvatarFallback>
</Avatar>

        <div className="flex-1 space-y-1.5">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {comment.user.name}
              </span>
              {comment.user.role && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                  aria-label={`Role: ${comment.user.role}`}
                >
                  {comment.user.role}
                </span>
              )}
              <time
                className="text-xs text-muted-foreground"
                dateTime={comment.timestamp}
                aria-label={`Posted ${comment.timestamp}`}
              >
                • {comment.timestamp}
              </time>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                  aria-label={`More options for ${comment.user.name}'s comment`}
                  aria-haspopup="true"
                >
                  <MoreHorizontal
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Content */}
          <p className="text-sm text-foreground/90 leading-relaxed">
            {comment.content}
          </p>

          {/* Actions */}
          <nav
            className="flex items-center gap-4 pt-1"
            aria-label="Comment actions"
          >
            <button
              onClick={handleLike}
              type="button"
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
                isLiked
                  ? "text-red-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={
                isLiked
                  ? `Unlike comment (${likesCount} likes)`
                  : `Like comment (${likesCount} likes)`
              }
              aria-pressed={isLiked}
            >
              <Heart
                className={cn("h-3.5 w-3.5", isLiked && "fill-current")}
                aria-hidden="true"
              />
              <span aria-live="polite" aria-atomic="true">
                {likesCount}
              </span>
            </button>
            <button
              onClick={() => setActiveReplyId(isReplying ? null : comment.id)}
              type="button"
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded",
                isReplying
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={
                isReplying ? "Cancel reply" : `Reply to ${comment.user.name}`
              }
              aria-expanded={isReplying}
              aria-controls={
                isReplying ? `reply-input-${comment.id}` : undefined
              }
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Reply
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label={`Share ${comment.user.name}'s comment`}
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              Share
            </button>
          </nav>

          {/* Inline Reply Input */}
          <AnimatePresence>
            {isReplying && (
              <motion.div
                ref={replyInputRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 overflow-hidden"
                id={`reply-input-${comment.id}`}
                role="region"
                aria-label={`Reply to ${comment.user.name}`}
              >
                <CommentInput
                  autoFocus
                  placeholder={`Reply to ${comment.user.name}...`}
                  onSubmit={(content) => onAddReply(comment.id, content)}
                  onCancel={() => setActiveReplyId(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <section
          className="mt-4 space-y-4"
          id={repliesId}
          aria-label={`${comment.replies.length} ${comment.replies.length === 1 ? "reply" : "replies"}`}
        >
          {isExpanded ? (
            <AnimatePresence>
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply={true}
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                  onAddReply={onAddReply}
                />
              ))}
            </AnimatePresence>
          ) : null}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
            className="ml-12 text-xs font-medium text-primary hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label={
              isExpanded
                ? "Hide replies"
                : `Show ${comment.replies.length} replies`
            }
            aria-expanded={isExpanded}
            aria-controls={repliesId}
          >
            {isExpanded ? (
              <div
                className="h-[1px] w-4 bg-primary/50 mr-1"
                aria-hidden="true"
              />
            ) : (
              <CornerDownRight className="h-3 w-3" aria-hidden="true" />
            )}
            {isExpanded
              ? "Hide replies"
              : `Show ${comment.replies.length} ${comment.replies.length === 1 ? "reply" : "replies"}`}
          </button>
        </section>
      )}
    </motion.article>

); }

export function CommentThread() { const [comments, setComments] =
useState(INITIAL_COMMENTS); const [activeReplyId, setActiveReplyId] =
useState<string | null>(null); const [announcement, setAnnouncement] =
useState("");

// Recursive function to add reply const addReplyToTree = ( comments: Comment[],
parentId: string, newReply: Comment ): Comment[] => { return
comments.map((comment) => { if (comment.id === parentId) { return { ...comment,
replies: [...(comment.replies || []), newReply], }; } else if (comment.replies
&& comment.replies.length > 0) { return { ...comment, replies:
addReplyToTree(comment.replies, parentId, newReply), }; } return comment; }); };

const handleAddComment = (content: string) => { const newComment: Comment = {
id: Date.now().toString(), user: { name: "You", avatar:
"https://github.com/shadcn.png", role: "Guest", }, content, timestamp: "Just
now", likes: 0, replies: [], };

    setComments([newComment, ...comments]);
    setAnnouncement("Comment posted successfully");
    setTimeout(() => setAnnouncement(""), 1000);

};

const handleAddReply = (parentId: string, content: string) => { const newReply:
Comment = { id: Date.now().toString(), user: { name: "You", avatar:
"https://github.com/shadcn.png", role: "Guest", }, content, timestamp: "Just
now", likes: 0, replies: [], };

    setComments((prevComments) =>
      addReplyToTree(prevComments, parentId, newReply)
    );
    setActiveReplyId(null);
    setAnnouncement("Reply posted successfully");
    setTimeout(() => setAnnouncement(""), 1000);

};

return (
<div
      className="w-full mx-auto space-y-8"
      role="region"
      aria-label="Comments section"
    > {/* Screen reader announcements */}
<div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      > {announcement}
</div>

      {/* Header */}
      <header className="flex items-center justify-between">
        <h2
          className="text-xl font-semibold tracking-tight"
          id="comments-heading"
        >
          Comments
          <span className="sr-only">
            , {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </span>
        </h2>
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Sort comments"
        >
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="text-xs text-muted-foreground"
            aria-label="Sort by newest"
            aria-pressed={true}
          >
            Newest
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="text-xs text-muted-foreground"
            aria-label="Sort by top"
            aria-pressed={false}
          >
            Top
          </Button>
        </div>
      </header>

      {/* Main Input Area */}
      <section aria-labelledby="new-comment-heading">
        <h3 id="new-comment-heading" className="sr-only">
          Write a new comment
        </h3>
        <CommentInput onSubmit={handleAddComment} />
      </section>

      {/* Comments List */}
      <section aria-labelledby="comments-heading">
        <div className="space-y-2" role="list" aria-label="Comment thread">
          <AnimatePresence mode="popLayout">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                activeReplyId={activeReplyId}
                setActiveReplyId={setActiveReplyId}
                onAddReply={handleAddReply}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>

); }

"use client";

import { Badge } from "@/components/ui/badge"; import { Button } from
"@/components/ui/button"; import { motion, type Variants } from "framer-motion";
import { Activity, AlertCircle, CheckCircle2, Code2, Download, FileCode,
FileImage, FileType, Layout, Lightbulb, Smartphone, Zap, } from "lucide-react";

// ============================================================================
// TYPES & INTERFACES //
============================================================================

interface WebVitalCardProps { label: string; value: string | number; unit?:
string; description: string; status: "good" | "needs-improvement" | "poor";
icon: React.ReactNode; }

interface ResourceItem { name: string; type: "js" | "css" | "image" | "font" |
"other"; size: string; time: string; }

// ============================================================================
// ANIMATION VARIANTS //
============================================================================

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: {
opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2, }, }, };

const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: {
opacity: 1, y: 0, transition: { duration: 0.4 }, }, };

// ============================================================================
// COMPONENTS //
============================================================================

function PerformanceHeader() { return ( <motion.div initial={{ opacity: 0, y: 20
}} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
className="mb-12 space-y-4" >
<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
<div className="space-y-2">
<Badge
            variant="outline"
            className="inline-flex items-center gap-2 rounded-full border-border/50 bg-background/55 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur"
          >
<span className="h-2 w-2 rounded-full bg-emerald-500" /> Audit Complete
</Badge>

          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Web Performance
          </h1>
          <p className="max-w-2xl text-foreground/70">
            Real-time analysis of your application&apos;s Core Web Vitals,
            resource loading, and overall performance score.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border/40 bg-background/60 backdrop-blur hover:border-border/60 hover:bg-background/70"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            Run Audit
          </Button>
        </div>
      </div>
    </motion.div>

); }

function WebVitalCard({ label, value, unit, description, status, icon, }:
WebVitalCardProps) { const statusColors = { good: "text-emerald-500
bg-emerald-500/10 border-emerald-500/20", "needs-improvement": "text-amber-500
bg-amber-500/10 border-amber-500/20", poor: "text-red-500 bg-red-500/10
border-red-500/20", };

const StatusIcon = status === "good" ? CheckCircle2 : status ===
"needs-improvement" ? AlertCircle : AlertCircle;

return ( <motion.div variants={itemVariants} whileHover={{ y: -4 }}
className="group relative overflow-hidden rounded-2xl border border-border/40
bg-background/60 p-6 backdrop-blur transition-all hover:border-border/60
hover:shadow-lg" >
<div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-background/50 border border-border/20 text-foreground/70">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          <span className="capitalize">{status.replace("-", " ")}</span>
        </div>
      </div>

      <div className="space-y-1 mb-4">
        <h3 className="text-sm font-medium text-foreground/60">{label}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-foreground/40">
              {unit}
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-foreground/50 leading-relaxed">
        {description}
      </p>
    </motion.div>

); }

function PerformanceScore() { const score = 92; const radius = 80; const
circumference = 2 * Math.PI * radius; const strokeDashoffset = circumference -
(score / 100) * circumference;

return ( <motion.div variants={itemVariants} className="relative overflow-hidden
rounded-2xl border border-border/40 bg-background/60 p-8 backdrop-blur flex
flex-col items-center justify-center text-center" >
<div className="relative mb-6"> {/* Background Circle _/}
<svg className="h-48 w-48 -rotate-90 transform">
<circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-muted/20"
          /> {/_ Progress Circle */} <motion.circle initial={{ strokeDashoffset:
circumference }} animate={{ strokeDashoffset }} transition={{ duration: 1.5,
ease: "easeOut" }} cx="96" cy="96" r={radius} stroke="currentColor"
strokeWidth="12" fill="transparent" strokeDasharray={circumference}
strokeLinecap="round" className="text-emerald-500" />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-5xl font-bold tracking-tighter text-foreground"> {score}
</span>
<span className="text-sm font-medium uppercase tracking-widest text-foreground/40">
Score
</span>
</div>
</div>

      <h3 className="text-lg font-semibold text-foreground mb-2">
        Excellent Performance
      </h3>
      <p className="text-sm text-foreground/60 max-w-[250px]">
        Your page is optimized and delivering a great user experience.
      </p>
    </motion.div>

); }

function ResourceBreakdown() { const resources: ResourceItem[] = [ { name:
"main-app.js", type: "js", size: "142 KB", time: "45ms" }, { name: "styles.css",
type: "css", size: "24 KB", time: "12ms" }, { name: "hero-image.webp", type:
"image", size: "86 KB", time: "120ms" }, { name: "inter-font.woff2", type:
"font", size: "32 KB", time: "25ms" }, { name: "analytics.js", type: "js", size:
"15 KB", time: "30ms" }, ];

const getIcon = (type: ResourceItem["type"]) => { switch (type) { case "js":
return <FileCode className="h-4 w-4 text-yellow-500" />; case "css": return
<FileType className="h-4 w-4 text-blue-500" />; case "image": return
<FileImage className="h-4 w-4 text-purple-500" />; case "font": return
<FileType className="h-4 w-4 text-red-500" />; default: return
<FileCode className="h-4 w-4 text-gray-500" />; } };

return ( <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2
overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-6
backdrop-blur" >
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-semibold text-foreground"> Resource Breakdown
</h3>
<Badge variant="secondary" className="bg-background/50"> 5 Requests
</Badge>
</div>

      <div className="space-y-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border border-border/20 bg-background/30 hover:bg-background/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-background/50 border border-border/20">
                {getIcon(resource.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {resource.name}
                </p>
                <p className="text-xs text-foreground/50 uppercase tracking-wider">
                  {resource.type}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {resource.time}
              </p>
              <p className="text-xs text-foreground/50">{resource.size}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

); }

function PerformanceTips() { const tips = [ { title: "Optimize LCP", icon:
<Layout className="h-5 w-5" />, items: [ "Use Next.js Image component for
optimized image loading", "Implement lazy loading for images below the fold",
"Minimize render-blocking resources (CSS/JS)", "Use modern image formats (WebP,
AVIF)", ], }, { title: "Improve FID/INP", icon: <Zap className="h-5 w-5" />,
items: [ "Break up long tasks with setTimeout or requestIdleCallback", "Use code
splitting to reduce JavaScript bundle size", "Implement React.lazy() for
component lazy loading", "Optimize event handlers and avoid heavy computations",
], }, { title: "Reduce CLS", icon: <Smartphone className="h-5 w-5" />, items: [
"Set explicit width and height on images and videos", "Reserve space for ads and
embeds", "Avoid inserting content above existing content", "Use transform
animations instead of layout changes", ], }, { title: "Optimize Resources",
icon: <Code2 className="h-5 w-5" />, items: [ "Enable Brotli/Gzip compression",
"Implement HTTP/2 or HTTP/3", "Use CDN for static assets", "Enable browser
caching with proper headers", ], }, ];

return ( <motion.div variants={itemVariants} className="overflow-hidden
rounded-2xl border border-border/40 bg-background/60 p-6 backdrop-blur" >
<div className="flex items-center gap-2 mb-6">
<Lightbulb className="h-5 w-5 text-amber-500" />
<h3 className="text-lg font-semibold text-foreground"> Performance Optimization
Tips
</h3>
</div>

      <div className="grid gap-6 sm:grid-cols-2">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="space-y-3 p-4 rounded-lg border border-border/20 bg-background/30"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                {tip.icon}
              </div>
              <h4 className="font-semibold text-foreground">{tip.title}</h4>
            </div>
            <ul className="space-y-2">
              {tip.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground/70"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>

); }

// ============================================================================
// MAIN PAGE COMPONENT //
============================================================================

export function WebPerformancePage() { return (
<main className="relative min-h-screen overflow-hidden bg-background"> {/*
Glassmorphism background blobs */}
<div className="absolute inset-0 -z-10 pointer-events-none">
<div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/[0.035] blur-[140px]" />
<div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-foreground/[0.025] blur-[120px]" />
<div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/[0.02] blur-[150px]" />
</div>

      <div className="relative px-6 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <PerformanceHeader />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Web Vitals Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              <WebVitalCard
                label="Largest Contentful Paint (LCP)"
                value="1.2"
                unit="s"
                description="Time it takes for the main content to load."
                status="good"
                icon={<Layout className="h-5 w-5" />}
              />
              <WebVitalCard
                label="First Input Delay (FID)"
                value="12"
                unit="ms"
                description="Time from first interaction to browser response."
                status="good"
                icon={<Zap className="h-5 w-5" />}
              />
              <WebVitalCard
                label="Cumulative Layout Shift (CLS)"
                value="0.04"
                description="Visual stability of the page layout."
                status="good"
                icon={<Layout className="h-5 w-5" />}
              />
              <WebVitalCard
                label="Interaction to Next Paint (INP)"
                value="180"
                unit="ms"
                description="Responsiveness to user interactions."
                status="needs-improvement"
                icon={<Activity className="h-5 w-5" />}
              />
            </div>

            {/* Detailed Stats Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <PerformanceScore />
              <ResourceBreakdown />
            </div>

            {/* Performance Tips */}
            <PerformanceTips />
          </motion.div>
        </div>
      </div>
    </main>

); }

"use client";

import { Avatar } from "@/components/ui/avatar"; import { Badge } from
"@/components/ui/badge"; import { Button } from "@/components/ui/button"; import
{ Input } from "@/components/ui/input"; import { Label } from
"@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import
{ Textarea } from "@/components/ui/textarea"; import { motion, useReducedMotion
} from "framer-motion"; import { UploadCloud } from "lucide-react"; import {
FormEvent, useState } from "react";

export function GlassProfileSettingsCard() { const shouldReduceMotion =
useReducedMotion(); const [notifications, setNotifications] = useState(true);
const [newsletter, setNewsletter] = useState(false); const [bio, setBio] =
useState( "Designing expressive interfaces that feel alive." );

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
event.preventDefault(); };

return ( <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease:
shouldReduceMotion ? "linear" : [0.16, 1, 0.3, 1], }} className="group w-full
max-w-3xl rounded-3xl overflow-hidden border border-border/60 bg-card/85 p-8
backdrop-blur-xl sm:p-12 relative"
aria-labelledby="glass-profile-settings-title" >
<div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
      />
<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
<div>
<div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">
Profile
</div>
<h1
            id="glass-profile-settings-title"
            className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl"
          > Profile settings
</h1>
<p className="mt-2 text-sm text-muted-foreground"> Update your avatar, personal
details, and notification preferences.
</p>
</div>
<Badge className="group gap-2 rounded-full border border-border/60 bg-white/5 px-4 py-2 text-muted-foreground transition-colors duration-300 hover:border-primary/60 hover:bg-primary/15 hover:text-primary">
<span className="h-2 w-2 rounded-full bg-primary" aria-hidden /> Auto-save
enabled
</Badge>
</div>

      <form className="grid gap-8 sm:grid-cols-5" onSubmit={handleSubmit}>
        <div className="sm:col-span-2">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-background/40 p-6 backdrop-blur">
            <Avatar className="h-24 w-24 border border-border/60">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-primary/20 text-lg font-semibold text-primary">
                AP
              </span>
            </Avatar>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Alex Parker</p>
              <p className="text-xs text-muted-foreground">
                Lead Product Designer
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-border/60 bg-white/5 px-4 py-2 text-sm text-foreground"
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              Update avatar
            </Button>
          </div>
        </div>

        <div className="space-y-6 sm:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="profile-first-name">First name</Label>
              <Input
                id="profile-first-name"
                defaultValue="Alex"
                className="h-11 rounded-2xl border-border/60 bg-background/60 px-4"
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-last-name">Last name</Label>
              <Input
                id="profile-last-name"
                defaultValue="Parker"
                className="h-11 rounded-2xl border-border/60 bg-background/60 px-4"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email address</Label>
              <Input
                id="profile-email"
                type="email"
                defaultValue="alex.parker@example.com"
                className="h-11 rounded-2xl border-border/60 bg-background/60 px-4"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-phone">Phone number</Label>
              <Input
                id="profile-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="h-11 rounded-2xl border-border/60 bg-background/60 px-4"
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
              className="rounded-2xl border-border/60 bg-background/60 px-4 py-3 text-sm"
              placeholder="Tell us about your role, interests, or current focus."
            />
            <p className="text-right text-xs text-muted-foreground">
              {bio.length}/160 characters
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/40 p-5 backdrop-blur">
            <h2 className="text-sm font-medium text-foreground">
              Notifications
            </h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Choose the updates you want to receive about your workspace.
            </p>
            <div className="space-y-3">
              <label className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                Enable notifications
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </label>
              <label className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                Subscribe to newsletter
                <Switch checked={newsletter} onCheckedChange={setNewsletter} />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-border/60 bg-white/5 px-6 py-3 text-sm text-muted-foreground hover:text-primary"
              onClick={() => window.location.reload()}
            >
              Reset changes
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-[0_20px_60px_-30px_rgba(79,70,229,0.75)] transition-transform duration-300 hover:-translate-y-1"
            >
              Save settings
            </Button>
          </div>
        </div>
      </form>
    </motion.div>

); }

"use client";

import { Badge } from "@/components/ui/badge"; import { Button } from
"@/components/ui/button"; import { Label } from "@/components/ui/label"; import
{ Switch } from "@/components/ui/switch"; import { motion, useReducedMotion }
from "framer-motion"; import { Check } from "lucide-react"; import { useState }
from "react";

const planFeatures = [ "Unlimited projects", "Priority support", "Early access
to labs", ];

export function GlassAccountSettingsCard() { const shouldReduceMotion =
useReducedMotion(); const [autoRenew, setAutoRenew] = useState(true); const
[productUpdates, setProductUpdates] = useState(false);

return ( <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease:
shouldReduceMotion ? "linear" : [0.16, 1, 0.3, 1], }} className="group w-full
max-w-4xl rounded-3xl overflow-hidden border border-border/60 bg-card/85 p-8
backdrop-blur-xl sm:p-12 relative" aria-labelledby="glass-account-title" >
<div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
      />
<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
<div>
<div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">
Create Account
</div>
<h1
            id="glass-account-title"
            className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl"
          > Manage your account settings and subscription
</h1>
<p className="mt-2 text-sm text-muted-foreground"> Update personal details,
control notifications, and manage your current plan in one place.
</p>
</div>
<Badge className="rounded-full border border-border/60 bg-white/5 px-4 py-2 text-muted-foreground transition-colors duration-300 hover:border-primary/60 hover:bg-primary/15 hover:text-primary">
Pro
</Badge>
</div>

      <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-background/45 p-6 backdrop-blur">
            <h2 className="text-sm font-medium text-foreground">Security</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Control how you access your account.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <p>alex.parker@example.com</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">
                  Two-factor authentication
                </Label>
                <Button
                  variant="outline"
                  className="rounded-full border-border/60 px-4 py-2 text-xs"
                >
                  Manage 2FA
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/45 p-6 backdrop-blur">
            <h2 className="text-sm font-medium text-foreground">
              Notifications
            </h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Decide what updates reach your inbox.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <label className="flex items-center justify-between gap-3">
                Auto-renew subscription
                <Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
              </label>
              <label className="flex items-center justify-between gap-3">
                Product update emails
                <Switch
                  checked={productUpdates}
                  onCheckedChange={setProductUpdates}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-background/45 p-6 backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-medium text-foreground">
                  Current plan
                </h2>
                <p className="text-xs text-muted-foreground">
                  Workspace Pro - billed yearly
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-semibold text-foreground">
                  $24
                </span>
                <p className="text-xs text-muted-foreground">
                  per user / month
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              {planFeatures.map((feature) => (
                <p key={feature} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border/60 bg-primary/10 text-primary">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  {feature}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full border-border/60 bg-white/5 px-6 py-3 text-sm text-muted-foreground hover:text-primary"
              >
                Cancel subscription
              </Button>
              <Button
                type="button"
                className="flex-1 rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-[0_20px_60px_-30px_rgba(79,70,229,0.75)] transition-transform duration-300 hover:-translate-y-1"
              >
                Manage plan
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/45 p-6 backdrop-blur">
            <h2 className="text-sm font-medium text-foreground">Billing</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Download invoices or update payment details.
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row">
              <Button
                variant="outline"
                className="flex-1 rounded-full border-border/60 px-6 py-3 text-sm text-muted-foreground hover:text-primary"
              >
                View invoices
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full border-border/60 px-6 py-3 text-sm text-muted-foreground hover:text-primary"
              >
                Update payment method
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

); }

"use client";

import { AnimatePresence, motion, useReducedMotion, type Transition, type
Variants, } from "framer-motion"; import { File, Search, Settings, User, X }
from "lucide-react"; import { useMemo, useState } from "react";

type Command = { icon: typeof File; label: string; shortcut: string;
description: string; };

const commands: Command[] = [ { icon: File, label: "New File", shortcut: "⌘N",
description: "Spin up a glassmorphic canvas", }, { icon: Settings, label:
"Workspace Settings", shortcut: "⌘,", description: "Fine-tune tokens, motion,
and themes", }, { icon: User, label: "Team Directory", shortcut: "⌘P",
description: "Invite collaborators to your motion library", }, { icon: Search,
label: "Global Command", shortcut: "⌘K", description: "Jump anywhere with
palette search", }, ];

const overlayTransition: Transition = { duration: 0.24, ease: "easeOut" };

export function CommandPalette() { const [isOpen, setIsOpen] = useState(false);
const [query, setQuery] = useState(""); const shouldReduceMotion =
useReducedMotion();

const filteredCommands = useMemo( () => commands.filter((cmd) =>
cmd.label.toLowerCase().includes(query.toLowerCase()) ), [query] );

const panelVariants: Variants = shouldReduceMotion ? { initial: { opacity: 0, y:
0, scale: 1 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y:
0, scale: 1 }, } : { initial: { opacity: 0, scale: 0.96, y: 20, filter:
"blur(6px)" }, animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
transition: { duration: 0.28, ease: [0.18, 0.89, 0.32, 1.12] }, }, exit: {
opacity: 0, scale: 0.97, y: 12, filter: "blur(8px)", transition: { duration:
0.2, ease: [0.4, 0, 0.2, 1] }, }, };

return (
<div className="relative"> <motion.button type="button" onClick={() =>
setIsOpen(true)} className="group flex items-center gap-3 rounded-full border
border-border/60 bg-card/80 px-4 py-2.5 text-sm text-[var(--muted-foreground)]
shadow-[0_12px_30px_-15px_rgba(15,23,42,0.6)] backdrop-blur-lg transition-shadow
duration-300 hover:shadow-[0_18px_45px_-20px_rgba(15,23,42,0.7)]
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
focus-visible:ring-offset-2 focus-visible:ring-offset-background"
whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }} >
<Search className="h-4 w-4 text-primary" aria-hidden />
<span className="font-medium">Search commands…</span>
<kbd className="ml-auto rounded-full border border-border/60 bg-white/5 px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
⌘K
</kbd> </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={overlayTransition}
              onClick={() => setIsOpen(false)}
            />

            <div className="fixed inset-0 z-[65] flex items-start justify-center px-4 pt-24 sm:px-6">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                {...panelVariants}
                className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border/60 bg-card/90 backdrop-blur-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                >
                  <motion.div
                    className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[150px]"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: [0.25, 0.55, 0.25],
                            scale: [0.92, 1.08, 0.98],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }
                  />
                  <motion.div
                    className="absolute bottom-[-30%] right-[-5%] h-72 w-72 rounded-full bg-emerald-400/20 blur-[160px]"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { opacity: [0.2, 0.5, 0.2], rotate: [0, 12, 0] }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : { duration: 10, repeat: Infinity, ease: "linear" }
                    }
                  />
                </div>

                <div className="relative flex items-center gap-3 border-b border-border/60 px-5 py-4">
                  <Search className="h-5 w-5 text-primary" aria-hidden />
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search the glassmorphism toolkit…"
                    className="flex-1 bg-transparent text-sm text-[var(--muted-foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
                    autoFocus
                  />
                  <motion.button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-white/5 text-[var(--muted-foreground)] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { rotate: 90, scale: 1.05 }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                  >
                    <X className="h-4 w-4" aria-hidden />
                    <span className="sr-only">Close command palette</span>
                  </motion.button>
                </div>

                <motion.div
                  className="relative max-h-96 overflow-y-auto px-3 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredCommands.length === 0 ? (
                    <div className="rounded-2xl border border-border/60 bg-white/5 p-6 text-center text-sm text-[var(--muted-foreground)] backdrop-blur">
                      No commands found. Try a different search term.
                    </div>
                  ) : (
                    <ul className="space-y-2" role="list">
                      {filteredCommands.map((cmd, index) => {
                        const Icon = cmd.icon;
                        return (
                          <motion.li
                            key={cmd.label}
                            initial={{
                              opacity: shouldReduceMotion ? 1 : 0,
                              y: shouldReduceMotion ? 0 : 12,
                            }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={
                              shouldReduceMotion
                                ? { duration: 0 }
                                : {
                                    delay: 0.04 * index,
                                    duration: 0.24,
                                    ease: "easeOut",
                                  }
                            }
                          >
                            <button
                              type="button"
                              className="group flex w-full items-center justify-between rounded-2xl border border-transparent bg-white/5 px-4 py-4 text-left transition-colors duration-200 hover:border-border hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                            >
                              <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-white/5 text-primary shadow-sm backdrop-blur">
                                  <Icon className="h-4 w-4" aria-hidden />
                                </span>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-[var(--muted-foreground)]">
                                    {cmd.label}
                                  </span>
                                  <span className="text-xs text-[var(--muted-foreground)]">
                                    {cmd.description}
                                  </span>
                                </div>
                              </div>
                              <kbd className="rounded-full border border-border/40 bg-white/5 px-2 py-1 text-xs text-[var(--muted-foreground)] shadow-sm">
                                {cmd.shortcut}
                              </kbd>
                            </button>
                          </motion.li>
                        );
                      })}
                    </ul>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>

); }

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, LogOut } from "lucide-react"; import { useId,
useMemo, useState } from "react";

type Account = { id: string; name: string; email: string; avatarUrl: string;
plan: "Free" | "Pro" | "Enterprise"; };

const accountOptions: Account[] = [ { id: "nova-studio", name: "Nova Studio",
email: "finance@tripled.work", avatarUrl:
"https://iimydr2b8o.ufs.sh/f/Zqn6AViLMoTtHnKrXgkK7FlZGQ2nWi4Jzv0TXU9DVkAd5yE1",
plan: "Pro", }, { id: "growth-lab", name: "Growth Lab", email:
"ops@tripled.work", avatarUrl:
"https://iimydr2b8o.ufs.sh/f/Zqn6AViLMoTtIYuGoisEhfWHMxKLVXD5ouFcBtgk6enZS0OG",
plan: "Enterprise", }, { id: "personal-workspace", name: "Personal Workspace",
email: "morgan@tripled.work", avatarUrl:
"https://iimydr2b8o.ufs.sh/f/Zqn6AViLMoTtqpB1uxNk0UapbrAxOtRg9jDGu8sZzWLf2VM1",
plan: "Free", }, ];

export function MultipleAccounts() { const shouldReduceMotion =
useReducedMotion(); const [activeId, setActiveId] =
useState(accountOptions[0]?.id ?? ""); const [isOpen, setIsOpen] =
useState(false); const listboxId = useId();

const activeAccount = useMemo( () => accountOptions.find((account) => account.id
=== activeId) ?? accountOptions[0], [activeId] );

const statusMessage = activeAccount ?
`${activeAccount.name} selected. Plan ${activeAccount.plan}.` : "No account
selected.";

return ( <motion.section initial={ shouldReduceMotion ? { opacity: 1, y: 0 } : {
opacity: 0, y: 20 } } animate={{ opacity: 1, y: 0 }}
transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
className="relative z-10 w-full rounded-2xl border border-border/60 bg-card/80
p-4 backdrop-blur-2xl" > <button type="button" className="group relative flex
w-full items-center gap-3 rounded-2xl border border-transparent bg-surface/60
text-left text-sm text-foreground transition-colors duration-200
hover:bg-surface/80 focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-primary focus-visible:ring-offset-2
focus-visible:ring-offset-background" aria-haspopup="listbox"
aria-controls={listboxId} aria-expanded={isOpen} onClick={() =>
setIsOpen((previous) => !previous)} >
<span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-surface">
<img
            src={activeAccount?.avatarUrl}
            alt=""
            className="h-full w-full object-cover"
          />
</span>
<div className="flex flex-1 flex-col">
<span className="text-sm font-medium text-foreground"> {activeAccount?.name}
</span>
<span className="text-xs text-[var(--muted-foreground)]"> {activeAccount?.email}
</span>
</div> <motion.span aria-hidden className="flex h-9 w-9 items-center
justify-center rounded-full border border-border/60 bg-white/5
text-[var(--muted-foreground)]" animate={ shouldReduceMotion ? undefined : {
rotate: isOpen ? 180 : 0 } } transition={{ duration: 0.22, ease: "easeOut" }} >
<ChevronDown className="h-4 w-4" /> </motion.span>
</button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={listboxId}
            role="listbox"
            aria-activedescendant={`${listboxId}-${activeId}`}
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -4,
              scale: shouldReduceMotion ? 1 : 0.98,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -6,
              scale: shouldReduceMotion ? 1 : 0.97,
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-[calc(100%+0.75rem)] z-50 space-y-2 rounded-2xl border border-border/70 bg-card/95 p-3 shadow-[0_28px_90px_-35px_rgba(15,23,42,0.65)] backdrop-blur-xl"
          >
            {accountOptions.map((account, index) => (
              <motion.button
                key={account.id}
                id={`${listboxId}-${account.id}`}
                type="button"
                role="option"
                aria-selected={account.id === activeId}
                className="flex w-full items-center gap-3 rounded-xl border border-transparent bg-white/5 px-3 py-3 text-left text-sm text-foreground transition-colors duration-200 hover:border-border hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                onClick={() => {
                  setActiveId(account.id);
                  setIsOpen(false);
                }}
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  x: shouldReduceMotion ? 0 : -8,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { delay: 0.04 * index, duration: 0.24, ease: "easeOut" }
                }
              >
                <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-surface">
                  <img
                    src={account.avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {account.name}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {account.email}
                  </span>
                </div>
                <span className="text-xs font-medium text-primary">
                  {account.plan}
                </span>
                {account.id === activeId && (
                  <motion.span
                    layoutId="multiple-accounts-active-indicator"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/60 bg-primary/20 text-primary"
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <Check className="h-4 w-4" aria-hidden />
                  </motion.span>
                )}
              </motion.button>
            ))}

            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-white/[0.04] px-3 py-3 text-sm text-[var(--muted-foreground)]">
              <div className="flex items-center gap-2">
                <LogOut className="h-4 w-4" aria-hidden />
                <span>Manage accounts</span>
              </div>
              <button
                type="button"
                className="rounded-full border border-border/60 px-3 py-1 text-xs text-foreground transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              >
                Settings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </span>
    </motion.section>

); }

"use client";

import { AnimatePresence, motion } from "framer-motion"; import { Copy, Edit,
Share, Trash } from "lucide-react"; import { useState } from "react";

const menuItems = [ { icon: Copy, label: "Copy", shortcut: "⌘C" }, { icon: Edit,
label: "Edit", shortcut: "⌘E" }, { icon: Share, label: "Share", shortcut: "⌘S"
}, { icon: Trash, label: "Delete", shortcut: "⌘D", danger: true }, ];

export function ContextMenu() { const [position, setPosition] = useState({ x: 0,
y: 0 }); const [isVisible, setIsVisible] = useState(false);

const handleContextMenu = (e: React.MouseEvent) => { e.preventDefault();
setPosition({ x: e.clientX, y: e.clientY }); setIsVisible(true); };

return ( <> <div onContextMenu={handleContextMenu} onClick={() =>
setIsVisible(false)} className="flex h-64 w-64 items-center justify-center
rounded-2xl border-2 border-dashed bg-[var(--card-bg)]" >
<p className="text-sm text-[var(--foreground)]/60">Right-click here</p>
</div>

      <AnimatePresence>
        {isVisible && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsVisible(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed bg-card z-50 w-56 rounded-xl border  bg-[var(--card-bg)] p-2 shadow-2xl"
              style={{ left: position.x, top: position.y }}
            >
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${
                      item.danger
                        ? "text-red-500 hover:bg-red-500/10"
                        : "hover:bg-accent/10"
                    }`}
                    whileHover={{ x: 4 }}
                    onClick={() => setIsVisible(false)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    <kbd className="text-xs opacity-60">{item.shortcut}</kbd>
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>

); }

"use client";

import { AnimatePresence, motion } from "framer-motion"; import { Copy, Edit,
MoreVertical, Share2, Trash2 } from "lucide-react"; import { MouseEvent, useRef,
useState } from "react";

type MenuItem = { label: string; icon: React.ReactNode; onClick: () => void;
danger?: boolean; };

type ContextMenuBubbleProps = { items?: MenuItem[]; };

export function ContextMenuBubble({ items = [ { label: "Edit", icon:
<Edit className="h-4 w-4" />, onClick: () => {} }, { label: "Copy", icon:
<Copy className="h-4 w-4" />, onClick: () => {} }, { label: "Share", icon:
<Share2 className="h-4 w-4" />, onClick: () => {} }, { label: "Delete", icon:
<Trash2 className="h-4 w-4" />, onClick: () => {}, danger: true, }, ], }:
ContextMenuBubbleProps) { const [isOpen, setIsOpen] = useState(false); const
[position, setPosition] = useState({ x: 0, y: 0 }); const triggerRef =
useRef<HTMLButtonElement>(null); const containerRef =
useRef<HTMLDivElement>(null);

const updatePosition = () => { if (triggerRef.current && containerRef.current) {
const buttonRect = triggerRef.current.getBoundingClientRect(); const
containerRect = containerRef.current.getBoundingClientRect(); setPosition({ x:
buttonRect.left + buttonRect.width / 2 - containerRect.left, y: buttonRect.top +
buttonRect.height / 2 - containerRect.top, }); } };

const handleContextMenu = (e: MouseEvent) => { e.preventDefault();
updatePosition(); setIsOpen(true); };

const handleClick = () => { updatePosition(); setIsOpen(!isOpen); };

const closeMenu = () => setIsOpen(false);

const itemCount = items.length; const radius = 80; const angleStep = (2 *
Math.PI) / itemCount;

return (
<div
      ref={containerRef}
      className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl"
    > <motion.button ref={triggerRef} onContextMenu={handleContextMenu}
onClick={handleClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
className="flex h-12 w-12 items-center justify-center rounded-full bg-primary
text-primary-foreground" >
<MoreVertical className="h-5 w-5" /> </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="absolute z-50 flex h-40 w-40 items-center justify-center"
              style={{
                left: position.x - 80,
                top: position.y - 80,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-background/95 backdrop-blur-sm" />

              {items.map((item, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.button
                    key={item.label}
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      x,
                      y,
                      rotate: 360,
                    }}
                    exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      item.onClick();
                      closeMenu();
                    }}
                    className={`absolute flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-lg transition-colors ${
                      item.danger
                        ? "hover:bg-destructive hover:text-destructive-foreground"
                        : "hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {item.icon}
                  </motion.button>
                );
              })}

              <button
                onClick={closeMenu}
                className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-card"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>

); }

"use client";

import { AnimatePresence, motion } from "framer-motion"; import { Search, X }
from "lucide-react"; import { useState } from "react";

type ExpandingSearchDockProps = { onSearch?: (query: string) => void;
placeholder?: string; };

export function ExpandingSearchDock({ onSearch, placeholder = "Search...", }:
ExpandingSearchDockProps) { const [isExpanded, setIsExpanded] = useState(false);
const [query, setQuery] = useState("");

const handleExpand = () => { setIsExpanded(true); };

const handleCollapse = () => { setIsExpanded(false); setQuery(""); };

const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (onSearch
&& query) { onSearch(query); } };

return (
<div className="relative">
<AnimatePresence mode="wait"> {!isExpanded ? ( <motion.button key="icon"
initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{
scale: 0, opacity: 0 }} onClick={handleExpand} className="flex h-12 w-12
items-center justify-center rounded-full border border-border bg-card
transition-colors hover:bg-muted" >
<Search className="h-5 w-5" /> </motion.button> ) : ( <motion.form key="input"
initial={{ width: 48, opacity: 0 }} animate={{ width: 320, opacity: 1 }} exit={{
width: 48, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping:
30, }} onSubmit={handleSubmit} className="relative" > <motion.div initial={{
backdropFilter: "blur(0px)" }} animate={{ backdropFilter: "blur(12px)" }}
className="relative flex items-center gap-2 overflow-hidden rounded-full border
border-border bg-card/80 backdrop-blur-md" >
<div className="ml-4">
<Search className="h-4 w-4 text-muted-foreground" />
</div> <input type="text" value={query} onChange={(e) =>
setQuery(e.target.value)} placeholder={placeholder} autoFocus className="h-12
flex-1 bg-transparent pr-4 text-sm outline-none
placeholder:text-muted-foreground" /> <motion.button type="button"
onClick={handleCollapse} initial={{ scale: 0 }} animate={{ scale: 1 }}
whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="mr-2 flex h-8
w-8 items-center justify-center rounded-full hover:bg-muted" >
<X className="h-4 w-4" /> </motion.button> </motion.div> </motion.form> )}
</AnimatePresence>
</div> ); }

"use client";

import { motion } from "framer-motion"; import { useEffect, useRef, useState }
from "react";

type AIResponseTypingProps = { text?: string; speed?: number; showCursor?:
boolean; onComplete?: () => void; thinkingState?: "idle" | "thinking" |
"typing"; };

export function AIResponseTyping({ text = "Hello! I'm an AI assistant. I can
help you with questions, provide information, and assist with various tasks.
Feel free to ask me anything!", speed = 30, showCursor = true, onComplete,
thinkingState = "typing", }: AIResponseTypingProps) { const [displayedText,
setDisplayedText] = useState(""); const [isThinking, setIsThinking] =
useState(false); const [isTyping, setIsTyping] = useState(false); const
intervalRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => { if (thinkingState === "thinking") { setIsThinking(true);
setIsTyping(false); setDisplayedText(""); return; }

    if (thinkingState === "typing" && text) {
      setIsThinking(false);
      setIsTyping(true);
      setDisplayedText("");

      let currentIndex = 0;
      const chars = text.split("");

      const typeNextChar = () => {
        if (currentIndex < chars.length) {
          const nextChar = chars[currentIndex];

          // Simulate natural typing pauses at punctuation
          const isPause =
            nextChar === "." ||
            nextChar === "," ||
            nextChar === "!" ||
            nextChar === "?" ||
            nextChar === "\n";

          setDisplayedText((prev) => prev + nextChar);
          currentIndex++;

          // Schedule next character with pause if needed
          if (isPause) {
            intervalRef.current = setTimeout(() => {
              typeNextChar();
            }, speed * 3);
          } else {
            intervalRef.current = setTimeout(() => {
              typeNextChar();
            }, speed);
          }
        } else {
          if (intervalRef.current) clearTimeout(intervalRef.current);
          setIsTyping(false);
          onComplete?.();
        }
      };

      // Start typing
      typeNextChar();

      return () => {
        if (intervalRef.current) clearTimeout(intervalRef.current);
      };
    }

}, [text, speed, thinkingState, onComplete]);

return (
<div className="w-full max-w-2xl">
<div className="relative rounded-2xl border border-border bg-card p-6 min-h-[100px]">
{/* Thinking state shimmer */} {isThinking && ( <motion.div initial={{ opacity:
0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center
gap-2" >
<span className="text-muted-foreground">Thinking</span>
<div className="flex gap-1"> {[0, 1, 2].map((i) => ( <motion.div key={i}
className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.2, 1],
opacity: [0.5, 1, 0.5], }} transition={{ duration: 1, repeat: Infinity, delay:
i * 0.2, ease: "easeInOut", }} /> ))}
</div> </motion.div> )}

        {/* Typing output */}
        {displayedText && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-foreground leading-relaxed whitespace-pre-wrap break-words"
          >
            {displayedText}
            {showCursor && isTyping && (
              <motion.span
                className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle"
                animate={{ opacity: [1, 1, 1, 0, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              />
            )}
            {showCursor && !isTyping && !isThinking && displayedText && (
              <motion.span
                className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle opacity-50"
                animate={{ opacity: [0.5, 0.5, 0, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  repeatDelay: 0.5,
                }}
              />
            )}
          </motion.p>
        )}

        {/* Shimmer effect overlay */}
        {(isTyping || isThinking) && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
            }}
          />
        )}

        {/* Decorative gradient border */}
        {(isTyping || isThinking) && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                background: [
                  "linear-gradient(135deg, transparent, transparent)",
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)",
                  "linear-gradient(135deg, transparent, transparent)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <motion.div
            animate={{
              scale: isTyping ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: isTyping ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full bg-green-500"
          />
          <span>
            {isThinking
              ? "AI is thinking..."
              : isTyping
                ? "AI is typing..."
                : "Ready"}
          </span>
        </div>
      </div>
    </div>

); }

"use client";

import { cn } from "@/lib/utils"; import { Avatar, AvatarFallback, AvatarImage,
} from "@uitripled/react-shadcn/ui/avatar"; import { Button } from
"@uitripled/react-shadcn/ui/button"; import { Select, SelectContent, SelectItem,
SelectTrigger, SelectValue, } from "@uitripled/react-shadcn/ui/select"; import {
AnimatePresence, motion, type Variants } from "framer-motion"; import { Brain,
Code, MessageSquare, Send, Sparkles, X, Zap, } from "lucide-react"; import {
useCallback, useId, useState } from "react";

interface Agent { id: string; name: string; role: string; avatar: string;
status: "online" | "busy" | "offline"; icon: React.ElementType; gradient:
string; }

const AI_AGENTS: Agent[] = [ { id: "gpt4", name: "GPT-4", role: "Advanced
Reasoning", avatar: "https://github.com/shadcn.png", status: "online", icon:
Sparkles, gradient: "from-green-500/20 to-emerald-500/20", }, { id: "claude",
name: "Claude 3.5", role: "Creative Writing", avatar:
"https://github.com/shadcn.png", status: "online", icon: Brain, gradient:
"from-orange-500/20 to-amber-500/20", }, { id: "gemini", name: "Gemini Pro",
role: "Multimodal Analysis", avatar: "https://github.com/shadcn.png", status:
"busy", icon: Zap, gradient: "from-blue-500/20 to-cyan-500/20", }, { id:
"copilot", name: "Copilot", role: "Code Assistant", avatar:
"https://github.com/shadcn.png", status: "online", icon: Code, gradient:
"from-purple-500/20 to-violet-500/20", }, ];

const containerVariants: Variants = { hidden: { opacity: 0, y: 20, scale: 0.95,
transformOrigin: "bottom right", }, visible: { opacity: 1, y: 0, scale: 1,
transition: { type: "spring", damping: 25, stiffness: 300, staggerChildren:
0.05, }, }, exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2,
}, }, };

const messageVariants: Variants = { hidden: { opacity: 0, y: 10, x: -10 },
visible: { opacity: 1, y: 0, x: 0, transition: { type: "spring", stiffness: 500,
damping: 30 }, }, };

export function FloatingChatWidget() { const [isOpen, setIsOpen] =
useState(false); const [selectedAgent, setSelectedAgent] =
useState<string>(AI_AGENTS[0].id); const [message, setMessage] = useState("");
const widgetId = useId();

const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

const currentAgent = AI_AGENTS.find((a) => a.id === selectedAgent) ||
AI_AGENTS[0]; const AgentIcon = currentAgent.icon;

return (
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
<AnimatePresence> {isOpen && ( <motion.div key="chat-window"
variants={containerVariants} initial="hidden" animate="visible" exit="exit"
className="w-[380px] overflow-hidden rounded-2xl border border-border/40
bg-background/60 shadow-2xl backdrop-blur-xl ring-1 ring-white/10" > {/* Header
*/}
<div className="relative border-b border-border/40 bg-muted/30 p-4 overflow-hidden">
<div className={cn( "absolute inset-0 bg-gradient-to-br opacity-50",
currentAgent.gradient )} />
<div className="relative flex items-center justify-between z-10">
<div className="flex items-center gap-3">
<div className="relative">
<Avatar className="h-10 w-10 border-2 border-background shadow-sm">
<AvatarImage
                        src={currentAgent.avatar}
                        alt={currentAgent.name}
                      />
<AvatarFallback>AI</AvatarFallback>
</Avatar> <span className={cn( "absolute bottom-0 right-0 h-3 w-3 rounded-full
border-2 border-background", currentAgent.status === "online" ? "bg-emerald-500"
: currentAgent.status === "busy" ? "bg-amber-500" : "bg-slate-400" )} />
</div>
<div>
<h3 className="text-sm font-semibold text-foreground"> {currentAgent.name}
</h3>
<div className="flex items-center gap-1.5">
<span className="text-xs text-muted-foreground"> {currentAgent.role}
</span>
</div>
</div>
</div> <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full
hover:bg-background/50" onClick={() => setIsOpen(false)} >
<X className="h-4 w-4" />
</Button>
</div>
</div>

            {/* Agent Selector */}
            <div className="border-b border-border/40 p-3">
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="w-full border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 text-lg font-medium h-auto hover:bg-transparent px-2 py-6 cursor-pointer">
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl bg-background/90 border-border/40">
                  {AI_AGENTS.map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <SelectItem
                        key={agent.id}
                        value={agent.id}
                        className="cursor-pointer focus:bg-primary/10"
                      >
                        <div className="flex items-center gap-3 py-1">
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br",
                              agent.gradient
                            )}
                          >
                            <Icon className="h-4 w-4 text-foreground/80" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-medium">
                              {agent.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {agent.role}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Chat Area */}
            <div className="flex h-[320px] flex-col gap-4 overflow-y-auto p-4 bg-gradient-to-b from-background/20 to-background/40">
              <motion.div variants={messageVariants} className="flex gap-3">
                <Avatar className="h-8 w-8 border border-border/40 shadow-sm">
                  <AvatarImage src={currentAgent.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="flex max-w-[85%] flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {currentAgent.name}
                  </span>
                  <div className="rounded-2xl rounded-tl-none bg-muted/50 px-4 py-2.5 text-sm shadow-sm backdrop-blur-sm border border-border/20">
                    <p>
                      Hello! I'm {currentAgent.name}. How can I assist you with
                      your project today?
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* User Message Mock */}
              <motion.div
                variants={messageVariants}
                className="flex flex-row-reverse gap-3 self-end"
              >
                <Avatar className="h-8 w-8 border border-border/40 shadow-sm">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    ME
                  </AvatarFallback>
                </Avatar>
                <div className="flex max-w-[85%] flex-col items-end gap-1">
                  <div className="rounded-2xl rounded-tr-none bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-md">
                    <p>I need help optimizing my dashboard performance.</p>
                  </div>
                </div>
              </motion.div>

              {/* Typing Indicator Mock */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3"
              >
                <Avatar className="h-8 w-8 border border-border/40 shadow-sm">
                  <AvatarImage src={currentAgent.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <div className="rounded-2xl rounded-tl-none bg-muted/50 px-4 py-3 shadow-sm backdrop-blur-sm border border-border/20 w-16 flex items-center justify-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Input Area */}
            <div className="border-t border-border/40 bg-background/60 p-3 backdrop-blur-md">
              <form
                className="relative flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setMessage("");
                }}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message ${currentAgent.name}...`}
                  className="flex-1 rounded-full border border-border/40 bg-background/50 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background focus:ring-2 focus:ring-primary/10"
                />
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:shadow-primary/25"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
        className={cn(
          "cursor-pointer group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300",
          isOpen
            ? "bg-destructive text-destructive-foreground rotate-90"
            : "bg-primary text-primary-foreground hover:shadow-primary/25"
        )}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-inherit opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </motion.button>
    </div>

); }

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; import { cn } from
"@/lib/utils"; import { motion } from "framer-motion"; import { Calendar, Link
as LinkIcon, MapPin, MoreHorizontal, UserPlus, } from "lucide-react"; import {
useState } from "react";

export function ProfilePage() { const [isFollowing, setIsFollowing] =
useState(false);

return (
<div className=""> {/* Cover Image with Gradient Animation */}
<div
        className="relative h-48 md:h-64 w-full overflow-hidden rounded-b-2xl"
        role="img"
        aria-label="Profile cover background"
      > <motion.div className="absolute inset-0" animate={{ background: [
"linear-gradient(45deg, #667eea 0%, #764ba2 100%)", "linear-gradient(45deg,
#f093fb 0%, #f5576c 100%)", "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
"linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)", "linear-gradient(45deg,
#667eea 0%, #764ba2 100%)", ], }} transition={{ duration: 15, repeat: Infinity,
ease: "linear", }} />
<div className="absolute inset-0 bg-black/10" />
</div>

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 pb-6">
        {/* Profile Header */}
        <div className="relative -mt-8 sm:-mt-8 mb-6 sm:mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4 sm:gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full border-4 border-background bg-background shadow-xl">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Moumen Soliman's profile picture"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl sm:text-4xl">
                    MS
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-2xl border-4 border-background bg-emerald-500"
                aria-label="Online status: Active"
                role="status"
              />
            </motion.div>

            <div className="mb-1 sm:mb-2 space-y-0.5 sm:space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Moumen Soliman
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                @moumensoliman
              </p>
            </div>
          </div>

          <div className="flex w-full gap-2 sm:gap-3 md:w-auto md:mb-2">
            <Button
              className={cn(
                "flex-1 md:flex-none gap-2 transition-all",
                isFollowing
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  : ""
              )}
              variant={isFollowing ? "secondary" : "default"}
              onClick={() => setIsFollowing(!isFollowing)}
              aria-label={
                isFollowing
                  ? "Unfollow Moumen Soliman"
                  : "Follow Moumen Soliman"
              }
            >
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 md:flex-none"
              aria-label="Message Moumen Soliman"
            >
              Message
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="border border-border/40"
              aria-label="More profile options"
            >
              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Bio & Stats */}
        <section
          aria-label="User bio and statistics"
          className="grid gap-8 md:grid-cols-[2fr,1fr]"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                Product Designer & Frontend Developer. Passionate about building
                beautiful, accessible user interfaces. Creating digital
                experiences that matter. ✨
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LinkIcon
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                  <a
                    href="#"
                    className="hover:text-primary hover:underline"
                    aria-label="Visit Moumen Soliman's website"
                  >
                    moumen.dev
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                  <span>Joined March 2024</span>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6 pt-2 text-sm sm:text-base">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-foreground">1,240</span>
                  <span className="text-muted-foreground">Following</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-foreground">8,560</span>
                  <span className="text-muted-foreground">Followers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-foreground">342</span>
                  <span className="text-muted-foreground">Posts</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

); }

"use client";

import { cn } from "@/lib/utils"; import { AnimatePresence, motion,
useReducedMotion } from "framer-motion"; import { useMemo, useState } from
"react";

type ChartView = "monthly" | "yearly";

interface CashFlowDatum { label: string; shortLabel: string; value: number;
cashflow: number; inflow: number; dateRange: string; }

const monthlyData: CashFlowDatum[] = [ { label: "January 2026", shortLabel:
"Jan", value: 35000, cashflow: 35000, inflow: 12000, dateRange: "January 2026",
}, { label: "February 2026", shortLabel: "Feb", value: 28000, cashflow: 28000,
inflow: 9500, dateRange: "February 2026", }, { label: "March 2026", shortLabel:
"Mar", value: 52000, cashflow: 52000, inflow: 14200, dateRange: "March 2026", },
{ label: "April 2026", shortLabel: "Apr", value: 31000, cashflow: 31000, inflow:
10100, dateRange: "April 2026", }, { label: "May 2026", shortLabel: "May",
value: 38000, cashflow: 38000, inflow: 11800, dateRange: "May 2026", }, { label:
"June 2026", shortLabel: "Jun", value: 22000, cashflow: 22000, inflow: 8200,
dateRange: "June 2026", }, { label: "July 2026", shortLabel: "Jul", value:
33000, cashflow: 33000, inflow: 9600, dateRange: "July 2026", }, ];

const yearlyData: CashFlowDatum[] = [ { label: "2020", shortLabel: "2020",
value: 265000, cashflow: 265000, inflow: 62000, dateRange: "Fiscal Year 2020",
}, { label: "2021", shortLabel: "2021", value: 302000, cashflow: 302000, inflow:
78500, dateRange: "Fiscal Year 2021", }, { label: "2022", shortLabel: "2022",
value: 358000, cashflow: 358000, inflow: 91200, dateRange: "Fiscal Year 2022",
}, { label: "2023", shortLabel: "2023", value: 402000, cashflow: 402000, inflow:
103500, dateRange: "Fiscal Year 2023", }, { label: "2024", shortLabel: "2024",
value: 446000, cashflow: 446000, inflow: 118000, dateRange: "Fiscal Year 2024",
}, { label: "2025", shortLabel: "2025", value: 489000, cashflow: 489000, inflow:
124300, dateRange: "Fiscal Year 2025 (projected)", }, ];

const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", {
style: "currency", currency: "USD", maximumFractionDigits: 0, }).format(value);

export function CashFlowChart() { const [hoveredBar, setHoveredBar] =
useState<number | null>(null); const [activeView, setActiveView] =
useState<ChartView>("yearly"); const prefersReducedMotion = useReducedMotion();

const displayData = useMemo( () => (activeView === "monthly" ? monthlyData :
yearlyData), [activeView] );

const maxValue = useMemo( () => Math.max(...displayData.map((d) => d.value)),
[displayData] );

const summaryText = useMemo(() => { if (!displayData.length) { return "No cash
flow data available."; }

    const highest = displayData.reduce((prev, current) =>
      current.value > prev.value ? current : prev
    );
    const lowest = displayData.reduce((prev, current) =>
      current.value < prev.value ? current : prev
    );
    const first = displayData[0];
    const last = displayData[displayData.length - 1];

    if (activeView === "monthly") {
      return `Monthly cash flow from ${first.label} to ${last.label}. Highest cash flow in ${highest.label} at ${formatCurrency(
        highest.value
      )}. Lowest in ${lowest.label} at ${formatCurrency(lowest.value)}.`;
    }

    return `Yearly cash flow from ${first.label} to ${last.label}. Highest cash flow in ${highest.label} at ${formatCurrency(
      highest.value
    )}. Lowest in ${lowest.label} at ${formatCurrency(lowest.value)}.`;

}, [activeView, displayData]);

const chartTitleId = "cashflow-chart-title"; const chartSummaryId =
"cashflow-chart-summary";

const handleViewChange = (view: ChartView) => { setActiveView(view);
setHoveredBar(null); };

const shouldAnimate = !prefersReducedMotion;

return ( <motion.section initial={shouldAnimate ? { opacity: 0, y: 20 } : {
opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={shouldAnimate ? {
duration: 0.5 } : { duration: 0 }} className="w-full bg-card rounded-3xl p-8
hover:shadow-2xl backdrop-blur-sm border border-border"
aria-labelledby={chartTitleId} aria-describedby={chartSummaryId} role="group" >
<div className="grid grid-cols-1 md:flex items-start justify-between mb-8 gap-6">
<div>
<p
            className="text-muted-foreground text-lg mb-2"
            id="cashflow-chart-label"
          > Cash Flow
</p> <motion.h2 id={chartTitleId} initial={shouldAnimate ? { scale: 0.95 } : {
scale: 1 }} animate={{ scale: 1 }} transition={shouldAnimate ? { duration: 0.4 }
: { duration: 0 }} className="text-3xl md:text-5xl font-bold text-foreground" >
{formatCurrency( displayData.reduce((total, datum) => total + datum.cashflow, 0)
)} </motion.h2>
<p id={chartSummaryId} className="sr-only" aria-live="polite"> {summaryText}
</p>
</div>

        <div
          className="flex bg-secondary rounded-full p-1 w-fit"
          role="radiogroup"
          aria-label="Chart view"
        >
          <button
            type="button"
            onClick={() => handleViewChange("monthly")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
              activeView === "monthly"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-foreground hover:text-primary"
            )}
            aria-pressed={activeView === "monthly"}
            aria-controls="cashflow-chart-bars"
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => handleViewChange("yearly")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
              activeView === "yearly"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-foreground hover:text-primary"
            )}
            aria-pressed={activeView === "yearly"}
            aria-controls="cashflow-chart-bars"
          >
            <span className="sr-only">Currently selected:&nbsp;</span>
            Yearly
          </button>
        </div>
      </div>

      <figure
        className="relative h-auto overflow-x-auto md:overflow-x-visible overflow-y-hidden md:overflow-y-visible pt-10 md:pt-0"
        aria-labelledby={chartTitleId}
      >
        <figcaption className="sr-only">
          Bar chart comparing cash flow performance by period. Use the Monthly
          or Yearly toggle to change the data set.
        </figcaption>

        <div className="relative min-w-[640px] md:min-w-0 h-[24rem]">
          <div
            className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-sm text-muted-foreground"
            aria-hidden="true"
          >
            {[50, 40, 30, 20, 10, 0].map((value) => (
              <div key={value}>{value}k</div>
            ))}
          </div>

          <div
            id="cashflow-chart-bars"
            className="absolute left-16 right-0 top-0 bottom-12 flex items-end justify-between gap-4"
            role="list"
            aria-describedby={chartSummaryId}
          >
            {displayData.map((data, index) => {
              const heightPercentage = maxValue
                ? Math.max((data.value / maxValue) * 100, 4)
                : 0;
              // Keep tooltip inside the chart area so it doesn't get clipped
              const tooltipBase = Math.min(heightPercentage + 8, 88);
              const tooltipVisible = hoveredBar === index;
              const tooltipPosition = `${tooltipBase}%`;

              return (
                <div
                  key={`${data.shortLabel}-${data.label}`}
                  className="relative flex-1 flex flex-col items-center justify-end h-full"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                  role="listitem"
                >
                  <AnimatePresence>
                    {tooltipVisible && (
                      <motion.div
                        initial={
                          shouldAnimate
                            ? { opacity: 0, y: 10, scale: 0.95 }
                            : { opacity: 1, y: 0, scale: 1 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                          shouldAnimate
                            ? { opacity: 0, y: 10, scale: 0.95 }
                            : { opacity: 0, y: 10, scale: 0.95 }
                        }
                        transition={
                          shouldAnimate ? { duration: 0.2 } : { duration: 0 }
                        }
                        className="absolute mx-auto bg-popover rounded-2xl p-4 shadow-xl border border-border min-w-[200px] z-10 text-left"
                        role="status"
                        aria-live="polite"
                        style={{ bottom: tooltipPosition }}
                      >
                        <div className="text-xs text-muted-foreground mb-2">
                          {data.dateRange}
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-foreground">
                            Cash flow
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            {formatCurrency(data.cashflow)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-foreground">
                            Inflow
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            {formatCurrency(data.inflow)}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="button"
                    initial={shouldAnimate ? { height: 0 } : false}
                    animate={{ height: `${heightPercentage}%` }}
                    transition={
                      shouldAnimate
                        ? {
                            duration: 0.8,
                            delay: index * 0.08,
                            ease: "easeOut",
                          }
                        : { duration: 0 }
                    }
                    onFocus={() => setHoveredBar(index)}
                    onBlur={() => setHoveredBar(null)}
                    className={`w-full rounded-t-2xl relative overflow-hidden cursor-pointer transition-colors duration-300 min-h-[0.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${tooltipVisible ? "bg-gradient-to-b from-primary to-primary/20" : "bg-primary/30"}
                    `}
                    aria-label={`${data.label} cash flow ${formatCurrency(
                      data.cashflow
                    )} with ${formatCurrency(data.inflow)} in inflow`}
                    aria-describedby={`${data.shortLabel}-summary`}
                  >
                    <span id={`${data.shortLabel}-summary`} className="sr-only">
                      {`${data.label}: cash flow ${formatCurrency(
                        data.cashflow
                      )}, inflow ${formatCurrency(data.inflow)}`}
                    </span>
                  </motion.button>

                  <div
                    className="text-sm text-muted-foreground mt-3"
                    aria-hidden="true"
                  >
                    {data.shortLabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <table className="sr-only">
          <caption>
            Tabular representation of the cash flow data for assistive
            technologies.
          </caption>
          <thead>
            <tr>
              <th scope="col">Period</th>
              <th scope="col">Cash flow</th>
              <th scope="col">Inflow</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((datum) => (
              <tr key={`table-${datum.label}`}>
                <th scope="row">{datum.label}</th>
                <td>{formatCurrency(datum.cashflow)}</td>
                <td>{formatCurrency(datum.inflow)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </motion.section>

); }

"use client";

import { Badge } from "@/components/ui/badge"; import { Button } from
"@/components/ui/button"; import { Input } from "@/components/ui/input"; import
{ Label } from "@/components/ui/label"; import { cn } from "@/lib/utils"; import
{ motion, type Variants } from "framer-motion"; import { ArrowLeft, ArrowRight,
Check, FileCheck, MapPin, Settings, User, } from "lucide-react"; import {
useState } from "react";

// ============================================================================
// ANIMATION VARIANTS //
============================================================================

const containerVariants: Variants = { hidden: { opacity: 0, scale: 0.95 },
visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut",
staggerChildren: 0.1, }, }, };

const contentVariants: Variants = { hidden: { opacity: 0, x: 20 }, visible: {
opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" }, }, };

// ============================================================================
// DATA //
============================================================================

const STEPS = [ { id: 1, name: "Personal Info", description: "Basic details",
icon: User }, { id: 2, name: "Address", description: "Location info", icon:
MapPin }, { id: 3, name: "Preferences", description: "Customization", icon:
Settings }, { id: 4, name: "Review", description: "Final check", icon: FileCheck
}, ];

// ============================================================================
// COMPONENTS //
============================================================================

function SidebarStep({ step, currentStep, }: { step: (typeof STEPS)[0];
currentStep: number; }) { const Icon = step.icon; const isCompleted =
currentStep > step.id; const isCurrent = currentStep === step.id;

return (
<div className="relative flex items-center gap-4 py-4"> {/* Vertical Line */}
{step.id !== STEPS.length && (
<div className="absolute left-6 top-10 h-full w-[2px] bg-border/30"> <motion.div
className="h-full w-full bg-primary" initial={{ height: "0%" }} animate={{
height: isCompleted ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
</div> )}

      {/* Icon Bubble */}
      <motion.div
        className={cn(
          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
          isCompleted
            ? "border-primary bg-primary text-primary-foreground"
            : isCurrent
              ? "border-primary bg-background text-primary shadow-[0_0_0_4px_rgba(var(--primary),0.1)]"
              : "border-border/50 bg-background/50 text-muted-foreground"
        )}
        whileHover={{ scale: 1.05 }}
      >
        {isCompleted ? (
          <Check className="h-5 w-5" strokeWidth={3} />
        ) : (
          <Icon className="h-5 w-5" />
        )}
      </motion.div>

      {/* Text Info */}
      <div className="flex flex-col">
        <span
          className={cn(
            "text-sm font-semibold transition-colors duration-300",
            isCurrent || isCompleted
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {step.name}
        </span>
        <span className="text-xs text-muted-foreground/70">
          {step.description}
        </span>
      </div>
    </div>

); }

function InputField({ label, placeholder, type = "text", }: { label: string;
placeholder: string; type?: string; }) { return (
<div className="space-y-2"> <Label htmlFor={label.toLowerCase().replace(/\s/g,
"-")} className="text-sm font-medium" > {label}
<span className="text-destructive">*</span>
</Label> <Input id={label.toLowerCase().replace(/\s/g, "-")} type={type}
placeholder={placeholder} className="rounded-lg border-border/40
bg-background/40 backdrop-blur transition-all focus:border-primary/50
focus:bg-background/60" />
</div> ); }

function ReviewItem({ label, value }: { label: string; value: string }) { return
(
<div className="flex items-center justify-between rounded-lg border border-border/20 bg-background/40 p-3 backdrop-blur transition-colors hover:bg-background/60">
<dt className="text-sm text-muted-foreground">{label}</dt>
<dd className="text-sm font-medium text-foreground">{value}</dd>
</div> ); }

// ============================================================================
// MAIN COMPONENT //
============================================================================

export function WizardForm() { const [currentStep, setCurrentStep] =
useState(1);

const handleNext = () => { if (currentStep < STEPS.length) {
setCurrentStep(currentStep + 1); } };

const handleBack = () => { if (currentStep > 1) { setCurrentStep(currentStep -
1); } };

return (
<div className="relative min-h-screen overflow-hidden bg-background p-6 lg:p-12 w-full">
<div className="mx-auto max-w-6xl"> {/* Header Section */}
<div className="mb-12 text-center">
<Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-2 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary backdrop-blur"
          >
<span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Wizard
Form
</Badge>
<h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
Account Setup
</h1>
<p className="text-muted-foreground"> Complete the steps below to verify your
profile
</p>
</div>

        {/* Main Card Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl"
        >
          {/* Glass Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

          <div className="grid lg:grid-cols-[320px_1fr]">
            {/* Left Sidebar - Steps */}
            <div className="border-b border-border/40 bg-background/30 p-8 lg:border-b-0 lg:border-r">
              <div className="space-y-1">
                {STEPS.map((step) => (
                  <SidebarStep
                    key={step.id}
                    step={step}
                    currentStep={currentStep}
                  />
                ))}
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex flex-col p-8 lg:p-12">
              <div className="flex-1">
                <motion.div
                  key={currentStep}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  {/* Step Header */}
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      {STEPS[currentStep - 1].name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {STEPS[currentStep - 1].description}
                    </p>
                  </div>

                  {/* Form Content */}
                  <div className="min-h-[300px]">
                    {currentStep === 1 && (
                      <div className="grid gap-6 md:grid-cols-2">
                        <InputField label="First Name" placeholder="John" />
                        <InputField label="Last Name" placeholder="Doe" />
                        <InputField
                          label="Email"
                          placeholder="john@example.com"
                          type="email"
                        />
                        <InputField
                          label="Phone"
                          placeholder="+1 (555) 000-0000"
                          type="tel"
                        />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <InputField
                          label="Street Address"
                          placeholder="123 Main St"
                        />
                        <div className="grid gap-6 md:grid-cols-3">
                          <InputField label="City" placeholder="New York" />
                          <InputField label="State" placeholder="NY" />
                          <InputField label="ZIP Code" placeholder="10001" />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <Label className="text-base">
                            Notification Method
                          </Label>
                          <div className="grid gap-4 sm:grid-cols-3">
                            {["Email", "SMS", "Both"].map((option) => (
                              <label
                                key={option}
                                className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-border/40 bg-background/40 p-4 text-center transition-all hover:border-primary/50 hover:bg-background/60 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                              >
                                <input
                                  type="radio"
                                  name="notification"
                                  className="sr-only"
                                />
                                <span className="text-sm font-medium">
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-base">Theme Preference</Label>
                          <div className="grid gap-4 sm:grid-cols-3">
                            {["Auto", "Light", "Dark"].map((option) => (
                              <label
                                key={option}
                                className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-border/40 bg-background/40 p-4 text-center transition-all hover:border-primary/50 hover:bg-background/60 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                              >
                                <input
                                  type="radio"
                                  name="theme"
                                  className="sr-only"
                                />
                                <span className="text-sm font-medium">
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="rounded-xl border border-border/40 bg-background/20 p-6">
                          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Personal Information
                          </h3>
                          <div className="grid gap-3">
                            <ReviewItem label="Full Name" value="John Doe" />
                            <ReviewItem
                              label="Email Address"
                              value="john@example.com"
                            />
                            <ReviewItem
                              label="Phone Number"
                              value="+1 (555) 000-0000"
                            />
                          </div>
                        </div>

                        <div className="rounded-xl border border-border/40 bg-background/20 p-6">
                          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Address Details
                          </h3>
                          <div className="grid gap-3">
                            <ReviewItem label="Street" value="123 Main St" />
                            <ReviewItem
                              label="Location"
                              value="New York, NY 10001"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Footer / Navigation */}
              <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-8">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="gap-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="gap-2 rounded-full bg-primary px-8 hover:bg-primary/90"
                >
                  {currentStep === STEPS.length ? (
                    <>
                      Submit
                      <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next Step
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

); }

"use client";

import { AnimatePresence, motion, useReducedMotion, type Transition, type
Variants, } from "framer-motion"; import { ArrowUpRight, Sparkles } from
"lucide-react"; import { useId, useMemo, useState } from "react";

const previewHighlights = [ { label: "Owner", value: "Avery Nolan" }, { label:
"Status", value: "Sprint ready" }, { label: "Last update", value: "4 hours ago"
}, ];

export function PreviewDetailsCard() { const [isActive, setIsActive] =
useState(false); const previewId = useId(); const descriptionId = useMemo(() =>
`${previewId}-description`, [previewId]); const shouldReduceMotion =
useReducedMotion();

const handleActivate = () => setIsActive(true); const handleDeactivate = () =>
setIsActive(false);

const flyoutVariants: Variants = useMemo( () => ({ hidden: { opacity: 0, y:
shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.96, }, visible: {
opacity: 1, y: 0, scale: 1, transition: shouldReduceMotion ? { duration: 0 } : {
duration: 0.28, ease: [0.19, 1, 0.22, 1] }, }, exit: { opacity: 0, y:
shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.95, transition:
shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 0.2, 1]
}, }, }), [shouldReduceMotion] );

const hoverMotion = shouldReduceMotion ? undefined : { scale: 1.02, y: -2 };
const hoverTransition = shouldReduceMotion ? { duration: 0 } : { type: "spring",
stiffness: 420, damping: 34, mass: 0.7 };

return ( <section aria-labelledby={`${previewId}-title`}
aria-describedby={descriptionId} className="" >
<div className="relative w-full"> <motion.a href="#" onClick={(event) =>
event.preventDefault()} onMouseEnter={handleActivate}
onMouseLeave={handleDeactivate} onFocus={handleActivate}
onBlur={handleDeactivate} className="group relative inline-flex w-full flex-col
gap-4 rounded-3xl border border-border/60 bg-card/80 px-7 py-6
text-[var(--muted-foreground)] backdrop-blur-2xl transition-colors duration-300
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
focus-visible:ring-offset-2 focus-visible:ring-offset-background
hover:border-border" layout whileHover={hoverMotion} transition={hoverTransition
as Transition} >
<div className="flex items-center justify-between text-xs uppercase tracking-[0.32em]">
<span className="inline-flex items-center gap-2 text-[var(--muted-foreground)]/70">
<span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
<Sparkles className="h-4 w-4 text-primary" aria-hidden />
</span> Workspace
</span>
<ArrowUpRight
              className="h-4 w-4 text-[var(--muted-foreground)]/70 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden
            />
</div>

          <div className="space-y-2 text-left">
            <h3
              id={`${previewId}-title`}
              className="text-xl font-semibold text-[var(--muted-foreground)] sm:text-2xl"
            >
              Preview Details Card
            </h3>
            <p
              id={descriptionId}
              className="text-sm leading-relaxed text-[var(--muted-foreground)]"
            >
              Hover or focus to surface key workspace traits before diving into
              the full view.
            </p>
          </div>

          <span className="sr-only">
            Focus or hover to reveal the workspace summary panel that lists
            owner, status, and freshness details.
          </span>

          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                key="preview"
                id={previewId}
                variants={flyoutVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-5 text-sm text-[var(--muted-foreground)] shadow-[0_25px_70px_-20px_rgba(15,23,42,0.5)]"
                role="region"
                aria-live="polite"
              >
                <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.36em] text-[var(--muted-foreground)]/70">
                  Preview
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-[0.65rem] font-semibold text-primary/85">
                    instant
                  </span>
                </div>
                <ul className="space-y-3">
                  {previewHighlights.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between gap-3 text-sm text-[var(--muted-foreground)]/80"
                    >
                      <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]/70">
                        {item.label}
                      </span>
                      <span className="font-medium text-[var(--muted-foreground)]">
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>
      </div>
    </section>

); }

"use client";

import { AnimatePresence, motion } from "framer-motion"; import { useEffect,
useState } from "react";

type AIUnlockAnimationProps = { autoPlay?: boolean; };

export function AIUnlockAnimation({ autoPlay = true }: AIUnlockAnimationProps) {
const [isUnlocking, setIsUnlocking] = useState(false); const [isComplete,
setIsComplete] = useState(false);

// Auto-start if autoplay is enabled useEffect(() => { if (autoPlay) {
setIsUnlocking(true); setIsComplete(false); const timer = setTimeout(() => {
setIsComplete(true); }, 3000); return () => clearTimeout(timer); } },
[autoPlay]);

const triggerUnlock = () => { setIsUnlocking(true); setIsComplete(false);
setTimeout(() => { setIsComplete(true); }, 3000); };

const resetAnimation = () => { setIsUnlocking(false); setIsComplete(false); };

// Generate minimal particles const particles = Array.from({ length: 24 }, (_,
i) => ({ id: i, angle: (Math.PI * 2 * i) / 24, delay: Math.random() * 0.3,
duration: 1.2 + Math.random() * 0.5, }));

return (
<div className="relative w-full max-w-md"> {/* Main content card _/} <motion.div
className="relative bg-card border border-border rounded-2xl p-16 shadow-sm"
animate={ isUnlocking ? { boxShadow: [ "0 1px 3px 0 rgb(0 0 0 / 0.1)", "0 0 0
4px rgb(0 0 0 / 0.05)", "0 1px 3px 0 rgb(0 0 0 / 0.1)", ], } : {} }
transition={{ duration: 1.5, ease: "easeInOut" }} > {/_ Ripple effects */}
<AnimatePresence> {isUnlocking && ( <> {[0, 0.2, 0.4].map((delay, i) => (
<motion.div key={i} className="absolute inset-0 rounded-2xl border
border-foreground z-0" initial={{ scale: 1, opacity: 0.3 }} style={{ zIndex: -1
}} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }} transition={{
duration: 1.5, delay, ease: "easeOut" }} /> ))} </> )}
</AnimatePresence>

        {/* Particle system */}
        <AnimatePresence>
          {isUnlocking &&
            particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-0.5 h-0.5 bg-foreground rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(particle.angle) * 200,
                  y: Math.sin(particle.angle) * 200,
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeOut",
                }}
              />
            ))}
        </AnimatePresence>

        {/* AI Icon */}
        <div className="relative z-10 flex flex-col items-center space-y-8">
          <motion.div
            className="relative"
            animate={
              isUnlocking
                ? {
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Minimal rings */}
            <AnimatePresence>
              {isUnlocking && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-foreground"
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-border"
                    initial={{ scale: 1, opacity: 0.3 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, repeat: Infinity }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* AI Icon - Simple circle with sparkle */}
            <motion.div
              className="relative w-20 h-20 rounded-full border-2 border-foreground bg-card flex items-center justify-center"
              animate={
                isUnlocking
                  ? {
                      borderColor: [
                        "hsl(var(--foreground))",
                        "hsl(var(--muted-foreground))",
                        "hsl(var(--foreground))",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: isUnlocking ? Infinity : 0 }}
            >
              <svg
                className="w-9 h-9 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Text animations */}
          <div className="text-center space-y-4">
            <AnimatePresence mode="wait">
              {!isUnlocking && !isComplete && (
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl font-semibold text-foreground"
                >
                  Unlock Lifetime Access
                </motion.h2>
              )}

              {isUnlocking && !isComplete && (
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-semibold text-foreground"
                >
                  Activating...
                </motion.h2>
              )}

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <motion.h2
                    className="text-2xl font-semibold text-foreground"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 0.4 }}
                  >
                    Unlocked
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-muted-foreground"
                  >
                    Premium features activated
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Minimal loading bar */}
            {isUnlocking && !isComplete && (
              <motion.div
                className="w-48 h-px bg-border overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-full bg-foreground"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.8, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            {!isUnlocking && !isComplete && (
              <motion.button
                onClick={triggerUnlock}
                className="px-6 py-2 bg-foreground text-background text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Activate
              </motion.button>
            )}

            {isComplete && (
              <motion.button
                onClick={resetAnimation}
                className="px-6 py-2 border border-border text-foreground text-sm font-medium rounded-md hover:bg-accent transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Replay
              </motion.button>
            )}
          </div>
        </div>

        {/* Corner accents - minimal */}
        <AnimatePresence>
          {isUnlocking && (
            <>
              {["top-left", "top-right", "bottom-left", "bottom-right"].map(
                (corner, i) => (
                  <motion.div
                    key={corner}
                    className={`absolute w-8 h-8 border-foreground ${
                      corner === "top-left"
                        ? "top-0 left-0 border-t border-l"
                        : corner === "top-right"
                          ? "top-0 right-0 border-t border-r"
                          : corner === "bottom-left"
                            ? "bottom-0 left-0 border-b border-l"
                            : "bottom-0 right-0 border-b border-r"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1, 1] }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                  />
                )
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>

); }

Install the @efferd/not-found-2 block into this project.

Steps:

1. Install the shadcn skill if missing: npx skills add shadcn/ui
2. Ensure this is a shadcn project (has components.json). If not, run: npx
   shadcn@latest init
3. Add the @efferd registry to components.json (if missing): { "registries": {
   "@efferd": "https://efferd.com/r/{style}/{name}.json" } }
4. Run: npx shadcn@latest add @efferd/not-found-2

After install, summarize what was added and any next steps.

"use client";

import { Choicebox, ChoiceboxIndicator, ChoiceboxItem, ChoiceboxItemDescription,
ChoiceboxItemHeader, ChoiceboxItemTitle, } from
"@/components/kibo-ui/choicebox"; import { Combobox, ComboboxContent,
ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList,
ComboboxTrigger, } from "@/components/kibo-ui/combobox"; import { Dropzone,
DropzoneContent, DropzoneEmptyState } from "@/components/kibo-ui/dropzone";
import { MiniCalendar, MiniCalendarDay, MiniCalendarDays,
MiniCalendarNavigation, } from "@/components/kibo-ui/mini-calendar"; import {
Button } from "@/components/ui/button"; import { Input } from
"@/components/ui/input"; import { Label } from "@/components/ui/label"; import {
Textarea } from "@/components/ui/textarea"; import { Tags, TagsContent,
TagsEmpty, TagsGroup, TagsInput, TagsItem, TagsList, TagsTrigger, TagsValue, }
from "@/components/kibo-ui/tags"; import { CalendarIcon, ImageIcon, InfoIcon,
MapPinIcon, TagIcon, UsersIcon, } from "lucide-react"; import { type
FormEventHandler, useState } from "react"; import { toast } from "sonner";

const eventTypes = [ { value: "conference", label: "Conference", description:
"Professional gathering with speakers and networking", }, { value: "workshop",
label: "Workshop", description: "Hands-on learning experience with practical
activities", }, { value: "meetup", label: "Meetup", description: "Casual
gathering for like-minded individuals", }, { value: "webinar", label: "Webinar",
description: "Online presentation or seminar via video conference", }, ];

const venues = [ { value: "convention-center", label: "Downtown Convention
Center" }, { value: "hotel-ballroom", label: "Grand Hotel Ballroom" }, { value:
"university-hall", label: "University Main Hall" }, { value: "co-working-space",
label: "Tech Hub Co-working Space" }, { value: "online", label: "Online/Virtual"
}, ];

const availableTags = [ "Technology", "Business", "Marketing", "Design",
"Development", "AI/ML", "Startup", "Networking", "Education", "Innovation",
"Remote Work", "Leadership", ];

const Example = () => { const [eventType, setEventType] = useState(""); const
[venue, setVenue] = useState(""); const [selectedDate, setSelectedDate] =
useState<Date | undefined>(); const [files, setFiles] = useState<File[]>([]);
const [selectedTags, setSelectedTags] = useState<string[]>([]);

const handleTagSelect = (tag: string) => { if (!selectedTags.includes(tag)) {
setSelectedTags([...selectedTags, tag]); } };

const handleTagRemove = (tagToRemove: string) => {
setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove)); };

const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
event.preventDefault();

    toast.success("Event created successfully", {
      description: `${eventType} event created for ${selectedDate?.toLocaleDateString()} at ${venue}`,
    });

};

return (
<div className="not-prose mx-auto max-w-[530px] p-8">
<div className="mb-8 text-center">
<h1 className="mb-2 font-semibold text-3xl tracking-tight"> Create Your Event
</h1>
<p className="text-balance text-muted-foreground"> Fill out the form below to
create and customize your upcoming event
</p>
</div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <InfoIcon className="size-5" />
            Basic Information
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                placeholder="Enter your event name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Input
                id="organizer"
                placeholder="Your name or organization"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your event in detail..."
              rows={3}
            />
          </div>
        </div>

        {/* Event Type Selection */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <UsersIcon className="size-5" />
            Event Type
          </h2>
          <Choicebox onValueChange={setEventType} value={eventType}>
            {eventTypes.map((type) => (
              <ChoiceboxItem key={type.value} value={type.value}>
                <ChoiceboxItemHeader>
                  <ChoiceboxItemTitle>{type.label}</ChoiceboxItemTitle>
                  <ChoiceboxItemDescription>
                    {type.description}
                  </ChoiceboxItemDescription>
                </ChoiceboxItemHeader>
                <ChoiceboxIndicator />
              </ChoiceboxItem>
            ))}
          </Choicebox>
        </div>

        {/* Venue Selection */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <MapPinIcon className="size-5" />
            Venue
          </h2>
          <Combobox
            data={venues}
            onValueChange={setVenue}
            type="venue"
            value={venue}
          >
            <ComboboxTrigger className="w-full" />
            <ComboboxContent>
              <ComboboxInput />
              <ComboboxList>
                <ComboboxEmpty />
                <ComboboxGroup>
                  {venues.map((venue) => (
                    <ComboboxItem key={venue.value} value={venue.value}>
                      {venue.label}
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <CalendarIcon className="size-5" />
            Select Date
          </h2>
          <MiniCalendar
            className="w-fit"
            days={7}
            onValueChange={setSelectedDate}
            value={selectedDate}
          >
            <MiniCalendarNavigation direction="prev" />
            <MiniCalendarDays>
              {(date) => (
                <MiniCalendarDay date={date} key={date.toISOString()} />
              )}
            </MiniCalendarDays>
            <MiniCalendarNavigation direction="next" />
          </MiniCalendar>
        </div>

        {/* Tags Selection */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <TagIcon className="size-5" />
            Event Tags
          </h2>
          <Tags>
            <TagsTrigger>
              {selectedTags.map((tag) => (
                <TagsValue key={tag} onRemove={() => handleTagRemove(tag)}>
                  {tag}
                </TagsValue>
              ))}
            </TagsTrigger>
            <TagsContent>
              <TagsInput placeholder="Search tags..." />
              <TagsList>
                <TagsEmpty>No tags found.</TagsEmpty>
                <TagsGroup>
                  {availableTags
                    .filter((tag) => !selectedTags.includes(tag))
                    .map((tag) => (
                      <TagsItem key={tag} onSelect={() => handleTagSelect(tag)}>
                        {tag}
                      </TagsItem>
                    ))}
                </TagsGroup>
              </TagsList>
            </TagsContent>
          </Tags>
        </div>

        {/* File Upload */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl">
            <ImageIcon className="size-5" />
            Event Images
          </h2>
          <Dropzone
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
            }}
            maxFiles={5}
            maxSize={5 * 1024 * 1024} // 5MB
            onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
          {files.length > 0 && (
            <div className="text-muted-foreground text-sm">
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </div>

); };

export default Example;

"use client";

import { faker } from "@faker-js/faker"; import { CalendarBody, CalendarDate,
CalendarDatePagination, CalendarDatePicker, CalendarHeader, CalendarItem,
CalendarMonthPicker, CalendarProvider, CalendarYearPicker, } from
"@/components/kibo-ui/calendar";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const statuses = [ { id: faker.string.uuid(), name: "Planned", color: "#6B7280"
}, { id: faker.string.uuid(), name: "In Progress", color: "#F59E0B" }, { id:
faker.string.uuid(), name: "Done", color: "#10B981" }, ];

const exampleFeatures = Array.from({ length: 20 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: capitalize(faker.company.buzzPhrase()), startAt:
faker.date.past({ years: 0.5, refDate: new Date() }), endAt: faker.date.future({
years: 0.5, refDate: new Date() }), status:
faker.helpers.arrayElement(statuses), }));

const earliestYear = exampleFeatures .map((feature) =>
feature.startAt.getFullYear()) .sort() .at(0) ?? new Date().getFullYear();

const latestYear = exampleFeatures .map((feature) =>
feature.endAt.getFullYear()) .sort() .at(-1) ?? new Date().getFullYear();

const Example = () => (
<CalendarProvider>
<CalendarDate>
<CalendarDatePicker>
<CalendarMonthPicker />
<CalendarYearPicker end={latestYear} start={earliestYear} />
</CalendarDatePicker>
<CalendarDatePagination />
</CalendarDate>
<CalendarHeader />
<CalendarBody features={exampleFeatures}> {({ feature }) =>
<CalendarItem feature={feature} key={feature.id} />}
</CalendarBody>
</CalendarProvider> );

export default Example;

"use client";

import { faker } from "@faker-js/faker"; import { KanbanBoard, KanbanCard,
KanbanCards, KanbanHeader, KanbanProvider, } from "@/components/kibo-ui/kanban";
import { useState } from "react"; import { Avatar, AvatarFallback, AvatarImage }
from "@/components/ui/avatar";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const columns = [ { id: faker.string.uuid(), name: "Planned", color: "#6B7280"
}, { id: faker.string.uuid(), name: "In Progress", color: "#F59E0B" }, { id:
faker.string.uuid(), name: "Done", color: "#10B981" }, ];

const users = Array.from({ length: 4 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: faker.person.fullName(), image: faker.image.avatar(),
}));

const exampleFeatures = Array.from({ length: 20 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: capitalize(faker.company.buzzPhrase()), startAt:
faker.date.past({ years: 0.5, refDate: new Date() }), endAt: faker.date.future({
years: 0.5, refDate: new Date() }), column:
faker.helpers.arrayElement(columns).id, owner:
faker.helpers.arrayElement(users), }));

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day:
"numeric", year: "numeric", });

const shortDateFormatter = new Intl.DateTimeFormat("en-US", { month: "short",
day: "numeric", });

const Example = () => { const [features, setFeatures] =
useState(exampleFeatures);

return (
<KanbanProvider
      columns={columns}
      data={features}
      onDataChange={setFeatures}
    > {(column) => (
<KanbanBoard id={column.id} key={column.id}>
<KanbanHeader>
<div className="flex items-center gap-2"> <div className="h-2 w-2 rounded-full"
style={{ backgroundColor: column.color }} />
<span>{column.name}</span>
</div>
</KanbanHeader>
<KanbanCards id={column.id}> {(feature: (typeof features)[number]) => (
<KanbanCard
                column={column.id}
                id={feature.id}
                key={feature.id}
                name={feature.name}
              >
<div className="flex items-start justify-between gap-2">
<div className="flex flex-col gap-1">
<p className="m-0 flex-1 font-medium text-sm"> {feature.name}
</p>
</div> {feature.owner && (
<Avatar className="h-4 w-4 shrink-0">
<AvatarImage src={feature.owner.image} />
<AvatarFallback> {feature.owner.name?.slice(0, 2)}
</AvatarFallback>
</Avatar> )}
</div>
<p className="m-0 text-muted-foreground text-xs">
{shortDateFormatter.format(feature.startAt)} -{" "}
{dateFormatter.format(feature.endAt)}
</p>
</KanbanCard> )}
</KanbanCards>
</KanbanBoard> )}
</KanbanProvider> ); };

export default Example;

"use client";

import { faker } from "@faker-js/faker"; import type { DragEndEvent } from
"@/components/kibo-ui/list"; import { ListGroup, ListHeader, ListItem,
ListItems, ListProvider, } from "@/components/kibo-ui/list"; import { useState }
from "react"; import { Avatar, AvatarFallback, AvatarImage } from
"@/components/ui/avatar";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const statuses = [ { id: faker.string.uuid(), name: "Planned", color: "#6B7280"
}, { id: faker.string.uuid(), name: "In Progress", color: "#F59E0B" }, { id:
faker.string.uuid(), name: "Done", color: "#10B981" }, ];

const users = Array.from({ length: 4 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: faker.person.fullName(), image: faker.image.avatar(),
}));

const exampleFeatures = Array.from({ length: 20 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: capitalize(faker.company.buzzPhrase()), startAt:
faker.date.past({ years: 0.5, refDate: new Date() }), endAt: faker.date.future({
years: 0.5, refDate: new Date() }), status:
faker.helpers.arrayElement(statuses), owner: faker.helpers.arrayElement(users),
}));

const Example = () => { const [features, setFeatures] =
useState(exampleFeatures);

const handleDragEnd = (event: DragEndEvent) => { const { active, over } = event;

    if (!over) {
      return;
    }

    const status = statuses.find((status) => status.name === over.id);

    if (!status) {
      return;
    }

    setFeatures(
      features.map((feature) => {
        if (feature.id === active.id) {
          return { ...feature, status };
        }

        return feature;
      })
    );

};

return (
<ListProvider onDragEnd={handleDragEnd}> {statuses.map((status) => (
<ListGroup id={status.name} key={status.name}>
<ListHeader color={status.color} name={status.name} />
<ListItems> {features .filter((feature) => feature.status.name === status.name)
.map((feature, index) => (
<ListItem
                  id={feature.id}
                  index={index}
                  key={feature.id}
                  name={feature.name}
                  parent={feature.status.name}
                > <div className="h-2 w-2 shrink-0 rounded-full" style={{
backgroundColor: feature.status.color }} />
<p className="m-0 flex-1 font-medium text-sm"> {feature.name}
</p> {feature.owner && (
<Avatar className="h-4 w-4 shrink-0">
<AvatarImage src={feature.owner.image} />
<AvatarFallback> {feature.owner.name?.slice(0, 2)}
</AvatarFallback>
</Avatar> )}
</ListItem> ))}
</ListItems>
</ListGroup> ))}
</ListProvider> ); };

export default Example;

"use client";

import { faker } from "@faker-js/faker"; import { Avatar, AvatarFallback,
AvatarImage, } from "@/components/ui/avatar"; import type { ColumnDef } from
"@/components/kibo-ui/table"; import { TableBody, TableCell, TableColumnHeader,
TableHead, TableHeader, TableHeaderGroup, TableProvider, TableRow, } from
"@/components/kibo-ui/table"; import { ChevronRightIcon } from "lucide-react";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const statuses = [ { id: faker.string.uuid(), name: "Planned", color: "#6B7280"
}, { id: faker.string.uuid(), name: "In Progress", color: "#F59E0B" }, { id:
faker.string.uuid(), name: "Done", color: "#10B981" }, ];

const users = Array.from({ length: 4 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: faker.person.fullName(), image: faker.image.avatar(),
}));

const exampleGroups = Array.from({ length: 6 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: capitalize(faker.company.buzzPhrase()), }));

const exampleProducts = Array.from({ length: 4 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: capitalize(faker.company.buzzPhrase()), }));

const exampleInitiatives = Array.from({ length: 2 }) .fill(null) .map(() => ({
id: faker.string.uuid(), name: capitalize(faker.company.buzzPhrase()), }));

const exampleReleases = Array.from({ length: 3 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: capitalize(faker.company.buzzPhrase()), }));

const exampleFeatures = Array.from({ length: 20 }) .fill(null) .map(() => ({ id:
faker.string.uuid(), name: capitalize(faker.company.buzzPhrase()), startAt:
faker.date.past({ years: 0.5, refDate: new Date() }), endAt: faker.date.future({
years: 0.5, refDate: new Date() }), status:
faker.helpers.arrayElement(statuses), owner: faker.helpers.arrayElement(users),
group: faker.helpers.arrayElement(exampleGroups), product:
faker.helpers.arrayElement(exampleProducts), initiative:
faker.helpers.arrayElement(exampleInitiatives), release:
faker.helpers.arrayElement(exampleReleases), }));

const Example = () => { const columns: ColumnDef<(typeof
exampleFeatures)[number]>[] = [ { accessorKey: "name", header: ({ column }) => (
<TableColumnHeader column={column} title="Name" /> ), cell: ({ row }) => (
<div className="flex items-center gap-2">
<div className="relative">
<Avatar className="size-6">
<AvatarImage src={row.original.owner.image} />
<AvatarFallback> {row.original.owner.name?.slice(0, 2)}
</AvatarFallback>
</Avatar> <div className="absolute right-0 bottom-0 h-2 w-2 rounded-full ring-2
ring-background" style={{ backgroundColor: row.original.status.color, }} />
</div>
<div>
<span className="font-medium">{row.original.name}</span>
<div className="flex items-center gap-1 text-muted-foreground text-xs">
<span>{row.original.product.name}</span>
<ChevronRightIcon size={12} />
<span>{row.original.group.name}</span>
</div>
</div>
</div> ), }, { accessorKey: "startAt", header: ({ column }) => (
<TableColumnHeader column={column} title="Start At" /> ), cell: ({ row }) => new
Intl.DateTimeFormat("en-US", { dateStyle: "medium",
}).format(row.original.startAt), }, { accessorKey: "endAt", header: ({ column })
=> (
<TableColumnHeader column={column} title="End At" /> ), cell: ({ row }) => new
Intl.DateTimeFormat("en-US", { dateStyle: "medium",
}).format(row.original.endAt), }, { id: "release", accessorFn: (row) =>
row.release.id, header: ({ column }) => (
<TableColumnHeader column={column} title="Release" /> ), cell: ({ row }) =>
row.original.release.name, }, ];

return (
<TableProvider columns={columns} data={exampleFeatures}>
<TableHeader> {({ headerGroup }) => (
<TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id}> {({ header })
=> <TableHead header={header} key={header.id} />}
</TableHeaderGroup> )}
</TableHeader>
<TableBody> {({ row }) => (
<TableRow key={row.id} row={row}> {({ cell }) =>
<TableCell cell={cell} key={cell.id} />}
</TableRow> )}
</TableBody>
</TableProvider> ); };

export default Example;

import { Choicebox, ChoiceboxIndicator, ChoiceboxItem, ChoiceboxItemDescription,
ChoiceboxItemHeader, ChoiceboxItemSubtitle, ChoiceboxItemTitle, } from
"@/components/kibo-ui/choicebox";

const options = [ { id: "1", label: "Option 1", subtitle: "(the first option)",
description: "This is the first option", }, { id: "2", label: "Option 2",
subtitle: "(the second option)", description: "This is the second option", }, ];

const Example = () => (
<Choicebox defaultValue="1"> {options.map((option) => (
<ChoiceboxItem key={option.id} value={option.id}>
<ChoiceboxItemHeader>
<ChoiceboxItemTitle> {option.label}
<ChoiceboxItemSubtitle>{option.subtitle}</ChoiceboxItemSubtitle>
</ChoiceboxItemTitle>
<ChoiceboxItemDescription> {option.description}
</ChoiceboxItemDescription>
</ChoiceboxItemHeader>
<ChoiceboxIndicator />
</ChoiceboxItem> ))}
</Choicebox> );

export default Example;

"use client";

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput,
ComboboxItem, ComboboxList, ComboboxTrigger, } from
"@/components/kibo-ui/combobox";

const frameworks = [ { value: "next.js", label: "Next.js", }, { value:
"sveltekit", label: "SvelteKit", }, { value: "nuxt.js", label: "Nuxt.js", }, {
value: "remix", label: "Remix", }, { value: "astro", label: "Astro", }, { value:
"vite", label: "Vite", }, ];

const Example = () => ( <Combobox data={frameworks} onOpenChange={(open) =>
console.log("Combobox is open?", open)} onValueChange={(newValue) =>
console.log("Combobox value:", newValue)} type="framework"



    <ComboboxTrigger />
    <ComboboxContent>
      <ComboboxInput />
      <ComboboxEmpty />
      <ComboboxList>
        <ComboboxGroup>
          {frameworks.map((framework) => (
            <ComboboxItem key={framework.value} value={framework.value}>
              {framework.label}
            </ComboboxItem>
          ))}
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxContent>

</Combobox>
);

export default Example;

"use client";

import { Dropzone, DropzoneContent, DropzoneEmptyState } from
"@/components/kibo-ui/dropzone"; import { useState } from "react";

const Example = () => { const [files, setFiles] = useState<File[] |
undefined>();

const handleDrop = (files: File[]) => { console.log(files); setFiles(files); };

return ( <Dropzone accept={{ "image/*": [] }} maxFiles={10} maxSize={1024 *
1024 * 10} minSize={1024} onDrop={handleDrop} onError={console.error}
src={files} >
<DropzoneEmptyState />
<DropzoneContent />
</Dropzone> ); };

export default Example;

"use client";

import { MiniCalendar, MiniCalendarDay, MiniCalendarDays,
MiniCalendarNavigation, } from "@/components/kibo-ui/mini-calendar";

const Example = () => (
<MiniCalendar>
<MiniCalendarNavigation direction="prev" />
<MiniCalendarDays> {(date) =>
<MiniCalendarDay date={date} key={date.toISOString()} />}
</MiniCalendarDays>
<MiniCalendarNavigation direction="next" />
</MiniCalendar> );

export default Example;

"use client";

import { Tags, TagsContent, TagsEmpty, TagsGroup, TagsInput, TagsItem, TagsList,
TagsTrigger, TagsValue, } from "@/components/kibo-ui/tags"; import { CheckIcon }
from "lucide-react"; import { useState } from "react";

const tags = [ { id: "react", label: "React" }, { id: "typescript", label:
"TypeScript" }, { id: "javascript", label: "JavaScript" }, { id: "nextjs",
label: "Next.js" }, { id: "vuejs", label: "Vue.js" }, { id: "angular", label:
"Angular" }, { id: "svelte", label: "Svelte" }, { id: "nodejs", label: "Node.js"
}, { id: "python", label: "Python" }, { id: "ruby", label: "Ruby" }, { id:
"java", label: "Java" }, { id: "csharp", label: "C#" }, { id: "php", label:
"PHP" }, { id: "go", label: "Go" }, ];

const Example = () => { const [selected, setSelected] = useState<string[]>([]);

const handleRemove = (value: string) => { if (!selected.includes(value)) {
return; }

    console.log(`removed: ${value}`);
    setSelected((prev) => prev.filter((v) => v !== value));

};

const handleSelect = (value: string) => { if (selected.includes(value)) {
handleRemove(value); return; }

    console.log(`selected: ${value}`);
    setSelected((prev) => [...prev, value]);

};

return (
<Tags className="max-w-[300px]">
<TagsTrigger> {selected.map((tag) => ( <TagsValue key={tag} onRemove={() =>
handleRemove(tag)}> {tags.find((t) => t.id === tag)?.label}
</TagsValue> ))}
</TagsTrigger>
<TagsContent>
<TagsInput placeholder="Search tag..." />
<TagsList>
<TagsEmpty />
<TagsGroup> {tags.map((tag) => (
<TagsItem key={tag.id} onSelect={handleSelect} value={tag.id}> {tag.label}
{selected.includes(tag.id) && (
<CheckIcon className="text-muted-foreground" size={14} /> )}
</TagsItem> ))}
</TagsGroup>
</TagsList>
</TagsContent>
</Tags> ); };

export default Example;

"use client";

import { ImageCrop, ImageCropApply, ImageCropContent, ImageCropReset, } from
"@/components/kibo-ui/image-crop"; import { Button } from
"@/components/ui/button"; import { Input } from "@/components/ui/input"; import
{ XIcon } from "lucide-react"; import Image from "next/image"; import { type
ChangeEvent, useState } from "react";

const Example = () => { const [selectedFile, setSelectedFile] = useState<File |
null>(null); const [croppedImage, setCroppedImage] = useState<string |
null>(null);

const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => { const file
= event.target.files?.[0]; if (file) { setSelectedFile(file);
setCroppedImage(null); } };

const handleReset = () => { setSelectedFile(null); setCroppedImage(null); };

if (!selectedFile) { return (
<Input
        accept="image/*"
        className="w-fit max-w-full"
        onChange={handleFileChange}
        type="file"
      /> ); }

if (croppedImage) { return (
<div className="space-y-4">
<Image
          alt="Cropped"
          height={100}
          src={croppedImage}
          unoptimized
          width={100}
        />
<Button onClick={handleReset} size="icon" type="button" variant="ghost">
<XIcon className="size-4" />
</Button>
</div> ); }

return (
<div className="space-y-4"> <ImageCrop aspect={1} file={selectedFile}
maxImageSize={1024 * 1024} // 1MB onChange={console.log}
onComplete={console.log} onCrop={setCroppedImage} >
<ImageCropContent className="max-w-md" />
<div className="flex items-center gap-2">
<ImageCropApply />
<ImageCropReset />
<Button
            onClick={handleReset}
            size="icon"
            type="button"
            variant="ghost"
          >
<XIcon className="size-4" />
</Button>
</div>
</ImageCrop>
</div> ); };

export default Example;

"use client";

import { ImageZoom } from "@/components/kibo-ui/image-zoom"; import Image from
"next/image";

const Example = () => (
<ImageZoom>
<Image
      alt="Placeholder image"
      className="h-auto w-96"
      height={800}
      src="https://placehold.co/1200x800"
      unoptimized
      width={1200}
    />
</ImageZoom> );

export default Example;

import { CreditCard, CreditCardBack, CreditCardChip, CreditCardCvv,
CreditCardExpiry, CreditCardFlipper, CreditCardFront, CreditCardLogo,
CreditCardMagStripe, CreditCardName, CreditCardNumber,
CreditCardServiceProvider, } from "@/components/kibo-ui/credit-card"; import
type { HTMLAttributes } from "react";

const ChaseLogo = (props: HTMLAttributes<SVGElement>) => ( <svg viewBox="0 0
561.578 104.369" xmlns="http://www.w3.org/2000/svg" {...props}



    <title>Chase Logo</title>
    <path
      d="m494.525 0a3.69 3.69 0 0 0 -3.691 3.686v25.83h68.244l-31.078-29.508zm67.053 37.33a3.677 3.677 0 0 0 -3.688-3.68h-25.828v68.242l29.504-31.086zm-37.342 67.039a3.688 3.688 0 0 0 3.678-3.688v-25.827h-68.241l31.073 29.508zm-67.056-37.326a3.687 3.687 0 0 0 3.686 3.688h25.83v-68.247l-29.512 31.078z"
      fill="currentColor"
    />
    <path
      d="m144.379 12.453v31.514h-43.91v-31.514l-15.987-.006v79.461h15.987v-34.137h43.91v34.137h16.016v-79.455zm212.744 0v79.441l70.164-.004-8.891-13.98h-45.23v-20.139h43.797v-13.472h-43.797v-18.188h45.156l8.711-13.658zm-332.08-.01c-16.639 0-25.043 10.106-25.043 24.823v29.665c0 17.026 10.824 24.979 24.957 24.979l50.164-.01-9.293-14.521h-37.775c-8.021 0-11.515-2.899-11.515-11.881v-26.91c0-8.684 2.939-12.072 11.729-12.072h37.955l8.928-14.072zm261.904-.023c-9.613 0-19.451 5.771-19.451 20.625v3.816c0 15.475 9.476 21.389 18.949 21.432h33.275c3.455 0 6.264.572 6.264 6.416l-.004 6.754c-.086 5.236-2.711 6.447-6.379 6.447h-43.771l-8.967 13.979h53.762c12.972 0 21.773-6.447 21.773-21.353v-5.476c0-14.408-8.176-21.207-20.859-21.207h-31.77c-3.525 0-5.976-.967-5.976-6.184l-.004-5.492c0-4.443 1.688-6.066 5.791-6.066l41.683-.016 8.715-13.69-53.031.015m-80.084.045-37.679 79.435h17.811l7.338-16.405h40.941l7.315 16.405h17.882l-37.765-79.436zm7.896 16.488 14.479 33.021h-28.867z"
      fill="currentColor"
    />

</svg>
);

const ChaseMark = (props: HTMLAttributes<SVGElement>) => ( <svg fill="none"
viewBox="0 0 465 465" xmlns="http://www.w3.org/2000/svg" {...props}



    <title>Chase Mark</title>
    <path
      d="M166.497 0.188111C162.143 0.186928 157.966 1.91465 154.885 4.99158C151.804 8.0685 150.071 12.2429 150.066 16.5972V131.586H453.871L315.519 0.223725L166.497 0.188111ZM465 166.372C465.002 164.217 464.578 162.083 463.753 160.092C462.928 158.101 461.718 156.293 460.193 154.771C458.668 153.249 456.857 152.043 454.864 151.222C452.872 150.402 450.737 149.983 448.582 149.989H333.602V453.785L464.946 315.398L465 166.372ZM298.763 464.812C303.11 464.8 307.274 463.065 310.344 459.987C313.413 456.91 315.137 452.74 315.137 448.394V333.419H11.3453L149.674 464.781L298.763 464.812ZM0.247071 298.646C0.246486 300.802 0.670457 302.936 1.49478 304.928C2.31909 306.919 3.52763 308.729 5.05136 310.254C6.57509 311.778 8.38414 312.988 10.3753 313.813C12.3665 314.639 14.5007 315.064 16.6562 315.064H131.645V11.2462L0.264868 149.597L0.247071 298.646Z"
      fill="currentColor"
    />

</svg>
);

const Example = () => (
<CreditCard>
<CreditCardFlipper>
<CreditCardFront className="bg-[#063573]">
<ChaseLogo className="absolute top-0 left-0 h-1/12" />
<CreditCardLogo>
<ChaseMark className="text-[#0e72d1]" />
</CreditCardLogo>
<CreditCardChip />
<CreditCardServiceProvider
          className="brightness-0 invert"
          format="logo"
          type="Visa"
        />
<CreditCardName className="absolute bottom-0 left-0"> John R. Doe
</CreditCardName>
</CreditCardFront>
<CreditCardBack className="bg-[#063573]">
<CreditCardMagStripe />
<CreditCardNumber className="absolute bottom-0 left-0"> 0123 4567 8901 2345
</CreditCardNumber>
<div className="-translate-y-1/2 absolute top-1/2 flex gap-4">
<CreditCardExpiry>01/24</CreditCardExpiry>
<CreditCardCvv>123</CreditCardCvv>
</div>
</CreditCardBack>
</CreditCardFlipper>
</CreditCard> );

export default Example;

"use client";

import { Ticker, TickerIcon, TickerPrice, TickerPriceChange, TickerSymbol, }
from "@/components/kibo-ui/ticker"; import Image from "next/image";

const ticker = "GOOG";

const Example = () => (
<Ticker>
<TickerIcon asChild> <Image alt={ticker} height={26}
src={`https://img.logo.dev/ticker/${ticker}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=26&retina=true`}
width={26} />
</TickerIcon>
<TickerSymbol symbol={ticker} />
<TickerPrice price={175.41} />
<TickerPriceChange change={2.13} />
</Ticker> );

export default Example;

"use client";

import { Announcement, AnnouncementTag, AnnouncementTitle, } from
"@/components/kibo-ui/announcement"; import { ArrowUpRightIcon } from
"lucide-react";

const Example = () => (
<Announcement>
<AnnouncementTag>Latest update</AnnouncementTag>
<AnnouncementTitle> New feature added
<ArrowUpRightIcon className="shrink-0 text-muted-foreground" size={16} />
</AnnouncementTitle>
</Announcement> );

export default Example;

"use client";

import { Banner, BannerAction, BannerClose, BannerIcon, BannerTitle, } from
"@/components/kibo-ui/banner"; import { CircleAlert } from "lucide-react";

const Example = () => (
<Banner>
<BannerIcon icon={CircleAlert} />
<BannerTitle>Important message</BannerTitle>
<BannerAction>Learn more</BannerAction>
<BannerClose />
</Banner> );

export default Example;

"use client";

import "@/components/kibo-ui/typography"; import Image from "next/image";

const Example = () => (

<div className="size-full overflow-y-auto">
    <div className="typography">
      <h1>Styling the Web: A Modern CSS Journey</h1>

      <p>
        CSS has come a long way since its inception. From simple layout tweaks
        to complex responsive designs, it's become an essential tool for
        crafting delightful web experiences. In this article, we’ll explore
        various HTML elements commonly styled with modern CSS utility systems
        like <code>tailwindcss</code>
        and component libraries.
      </p>

      <h2>Introduction</h2>
      <p>
        Web design today is more accessible than ever. Thanks to utility-first
        frameworks and component-based architectures, developers can build
        beautiful UIs with less effort.
      </p>

      <h3>Key Benefits of Utility CSS</h3>
      <ul>
        <li>Faster development</li>
        <li>Consistent design system</li>
        <li>Better collaboration between dev and design</li>
      </ul>

      <h3>What You Need</h3>
      <ol>
        <li>Basic HTML/CSS knowledge</li>
        <li>Code editor (e.g., VS Code)</li>
        <li>Modern browser for testing</li>
      </ol>

      <h2>Checklist</h2>
      <ul>
        <li>
          <input checked disabled type="checkbox" /> <p>Install Tailwind CSS</p>
        </li>
        <li>
          <input disabled type="checkbox" /> <p>Configure PostCSS</p>
        </li>
        <li>
          <input disabled type="checkbox" /> <p>Create base components</p>
        </li>
      </ul>

      <h2>Sample Image</h2>
      <p>
        Here's a sample image to test image styling. Make sure it scales well on
        all screen sizes.
      </p>
      <center>
        <Image
          alt="Cute kitten"
          height={400}
          src="https://placehold.co/600x400"
          unoptimized
          width={600}
        />
      </center>

      <h2>Code Example</h2>
      <pre>
        <code>{`/* Tailwind example */

.button { @apply px-4 py-2 bg-blue-600 text-white rounded; }`}</code>
</pre>

      <h2>Blockquote</h2>
      <blockquote>
        "Design is not just what it looks like and feels like. Design is how it
        works." — Steve Jobs
      </blockquote>

      <h2>Table Example</h2>
      <table>
        <thead>
          <tr>
            <th>Framework</th>
            <th>Type</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tailwind CSS</td>
            <td>Utility-First</td>
            <td>70k+</td>
          </tr>
          <tr>
            <td>Bootstrap</td>
            <td>Component-Based</td>
            <td>160k+</td>
          </tr>
          <tr>
            <td>Bulma</td>
            <td>Utility/Component Hybrid</td>
            <td>45k+</td>
          </tr>
        </tbody>
      </table>

      <h2>Inline Elements</h2>
      <p>
        You can <strong>bold</strong> text, <em>italicize</em> it,{" "}
        <u>underline</u> it, or even add <a href="https://example.com">links</a>
        . Here’s some <code>inline code</code> too.
      </p>

      <h2>Definition List</h2>
      <dl>
        <dt>CSS</dt>
        <dd>Cascading Style Sheets</dd>
        <dt>HTML</dt>
        <dd>HyperText Markup Language</dd>
        <dt>JS</dt>
        <dd>JavaScript</dd>
      </dl>

      <h2>Details and Summary</h2>
      <details>
        <summary>Click to expand additional info</summary>
        <p>
          Utility CSS simplifies the process of managing and scaling CSS in
          large projects.
        </p>
      </details>

      <h2>Inline Elements</h2>
      <p>
        You can <strong>bold</strong> text, <em>italicize</em> it,{" "}
        <u>underline</u> it, or even add <a href="https://example.com">links</a>
        . Here’s some <code>inline code</code> too.{" "}
        <mark>Highlight important info</mark> and <small>small text size</small>
        . <abbr title="HyperText Markup Language">HTML</abbr> is the foundation
        of the web.
      </p>

      <h2>Superscript & Subscript</h2>
      <p>
        E = mc<sup>2</sup> is Einstein's mass-energy equivalence. Water is H
        <sub>2</sub>O.
      </p>

      <h2>Conclusion</h2>
      <p>
        Whether you're using Tailwind, vanilla CSS, or any other system, a solid
        understanding of how HTML elements behave is key to great styling. Test
        extensively to ensure consistent, accessible results across devices.
      </p>
    </div>

</div>
);

export default Example;

"use client";

import { DialogStack, DialogStackBody, DialogStackContent,
DialogStackDescription, DialogStackFooter, DialogStackHeader, DialogStackNext,
DialogStackOverlay, DialogStackPrevious, DialogStackTitle, DialogStackTrigger, }
from "@/components/kibo-ui/dialog-stack"; import { Button } from
"@/components/ui/button";

const Example = () => (
<DialogStack>
<DialogStackTrigger asChild>
<Button variant="outline">Show me</Button>
</DialogStackTrigger>
<DialogStackOverlay />

    <DialogStackBody>
      <DialogStackContent>
        <DialogStackHeader>
          <DialogStackTitle>I'm the first dialog</DialogStackTitle>
          <DialogStackDescription>
            With a fancy description
          </DialogStackDescription>
        </DialogStackHeader>
        <DialogStackFooter className="justify-end">
          <DialogStackNext asChild>
            <Button variant="outline">Next</Button>
          </DialogStackNext>
        </DialogStackFooter>
      </DialogStackContent>

      <DialogStackContent>
        <DialogStackHeader>
          <DialogStackTitle>I'm the second dialog</DialogStackTitle>
          <DialogStackDescription>
            With a fancy description
          </DialogStackDescription>
        </DialogStackHeader>
        <DialogStackFooter className="justify-between">
          <DialogStackPrevious asChild>
            <Button variant="outline">Previous</Button>
          </DialogStackPrevious>
          <DialogStackNext asChild>
            <Button variant="outline">Next</Button>
          </DialogStackNext>
        </DialogStackFooter>
      </DialogStackContent>

      <DialogStackContent>
        <DialogStackHeader>
          <DialogStackTitle>I'm the third dialog</DialogStackTitle>
          <DialogStackDescription>
            With a fancy description
          </DialogStackDescription>
        </DialogStackHeader>
        <DialogStackFooter className="justify-between">
          <DialogStackPrevious asChild>
            <Button variant="outline">Previous</Button>
          </DialogStackPrevious>
        </DialogStackFooter>
      </DialogStackContent>
    </DialogStackBody>

</DialogStack>
);

export default Example;

"use client";

import type { Editor, JSONContent } from "@/components/kibo-ui/editor"; import {
EditorBubbleMenu, EditorCharacterCount, EditorClearFormatting,
EditorFloatingMenu, EditorFormatBold, EditorFormatCode, EditorFormatItalic,
EditorFormatStrike, EditorFormatSubscript, EditorFormatSuperscript,
EditorFormatUnderline, EditorLinkSelector, EditorNodeBulletList, EditorNodeCode,
EditorNodeHeading1, EditorNodeHeading2, EditorNodeHeading3,
EditorNodeOrderedList, EditorNodeQuote, EditorNodeTable, EditorNodeTaskList,
EditorNodeText, EditorProvider, EditorSelector, EditorTableColumnAfter,
EditorTableColumnBefore, EditorTableColumnDelete, EditorTableColumnMenu,
EditorTableDelete, EditorTableFix, EditorTableGlobalMenu,
EditorTableHeaderColumnToggle, EditorTableHeaderRowToggle, EditorTableMenu,
EditorTableMergeCells, EditorTableRowAfter, EditorTableRowBefore,
EditorTableRowDelete, EditorTableRowMenu, EditorTableSplitCell, } from
"@/components/kibo-ui/editor"; import { useState } from "react";

const Example = () => { const [content, setContent] = useState<JSONContent>({
type: "doc", content: [ { type: "heading", attrs: { level: 1 }, content: [{
type: "text", text: "Heading 1" }], }, { type: "heading", attrs: { level: 2 },
content: [{ type: "text", text: "Heading 2" }], }, { type: "heading", attrs: {
level: 3 }, content: [{ type: "text", text: "Heading 3" }], }, { type:
"heading", attrs: { level: 4 }, content: [{ type: "text", text: "Heading 4" }],
}, { type: "heading", attrs: { level: 5 }, content: [{ type: "text", text:
"Heading 5" }], }, { type: "heading", attrs: { level: 6 }, content: [{ type:
"text", text: "Heading 6" }], }, { type: "paragraph" }, { type: "paragraph",
content: [{ type: "text", text: "Hello, world." }] }, { type: "paragraph" }, {
type: "taskList", content: [ { type: "taskItem", attrs: { checked: false },
content: [ { type: "paragraph", content: [{ type: "text", text: "This is a todo
list" }], }, ], }, { type: "taskItem", attrs: { checked: false }, content: [ {
type: "paragraph", content: [{ type: "text", text: "With two items" }], }, ], },
], }, { type: "paragraph" }, { type: "bulletList", content: [ { type:
"listItem", content: [ { type: "paragraph", content: [{ type: "text", text:
"This is an unordered list" }], }, { type: "bulletList", content: [ { type:
"listItem", content: [ { type: "paragraph", content: [{ type: "text", text:
"With a nested item" }], }, ], }, ], }, ], }, ], }, { type: "paragraph" }, {
type: "orderedList", attrs: { start: 1 }, content: [ { type: "listItem",
content: [ { type: "paragraph", content: [{ type: "text", text: "This is an
ordered list" }], }, ], }, { type: "listItem", content: [ { type: "paragraph",
content: [{ type: "text", text: "With two items" }], }, ], }, ], }, { type:
"paragraph" }, { type: "blockquote", content: [ { type: "paragraph", content: [
{ type: "text", text: "This is a quote, probably by someone famous.", }, ], },
], }, { type: "paragraph" }, { type: "paragraph", content: [ { type: "text",
text: "This is some " }, { type: "text", marks: [{ type: "code" }], text:
"inline code" }, { type: "text", text: ", while this is a code block:" }, ], },
{ type: "paragraph" }, { type: "codeBlock", attrs: { language: null }, content:
[ { type: "text", text: "function x () {\\n console.log('hello, world.');\\n}",
}, ], }, { type: "paragraph" }, { type: "paragraph", content: [ { type: "text",
text: "You can also create complex tables, like so:", }, ], }, { type: "table",
content: [ { type: "tableRow", content: [ { type: "tableHeader", attrs: {
colspan: 1, rowspan: 1, colwidth: null }, content: [ { type: "paragraph",
content: [{ type: "text", text: "Here’s a column" }], }, ], }, { type:
"tableHeader", attrs: { colspan: 1, rowspan: 1, colwidth: null }, content: [ {
type: "paragraph", content: [{ type: "text", text: "Another column" }], }, ], },
{ type: "tableHeader", attrs: { colspan: 1, rowspan: 1, colwidth: null },
content: [ { type: "paragraph", content: [{ type: "text", text: "Yet another"
}], }, ], }, ], }, { type: "tableRow", content: [ { type: "tableCell", attrs: {
colspan: 1, rowspan: 1, colwidth: null }, content: [ { type: "paragraph",
content: [{ type: "text", text: "Cell 1A" }], }, ], }, { type: "tableCell",
attrs: { colspan: 1, rowspan: 1, colwidth: null }, content: [ { type:
"paragraph", content: [{ type: "text", text: "Cell 2A" }], }, ], }, { type:
"tableCell", attrs: { colspan: 1, rowspan: 1, colwidth: null }, content: [ {
type: "paragraph", content: [{ type: "text", text: "Cell 3A" }], }, ], }, ], },
{ type: "tableRow", content: [ { type: "tableCell", attrs: { colspan: 1,
rowspan: 1, colwidth: null }, content: [ { type: "paragraph", content: [{ type:
"text", text: "Cell 1B" }], }, ], }, { type: "tableCell", attrs: { colspan: 1,
rowspan: 1, colwidth: null }, content: [ { type: "paragraph", content: [{ type:
"text", text: "Cell 2B" }], }, ], }, { type: "tableCell", attrs: { colspan: 1,
rowspan: 1, colwidth: null }, content: [ { type: "paragraph", content: [{ type:
"text", text: "Cell 3B" }], }, ], }, ], }, ], }, ], });

const handleUpdate = ({ editor }: { editor: Editor }) => { const json =
editor.getJSON();

    setContent(json);
    console.log(JSON.stringify(json));

};

return (
<EditorProvider
      className="h-full w-full overflow-y-auto rounded-lg border bg-background p-4"
      content={content}
      onUpdate={handleUpdate}
      placeholder="Start typing..."
    >
<EditorFloatingMenu>
<EditorNodeHeading1 hideName />
<EditorNodeBulletList hideName />
<EditorNodeQuote hideName />
<EditorNodeCode hideName />
<EditorNodeTable hideName />
</EditorFloatingMenu>
<EditorBubbleMenu>
<EditorSelector title="Text">
<EditorNodeText />
<EditorNodeHeading1 />
<EditorNodeHeading2 />
<EditorNodeHeading3 />
<EditorNodeBulletList />
<EditorNodeOrderedList />
<EditorNodeTaskList />
<EditorNodeQuote />
<EditorNodeCode />
</EditorSelector>
<EditorSelector title="Format">
<EditorFormatBold />
<EditorFormatItalic />
<EditorFormatUnderline />
<EditorFormatStrike />
<EditorFormatCode />
<EditorFormatSuperscript />
<EditorFormatSubscript />
</EditorSelector>
<EditorLinkSelector />
<EditorClearFormatting />
</EditorBubbleMenu>
<EditorTableMenu>
<EditorTableColumnMenu>
<EditorTableColumnBefore />
<EditorTableColumnAfter />
<EditorTableColumnDelete />
</EditorTableColumnMenu>
<EditorTableRowMenu>
<EditorTableRowBefore />
<EditorTableRowAfter />
<EditorTableRowDelete />
</EditorTableRowMenu>
<EditorTableGlobalMenu>
<EditorTableHeaderColumnToggle />
<EditorTableHeaderRowToggle />
<EditorTableDelete />
<EditorTableMergeCells />
<EditorTableSplitCell />
<EditorTableFix />
</EditorTableGlobalMenu>
</EditorTableMenu> <EditorCharacterCount.Words>Words:
</EditorCharacterCount.Words>
</EditorProvider> ); };

export default Example;

"use client";

import { Pill, PillAvatar, PillAvatarGroup, PillButton, PillDelta, PillIcon,
PillIndicator, PillStatus, } from "@/components/kibo-ui/pill"; import {
CheckCircleIcon, UsersIcon, XIcon } from "lucide-react";

const Example = () => (

<div className="flex flex-wrap items-center justify-center gap-2">
    <Pill>
      <PillAvatar
        fallback="HB"
        src="https://pbs.twimg.com/profile_images/1748718473595789312/PbqJh9hk_400x400.jpg"
      />
      @haydenbleasel
    </Pill>
    <Pill>
      <PillStatus>
        <CheckCircleIcon className="text-emerald-500" size={12} />
        Passed
      </PillStatus>
      Approval Status
    </Pill>
    <Pill>
      #kibo-ui
      <PillButton size="icon" variant="ghost">
        <XIcon size={12} />
      </PillButton>
    </Pill>
    <Pill>
      <PillIndicator pulse variant="success" />
      Active
    </Pill>
    <Pill>
      <PillIndicator variant="error" />
      Error
    </Pill>
    <Pill>
      <PillDelta delta={10} />
      Up 10%
    </Pill>
    <Pill>
      <PillDelta delta={-5} />
      Down 5%
    </Pill>
    <Pill>
      <PillDelta delta={0} />
      No change
    </Pill>
    <Pill>
      <PillIcon icon={UsersIcon} />
      17 users
    </Pill>
    <Pill>
      <PillAvatarGroup>
        <PillAvatar
          fallback="HB"
          src="https://pbs.twimg.com/profile_images/1748718473595789312/PbqJh9hk_400x400.jpg"
        />
        <PillAvatar
          fallback="SC"
          src="https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg"
        />
        <PillAvatar
          fallback="LR"
          src="https://pbs.twimg.com/profile_images/1862717563311968256/xfgt1L9l_400x400.jpg"
        />
      </PillAvatarGroup>
      Loved by millions
    </Pill>
  </div>
);

export default Example;

"use client";

import { QRCode } from "@/components/kibo-ui/qr-code";

const Example = () => <QRCode data="https://www.haydenbleasel.com/" />;

export default Example;

"use client";

import { Rating, RatingButton } from "@/components/kibo-ui/rating";

const Example = () => (
<Rating defaultValue={3}> {Array.from({ length: 5 }).map((_, index) => (
<RatingButton key={index} /> ))}
</Rating> );

export default Example;

"use client";

import { RelativeTime, RelativeTimeZone, RelativeTimeZoneDate,
RelativeTimeZoneDisplay, RelativeTimeZoneLabel, } from
"@/components/kibo-ui/relative-time";

const timezones = [ { label: "EST", zone: "America/New_York" }, { label: "GMT",
zone: "Europe/London" }, { label: "JST", zone: "Asia/Tokyo" }, ];

const Example = () => (

<div className="rounded-md border bg-background p-4">
    <RelativeTime>
      {timezones.map(({ zone, label }) => (
        <RelativeTimeZone key={zone} zone={zone}>
          <RelativeTimeZoneLabel>{label}</RelativeTimeZoneLabel>
          <RelativeTimeZoneDate />
          <RelativeTimeZoneDisplay />
        </RelativeTimeZone>
      ))}
    </RelativeTime>
  </div>
);

export default Example;

"use client";

import { Spinner } from "@/components/kibo-ui/spinner";

const Example = () => <Spinner />;

export default Example;

"use client";

import { Status, StatusIndicator, StatusLabel } from
"@/components/kibo-ui/status";

const Example = () => (

<div className="flex gap-2">
    <Status status="online">
      <StatusIndicator />
      <StatusLabel />
    </Status>

    <Status status="offline">
      <StatusIndicator />
      <StatusLabel />
    </Status>

    <Status status="maintenance">
      <StatusIndicator />
      <StatusLabel />
    </Status>

    <Status status="degraded">
      <StatusIndicator />
      <StatusLabel />
    </Status>

</div>
);

export default Example;

"use client";

import { TreeExpander, TreeIcon, TreeLabel, TreeNode, TreeNodeContent,
TreeNodeTrigger, TreeProvider, TreeView, } from "@/components/kibo-ui/tree";
import { FileCode, FileJson, FileText } from "lucide-react";

export default function TreeExample() { return ( <TreeProvider
defaultExpandedIds={["src", "components", "ui"]} onSelectionChange={(ids) =>
console.log("Selected:", ids)} >
<TreeView>
<TreeNode nodeId="src">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>src</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={1} nodeId="components">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>components</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="ui">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>ui</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={3} nodeId="button.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>button.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode level={3} nodeId="card.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>card.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={3} nodeId="dialog.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>dialog.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode isLast level={2} nodeId="layout">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>layout</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={3} nodeId="header.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>header.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={3} nodeId="footer.tsx">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileCode className="h-4 w-4" />} />
<TreeLabel>footer.tsx</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode nodeId="public">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>public</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode isLast level={1} nodeId="images">
<TreeNodeTrigger>
<TreeExpander hasChildren />
<TreeIcon hasChildren />
<TreeLabel>images</TreeLabel>
</TreeNodeTrigger>
<TreeNodeContent hasChildren>
<TreeNode level={2} nodeId="logo.svg">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileText className="h-4 w-4" />} />
<TreeLabel>logo.svg</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast level={2} nodeId="hero.png">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileText className="h-4 w-4" />} />
<TreeLabel>hero.png</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeNodeContent>
</TreeNode>
</TreeNodeContent>
</TreeNode>
<TreeNode nodeId="package.json">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileJson className="h-4 w-4" />} />
<TreeLabel>package.json</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode nodeId="tsconfig.json">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileJson className="h-4 w-4" />} />
<TreeLabel>tsconfig.json</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
<TreeNode isLast nodeId="README.md">
<TreeNodeTrigger>
<TreeExpander /> <TreeIcon icon={<FileText className="h-4 w-4" />} />
<TreeLabel>README.md</TreeLabel>
</TreeNodeTrigger>
</TreeNode>
</TreeView>
</TreeProvider> ); }

// components/ui/multi-step-form.tsx import * as React from "react"; import {
AnimatePresence, motion } from "framer-motion"; import { cva, type VariantProps
} from "class-variance-authority"; import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
from "@/components/ui/card"; import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; import { X } from
"lucide-react";

const multiStepFormVariants = cva( "flex flex-col", { variants: { size: {
default: "md:w-[700px]", sm: "md:w-[550px]", lg: "md:w-[850px]", }, },
defaultVariants: { size: "default", }, } );

interface MultiStepFormProps extends React.HTMLAttributes<HTMLDivElement>,
VariantProps<typeof multiStepFormVariants> { currentStep: number; totalSteps:
number; title: string; description: string; onBack: () => void; onNext: () =>
void; onClose?: () => void; backButtonText?: string; nextButtonText?: string;
footerContent?: React.ReactNode; }

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>( ({
className, size, currentStep, totalSteps, title, description, onBack, onNext,
onClose, backButtonText = "Back", nextButtonText = "Next Step", footerContent,
children, ...props }, ref) => { const progress = Math.round((currentStep /
totalSteps) * 100);

    const variants = {
      hidden: { opacity: 0, x: 100 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    };

    return (
      <Card ref={ref} className={cn(multiStepFormVariants({ size }), className)} {...props}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{title}</CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardDescription>{description}</CardDescription>
          <div className="flex items-center gap-4 pt-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {currentStep}/{totalSteps} completed
            </p>
          </div>
        </CardHeader>

        <CardContent className="min-h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div>{footerContent}</div>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={onBack}>
                {backButtonText}
              </Button>
            )}
            <Button onClick={onNext}>
              {nextButtonText}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );

} );

MultiStepForm.displayName = "MultiStepForm";

export { MultiStepForm };
