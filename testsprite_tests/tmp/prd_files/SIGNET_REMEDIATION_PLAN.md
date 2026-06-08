
# SIGNET UI/UX REMEDIATION PLAN
## Chromatic-Driven Visual Regression Recovery
### Principal Frontend Engineer — Actionable Roadmap

---

## PHASE 0: IMMEDIATE STOP-WORK ORDER (Day 0)

**ALL feature development HALTS.** No new screens, no new components, no new 
themes until this plan is complete.

**The only permitted work:**
1. Design system token consolidation
2. Storybook story creation
3. Chromatic baseline capture
4. Component isolation and testing

---

## PHASE 1: FOUNDATION REPAIR (Days 1–3)

### Day 1: Token Archaeology & Consolidation

**Goal:** Establish a single source of truth for ALL design tokens.

**Tasks:**

1. **Audit existing tailwind.config.js**
   ```bash
   grep -r "text-\|bg-\|border-\|shadow-" src/ --include="*.tsx" --include="*.css" |      grep -v "node_modules" | sort | uniq > /tmp/all_tokens.txt
   ```
   This produces a complete inventory of every color, spacing, and shadow 
   value used across the codebase.

2. **Consolidate to strict token set:**
   ```javascript
   // tailwind.config.js — FINAL TOKEN SET
   module.exports = {
     theme: {
       extend: {
         colors: {
           // Primary — THE ONLY accent color for actions, links, highlights
           'signet-cyan': {
             DEFAULT: '#00f0ff',
             50:  '#e6feff',
             100: '#b3fcff',
             200: '#80f9ff',
             300: '#4df7ff',
             400: '#00f0ff', // Primary
             500: '#00c8d4',
             600: '#009ea8',
             700: '#00747c',
             800: '#004a50',
             900: '#002024',
           },
           // Amber — RESERVED for warnings and premium indicators ONLY
           'signet-amber': {
             DEFAULT: '#ffb800',
             400: '#ffb800',
           },
           // Red — RESERVED for errors ONLY
           'signet-red': {
             DEFAULT: '#ef4444',
             400: '#ef4444',
           },
           // Backgrounds
           'signet-navy': {
             DEFAULT: '#0a0e27',
             50:  '#f0f1f5',
             100: '#d9dbe6',
             200: '#b3b7cd',
             300: '#8d93b4',
             400: '#676f9b',
             500: '#414b82',
             600: '#2a3366',
             700: '#1a2247',
             800: '#0f172a', // Card bg
             900: '#0a0e27', // Page bg
             950: '#050717',
           },
           // Content
           'signet-slate': {
             DEFAULT: '#94a3b8',
             300: '#cbd5e1',
             400: '#94a3b8', // Body text
             500: '#64748b', // Muted text
             600: '#475569', // Disabled
             700: '#334155', // Borders
             800: '#1e293b', // Card borders
             900: '#0f172a',
           },
         },
         borderRadius: {
           'signet': '8px',
           'signet-sm': '4px',
           'signet-lg': '12px',
           'signet-full': '9999px',
         },
         boxShadow: {
           'glow-subtle': '0 0 20px rgba(0, 240, 255, 0.05)',
           'glow-medium': '0 0 40px rgba(0, 240, 255, 0.1)',
           'glow-strong': '0 0 60px rgba(0, 240, 255, 0.15)',
           'glow-focus': '0 0 0 2px #0a0e27, 0 0 0 4px #00f0ff',
         },
         fontFamily: {
           sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
           mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
         },
         fontSize: {
           'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
           'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
           'h2': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
           'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
           'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
           'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
           'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
           'label': ['0.75rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.05em' }],
         },
         spacing: {
           'signet-1': '4px',
           'signet-2': '8px',
           'signet-3': '12px',
           'signet-4': '16px',
           'signet-5': '20px',
           'signet-6': '24px',
           'signet-8': '32px',
           'signet-10': '40px',
           'signet-12': '48px',
           'signet-16': '64px',
           'signet-20': '80px',
           'signet-24': '96px',
         },
       },
     },
   }
   ```

