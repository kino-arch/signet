import type { Meta, StoryObj } from '@storybook/react';
import { SignetIcon } from './SignetIcon';

const meta = {
  title: 'Primitives/SignetIcon',
  component: SignetIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof SignetIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Settings',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-white">
      <SignetIcon name="Star" size="sm" />
      <SignetIcon name="Star" size="md" />
      <SignetIcon name="Star" size="lg" />
      <SignetIcon name="Star" size="xl" />
    </div>
  ),
};
