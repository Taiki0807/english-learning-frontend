'use client';
import { useRouter } from 'next/navigation';
import style from './Card.module.css';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getFetcher } from '@/utils/httpClient';

interface Props {
  id: string;
  name: string;
}
const Card = ({ id, name }: Props) => {
  const router = useRouter();
  const [, setWordsID] = useLocalStorage('wordsID', ['']);
  const [, setCourseID] = useLocalStorage('courseID', '');

  const handleClick = async () => {
    try {
      const responseData = await getFetcher(
        `/wordbook/courses/${id}/quiz/`,
        { cache: 'no-store' }
      );
      console.log(responseData);

      if (
        Array.isArray(responseData) &&
        responseData.length > 0
      ) {
        setWordsID(responseData);
        setCourseID(id);
        router.push(`/wordlearning/${id}/`);
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  return (
    <div className={style.card} onClick={handleClick}>
      <div className={style.card__image}>image</div>
      <div className={style.card__text}>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Card;
