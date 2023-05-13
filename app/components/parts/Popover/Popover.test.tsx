import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Popover.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Popover with default args', () => {
  render(<Default />);
});
