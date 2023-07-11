'use client';
import Image from 'next/image';
import style from './ProfilePage.module.css';
import { useAuthContext } from '@/app/_components/features/LoginForm/AuthContext';
export const ProfilePage = () => {
  const { user } = useAuthContext();
  const image = user?.image ?? '/blankprofile.png';
  return (
    <div className={style.profile}>
      <div className={style.profile__header}>
        <Image
          src={image}
          width={100}
          height={100}
          alt="icon"
          className={style.profile__icon}
        />
        <h2>{user?.username}</h2>
      </div>
      <div className={style.profile__detail__list}>
        <h3>詳細情報</h3>
        <li className={style.profile__detail__info}>
          <dl>
            <dt>メールアドレス</dt>
            <dd>
              <p>{user?.email}</p>
            </dd>
          </dl>
        </li>
      </div>
    </div>
  );
};
