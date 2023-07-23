import { MdClose } from 'react-icons/md';
import style from './AbortButton.module.css';

interface Props {
  className: string;
}
export const AbortButton = ({ className }: Props) => {
  return (
    <button className={`${style.abortButton} ${className}`}>
      <div className={style.sign}>
        <MdClose
          color="white"
          fontSize={30}
          fontWeight={700}
        />
      </div>

      <span className={style.text}>学習中断</span>
    </button>
  );
};
