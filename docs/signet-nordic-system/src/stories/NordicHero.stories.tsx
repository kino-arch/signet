import type { Meta, StoryObj } from "@storybook/react";
import { NordicHero } from "../../components/nordic/NordicHero";

const meta: Meta<typeof NordicHero> = {
  title: "Nordic/Hero",
  component: NordicHero,
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [375, 768, 1280], delay: 500 },
  },
};

export default meta;
type Story = StoryObj<typeof NordicHero>;

export const Default: Story = {};
