import style from './PieChart.module.css';

interface Props {
  percentage: number;
}

export const PieChart = ({
  percentage,
}: Props): JSX.Element => {
  const dashoffset = 440 - (440 * percentage) / 100;
  return (
    <div className={style.piechart__wrapper}>
      <svg>
        <circle
          className={style.base}
          cx="75"
          cy="75"
          r="70"
        ></circle>
        <circle
          className={style.line}
          cx="75"
          cy="75"
          r="70"
          style={{ strokeDashoffset: dashoffset }}
        ></circle>
      </svg>
      <h3
        className={style.piechart__title}
      >{`${percentage}%`}</h3>
    </div>
  );
};
