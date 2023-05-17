import { SignUp } from '../components/pages';
import LoginLayout from '../layout/LoginLayout';

const page = () => {
  return (
    <LoginLayout>
      <SignUp />
    </LoginLayout>
  );
};

export default page;
