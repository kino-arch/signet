import type { Meta, StoryObj } from "@storybook/react-vite"
import { Particles } from "./particles"

const meta = {
  title: "UI / Particles",
  component: Particles,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Particles />,
}
