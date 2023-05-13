import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover } from './Popover';

const meta = {
  title: 'Components / Popover',
  component: Popover,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: '0',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type T = typeof Popover;
type Story = StoryObj<T>;

const ButtonWithHooks = () => {
  const [anchorEl, setAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
      <button onClick={handleClick}>Open Popover</button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        popover
      </Popover>
    </div>
  );
};
export const Default: Story = {
  render: () => <ButtonWithHooks />,
};
