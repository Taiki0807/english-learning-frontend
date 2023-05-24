import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Components / Toast',
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;
type T = typeof Toast;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    outHideDuration: 3000,
    message: 'Success Message',
  },
};
