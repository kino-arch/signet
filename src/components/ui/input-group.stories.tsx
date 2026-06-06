import type { Meta, StoryObj } from "@storybook/react-vite"
import { InputGroup } from "./input-group"

const meta = {
  title: "UI / InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <InputGroup />,
}
