import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "../../components/sections/hero/Hero";

const meta: Meta<typeof Hero> = {
  title: "Landing/Hero",
  component: Hero,
  parameters: {
    chromatic: { viewports: [375, 768, 1280], delay: 500 },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {};