3. **Create token linting rule:**
   ```javascript
   // .eslintrc.js
   module.exports = {
     rules: {
       'no-restricted-syntax': [
         'error',
         {
           selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
           message: 'Use Tailwind token classes instead of raw hex colors. See tailwind.config.js.',
         },
       ],
     },
   }
   ```

**Deliverable:** `tailwind.config.js` with zero arbitrary values. All existing 
arbitrary values (`bg-[#123456]`, `text-[14px]`) must be migrated.

---

### Day 2: Component Primitives — Strict Implementation

**Goal:** Build the 5 primitive components that every other component extends.

**Component 1: SignetButton**

```tsx
// src/components/primitives/SignetButton.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface SignetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const SignetButton = React.forwardRef<HTMLButtonElement, SignetButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:shadow-glow-focus disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
      primary: 'bg-signet-cyan-400 text-signet-navy-900 hover:bg-signet-cyan-300 active:bg-signet-cyan-500',
      secondary: 'border-2 border-signet-cyan-400 text-signet-cyan-400 hover:bg-signet-cyan-400/10 active:bg-signet-cyan-400/20',
      tertiary: 'text-signet-cyan-400 hover:underline underline-offset-4',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-signet-sm',
      md: 'px-5 py-2.5 text-base rounded-signet',
      lg: 'px-8 py-3 text-lg rounded-signet',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <LoadingSpinner className="mr-2" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }
)
SignetButton.displayName = 'SignetButton'
```

**Component 2: SignetCard**

```tsx
// src/components/primitives/SignetCard.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface SignetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'strong'
  isInteractive?: boolean
}

export const SignetCard = React.forwardRef<HTMLDivElement, SignetCardProps>(
  ({ className, variant = 'default', isInteractive, children, ...props }, ref) => {
    const baseStyles = 'rounded-signet bg-signet-navy-800 border border-signet-slate-800 p-signet-6'

    const variantStyles = {
      default: '',
      glow: 'shadow-glow-subtle border-signet-cyan-400/30',
      strong: 'shadow-glow-medium border-signet-cyan-400/50',
    }

    const interactiveStyles = isInteractive 
      ? 'cursor-pointer hover:border-signet-cyan-400/50 hover:shadow-glow-subtle transition-all duration-200' 
      : ''

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], interactiveStyles, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SignetCard.displayName = 'SignetCard'
```

**Component 3: SignetInput**

```tsx
// src/components/primitives/SignetInput.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface SignetInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
}

export const SignetInput = React.forwardRef<HTMLInputElement, SignetInputProps>(
  ({ className, label, error, helperText, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-label text-signet-slate-400 mb-signet-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-signet-3 top-1/2 -translate-y-1/2 text-signet-slate-500">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-signet-navy-900 border border-signet-slate-700 rounded-signet',
              'px-signet-4 py-signet-3 text-body text-white',
              'placeholder:text-signet-slate-600',
              'focus-visible:outline-none focus-visible:border-signet-cyan-400 focus-visible:shadow-glow-focus',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-signet-10',
              error && 'border-signet-red-400 focus-visible:border-signet-red-400',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-signet-2 text-body-sm text-signet-red-400">{error}</p>}
        {helperText && !error && <p className="mt-signet-2 text-body-sm text-signet-slate-500">{helperText}</p>}
      </div>
    )
  }
)
SignetInput.displayName = 'SignetInput'
```

**Component 4: SignetBadge**

