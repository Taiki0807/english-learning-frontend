import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Toast.stories';
import '@testing-library/jest-dom/extend-expect';

const { Default } = composeStories(stories);

test('renders Toast component with default args', async () => {
  render(<Default />);

  expect(screen.getByText('Success')).toBeInTheDocument();
});
