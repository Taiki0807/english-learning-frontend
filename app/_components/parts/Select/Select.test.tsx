import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Select.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Select with default args', () => {
  render(<Default />);
});
