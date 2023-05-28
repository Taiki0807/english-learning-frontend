'use client';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { WordCard } from '../../features';
import { Button } from '../../parts';
import { wordsIDState } from '../WordlearningPage/wordsID';
import style from './WordPage.module.css';

interface Props {
  id: string;
}

export const WordPage = ({ id }: Props) => {
  const wordsID = useRecoilValue(wordsIDState);
  const router = useRouter();
  if (!wordsID.length) {
    router.push('/wordlearning');
  }
  const findIndexById = (id: string) => {
    const index = wordsID.findIndex(
      (item: string) => item === id
    );
    return index;
  };

  const Index = findIndexById(id);
  const nextWord = () => {
    if (Index < wordsID.length - 1) {
      const newIndex = Index + 1;
      const currentWordId = wordsID[newIndex];
      router.push(`/wordlearning/${currentWordId}/`);
    }
  };
  const prevWord = () => {
    if (Index > 0) {
      const prevIndex = Index - 1;
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
