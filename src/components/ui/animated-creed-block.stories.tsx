import type { Meta, StoryObj } from "@storybook/react-vite"
import { AnimatedCreedBlock } from "./animated-creed-block"

const meta = {
  title: "UI / AnimatedCreedBlock",
  component: AnimatedCreedBlock,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AnimatedCreedBlock>

export default meta
type Story = StoryObj<typeof AnimatedCreedBlock>

export const Default: Story = {
  args: {
    lines: [{ text: "Test line 1" }, { text: "Test line 2" }],
  },
}
