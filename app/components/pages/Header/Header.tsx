'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaAngleDown } from 'react-icons/fa';
import { Popover } from '../../parts';
import style from './Header.module.css';
import useHeader from './useHeader';

export const Header = (): JSX.Element => {
  const {
    handleClick,
    handleClose,
    open,
    anchorEl,
    NavItem,
  } = useHeader();
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        <nav className={style.nav}>
          <a href="/" className={style.logo}>
            English Learning
          </a>
          <ul className={style.nav__wrapper}>
            {navItems.map((item) => (
              <li
                key={item.href}
                className={`${style.nav__item} ${
                  NavItem(item.href)
                    ? style.active
                    : style.nonactive
                }`}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className={style.line}></div>
          <div className={style.header__right}>
            <Image
              src="/blankprofile.png"
              width={35}
              height={35}
              alt="icon"
              className={style.profile__icon}
            />
            <button
              onClick={handleClick}
              className={style.button}
            >
              <FaAngleDown
                size={15}
                className={style.button__icon}
              />
            </button>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
            >
              popover
            </Popover>
          </div>
        </nav>
      </div>
    </header>
  );
};
