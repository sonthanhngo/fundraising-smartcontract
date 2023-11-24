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
import { ethers } from 'ethers';
export default function DisplayChart({ campaigns }) {
  console.log(
    campaigns.map((campaign) => ({
      title: campaign.title,
      deadline: campaign.deadline.toNumber(),
    }))
  );
  const data = campaigns.map((campaign) => ({
    title: campaign.title,
    target: ethers.utils.formatEther(campaign.target.toString()),
  }));
  return (
    <div>
      <h3>Income</h3>
      <BarChart
        width={1000}
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
        <XAxis dataKey='title' />
        <YAxis />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />

        {/* <CartesianGrid stroke='#ccc' /> */}
        <Tooltip />
        <Legend />
        {/* <Line
          type='monotone'
          dataKey='income'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        /> */}
        <Bar dataKey='target' barSize={30} fill='#8884d8' />
      </BarChart>
    </div>
  );
}
