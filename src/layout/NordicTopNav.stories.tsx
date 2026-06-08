import type { Meta, StoryObj } from "@storybook/react-vite"
import { NordicTopNav } from "./NordicTopNav"


const meta = {
  title: "Nordic/NordicTopNav",
  component: NordicTopNav,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
} satisfies Meta<typeof NordicTopNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
