import style from './WordlearningPage.module.css';
import Card from './components/Card/Card';
import { getCourses } from './getCourses';

export const WordlearningPage = async () => {
  const { Data } = await getCourses();
  console.log(Data);
  return (
    <div className={style.learning__page}>
      <div className={style.courses__wrapper}>
        <h5>単語一覧</h5>
        <div className={style.card_items}>
          {Data.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
