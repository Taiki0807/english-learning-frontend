import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './WordCard.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render WordCard with default args', () => {
  render(<Default />);
});
