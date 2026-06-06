import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tabs } from "./tabs"

const meta = {
  title: "UI / Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Tabs />,
}
