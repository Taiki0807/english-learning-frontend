'use client';
import { LoginForm, Toast } from '../../features';
import style from './SignUp.module.css';
import useSignUp from './useSignUp';

export const SignUp = (): JSX.Element => {
  const { handleClose, handleSuccess, user } = useSignUp();
  return (
    <div className={style.signup}>
      {user && (
        <Toast
          outHideDuration={3000}
          message={`${user.username}さん認証に成功しました。`}
          onClose={handleClose}
        />
      )}
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
};