```tsx
// src/components/primitives/SignetBadge.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface SignetBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'dot'
  color?: 'cyan' | 'amber' | 'red'
}

export const SignetBadge = React.forwardRef<HTMLSpanElement, SignetBadgeProps>(
  ({ className, variant = 'default', color = 'cyan', children, ...props }, ref) => {
    const colorMap = {
      cyan: {
        default: 'bg-signet-cyan-400/20 text-signet-cyan-400 border-transparent',
        outline: 'bg-transparent text-signet-cyan-400 border-signet-cyan-400',
        dot: 'bg-signet-cyan-400',
      },
      amber: {
        default: 'bg-signet-amber/20 text-signet-amber border-transparent',
        outline: 'bg-transparent text-signet-amber border-signet-amber',
        dot: 'bg-signet-amber',
      },
      red: {
        default: 'bg-signet-red-400/20 text-signet-red-400 border-transparent',
        outline: 'bg-transparent text-signet-red-400 border-signet-red-400',
        dot: 'bg-signet-red-400',
      },
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-signet-full text-label font-medium border',
          colorMap[color][variant],
          className
        )}
        {...props}
      >
        {variant === 'dot' && (
          <span className={cn('w-2 h-2 rounded-full mr-1.5', colorMap[color].dot)} />
        )}
        {children}
      </span>
    )
  }
)
SignetBadge.displayName = 'SignetBadge'
```

**Component 5: SignetIcon**

```tsx
// src/components/primitives/SignetIcon.tsx
import React from 'react'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

export type IconName = keyof typeof LucideIcons

export interface SignetIconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const SignetIcon = React.forwardRef<SVGSVGElement, SignetIconProps>(
  ({ name, size = 'md', className, ...props }, ref) => {
    const IconComponent = LucideIcons[name] as React.ComponentType<React.SVGProps<SVGSVGElement>>

    const sizeMap = {
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
    }

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in Lucide React`)
      return null
    }

    return (
      <IconComponent
        ref={ref}
        width={sizeMap[size]}
        height={sizeMap[size]}
        strokeWidth={2}
        className={cn('flex-shrink-0', className)}
        {...props}
      />
    )
  }
)
SignetIcon.displayName = 'SignetIcon'
```

**Deliverable:** 5 primitive components, zero arbitrary values, 100% TypeScript typed.

---

### Day 3: Primitive Storybook Stories + Chromatic Baseline

**Goal:** Every primitive component has stories for ALL states.

**Storybook configuration:**

```tsx
// .storybook/preview.tsx
import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'signet-dark',
      values: [
        { name: 'signet-dark', value: '#0a0e27' },
        { name: 'signet-light', value: '#ffffff' },
      ],
    },
    chromatic: {
      diffThreshold: 0, // Zero tolerance for pixel deviation
      delay: 300, // Wait for animations to settle
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-signet-navy-900 min-h-screen">
        <Story />
      </div>
    ),
  ],
}

export default preview
```

**SignetButton stories:**

```tsx
// src/components/primitives/SignetButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SignetButton } from './SignetButton'
import { ArrowRight, Loader2 } from 'lucide-react'

const meta: Meta<typeof SignetButton> = {
  title: 'Primitives/SignetButton',
  component: SignetButton,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SignetButton>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary Button' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary Button' },
}

export const Tertiary: Story = {
  args: { variant: 'tertiary', children: 'Tertiary Button' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SignetButton variant="primary">Primary</SignetButton>
      <SignetButton variant="secondary">Secondary</SignetButton>
      <SignetButton variant="tertiary">Tertiary</SignetButton>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SignetButton size="sm">Small</SignetButton>
      <SignetButton size="md">Medium</SignetButton>
      <SignetButton size="lg">Large</SignetButton>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SignetButton leftIcon={<ArrowRight />}>Left Icon</SignetButton>
      <SignetButton rightIcon={<ArrowRight />}>Right Icon</SignetButton>
    </div>
  ),
}

export const Loading: Story = {
  args: { isLoading: true, children: 'Loading...' },
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
}

export const FocusState: Story = {
  parameters: {
    pseudo: { focus: true },
  },
  args: { children: 'Focused' },
}

export const HoverState: Story = {
  parameters: {
    pseudo: { hover: true },
  },
  args: { children: 'Hovered' },
}
```

**Chromatic CI integration:**

```yaml
# .github/workflows/chromatic.yml
name: Chromatic Visual Regression

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build Storybook
        run: pnpm run build-storybook

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: storybook-static
          exitZeroOnChanges: false # FAIL on any visual change
          exitOnceUploaded: true
