import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthContext } from '@/app/_components/features/Auth/SignIn/AuthContext';

export const useSignUp = () => {
  const router = useRouter();
  const [isCreationSuccessful, setCreationSuccessful] =
    useState(false);
  const { createUser } = useAuthContext();
  const handleSuccess = (values: any) => {
    if (createUser) {
      createUser(values);
      setCreationSuccessful(true);
    }
  };
  const handleClose = () => {
    router.push('/signin');
  };
  return {
    handleSuccess,
    handleClose,
    isCreationSuccessful,
  };
};
