import type { Meta, StoryObj } from "@storybook/react-vite"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

const meta = {
  title: "UI / ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {
  args: {
    type: "single",
    children: (
      <>
        <ToggleGroupItem value="a" aria-label="Option A">
          A
        </ToggleGroupItem>
        <ToggleGroupItem value="b" aria-label="Option B">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="c" aria-label="Option C">
          C
        </ToggleGroupItem>
      </>
    ),
  },
}
