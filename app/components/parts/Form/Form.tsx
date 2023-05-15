import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';
import style from './Form.module.css';

type FormProps<TFormValues extends FieldValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (
    methods: UseFormReturn<TFormValues>
  ) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  Schema extends ZodType<
    unknown,
    ZodTypeDef,
    unknown
  > = ZodType<unknown, ZodTypeDef, unknown>
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });
  return (
    <form
      className={`${style.form} ${className}`}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
      noValidate
    >
      {children(methods)}
    </form>
  );
};
