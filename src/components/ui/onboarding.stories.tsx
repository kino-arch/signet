import type { Meta, StoryObj } from "@storybook/react-vite"
import { Onboarding } from "./onboarding"

const meta = {
  title: "UI / Onboarding",
  component: Onboarding,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Onboarding>

export default meta
type Story = StoryObj<typeof Onboarding>

export const Default: Story = {
  args: {
    totalSteps: 3,
  },
}
