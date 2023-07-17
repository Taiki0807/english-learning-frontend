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
import { useAuthContext } from '@/app/_components/features/Auth/SignIn/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  postFetcher,
  getFetcher,
} from '@/utils/httpClient';

interface Props {
  id: string;
}
type Review = {
  id: number;
  correct: boolean;
  review_date: string;
  flashcard: string;
  user: number;
};

type ForgettingCurveData = {
  review_date: string;
  retention_rate: number;
};

type UserLearningData = {
  correct_answers: number;
  total_answers: number;
  round_count: number;
  forgetting_curve: Record<string, ForgettingCurveData[]>;
};

type LearningSession = {
  [courseID: string]: {
    reviews: Review[];
    course_learning_rate: number;
    course_progress_rate: number;
    user_learning_data: UserLearningData;
  }[];
};

type Response = {
  reviews: Review[];
  course_learning_rate: number;
  course_progress_rate: number;
  user_learning_data: UserLearningData;
};

export const WordPage = ({ id }: Props) => {
  const [wordsID] = useLocalStorage('wordsID', ['']);

  const [courseID] = useLocalStorage('courseID', '');
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [response, setResponse] = useState<Response | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
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
      const nextWordId = wordsID[newIndex];
      router.push(`/wordlearning/word/${nextWordId}/`);
    } else {
      try {
        const today = new Date()
          .toISOString()
          .split('T')[0];
        const url = `/wordbook/reviews/?course_id=${courseID}&review_date=${today}`;

        const response = await getFetcher<LearningSession>(
          url,
          {
            credentials: 'include',
          }
        );
        if (courseID && response[courseID]?.length > 0) {
          setResponse(response[courseID][0]);
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
      const nextWordId = wordsID[prevIndex];
      router.push(`/wordlearning/word/${nextWordId}/`);
    }
  };
  const handleCorrectAnswer = async () => {
    const requestBody = {
      correct: true,
      flashcard: id,
      user: user?.id,
    };
    try {
      setIsLoading(true);
      await postFetcher('/wordbook/reviews/', requestBody);
      setIsLoading(false);
      nextWord();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    nextWord();
  };
  const handleIncorrectAnswer = async () => {
    const requestBody = {
      correct: false,
      flashcard: id,
      user: user?.id,
    };
    try {
      const response = await postFetcher(
        '/wordbook/reviews/',
        requestBody
      );
      console.log(response);
      nextWord();
    } catch (error) {
      console.error(error);
    }
    nextWord();
  };
  const handleWordClose = async () => {
    try {
      const response = await postFetcher(
        '/wordbook/end-session/',
        {
          course_id: courseID,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    router.push('/');
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
            isLoading={isLoading}
          >
            不正解
          </Button>
          <Button
            color="primary"
            onClick={handleCorrectAnswer}
            isLoading={isLoading}
          >
            正解
          </Button>
        </div>
      </div>
    </div>
  );
};
