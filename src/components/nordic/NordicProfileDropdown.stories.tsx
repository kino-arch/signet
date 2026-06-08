import type { Meta, StoryObj } from "@storybook/react"
import { NordicProfileDropdown } from "./NordicProfileDropdown"
import { BrowserRouter } from "react-router-dom"

const meta = {
  title: "Nordic/ProfileDropdown",
  component: NordicProfileDropdown,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
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
