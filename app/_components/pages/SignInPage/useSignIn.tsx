import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/_components/features/Auth/SignIn/AuthContext';

export const useSignIn = () => {
  const router = useRouter();
  const { loginUser, user } = useAuthContext();
  const handleSuccess = (values: any) => {
    if (loginUser) {
      loginUser(values);
    }
  };
  const handleClose = () => {
    router.push('/wordlearning');
  };
  return { handleSuccess, handleClose, user };
};
