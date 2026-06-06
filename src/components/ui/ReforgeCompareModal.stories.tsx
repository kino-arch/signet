import type { Meta, StoryObj } from "@storybook/react-vite"
import { ReforgeCompareModal } from "./ReforgeCompareModal"

const meta = {
  title: "UI / ReforgeCompareModal",
  component: ReforgeCompareModal,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ReforgeCompareModal>

export default meta
type Story = StoryObj<typeof ReforgeCompareModal>

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    originalText: "Original resume text here.",
    reforgedText: "Improved resume text here.",
    onAccept: () => {},
  },
}
