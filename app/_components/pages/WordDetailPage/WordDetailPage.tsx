'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../../parts';
import style from './WordDetailPage.module.css';
import { Graph } from './components/Graph';
import { useGetCourse } from './useGetCourse';
import { useGetReview } from './useGetReview';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Props {
  id: string;
}
export const WordDetailPage = ({ id }: Props) => {
  const router = useRouter();
  const [wordsID] = useLocalStorage('wordsID', ['']);
  const { previewData } = useGetReview();
  const { courseTitle } = useGetCourse(id);
  if (!previewData) return <div>loading...</div>;
  if (!courseTitle) return <div>loading...</div>;
  const targetData = previewData[id];

  const handleClick = async () => {
    router.push(`/wordlearning/word/${wordsID[0]}/`);
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
      <Button onClick={handleClick}>学習開始</Button>
    </div>
  );
};
