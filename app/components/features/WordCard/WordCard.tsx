import { useState } from 'react';
import style from './WordCard.module.css';

export const WordCard = (): JSX.Element => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className={style.flipCard} onClick={handleClick}>
      <div
        className={`${style.flipCardInner} ${
          isFlipped ? style.flipped : ''
        }`}
      >
        <div className={style.flipCardFront}>
          {/* Front side content */}
          <h2>Front Side</h2>
        </div>
        <div className={style.flipCardBack}>
          {/* Back side content */}
          <h2>Back Side</h2>
        </div>
      </div>
    </div>
  );
};
