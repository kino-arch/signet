import type { Meta, StoryObj } from "@storybook/react-vite"
import { ScrollArea } from "./scroll-area"

const meta = {
  title: "UI / ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ScrollArea />,
}
