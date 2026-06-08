import type { Meta, StoryObj } from "@storybook/react-vite"
import { Toggle } from "./toggle"

const meta = {
  title: "UI / Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Toggle aria-label="Toggle" />,
}
