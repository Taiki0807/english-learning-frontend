'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../../parts';
import style from './WordDetailPage.module.css';
import { Graph } from './components/Graph';
import { useGetCourse } from './useGetCourse';
import { useGetReview } from './useGetReview';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  getFetcher,
  postFetcher,
} from '@/utils/httpClient';

interface Props {
  id: string;
}
interface CourseProgress {
  id: number;
  current_index: number;
  user: number;
  course: string;
}
export const WordDetailPage = ({ id }: Props) => {
  const router = useRouter();
  const [wordsID] = useLocalStorage('wordsID', ['']);
  const { previewData } = useGetReview();
  const { courseTitle } = useGetCourse(id);
  if (!previewData) return <div>loading...</div>;
  if (!courseTitle) return <div>loading...</div>;
  const targetData = previewData[id];

  const handleStartFromBeginning = async () => {
    postFetcher('/wordbook/reset-unconditionally/', {
      course_id: id,
    });
    const nextURL = `/wordlearning/word/${wordsID[0]}/`;
    router.push(nextURL);
  };

  const handleClick = async () => {
    try {
      const progressURL = `/wordbook/course-progress/${id}/`;

      const response = await getFetcher<CourseProgress>(
        progressURL
      );
      const nextURL = `/wordlearning/word/${
        wordsID[response.current_index]
      }/`;
      router.push(nextURL);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={style.wordDetail}>
      <h2>学習状況✍</h2>
      <div className={style.wordinfo}>
        <div className={style.info__item}>
          <h2>
            <span>タイトル:</span>
            {courseTitle.name}
          </h2>
          <h3>
            正解率:
            {targetData[0].course_progress_rate * 100}%
          </h3>
        </div>
        <Graph previewData={previewData} id={id} />
      </div>
      <div className={style.startButton}>
        <Button onClick={handleStartFromBeginning}>
          はじめから学習開始
        </Button>
        <Button onClick={handleClick}>
          前回の続きから学習開始
        </Button>
      </div>
    </div>
  );
};
