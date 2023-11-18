import { useContract, useContractRead } from '@thirdweb-dev/react';
import { DisplayCampaigns } from '../../../common/components/DisplayCampaigns/DisplayCampaigns';
import { DisplayStatistics } from '../DisplayStatistics';
import { Loader } from '../../../common/components/misc/Loader';
import { CONTRACT_ADDRESS } from '../../../common/utils';
import { ContractFactory } from 'ethers';
export default function HomePage() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: campaigns, isLoading: isLoadingCampaigns } = useContractRead(
    contract,
    'getCampaigns'
  );
  const { data: statistics, isLoading: isLoadingStatistics } = useContractRead(
    contract,
    'getStatistics'
  );

  // useEffect(() => {
  //   if (!isLoadingStatistics) {
  //     console.log(statistics);
  //   }
  // });

  return (
    <div className='h-[100%] mx-[90px] mt-6'>
      {isLoadingCampaigns && isLoadingStatistics ? (
        <Loader title='loading campaigns' />
      ) : (
        <div>
          <div className='text-center '>
            <h1 className='text-[2.4rem] font-bold text-green-700'>
              for the community
            </h1>
            <h2 className='text-[1.2rem] my-3'>on GayQuyViet:</h2>
          </div>
          {/* Display statisctics */}
          <DisplayStatistics statistics={statistics} />
          {/* Display latest  campaigns */}
          <DisplayCampaigns
            title='latest campaigns'
            campaigns={campaigns}
            type='home'
          />
        </div>
      )}
    </div>
  );
}