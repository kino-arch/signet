import type { Meta, StoryObj } from "@storybook/react"
import { LoginPage } from "./LoginPage"
import { BrowserRouter } from "react-router-dom"

const meta = {
  title: "Pages/LoginPage",
  component: LoginPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
