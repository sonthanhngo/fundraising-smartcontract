import { useCampaignGetAllQuery } from '@src/api/campaign';
import { Loader } from '@src/common/components/Loader';
import { DisplayCampaigns } from '@/src/common/campaign';
import { useAddress } from '@thirdweb-dev/react';
import { useNavigate } from 'react-router-dom';
export default function AdminPage() {
  const address = useAddress();
  const { data: campaigns, isLoading } = useCampaignGetAllQuery();
  const navigate = useNavigate();
  return (
    <div className='mx-[90px]'>
      {isLoading || !address ? (
        <Loader content='loading campaigns' />
      ) : (
        <>
          {address != '0x12b70411d7eD174c9841E6c1E6ec5bF052eB5e86' ? (
            navigate('/')
          ) : (
            <DisplayCampaigns campaigns={campaigns!} type='admin' />
          )}
        </>
      )}
    </div>
  );
}
