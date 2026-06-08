import type { Meta, StoryObj } from "@storybook/react-vite"
import { Logo } from "./logo"

const meta = {
  title: "UI / Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Logo />,
}
