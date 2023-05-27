'use client';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { wordsIDState } from '../../wordsID';
import style from './Card.module.css';
import { getFetcher } from '@/utils/httpClient';

interface Props {
  id: number;
  name: string;
}
const Card = ({ id, name }: Props) => {
  const setID = useSetRecoilState(wordsIDState);
  const router = useRouter();

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
        const firstId = responseData[0];
        setID(responseData);
        router.push(`/wordlearning/${firstId}/`);
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
