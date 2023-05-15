'use client';
import { LoginForm } from '../../features';
import style from './SignUp.module.css';
import { useAuthContext } from '@/app/components/features/LoginForm/AuthContext';

export const SignUp = (): JSX.Element => {
  const { loginUser } = useAuthContext();
  const handleSuccess = (values: any) => {
    if (loginUser) {
      loginUser(values);
    }
  };
  return (
    <div className={style.signup}>
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
};
