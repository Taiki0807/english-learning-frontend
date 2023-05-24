import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/_components/features/LoginForm/AuthContext';

const useSignUp = () => {
  const router = useRouter();
  const { loginUser, user } = useAuthContext();
  const handleSuccess = (values: any) => {
    if (loginUser) {
      loginUser(values);
    }
  };
  const handleClose = () => {
    router.push('/about');
  };
  return { handleSuccess, handleClose, user };
};

export default useSignUp;
