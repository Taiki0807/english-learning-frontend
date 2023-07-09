import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './PieChart.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render PieChart with default args', () => {
  render(<Default />);
});
