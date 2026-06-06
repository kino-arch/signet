import type { Meta, StoryObj } from "@storybook/react-vite"
import { CommandPalette } from "./command-palette"

const meta = {
  title: "UI / CommandPalette",
  component: CommandPalette,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CommandPalette />,
}
