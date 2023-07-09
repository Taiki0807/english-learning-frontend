'use client';
import {
  AiOutlineCheck,
  AiOutlineClose,
} from 'react-icons/ai';
import style from './Toast.module.css';
import useToast from './useToast';

interface Props {
  outHideDuration: number;
  message: string;
  onClose?: () => void;
}

export const Toast = (props: Props): JSX.Element => {
  const { visible, handleClose } = useToast({
    outHideDuration: props.outHideDuration,
    onClose: props.onClose,
  });
  return visible ? (
    <div className={style.toast}>
      <div className={style.toast_content}>
        <i className={style.icon}>
          <AiOutlineCheck size={'20'} color={'#fff'} />
        </i>
        <div className={style.message}>
          <span className={style.text1}>Success</span>
          <span className={style.text2}>
            {props.message}
          </span>
        </div>
        <i
          className={style.close_button}
          onClick={handleClose}
        >
          <AiOutlineClose size={'20'} color={'#fff'} />
        </i>
      </div>
      <div className={style.progress}></div>
    </div>
  ) : (
    <></>
  );
};
