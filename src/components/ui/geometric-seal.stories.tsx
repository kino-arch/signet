import type { Meta, StoryObj } from "@storybook/react-vite"
import { GeometricSeal } from "./geometric-seal"

const meta = {
  title: "UI / GeometricSeal",
  component: GeometricSeal,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <GeometricSeal />,
}
