import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './InputField.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render InputField with default args', () => {
  const { container } = render(<Default />);
  Default.play({ canvasElement: container });
});
