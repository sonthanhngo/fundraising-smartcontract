import { CONTRACT_ADDRESS } from '../../../common/utils';
import { useContract, useContractRead, useAddress } from '@thirdweb-dev/react';
import { DisplayCampaigns } from '../../../common/components/DisplayCampaigns/DisplayCampaigns';
import { Loader } from '../../../common/components/misc/Loader';
export default function AdminPage() {
  const address = useAddress();
  const ADMIN_ADDRESS = '0x12b70411d7eD174c9841E6c1E6ec5bF052eB5e86';
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: campaigns, isLoading } = useContractRead(
    contract,
    'getCampaigns'
  );

  return (
    <div>
      {address !== ADMIN_ADDRESS ? (
        <Loader title='not admin, prohibited' />
      ) : (
        <div className='h-[100%] mx-[90px]'>
          {isLoading ? (
            <Loader title='loading campaigns' />
          ) : (
            <DisplayCampaigns
              campaigns={campaigns}
              title='admin dashboard'
              type='admin'
            />
          )}
        </div>
      )}
    </div>
  );
}
