import { UseFormRegisterReturn } from 'react-hook-form';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from '../Form';

type Props = {
  type?: 'text' | 'email' | 'password';
  label?: string;
  className?: string;
  registration: UseFormRegisterReturn;
} & FieldWrapperPassThroughProps;

export const InputField = ({
  type = 'text',
  className = '',
  label,
  error,
  registration,
}: Props) => {
  return (
    <FieldWrapper error={error}>
      <input
        id={label}
        type={type}
        className={`${className} ${error ? 'error' : ''}`}
        placeholder={label}
        {...registration}
      />
    </FieldWrapper>
  );
};
