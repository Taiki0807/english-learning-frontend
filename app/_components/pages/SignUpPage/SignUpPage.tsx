'use client';
import { Toast } from '../../features';
import { SignIn } from '../../features/Auth/SignUp/SignUp';
import style from './SignUpPage.module.css';
import { useSignUp } from './useSignUp';

export const SignUpPage = (): JSX.Element => {
  const {
    handleClose,
    handleSuccess,
    isCreationSuccessful,
  } = useSignUp();
  return (
    <div className={style.signup}>
      {isCreationSuccessful && (
        <Toast
          outHideDuration={3000}
          message={'新規作成成功!'}
          onClose={handleClose}
        />
      )}
      <SignIn onSuccess={handleSuccess} />
    </div>
  );
};
