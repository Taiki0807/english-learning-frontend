import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Card from '../../pages/WordlearningPage/components/Card/Card';
import style from './Carousel.module.css';

export const Carousel = ({ cards }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const startIndex = currentSlide * 3;
  const endIndex = startIndex + 3;
  const displayedCards = cards.slice(startIndex, endIndex);

  return (
    <div>
      {/* ナビゲーションボタン */}
      <div className={style.carousel__navigation}>
        <button
          disabled={currentSlide === 0}
          onClick={handlePrevSlide}
          className={`${style.carousel__button} ${style.carousel__button__left}`}
        >
          <FaAngleLeft />
        </button>
        <button
          disabled={endIndex >= cards.length}
          onClick={handleNextSlide}
          className={`${style.carousel__button} ${style.carousel__button__right}`}
        >
          <FaAngleRight />
        </button>
      </div>
      <div className={style.carousel}>
        {/* カード要素の表示 */}
        {displayedCards.map((card: any) => (
          <Card
            key={card.id}
            id={card.id}
            name={card.name}
          />
        ))}
      </div>
    </div>
  );
};
