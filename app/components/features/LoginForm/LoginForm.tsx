import { z } from 'zod';
import { Button, Form, InputField } from '../../parts';
import style from './LoginForm.module.css';

const schema = z.object({
  email: z
    .string()
    .email('適切なメールアドレスを入力してください'),
  password: z
    .string()
    .min(1, 'パスワードを入力してください'),
});

export type LoginCredentials = z.infer<typeof schema>;

type LoginSuccessCallback = (
  values: LoginCredentials
) => void;

interface Props {
  onSuccess: LoginSuccessCallback;
}

export const LoginForm = ({
  onSuccess,
}: Props): JSX.Element => {
  return (
    <div>
      <Form<LoginCredentials, typeof schema>
        onSubmit={async (values) => {
          onSuccess(values);
        }}
        schema={schema}
        className={style.form}
      >
        {({ register, formState }) => (
          <>
            <p className={style.form__title}>
              Sign in to your account
            </p>
            <InputField
              id="email"
              type="email"
              label="Email Address"
              error={formState.errors.email}
              registration={register('email')}
              className={`${style.input__container} ${
                formState.errors.email ? style.error : ''
              }`}
            />
            <InputField
              id="password"
              type="password"
              label="Password"
              error={formState.errors.password}
              registration={register('password')}
              className={`${style.input__container} ${
                formState.errors.password ? style.error : ''
              }`}
            />
            <Button>Sign in</Button>
            <p className={style.signup__link}>
              No account?
              <a href="">Sign up</a>
            </p>
          </>
        )}
      </Form>
    </div>
  );
};
