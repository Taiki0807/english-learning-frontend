'use client';
import { SignIn, Toast } from '../../features';
import style from './SignInPage.module.css';
import { useSignIn } from './useSignIn';

export const SignInPage = (): JSX.Element => {
  const { handleClose, handleSuccess, user } = useSignIn();
  return (
    <div className={style.signin}>
      {user && (
        <Toast
          outHideDuration={3000}
          message={`${user.username}さん認証に成功しました。`}
          onClose={handleClose}
        />
      )}
      <SignIn onSuccess={handleSuccess} />
    </div>
  );
};
