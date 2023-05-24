import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import style from '../../pages/SideBar/SideBar.module.css';
import { Drawer } from './Drawer';
import mainStyle from '@/app/(main)/wordlearning/wordlearning.module.css';

const meta = {
  title: 'Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type T = typeof Drawer;
type Story = StoryObj<T>;

const ButtonWithHooks = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#f9f9f9',
        width: '100vw',
        height: '100vh',
        padding: '0',
      }}
    >
      <Drawer
        anchor={'left'}
        open={open}
        onClose={handleClose}
        className={`${style.sidebar} ${
          open ? '' : style.sidebar__closed
        }`}
      >
        Drawer
      </Drawer>
      <div
        className={`${
          open
            ? mainStyle.main__open
            : mainStyle.main__close
        } ${mainStyle.main}`}
      >
        <button onClick={handleClick}>Open Drawer</button>
      </div>
    </div>
  );
};
export const Default: Story = {
  render: () => <ButtonWithHooks />,
};
