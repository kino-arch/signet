import type { Meta, StoryObj } from "@storybook/react-vite"
import { NordicEditorSidebar } from "./NordicEditorSidebar"


const meta = {
  title: "Nordic/NordicEditorSidebar",
  component: NordicEditorSidebar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="flex bg-nordic-bg p-8 min-h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NordicEditorSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
