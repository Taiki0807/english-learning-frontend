import { useState } from 'react';
import type { IconType } from 'react-icons';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Collapse } from '../Collapse';
import { ListItemButton } from '../ListItemButton';
import { NavItem } from '../NavItem';
import style from './NavCollapse.module.css';

interface MenuItem {
  id: string;
  type: string;
  title: string;
  caption?: string;
  icon?: IconType;
  breadcrumbs?: boolean;
  children?: MenuItem[];
}

interface NavCollapseProps {
  menu: MenuItem;
  level: number;
}

const NavCollapse = ({ menu, level }: NavCollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const menus = menu.children?.map((item: any) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={item.id}
            menu={item}
            level={level + 1}
          />
        );
      case 'item':
        return (
          <NavItem
            key={item.id}
            item={item}
            level={level + 1}
          />
        );
      default:
        return <div>hey</div>;
    }
  });
  const IconComponent = menu.icon;
  return (
    <div>
      <ListItemButton
        className={style.listItemButton}
        onClick={handleClick}
        key={menu.id}
      >
        <div className={style.button__left}>
          {IconComponent && (
            <IconComponent className={style.button__icon} />
          )}
          {menu.title}
        </div>
        {isOpen ? (
          <FaChevronUp
            fontSize={16}
            className={style.button__icon}
          />
        ) : (
          <FaChevronDown
            fontSize={16}
            className={style.button__icon}
          />
        )}
      </ListItemButton>
      <Collapse in={isOpen}>{menus}</Collapse>
    </div>
  );
};

export default NavCollapse;
