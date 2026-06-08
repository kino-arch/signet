import type { Meta, StoryObj } from "@storybook/react-vite";
import { NordicNav } from "../layout/NordicNav";

const meta: Meta<typeof NordicNav> = {
  title: "Nordic/Navigation",
  component: NordicNav,
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [375, 1280], delay: 300 },
  },
};

export default meta;
type Story = StoryObj<typeof NordicNav>;

export const Default: Story = {};
