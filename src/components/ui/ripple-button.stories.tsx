import type { Meta, StoryObj } from "@storybook/react-vite"
import { RippleButton } from "./ripple-button"

const meta = {
  title: "UI / RippleButton",
  component: RippleButton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <RippleButton>Click Me</RippleButton>,
}
