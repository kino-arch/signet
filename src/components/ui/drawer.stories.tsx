import type { Meta, StoryObj } from "@storybook/react-vite"
import { Drawer } from "./drawer"

const meta = {
  title: "UI / Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Drawer />,
}
