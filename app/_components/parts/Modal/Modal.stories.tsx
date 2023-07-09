import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type T = typeof Modal;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {},
};
