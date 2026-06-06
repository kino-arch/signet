import type { Meta, StoryObj } from '@storybook/react';
import { SignetBadge } from './SignetBadge';

const meta = {
  title: 'Primitives/SignetBadge',
  component: SignetBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof SignetBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'New',
    variant: 'default',
    color: 'cyan',
  },
};

export const Outline: Story = {
  args: {
    children: 'Beta',
    variant: 'outline',
    color: 'amber',
  },
};

export const Dot: Story = {
  args: {
    children: 'Live',
    variant: 'dot',
    color: 'red',
  },
};
