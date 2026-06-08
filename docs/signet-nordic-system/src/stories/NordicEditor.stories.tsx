import type { Meta, StoryObj } from "@storybook/react";
import { NordicEditorPage } from "../../pages/NordicEditorPage";

const meta: Meta<typeof NordicEditorPage> = {
  title: "Nordic/Editor",
  component: NordicEditorPage,
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [1280, 1440], delay: 500 },
  },
};

export default meta;
type Story = StoryObj<typeof NordicEditorPage>;

export const Default: Story = {};
