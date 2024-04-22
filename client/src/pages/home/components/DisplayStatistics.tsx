import {
  StatisticsAfterFormat,
  StatisticsFromContract,
} from '@/src/common/utils/type';
import { statisticsConverter } from '@/src/common/utils/type-converter';
import React from 'react';
type DisplayStatisticsProps = {
  statistics: StatisticsFromContract;
};
export const DisplayStatistics = ({ statistics }: DisplayStatisticsProps) => {
  const { totalCampaigns, totalDonations, totalDonators } =
    React.useMemo<StatisticsAfterFormat>(() => {
      return statisticsConverter(statistics);
    }, [statistics]);
  return (
    <div>
      <div>
        <ul className='flex text-center items-center h-[130px] '>
          <li className='w-full h-full border-2 p-[20px] rounded-l-lg  font-semibold'>
            <h1 className='text-[2.4rem] text-green-700'>{totalCampaigns}</h1>
            <h2 className='text-[1.2rem]'>campaigns</h2>
          </li>
          <li className='w-full h-full  border-y-[0.2rem] p-[20px]  font-semibold'>
            <h1 className='text-[2.4rem] text-green-700'>
              đ{totalDonations.toLocaleString('en-UK')}
            </h1>
            <h2 className='text-[1.2rem]'>has sent</h2>
          </li>
          <li className='w-full h-full border-[0.2rem] p-[20px] rounded-r-lg  font-semibold'>
            <h1 className='text-[2.4rem] text-green-700'>{totalDonators}</h1>
            <h2 className='text-[1.2rem]'>donators so far</h2>
          </li>
        </ul>
      </div>
      {/* )} */}
    </div>
  );
};
