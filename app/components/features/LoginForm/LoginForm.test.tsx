import { composeStories } from '@storybook/react';
import { within } from '@testing-library/dom';
import { render, act } from '@testing-library/react';
import * as stories from './LoginForm.stories';

const { Default, Failure } = composeStories(stories);

describe('LoginForm Test', () => {
  test('submit LoginForm with user input (Success)', async () => {
    const { container } = render(<Default />);

    await act(async () => {
      await Default.play({ canvasElement: container });
    });

    const canvas = within(container);
    const alert = canvas.queryByRole('alert');
    expect(alert).toBeNull();
  });

  test('submit LoginForm with user input (Failure)', async () => {
    const { container } = render(<Failure />);

    await act(async () => {
      await Failure.play({ canvasElement: container });
    });

    const canvas = within(container);
    const emailAlert = canvas.getByRole('alert', {
      name: '適切なメールアドレスを入力してください',
    });
    const passwordAlert = canvas.getByRole('alert', {
      name: 'パスワードを入力してください',
    });
    expect(emailAlert.textContent).toContain(
      '適切なメールアドレスを入力してください'
    );
    expect(passwordAlert.textContent).toContain(
      'パスワードを入力してください'
    );
  });
});
