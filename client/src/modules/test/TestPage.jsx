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
} from 'recharts';
const data = [
  {
    name: 'Page A',
    income: 20000000,
  },
  {
    name: 'Page B',
    income: 10000000,
  },
  {
    name: 'Page C',
    income: 50000000,
  },
  {
    name: 'Page D',
    income: 100000000,
  },
];
export default function TestPage() {
  return (
    <div className='ml-[200px]'>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />

        {/* <CartesianGrid stroke='#ccc' /> */}
        {/* <Tooltip /> */}
        <Legend />
        {/* <Line
          type='monotone'
          dataKey='income'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        /> */}
        <Bar dataKey='income' barSize={30} fill='#8884d8' />
      </BarChart>
    </div>
  );
}
