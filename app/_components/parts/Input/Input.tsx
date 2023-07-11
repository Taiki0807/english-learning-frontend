import style from './Input.module.css';

interface Props {
  label?: string;
  className?: string;
  onChange: (value: string) => void;
}

export const Input = ({
  label,
  className = '',
  onChange,
}: Props): JSX.Element => {
  return (
    <input
      placeholder={label}
      className={`${style.input} ${className}`}
      type="text"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
