import type { Meta, StoryObj } from '@storybook/react';
import { SignetButton } from './SignetButton';

const meta = {
  title: 'Primitives/SignetButton',
  component: SignetButton,
  tags: ['autodocs'],
} satisfies Meta<typeof SignetButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'SignetButton',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled',
    disabled: true,
  },
};