```

**Deliverable:** All 5 primitives have stories. Chromatic baselines captured. 
CI pipeline fails on any pixel deviation.

---

## PHASE 2: COMPOSITE COMPONENTS (Days 4–6)

### Day 4: Navigation, Form Groups, Cards

Build composite components using ONLY primitives:

- `SignetNavbar` (uses SignetButton, SignetIcon)
- `SignetSidebar` (uses SignetIcon)
- `SignetFormGroup` (uses SignetInput, SignetButton)
- `SignetPricingCard` (uses SignetCard, SignetButton, SignetBadge)
- `SignetFeatureCard` (uses SignetCard, SignetIcon)
- `SignetTestimonialCard` (uses SignetCard, SignetIcon)

**Rule:** If a composite component imports anything other than primitives or 
Lucide icons, it's incorrectly architected.

### Day 5: Modal, Toast, Tooltip

- `SignetModal` (uses SignetCard, SignetButton)
- `SignetToast` (uses SignetCard)
- `SignetTooltip` (uses SignetBadge)

### Day 6: Storybook Stories + Chromatic for ALL Composites

Every composite gets the same story coverage as primitives.

---

## PHASE 3: SCREEN REBUILD (Days 7–10)

### Day 7: Landing Page Rebuild

Rebuild the entire landing page using ONLY design system components:

```tsx
// src/app/landing/page.tsx
import { SignetButton } from '@/components/primitives/SignetButton'
import { SignetCard } from '@/components/primitives/SignetCard'
import { SignetIcon } from '@/components/primitives/SignetIcon'

export default function LandingPage() {
  return (
    <main className="bg-signet-navy-900 min-h-screen">
      {/* Hero */}
      <section className="container mx-auto px-signet-6 py-signet-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-signet-12 items-center">
          <div>
            <h1 className="text-display text-white mb-signet-6">
              Build Your Resume with AI
            </h1>
            <p className="text-body text-signet-slate-400 mb-signet-8 max-w-lg">
              The AI-powered resume builder that translates your experience into 
              high-converting, ATS-optimized profiles.
            </p>
            <div className="flex flex-wrap gap-signet-4">
              <SignetButton variant="primary" size="lg">
                Build Your Resume — Free
              </SignetButton>
              <SignetButton variant="secondary" size="lg">
                Explore Templates
              </SignetButton>
            </div>
            <p className="mt-signet-6 text-body-sm text-signet-slate-500">
              <span className="text-signet-cyan-400">Free forever</span> for standard templates. 
              Premium designs from <span className="text-signet-amber">1 credit</span>.
            </p>
          </div>
          <div className="relative">
            <img 
              src="/hero.webp" 
              alt="AI-powered resume builder interface" 
              className="w-full h-auto rounded-signet"
              width={800} 
              height={600}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-signet-6 py-signet-24">
        <h2 className="text-h2 text-white text-center mb-signet-16">
          Resumes that land interviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-signet-6">
          <SignetCard variant="glow">
            <SignetIcon name="Brain" size="lg" className="text-signet-cyan-400 mb-signet-4" />
            <h3 className="text-h4 text-white mb-signet-2">AI Builder</h3>
            <p className="text-body text-signet-slate-400">
              AI processes your career history into optimized resume bullet points.
            </p>
          </SignetCard>
          {/* ... more cards ... */}
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-signet-6 py-signet-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-signet-6">
          <SignetCard>
            <h3 className="text-h4 text-white mb-signet-2">Basic</h3>
            <p className="text-display text-white mb-signet-2">$0</p>
            <SignetButton variant="secondary" className="w-full">Start for free</SignetButton>
          </SignetCard>
          <SignetCard variant="strong">
            <SignetBadge variant="outline" color="cyan">Popular</SignetBadge>
            <h3 className="text-h4 text-white mb-signet-2 mt-signet-4">Pro</h3>
            <p className="text-display text-white mb-signet-2">$9</p>
            <SignetButton variant="primary" className="w-full">Start Creating</SignetButton>
          </SignetCard>
          <SignetCard>
            <h3 className="text-h4 text-white mb-signet-2">Premium</h3>
            <p className="text-display text-white mb-signet-2">$19</p>
            <SignetButton variant="secondary" className="w-full">Upgrade to Studio</SignetButton>
          </SignetCard>
        </div>
      </section>
    </main>
  )
}
```

**Key changes from current implementation:**
- NO italic display font
- NO custom button styles
- NO light-background pricing card
- NO radial gradient CTA background
- ALL cards use `SignetCard` with consistent variants
- ALL buttons use `SignetButton` with consistent variants

### Day 8: Auth + Dashboard Rebuild

Same pattern: ONLY design system components.

### Day 9: Onboarding Rebuild

**Critical:** Remove ALL alien visual elements:
- Remove terminal block quote → use `SignetCard` with standard text
- Remove technical readout table → use standard form layout
- Remove "THE FORGE" / "THE OUTPOST" labels → use standard headings
- Remove isometric pattern on login → use navy gradient or plain background
- Remove Star Wars references → professional copy only

### Day 10: Editor Rebuild

**Critical:**
- Change "FORGE MASTERPIECE" from amber to cyan `SignetButton`
- Change "STATE: IDLE" to "Last saved: 2 min ago" in muted text
- Simplify scoring panel to use `SignetCard` + progress bars
- Remove traffic light colors (green/amber/red) → use cyan opacity variations

---

## PHASE 4: CHROMATIC VALIDATION (Days 11–12)

### Day 11: Full Chromatic Run

```bash
# Build all stories
pnpm run build-storybook

