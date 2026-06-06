import type { Meta, StoryObj } from "@storybook/react-vite"
import { Separator } from "./separator"

const meta = {
  title: "UI / Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Separator />,
}
