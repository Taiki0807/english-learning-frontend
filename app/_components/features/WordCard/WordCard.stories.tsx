import type { Meta, StoryObj } from '@storybook/react';
import { WordCard } from './WordCard';

const meta = {
  title: 'WordCard',
  component: WordCard,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WordCard>;

export default meta;
type T = typeof WordCard;
type Story = StoryObj<T>;

export const Default: Story = {};
