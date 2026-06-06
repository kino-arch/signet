import type { Meta, StoryObj } from "@storybook/react-vite"
import { Card } from "./card"

const meta = {
  title: "UI / Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Card />,
}
