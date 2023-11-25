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
import { Loader } from '../../common/components/misc/Loader';
// import { useQueryCampaign } from '../../api/campaign';
import { convertUnixTimestamptoDate } from '../../common/utils';
import { useGetCampaignsQuery } from '../../api/campaign';
import { useGetUpdateByIdQuery } from '../../api/update';
// import { useGetAllProductsQuery } from '../../api/slice';

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
    name: 'Page A',
    income: 50000000,
  },
  {
    name: 'Page D',
    income: 100000000,
  },
];
export default function TestPage() {
  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const { data: updates, isLoading: isLoadingUpdates } = useGetUpdateByIdQuery(
    '682fee00-752a-40bd-9af5-238e436bbd22'
  );
  if (!isLoadingUpdates) {
    updates.map((update) => console.log(update));
  }
  // if (!isLoading) {
  //   console.log(campaigns[0].deadline);
  //   console.log(
  //     convertUnixTimestamptoDate(Number(campaigns[0].deadline) * 1000)
  //   );
  // }
  // const { data: my1 } = useGetAllProductsQuery();
  // console.log(my1);
  return (
    <div className='ml-[200px]'>
      {/* {isLoading && <Loader />} */}
      <BarChart
        width={600}
        height={300}
        className='w-full'
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
