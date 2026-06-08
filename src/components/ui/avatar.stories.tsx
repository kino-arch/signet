import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar } from "./avatar"

const meta = {
  title: "UI / Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Avatar />,
}
