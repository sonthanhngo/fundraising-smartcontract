import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { ethers } from 'ethers';
import {
  convertUnixTimestamptoDate,
  formatChartData,
} from '../../../common/utils';
export default function DisplayChart({ donations }) {
  console.log(formatChartData(donations));
  return (
    <div className='w-3/4 '>
      <ResponsiveContainer width='100%' height={350}>
        <BarChart data={formatChartData(donations)}>
          <XAxis
            dataKey='donationsTime'
            stroke='#000000'
            fontSize={14}
            fontWeight='bold'
          />
          <YAxis
            stroke='#000000'
            fontSize={14}
            tickLine={false}
            tickFormatter={(value) => `${value / 1000000}tr`}
            fontWeight='bold'
          />
          <Tooltip
            formatter={(value) => `${value / 1000000}tr`}
            cursor={{
              fill: 'transparent',
            }}
          />
          <Bar
            dataKey='donation'
            fill='#15803D'
            radius={[4, 4, 0, 0]}
            maxBarSize={100}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
