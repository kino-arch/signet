import type { Meta, StoryObj } from "@storybook/react-vite"
import { HolographicDisplay } from "./holographic-display"

const meta = {
  title: "UI / HolographicDisplay",
  component: HolographicDisplay,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HolographicDisplay />,
}
