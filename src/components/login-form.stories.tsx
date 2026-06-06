import type { Meta, StoryObj } from "@storybook/react"
import { LoginForm } from "./login-form"
import { BrowserRouter } from "react-router-dom"

const meta = {
  title: "Components/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="w-96">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
