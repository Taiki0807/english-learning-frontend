import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SideBar } from './SideBar';

const meta = {
  title: 'SideBar',
  component: SideBar,
} satisfies Meta<typeof SideBar>;

export default meta;
type T = typeof SideBar;
type Story = StoryObj<T>;

const SideBarStory = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  return (
    <SideBar
      isOpenDrawer={isOpenDrawer}
      setIsOpenDrawer={setIsOpenDrawer}
    />
  );
};
export const Default: Story = {
  render: () => <SideBarStory />,
};
