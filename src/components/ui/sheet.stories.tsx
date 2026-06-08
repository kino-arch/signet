import type { Meta, StoryObj } from "@storybook/react-vite"
import { Sheet } from "./sheet"

const meta = {
  title: "UI / Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Sheet />,
}
