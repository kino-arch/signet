import type { Meta, StoryObj } from "@storybook/react-vite"
import { Sidebar, SidebarProvider } from "./sidebar"

const meta = {
  title: "UI / Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar />
    </SidebarProvider>
  ),
}
