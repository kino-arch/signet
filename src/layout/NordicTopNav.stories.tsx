import type { Meta, StoryObj } from "@storybook/react-vite"
import { NordicTopNav } from "./NordicTopNav"
import { BrowserRouter } from "react-router-dom"

const meta = {
  title: "Nordic/NordicTopNav",
  component: NordicTopNav,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof NordicTopNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
