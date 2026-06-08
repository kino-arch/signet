import type { Meta, StoryObj } from "@storybook/react-vite"
import { Command } from "./command"

const meta = {
  title: "UI / Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Command />,
}
