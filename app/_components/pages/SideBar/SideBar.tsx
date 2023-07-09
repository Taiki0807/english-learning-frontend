'use client';
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from 'react-icons/fa';
import { Drawer } from '../../features';
import style from './SideBar.module.css';
import { NavGroup } from './components/NavGroup';
import menuItem from './menu-items';

interface Props {
  isOpenDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}
export const SideBar = ({
  isOpenDrawer,
  setIsOpenDrawer,
}: Props): JSX.Element => {
  const toggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return <div>Menu Items Error</div>;
    }
  });

  return (
    <>
      <button
        onClick={toggleDrawer}
        className={`${style.button} ${
          isOpenDrawer
            ? style.hanbager__open
            : style.hanbager__close
        }`}
      >
        {isOpenDrawer ? (
          <FaChevronCircleLeft
            fontSize={30}
            className={style.button__icon}
          />
        ) : (
          <FaChevronCircleRight
            fontSize={30}
            className={style.button__icon}
          />
        )}
      </button>
      <Drawer
        anchor="right"
        open={isOpenDrawer}
        onClose={toggleDrawer}
        className={`${style.sidebar} ${
          isOpenDrawer ? '' : style.sidebar__closed
        }`}
      >
        {navItems}
      </Drawer>
    </>
  );
};
