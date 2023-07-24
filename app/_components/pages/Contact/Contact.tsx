'use client';
import { z } from 'zod';
import { FieldWrapper } from '../../parts/Form';
import style from './Contact.module.css';
import {
  Button,
  Form,
  InputField,
} from '@/app/_components/parts';

const schema = z.object({
  email: z
    .string()
    .email('適切なメールアドレスを入力してください'),
  name: z.string().min(1, '名前を入力してください'),
  message: z
    .string()
    .min(1, '問い合わせ内容を入力してください'),
});
export type FormData = z.infer<typeof schema>;

export const Contact = () => {
  const handleSubmit = (data: FormData) => {
    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };
  return (
    <div className={style.contact}>
      <Form<FormData, typeof schema>
        onSubmit={async (values) => {
          handleSubmit(values);
        }}
        schema={schema}
        className={style.form}
      >
        {({ register, formState }) => (
          <>
            <div className={style.title}>Contact us</div>
            <InputField
              id="name"
              type="text"
              label="Name"
              error={formState.errors.name}
              registration={register('name')}
              className={`${style.input} ${
                formState.errors.name ? style.error : ''
              }`}
            />
            <InputField
              id="email"
              type="text"
              label="Your email"
              error={formState.errors.email}
              registration={register('email')}
              className={`${style.input} ${
                formState.errors.email ? style.error : ''
              }`}
            />
            <FieldWrapper error={formState.errors.message}>
              <textarea
                placeholder="Your message"
                {...register('message')}
                className={`${style.formTextarea} ${
                  formState.errors.message
                    ? style.error
                    : ''
                }`}
              ></textarea>
            </FieldWrapper>

            <Button>Submit</Button>
          </>
        )}
      </Form>
    </div>
  );
};
