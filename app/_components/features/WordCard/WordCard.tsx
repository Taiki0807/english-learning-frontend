'use client';
import { useState } from 'react';
import style from './WordCard.module.css';
import { useGetWord } from './useGetWord';

interface Props {
  id: string;
}
export const WordCard = ({ id }: Props): JSX.Element => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  const { Data } = useGetWord({ id });
  if (!Data) return <div>Loading...</div>;
  return (
    <div className={style.flipCard} onClick={handleClick}>
      <div
        className={`${style.flipCardInner} ${
          isFlipped ? style.flipped : ''
        }`}
      >
        <div className={style.flipCardFront}>
          {/* Front side content */}
          <h2>{Data.word}</h2>
        </div>
        <div className={style.flipCardBack}>
          {/* Back side content */}
          <h2>{Data.meaning}</h2>
        </div>
      </div>
    </div>
  );
};
