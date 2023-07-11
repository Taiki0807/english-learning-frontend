import style from './Button.module.css';

interface Props {
  color?: 'danger' | 'primary';
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}

export const Button = (props: Props): JSX.Element => {
  const color = props.color ?? 'primary';
  const isLoading = props.isLoading ?? false;
  return (
    <div>
      <button
        className={`${style.button} ${
          style[`button-${color}`]
        }`}
        onClick={props.onClick}
        type="submit"
        disabled={isLoading}
      >
        {props.children}
      </button>
    </div>
  );
};
