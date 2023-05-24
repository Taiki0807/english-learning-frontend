import React from 'react';
import type { IconType } from 'react-icons';
import NavCollapse from '../NavCollapse/NavCollapse';
import { NavItem } from '../NavItem';
import style from './NavGroup.module.css';

interface MenuItem {
  id: string;
  type: string;
  title: string;
  caption?: string;
  icon?: IconType;
  breadcrumbs?: boolean;
  children?: MenuItem[];
}

interface NavGroupProps {
  item: MenuItem;
}
export const NavGroup = ({ item }: NavGroupProps) => {
  const items = item.children?.map((menu: any) => {
    switch (menu.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menu.id}
            menu={menu}
            level={1}
          />
        );
      case 'item':
        return (
          <NavItem key={menu.id} item={menu} level={1} />
        );
      default:
        return <div>Menu Items Error</div>;
    }
  });
  return (
    <div>
      <div className={style.title} key={item.id}>
        {item.title}
      </div>
      {items}
    </div>
  );
};
