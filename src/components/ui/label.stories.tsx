import type { Meta, StoryObj } from "@storybook/react-vite"
import { Label } from "./label"

const meta = {
  title: "UI / Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Label />,
}
