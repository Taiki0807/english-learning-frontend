import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type T = typeof Select;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    data: ['Option 1', 'Option 2', 'Option 3'],
    onChange: (value: string) => {
      console.log('Selected value:', value);
    },
  },
};
