import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "./badge"
import { Shield } from "lucide-react"

const meta: Meta<typeof Badge> = {
  title: "UI / Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Visual tags or status markers matching the Beskar armor themes. Supports semantic variations and icon wrapping.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      description: "Visual style of the badge",
    },
    children: { control: "text" },
  },
  args: {
    children: "Beskar",
    variant: "default",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Secondary: Story = {
  args: { variant: "secondary", children: "Durasteel" },
}

export const Destructive: Story = {
  args: { variant: "destructive", children: "Target Lost" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "Bounty: Active" },
}

export const Ghost: Story = {
  args: { variant: "ghost", children: "Stealth Mode" },
}

export const WithIcon: Story = {
  name: "With Icon",
  args: {
    variant: "default",
    children: (
      <>
        <Shield className="h-3 w-3" />
        Certified Beskar
      </>
    ),
  },
}