# Run Chromatic locally for validation
npx chromatic --project-token=$CHROMATIC_TOKEN --storybook-build-dir=storybook-static --exit-zero-on-changes=false
```

**Expected result:** ZERO changes detected if the rebuild perfectly matches 
the design system. Any deviation indicates a token or component violation.

### Day 12: Pixel-Perfect Validation

**Manual checks:**
1. Open Storybook side-by-side with Figma design file
2. Compare every component at 1:1 scale
3. Verify color hex codes match exactly
4. Verify spacing matches 8px grid
5. Verify typography matches spec

**Automated checks:**
```bash
# Run axe-core on all stories
pnpm exec storybook-addon-a11y audit

# Run Lighthouse on Storybook
lighthouse http://localhost:6006 --output=json --output-path=./lighthouse-storybook.json
```

---

## POST-REMEDIATION: ONGOING CHROMATIC GOVERNANCE

### Pull Request Requirements

Every PR must:
1. Include Storybook stories for new components
2. Pass Chromatic visual regression (zero pixel deviation)
3. Pass axe-core accessibility audit
4. Pass token linting (no arbitrary Tailwind values)

### Component Addition Process

1. **Design review** in Figma
2. **Storybook story** created FIRST
3. **Chromatic baseline** captured
4. **Code review** with design system checklist
5. **Integration** into screens

### Forbidden Patterns (Auto-reject in PR)

```
❌ bg-[#123456]          → Use bg-signet-cyan-400
❌ text-[14px]           → Use text-body-sm
❌ p-[13px]              → Use p-signet-3 (12px) or p-signet-4 (16px)
❌ rounded-[10px]        → Use rounded-signet (8px) or rounded-signet-lg (12px)
❌ shadow-[0_0_20px_...] → Use shadow-glow-subtle
❌ font-[italic]         → Use font-normal (italic is banned for UI text)
❌ border-[1.5px]       → Use border (1px) or border-2 (2px)
```

---

## CONCLUSION

This 12-day remediation plan will transform Signet from a fragmented collection 
of custom styles into a unified, Chromatic-enforced design system. The key 
principles:

1. **Primitives first** — Everything extends from 5 base components
2. **Stories before integration** — No component ships without Storybook coverage
3. **Chromatic as gatekeeper** — Zero pixel tolerance
4. **Tokens as law** — No arbitrary values, ever
5. **Accessibility as baseline** — axe-core runs on every story

**The result:** A product that looks and feels like it was built by one designer 
and one engineer with a shared vision — not like a patchwork of competing aesthetics.

Execute this plan. Do not deviate. Do not add features until Phase 4 is complete.
