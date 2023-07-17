import { UseFormRegisterReturn } from 'react-hook-form';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from '../Form';

type Props = {
  id: string;
  type?: 'text' | 'email' | 'password' | 'file';
  label?: string;
  className?: string;
  registration: UseFormRegisterReturn;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
} & FieldWrapperPassThroughProps;

export const InputField = ({
  id,
  type = 'text',
  className = '',
  label,
  error,
  registration,
  onChange,
}: Props) => {
  return (
    <FieldWrapper error={error}>
      <input
        id={id}
        type={type}
        className={`${className} ${error ? 'error' : ''}`}
        placeholder={label}
        {...registration}
        onChange={onChange ?? undefined}
      />
    </FieldWrapper>
  );
};
