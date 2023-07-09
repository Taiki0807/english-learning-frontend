import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import '@/app/globals.css';

const meta = {
  title: 'Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type T = typeof Header;
type Story = StoryObj<T>;

export const Default: Story = {};
