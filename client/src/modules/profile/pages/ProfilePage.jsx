import { DisplayCampaigns } from '../../../common/components/DisplayCampaigns/DisplayCampaigns';
import { useContract, useContractRead, useAddress } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS, getProfileDonations } from '../../../common/utils';
import { Loader } from '../../../common/components/misc/Loader';
import DisplayProfileStatistics from '../components/DisplayProfileStatistics';
export default function ProfilePage() {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: campaigns, isLoading: isLoadingCampaigns } = useContractRead(
    contract,
    'getCampaigns'
  );
  const { data: donations, isLoading: isLoadingDonations } = useContractRead(
    contract,
    'getDonations'
  );
  return (
    <div>
      {isLoadingCampaigns && isLoadingDonations ? (
        <Loader title='loading campaigns' />
      ) : (
        <div className='h-[100%] mx-[90px] '>
          <DisplayProfileStatistics
            donations={getProfileDonations(donations, address)}
          />
          <DisplayCampaigns
            campaigns={campaigns}
            title='your campaigns'
            type='userCampaign'
            address={address}
          />
          <DisplayCampaigns
            campaigns={campaigns}
            title='your donated campaigns'
            type='userDonatedCampaign'
            address={address}
          />
        </div>
      )}
    </div>
  );
}
