import type { Meta, StoryObj } from "@storybook/react-vite"
import { NavigationMenu } from "./navigation-menu"

const meta = {
  title: "UI / NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <NavigationMenu />,
}
