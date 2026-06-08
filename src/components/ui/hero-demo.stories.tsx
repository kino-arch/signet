import type { Meta, StoryObj } from "@storybook/react-vite"
import { HeroDemo } from "./hero-demo"

const meta = {
  title: "UI / HeroDemo",
  component: HeroDemo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HeroDemo />,
}
