'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import { WordCard } from '../../features';
import { Button, Modal } from '../../parts';
import style from './WordPage.module.css';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Props {
  id: string;
}

export const WordPage = ({ id }: Props) => {
  const [wordsID] = useLocalStorage('wordsID', ['']);

  const [courseID] = useLocalStorage('courseID', '');
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [response, setResponse] = useState(0);
  const findIndexById = (id: string) => {
    const index = wordsID.findIndex(
      (item: string) => item === id
    );
    return index;
  };

  const Index = findIndexById(id);
  const nextWord = async () => {
    if (Index < wordsID.length - 1) {
      const newIndex = Index + 1;
      const currentWordId = wordsID[newIndex];
      await router.push(`/wordlearning/${currentWordId}/`);
    } else {
      try {
        const today = new Date()
          .toISOString()
          .split('T')[0];
        const url = `http://localhost:8000/wordbook/reviews/?course_id=${courseID}&review_date=${today}`;

        const response = await fetch(url, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (courseID && data[courseID]?.length > 0) {
          setResponse(
            data[courseID][0].course_progress_rate
          );
        }
        setModal(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const prevWord = () => {
    if (Index > 0) {
      const prevIndex = Index - 1;
      const currentWordId = wordsID[prevIndex];
      router.push(`/wordlearning/${currentWordId}/`);
    }
  };
  const handleCorrectAnswer = () => {
    nextWord();
  };
  const handleIncorrectAnswer = () => {
    nextWord();
  };

  const handleClose_modal = () => {
    setModal(false);
  };

  return (
    <div className={style.wordlearningPage}>
      <Modal open={modal} onClose={handleClose_modal}>
        <div className={style.modal__wrapper}>
          <p>終了！</p>
          進捗率：{response * 100}%
        </div>
      </Modal>
      <WordCard id={id} />
      <div className={style.card__bottom}>
        <div className={style.card__control}>
          <button
            onClick={prevWord}
            className={style.button}
          >
            <FaRegArrowAltCircleLeft fontSize={25} />
          </button>

          <p>
            {Index + 1}/{wordsID.length}
          </p>

          <button
            onClick={nextWord}
            className={style.button}
          >
            <FaRegArrowAltCircleRight fontSize={25} />
          </button>
        </div>
        <div className={style.btn}>
          <Button
            color="danger"
            onClick={handleIncorrectAnswer}
          >
            不正解
          </Button>
          <Button
            color="primary"
            onClick={handleCorrectAnswer}
          >
            正解
          </Button>
        </div>
      </div>
    </div>
  );
};
