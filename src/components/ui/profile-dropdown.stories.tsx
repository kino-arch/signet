import type { Meta, StoryObj } from "@storybook/react-vite"
import { ProfileDropdown } from "./profile-dropdown"

const meta = {
  title: "UI / ProfileDropdown",
  component: ProfileDropdown,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ProfileDropdown />,
}
