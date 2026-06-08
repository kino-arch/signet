import type { Meta, StoryObj } from "@storybook/react-vite"
import { Select } from "./select"

const meta = {
  title: "UI / Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Select />,
}
