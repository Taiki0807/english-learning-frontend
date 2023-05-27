'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { WordCard } from '../../features';
import { Button } from '../../parts';
import { wordsIDState } from '../WordlearningPage/wordsID';
import style from './WordPage.module.css';

interface Props {
  id: string;
}

export const WordPage = ({ id }: Props) => {
  const [index, setIndex] = useState(0);
  const wordsID = useRecoilValue(wordsIDState);
  const router = useRouter();
  if (!wordsID.length) {
    router.push('/wordlearning');
  }

  const nextWord = () => {
    if (index < wordsID.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      const currentWordId = wordsID[newIndex];
      router.push(`/wordlearning/${currentWordId}/`);
    }
  };

  const prevWord = () => {
    if (index >= 0) {
      const prevIndex = index - 1;
      setIndex(prevIndex);
      const currentWordId = wordsID[prevIndex];
      router.push(`/wordlearning/${currentWordId}/`);
    }
  };

  return (
    <div className={style.wordlearningPage}>
      <WordCard id={id} />
      <div className={style.btn}>
        <Button color="primary" onClick={prevWord}>
          Previous
        </Button>
        <Button color="primary" onClick={nextWord}>
          Next
        </Button>
      </div>
    </div>
  );
};
