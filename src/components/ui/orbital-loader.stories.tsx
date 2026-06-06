import type { Meta, StoryObj } from "@storybook/react-vite"
import { OrbitalLoader } from "./orbital-loader"

const meta = {
  title: "UI / OrbitalLoader",
  component: OrbitalLoader,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <OrbitalLoader />,
}
