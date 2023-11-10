import { DisplayCampaigns } from '../../../common/components/DisplayCampaigns/DisplayCampaigns';
import { useContract, useContractRead, useAddress } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS } from '../../../common/utils';
import { Loader } from '../../../common/components/misc/Loader';
export default function ProfilePage() {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: campaigns, isLoading } = useContractRead(
    contract,
    'getCampaigns'
  );
  return (
    <div>
      {isLoading ? (
        <Loader title='loading campaigns' />
      ) : (
        <div className='h-[100%] mx-[90px] '>
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
