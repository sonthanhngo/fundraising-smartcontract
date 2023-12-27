import { useContract, useContractRead } from '@thirdweb-dev/react';
import { DisplayCampaigns } from '../../../common/components/DisplayCampaigns/DisplayCampaigns';
import { DisplayStatistics } from '../DisplayStatistics';
import { Loader } from '../../../common/components/misc/Loader';
import {
  CONTRACT_ADDRESS,
  convertUnixTimestamptoDate,
} from '../../../common/utils';
import { ContractFactory } from 'ethers';
export default function HomePage() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: statistics, isLoading: isLoadingStatistics } = useContractRead(
    contract,
    'getStatistics'
  );
  const { data: campaigns, isLoading: isLoadingCampaigns } = useContractRead(
    contract,
    'getCampaigns'
  );

  if (!isLoadingCampaigns && !isLoadingStatistics) {
    console.log(statistics);
    // console.log(campaigns[0]);
    // console.log(campaigns[0].amountCollected.toNumber());
    // console.log(campaigns[0].target.toNumber());
    // console.log(campaigns[0].timeCreated.toNumber());

    // console.log(typeof campaigns[0].deadline.toString());
    console.log(campaigns);
  }
  console.log('Loading campaigns: ' + isLoadingCampaigns);

  console.log('Loading statistics: ' + isLoadingStatistics);
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
