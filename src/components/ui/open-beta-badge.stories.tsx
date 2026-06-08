import type { Meta, StoryObj } from "@storybook/react-vite"
import { OpenBetaBadge } from "./open-beta-badge"

const meta = {
  title: "UI / OpenBetaBadge",
  component: OpenBetaBadge,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <OpenBetaBadge />,
}
