import type { Meta, StoryObj } from "@storybook/react-vite"
import { DropdownMenu } from "./dropdown-menu"

const meta = {
  title: "UI / DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <DropdownMenu />,
}
