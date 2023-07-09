import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './SideBar.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render SideBar with default args', () => {
  render(<Default />);
});
