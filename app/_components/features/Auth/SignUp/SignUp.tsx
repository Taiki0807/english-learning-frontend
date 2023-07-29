'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { z } from 'zod';
import { Button, Form, InputField } from '../../../parts';
import style from './SignUp.module.css';
import { useAuthContext } from '@/app/_components/features/Auth/SignIn/AuthContext';

const schema = z.object({
  email: z
    .string()
    .email('適切なメールアドレスを入力してください'),
  password: z
    .string()
    .min(1, 'パスワードを入力してください'),
  username: z.string().min(1, 'usernameを入力してください'),
  fileUrl: z.any(),
});

export type LoginCredentials = z.infer<typeof schema>;

type LoginSuccessCallback = (
  values: LoginCredentials
) => void;

interface Props {
  onSuccess: LoginSuccessCallback;
}

export const SignIn = ({
  onSuccess,
}: Props): JSX.Element => {
  const { uploadFile } = useAuthContext();
  const [fileUrl, setFileUrl] = useState<string | null>(
    null
  );
  const onChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files !== null && uploadFile) {
      const file = files[0];
      try {
        const url = await uploadFile(file);
        setFileUrl(url);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <Form<LoginCredentials, typeof schema>
        onSubmit={async (values) => {
          values.fileUrl = fileUrl;
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
            <div className={style.profile__image}>
              <Image
                src={fileUrl ?? '/blankprofile.png'}
                width={100}
                height={100}
                alt="icon"
                className={style.profile__icon}
              />
              <InputField
                id="file"
                type="file"
                label="file"
                registration={register('fileUrl')}
                className={`${style.input__file} ${
                  formState.errors.fileUrl
                    ? style.error
                    : ''
                }`}
                onChange={onChange}
              />
              <label
                htmlFor="file"
                className={style.icon__edit}
              >
                <MdModeEditOutline
                  size={40}
                  className={style.icon}
                />
              </label>
            </div>
            <InputField
              id="username"
              type="text"
              label="UserName"
              error={formState.errors.username}
              registration={register('username')}
              className={`${style.input__container} ${
                formState.errors.email ? style.error : ''
              }`}
            />
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
            <Button>Sign Up</Button>
            <p className={style.signup__link}>
              No account?
              <Link href="/signin">Sign in</Link>
            </p>
          </>
        )}
      </Form>
    </div>
  );
};
