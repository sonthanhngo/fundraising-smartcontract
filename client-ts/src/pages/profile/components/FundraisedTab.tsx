import React from 'react';
import {
  CampaignFromContract,
  DonationFromContract,
} from '@/src/common/utils/type';
import { getProfileDonations } from '@/src/common/utils/data-formatter';
import { donationConverter } from '@/src/common/utils/type-converter';
import { ChartData, ProfileStatistics } from '@/src/common/utils/type';
import {
  getChartData,
  getProfileStatistics,
} from '@/src/common/utils/data-formatter';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { DisplayCampaigns } from '@/src/common/campaign';

type FundraisedTabProps = {
  campaigns: CampaignFromContract[];
  donations: DonationFromContract[];
  address: string;
};

export const FundraisedTab = ({
  campaigns,
  donations,
  address,
}: FundraisedTabProps) => {
  const campaignsDonations = React.useMemo(() => {
    const formattedDonations = donations.map((donation) =>
      donationConverter(donation)
    );
    return getProfileDonations(formattedDonations, address);
  }, [donations, address]);

  const chartData: ChartData = React.useMemo(() => {
    return getChartData(campaignsDonations);
  }, [campaignsDonations]);
  console.log(chartData);
  const { totalCampaigns, totalDonations, totalDonators }: ProfileStatistics =
    React.useMemo(() => {
      return getProfileStatistics(campaignsDonations);
    }, [campaignsDonations]);
  return (
    <div>
      {campaignsDonations.length === 0 ? (
        `${address} hasn't created any campaign yet!`
      ) : (
        <div>
          {/* Display statistics */}
          <h1 className='text-[2.4rem] font-bold text-green-700 my-5'>
            campaigns statistics
          </h1>
          <div className='flex space-x justify-between'>
            {/* <DisplayChart donations={donations} /> */}
            <div className='w-3/4 '>
              <ResponsiveContainer width='100%' height={350}>
                <BarChart data={chartData}>
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
                    formatter={(value) => Number(value).toLocaleString()}
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
            {/* <Statistics stats={getTotalDonations(donations)} /> */}
            <div className='w-1/4 ml-5 text-center justify-between'>
              <div className='w-full h-[100px] border-2 rounded-md'>
                <h1 className='font-semibold text-[1.2rem] '>
                  total campaigns
                </h1>
                <h1 className='mt-1 font-bold text-[2rem] text-green-700'>
                  {totalCampaigns}
                </h1>
              </div>
              <div className='w-full h-[100px] mt-5  border-2 rounded-md'>
                <h1 className='font-semibold text-[1.2rem] '>total donators</h1>
                <h1 className='mt-1 font-bold text-[2rem] text-green-700'>
                  {totalDonators}
                </h1>
              </div>
              <div className='w-full h-[100px]  mt-5 border-2 rounded-md'>
                <h1 className='font-semibold text-[1.2rem] '>
                  total donations
                </h1>
                <h1 className='mt-1 font-bold text-[2rem] text-green-700'>
                  đ{totalDonations.toLocaleString('en-US')}
                </h1>
              </div>
            </div>
          </div>
          {/* DisplayCampaigns */}
          <DisplayCampaigns campaigns={campaigns} type='userCreated' />
        </div>
      )}
    </div>
  );
};
