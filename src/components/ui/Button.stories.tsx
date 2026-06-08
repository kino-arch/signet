import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "@storybook/test"
import { Download, Loader2, LogOut, Mail } from "lucide-react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI / Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The core action primitive of the Signet design system. Supports six semantic variants and eight sizes, built on CVA + Radix Slot for full composability.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
      description: "Visual style of the button",
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
      description: "Size of the button",
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Enter the Forge",
    variant: "default",
    size: "default",
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants ────────────────────────────────────────────────────────────────

export const Default: Story = {}

export const Outline: Story = {
  args: { variant: "outline", children: "Comm-Link" },
}

export const Secondary: Story = {
  args: { variant: "secondary", children: "Enter as Guest / Demo Mode" },
}

export const Ghost: Story = {
  args: { variant: "ghost", children: "Sign Out" },
}

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete Signet" },
}

export const Link: Story = {
  args: { variant: "link", children: "View Documentation" },
}

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const SizeXS: Story = {
  name: "Size — XS",
  args: { size: "xs", children: "Tag" },
}

export const SizeSM: Story = {
  name: "Size — SM",
  args: { size: "sm", children: "Filter" },
}

export const SizeLG: Story = {
  name: "Size — LG",
  args: { size: "lg", children: "IGNITE THE FORGE" },
}

export const IconButton: Story = {
  name: "Size — Icon",
  args: {
    size: "icon",
    variant: "outline",
    "aria-label": "Download Intel",
    children: <Download className="h-4 w-4" />,
  },
}

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true, children: "Unavailable" },
}

export const Loading: Story = {
  name: "Loading State",
  parameters: {
    chromatic: { disableSnapshot: false, delay: 300 },
  },
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="h-4 w-4 animate-spin" />
        Authenticating…
      </>
    ),
  },
}

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  name: "With leading icon",
  args: {
    children: (
      <>
        <Download className="h-4 w-4" />
        Download Intel
      </>
    ),
  },
}

export const WithTrailingIcon: Story = {
  name: "With trailing icon",
  args: {
    variant: "ghost",
    children: (
      <>
        Sign Out
        <LogOut className="h-4 w-4" />
      </>
    ),
  },
}

// ─── Interaction Tests ────────────────────────────────────────────────────────

export const ClickInteraction: Story = {
  name: "Interaction — Click fires handler",
  args: { children: "Click me" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole("button", { name: /click me/i })

    let clicked = false
    btn.addEventListener("click", () => {
      clicked = true
    })

    await userEvent.click(btn)
    expect(clicked).toBe(true)
  },
}

export const KeyboardInteraction: Story = {
  name: "Interaction — Keyboard Enter triggers click",
  args: { children: "Press Enter" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole("button", { name: /press enter/i })

    let activated = false
    btn.addEventListener("click", () => {
      activated = true
    })

    btn.focus()
    await userEvent.keyboard("{Enter}")
    expect(activated).toBe(true)
  },
}

export const DisabledCannotClick: Story = {
  name: "Interaction — Disabled button is not clickable",
  args: { disabled: true, children: "Locked" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole("button", { name: /locked/i })

    expect(btn).toBeDisabled()

    let clicked = false
    btn.addEventListener("click", () => {
      clicked = true
    })
    await userEvent.click(btn, { pointerEventsCheck: 0 })
    // pointer-events: none means the DOM event never fires
    expect(clicked).toBe(false)
  },
}

export const IconNoAriaLabel: Story = {
  name: "Interaction — Icon button without aria-label (a11y failure demo)",
  args: {
    size: "icon",
    variant: "outline",
    // deliberately omitting aria-label to showcase the a11y addon catching it
    children: <Mail className="h-4 w-4" />,
  },
  tags: ["!test"], // exclude from Vitest runs — it intentionally fails a11y
}
