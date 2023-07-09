import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import { UserData } from '../type';
import {
  calculateExponential,
  calculateElapsedTimes,
} from '@/utils/utils';

interface Props {
  previewData: UserData;
  id: string;
}

export const Graph = ({ previewData, id }: Props) => {
  const targetData = previewData[id];
  console.log(
    'retention_rates',
    targetData[0]?.user_learning_data?.review_dates
  );

  if (
    targetData[0]?.user_learning_data?.review_dates &&
    targetData[0].user_learning_data.review_dates.length >=
      3
  ) {
    const elapsedTimes = calculateElapsedTimes(
      targetData[0].user_learning_data.review_dates
    );
    console.log('time', elapsedTimes);
    const { data } = calculateExponential(
      elapsedTimes,
      targetData[0].user_learning_data.retention_rates
    );

    return (
      <div>
        <LineChart width={600} height={300} data={data}>
          <Line
            type="monotone"
            dataKey="retentionRates"
            stroke="#8884d8"
            strokeWidth={3}
            dot={false}
          />
          <CartesianGrid stroke="#ddd" />
          <XAxis dataKey="day" />
          <YAxis />
        </LineChart>
      </div>
    );
  } else {
    return <p>3回以上勉強してください!</p>;
  }
};
