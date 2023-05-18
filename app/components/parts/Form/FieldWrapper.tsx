import { FieldError } from 'react-hook-form';
import style from './Form.module.css';

type Props = {
  error?: FieldError;
  className?: string;
  children: React.ReactNode;
};

export type FieldWrapperPassThroughProps = Omit<
  Props,
  'className' | 'children'
>;

export const FieldWrapper = ({
  error,
  children,
}: Props) => {
  return (
    <div>
      {children}
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className={style.error__message}
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
