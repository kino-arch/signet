import type { Meta, StoryObj } from "@storybook/react-vite"
import { Breadcrumb } from "./breadcrumb"

const meta = {
  title: "UI / Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Breadcrumb />,
}
