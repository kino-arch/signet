import type { Meta, StoryObj } from "@storybook/react-vite"
import { NeonGradientCard } from "./neon-gradient-card"

const meta = {
  title: "UI / NeonGradientCard",
  component: NeonGradientCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <NeonGradientCard />,
}
