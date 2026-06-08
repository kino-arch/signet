import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignetInput } from './SignetInput';
import { Search } from 'lucide-react';

const meta = {
  title: 'Primitives/SignetInput',
  component: SignetInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SignetInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithLabelAndHelper: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Pick a unique username.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'john@example.com',
    error: 'Invalid email address.',
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: <Search size={16} />,
  },
};
