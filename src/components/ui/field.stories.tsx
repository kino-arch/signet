import type { Meta, StoryObj } from "@storybook/react-vite"
import { Field } from "./field"

const meta = {
  title: "UI / Field",
  component: Field,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Field />,
}
