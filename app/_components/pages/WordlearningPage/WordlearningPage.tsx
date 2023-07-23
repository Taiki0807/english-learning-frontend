'use client';
import { Carousel } from '../../parts';
import style from './WordlearningPage.module.css';
import Card from './components/Card/Card';
import { useGetCourses } from './useGetCourses';
import { useGetRecentlyAccessedCourses } from './useGetRecentlyAccessedCourses';

export const WordlearningPage = () => {
  const { data } = useGetCourses();
  const { accessedCourses } =
    useGetRecentlyAccessedCourses();
  if (!data) return <div>Loading...</div>;
  if (!accessedCourses) return <div>Loading...</div>;
  return (
    <div className={style.learning__page}>
      <div className={style.courses__wrapper}>
        <h5>最近アクセスした単語帳一覧</h5>
        <div className={style.card_items}>
          <Carousel cards={accessedCourses} />
        </div>
      </div>
      <h5 className={style.title}>単語一覧</h5>
      <div className={style.card_list}>
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};
