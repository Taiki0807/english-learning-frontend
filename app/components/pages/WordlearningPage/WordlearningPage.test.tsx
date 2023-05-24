import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './WordlearningPage.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render WordlearningPage with default args', () => {
  render(<Default />);
});
