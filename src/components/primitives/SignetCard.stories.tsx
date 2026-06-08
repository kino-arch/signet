import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignetCard } from './SignetCard';

const meta = {
  title: 'Primitives/SignetCard',
  component: SignetCard,
  tags: ['autodocs'],
} satisfies Meta<typeof SignetCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'This is a basic card.',
  },
};

export const Glow: Story = {
  args: {
    variant: 'glow',
    children: 'This is a glowing card.',
  },
};
