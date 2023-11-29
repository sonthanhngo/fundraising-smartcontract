import { ethers } from 'ethers';
import { convertVND } from '../../common/utils/index';
export const DisplayStatistics = ({ statistics }) => {
  return (
    <div>
      <div>
        <ul className='flex text-center items-center h-[130px] '>
          <li className='w-full h-full border-2 p-[20px] rounded-l-lg'>
            <h1 className='text-[2.4rem] font-semibold text-green-700'>
              {statistics[0].toNumber()}
            </h1>
            <h2 className='text-[1.2rem]'>campaigns</h2>
          </li>
          <li className='w-full h-full  border-y-[0.2rem] p-[20px]'>
            <h1 className='text-[2.4rem] font-semibold text-green-700'>
              {statistics[1].toNumber().toLocaleString('en-US')}
            </h1>
            <h2 className='text-[1.2rem]'>VND has sent</h2>
          </li>
          <li className='w-full h-full border-[0.2rem] p-[20px] rounded-r-lg '>
            <h1 className='text-[2.4rem] font-semibold text-green-700'>
              {statistics[2].toNumber()}
            </h1>
            <h2 className='text-[1.2rem]'>donators so far</h2>
          </li>
        </ul>
      </div>
      {/* )} */}
    </div>
  );
};
