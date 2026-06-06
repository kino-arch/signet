import type { Meta, StoryObj } from '@storybook/react';
import { LandingPage } from './LandingPage';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Pages/LandingPage',
  component: LandingPage,
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
