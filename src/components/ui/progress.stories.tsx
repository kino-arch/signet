import type { Meta, StoryObj } from "@storybook/react-vite"
import { Progress } from "./progress"

const meta = {
  title: "UI / Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Progress aria-label="Progress" />,
}
