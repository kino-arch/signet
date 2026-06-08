import type { Meta, StoryObj } from "@storybook/react-vite"
import { NordicProfileDropdown } from "./NordicProfileDropdown"


const meta = {
  title: "Nordic/ProfileDropdown",
  component: NordicProfileDropdown,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
} satisfies Meta<typeof NordicProfileDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user: {
      name: "Jane Doe",
      email: "jane@example.com",
    },
  },
}
