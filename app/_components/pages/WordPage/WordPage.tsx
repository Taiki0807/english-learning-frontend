'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import { WordCard } from '../../features';
import { Button, Modal, PieChart } from '../../parts';
import style from './WordPage.module.css';
import { useAuthContext } from '@/app/_components/features/LoginForm/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { postFetcher } from '@/utils/httpClient';

interface Props {
  id: string;
}
type ResponseData = {
  reviews: any[];
  course_learning_rate: number;
  course_progress_rate: number;
  user_learning_data: {
    correct_answers: number;
    total_answers: number;
  };
};
export const WordPage = ({ id }: Props) => {
  const [wordsID] = useLocalStorage('wordsID', ['']);

  const [courseID] = useLocalStorage('courseID', '');
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [response, setResponse] =
    useState<ResponseData | null>(null);
  const findIndexById = (id: string) => {
    const index = wordsID.findIndex(
      (item: string) => item === id
    );
    return index;
  };

  const { user } = useAuthContext();

  const index = findIndexById(id);
  const nextWord = async () => {
    if (index < wordsID.length - 1) {
      const newIndex = index + 1;
      const currentWordId = wordsID[newIndex];
      router.push(`/wordlearning/${currentWordId}/`);
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
          setResponse(data[courseID][0]);
        }
        setModal(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const prevWord = () => {
    if (index > 0) {
      const prevIndex = index - 1;
      const currentWordId = wordsID[prevIndex];
      router.push(`/wordlearning/${currentWordId}/`);
    }
  };
  const handleCorrectAnswer = () => {
    const requestBody = {
      correct: true,
      flashcard: id,
      user: user?.id,
    };
    postFetcher('/wordbook/reviews/', requestBody)
      .then(() => {
        nextWord();
      })
      .catch((error) => {
        console.error(error);
      });
    nextWord();
  };
  const handleIncorrectAnswer = () => {
    const requestBody = {
      correct: false,
      flashcard: id,
      user: user?.id,
    };
    postFetcher('/wordbook/reviews/', requestBody)
      .then((response) => {
        console.log(response);
        nextWord();
      })
      .catch((error) => {
        console.error(error);
      });
    nextWord();
  };
  const handleWordClose = async () => {
    await postFetcher('/wordbook/end-session/', {
      course_id: courseID,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    router.push('wordlearning');
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div className={style.wordlearningPage}>
      <Modal open={modal} onClose={handleCloseModal}>
        <div className={style.modal__wrapper}>
          <h1>結果🎉</h1>
          <div className={style.modal__result}>
            <p>正解数</p>
            <p>
              {
                response?.user_learning_data
                  ?.correct_answers
              }
              /{response?.user_learning_data?.total_answers}
            </p>
          </div>
          <div className={style.modal__bottom}>
            <div className={style.modal__item}>
              <h2>進捗率</h2>
              <PieChart
                percentage={
                  response?.course_progress_rate !==
                  undefined
                    ? response.course_progress_rate * 100
                    : 0
                }
              />
            </div>
            <div className={style.modal__item}>
              <h2>今回の正解率</h2>
              <PieChart
                percentage={
                  response?.user_learning_data
                    ?.correct_answers &&
                  response?.user_learning_data
                    ?.total_answers
                    ? (response.user_learning_data
                        .correct_answers /
                        response.user_learning_data
                          .total_answers) *
                      100
                    : 0
                }
              />
            </div>
          </div>
          <Button onClick={handleWordClose}>終了</Button>
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
            {index + 1}/{wordsID.length}
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
