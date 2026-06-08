import type { Meta, StoryObj } from "@storybook/react-vite"
import { Popover } from "./popover"

const meta = {
  title: "UI / Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Popover />,
}
