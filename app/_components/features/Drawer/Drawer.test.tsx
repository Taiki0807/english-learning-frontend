import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Drawer.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Drawer with default args', () => {
  render(<Default />);
});
