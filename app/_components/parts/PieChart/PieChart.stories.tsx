import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const meta = {
  title: 'PieChart',
  component: PieChart,
} satisfies Meta<typeof PieChart>;

export default meta;
type T = typeof PieChart;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {},
};
