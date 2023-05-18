import type { Meta, StoryObj } from '@storybook/react';
import {
  within,
  userEvent,
} from '@storybook/testing-library';
import { InputField } from './InputField';

const meta = {
  title: 'Components / InputField',
  component: InputField,
} satisfies Meta<typeof InputField>;

export default meta;
type T = typeof InputField;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    id: 'email',
    type: 'email',
    label: 'Email Address',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByPlaceholderText('Email Address'),
      'emailadress@test.com'
    );
  },
};
