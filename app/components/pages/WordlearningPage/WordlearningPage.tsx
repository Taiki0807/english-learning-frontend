'use client';
import { WordCard } from '../../features';
import { Button } from '../../parts';
import style from './WordlearningPage.module.css';

export const WordlearningPage = (): JSX.Element => {
  return (
    <div className={style.wordlearningPage}>
      <WordCard />
      <div className={style.btn}>
        <Button color="primary">ok</Button>
        <Button color="primary">ok</Button>
      </div>
    </div>
  );
};
