import type { Meta, StoryObj } from '@storybook/react';
import {
  within,
  userEvent,
  waitFor,
} from '@storybook/testing-library';
import { SignIn } from './SignIn';

const meta = {
  title: 'Components / LoginForm',
  component: SignIn,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SignIn>;

export default meta;
type T = typeof SignIn;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    onSuccess: (values) => {
      console.log('Form submitted:', values);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await userEvent.type(
        canvas.getByPlaceholderText('Email Address'),
        'emailadress@test.com',
        { delay: 10 }
      );
    });
    await waitFor(async () => {
      await userEvent.type(
        canvas.getByPlaceholderText('Password'),
        'a-random-password',
        { delay: 10 }
      );
    });
    await userEvent.click(canvas.getByRole('button'));
  },
};
export const Failure: Story = {
  args: {
    onSuccess: (values) => {
      console.log('Form submitted:', values);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await userEvent.type(
        canvas.getByPlaceholderText('Email Address'),
        'emailadress',
        { delay: 10 }
      );
    });
    await userEvent.click(canvas.getByRole('button'));
  },
};
