import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Toast.stories';

const { Default } = composeStories(stories);

test('renders Toast component with default args', async () => {
  render(<Default />);

  expect(screen.getByText('Success')).toBeInTheDocument();
});
