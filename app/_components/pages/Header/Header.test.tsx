import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Header.stories';

const { Default } = composeStories(stories);

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
  usePathname: jest.fn(),
}));
test('render Header with default args', () => {
  render(<Default />);
});
