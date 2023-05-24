import Link from 'next/link';
import type { IconType } from 'react-icons';
import style from './NavItem.module.css';
interface MenuItem {
  id: string;
  type: string;
  title: string;
  caption?: string;
  icon?: IconType;
  url: string;
  breadcrumbs?: boolean;
}

interface NavItemProps {
  item: MenuItem;
  level: number;
}
export const NavItem = ({ item, level }: NavItemProps) => {
  const IconComponent = item.icon;
  return (
    <>
      {item.breadcrumbs ? (
        <div className={style.navitem__link} key={item.id}>
          {IconComponent && (
            <IconComponent className={style.button__icon} />
          )}
          <Link href={item.url}>{item.title}</Link>
        </div>
      ) : (
        <div
          style={{ paddingLeft: `${level + 1}rem` }}
          className={style.navitem}
          key={item.id}
        >
          <Link href={item.url}>{item.title}</Link>
        </div>
      )}
    </>
  );
};
