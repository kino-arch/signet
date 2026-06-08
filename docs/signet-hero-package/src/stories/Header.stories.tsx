import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../../layout/Header";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    chromatic: { viewports: [375, 1280], delay: 300 },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Transparent: Story = {
  args: { transparent: true },
};

export const Solid: Story = {
  args: { transparent: false },
};
