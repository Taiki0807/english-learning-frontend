'use client';
import { useState } from 'react';
import style from './wordlearning.module.css';
import { SideBar } from '@/app/components/pages';

export default function WordLearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);
  return (
    <div className={style.wordlearning}>
      <SideBar
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
      />
      <div
        className={`${
          isOpenDrawer
            ? style.main__open
            : style.main__close
        } ${style.main}`}
      >
        {children}
      </div>
    </div>
  );
}
