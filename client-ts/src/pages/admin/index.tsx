import { useCampaignGetAllQuery } from '@src/api/campaign';
import { Loader } from '@src/common/components/Loader';
import { DisplayCampaigns } from '@/src/common/campaign';
import { useAddress } from '@thirdweb-dev/react';
export default function AdminPage() {
  const address = useAddress();
  const { data: campaigns, isLoading } = useCampaignGetAllQuery();

  return (
    <div className='mx-[90px]'>
      {isLoading || !address ? (
        <Loader content='loading campaigns' />
      ) : (
        <DisplayCampaigns campaigns={campaigns!} type='admin' />
      )}
    </div>
  );
}
