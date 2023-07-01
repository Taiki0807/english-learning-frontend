import style from './Select.module.css';
interface Props {
  label?: string;
  className?: string;
  data: string[];
  onChange: (value: string) => void;
}

export const Select = ({
  label,
  className,
  data,
  onChange,
}: Props): JSX.Element => {
  return (
    <div
      className={`${style['select-box-container']} ${className}`}
    >
      <select
        id="selectBox"
        className={style['select-box']}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" selected>
          {label}
        </option>
        {data?.map((value: string) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
