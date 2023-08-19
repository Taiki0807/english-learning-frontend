'use client';
import { useRouter } from 'next/navigation';
import { Button, Carousel } from '../../parts';
import style from './WordlearningPage.module.css';
import Card from './components/Card/Card';
import { useGetCourses } from './useGetCourses';
import { useGetRecentlyAccessedCourses } from './useGetRecentlyAccessedCourses';

export const WordlearningPage = () => {
  const { data } = useGetCourses();
  const { accessedCourses } =
    useGetRecentlyAccessedCourses();
  const router = useRouter();
  const handleclick = () => {
    router.push('/wordlearning/register');
  };
  if (!data) return <div>Loading...</div>;
  if (!accessedCourses) return <div>Loading...</div>;
  return (
    <div className={style.learning__page}>
      <div className={style.courses__wrapper}>
        <h5>最近アクセスした単語帳一覧</h5>
        {accessedCourses.length > 0 ? (
          <div className={style.card_items}>
            <Carousel cards={accessedCourses} />
          </div>
        ) : (
          <p>最近アクセスした単語帳はありません。</p>
        )}
      </div>
      <div className={style.title}>
        <h5>単語一覧</h5>
        <Button onClick={handleclick}>
          単語帳新規登録
        </Button>
      </div>
      {data.length > 0 ? (
        <div className={style.card_list}>
          {data.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
            />
          ))}
        </div>
      ) : (
        <>
          <p>単語帳を作成してください。</p>
        </>
      )}
    </div>
  );
};
