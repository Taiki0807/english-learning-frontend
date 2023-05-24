import type { Meta, StoryObj } from '@storybook/react';
import { WordlearningPage } from './WordlearningPage';

const meta = {
  title: 'WordlearningPage',
  component: WordlearningPage,
} satisfies Meta<typeof WordlearningPage>;

export default meta;
type T = typeof WordlearningPage;
type Story = StoryObj<T>;

export const Default: Story = {
  };