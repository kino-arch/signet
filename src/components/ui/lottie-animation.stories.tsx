import type { Meta, StoryObj } from "@storybook/react-vite"
import { LottieAnimation } from "./lottie-animation"

const sampleAnimationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  layers: [],
}

const meta = {
  title: "UI / LottieAnimation",
  component: LottieAnimation,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LottieAnimation>

export default meta
type Story = StoryObj<typeof LottieAnimation>

export const Default: Story = {
  args: {
    animationData: sampleAnimationData,
    className: "h-20 w-20",
  },
}
