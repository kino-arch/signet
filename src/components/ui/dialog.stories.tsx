import type { Meta, StoryObj } from "@storybook/react-vite"
import { Dialog } from "./dialog"

const meta = {
  title: "UI / Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Dialog />,
}
