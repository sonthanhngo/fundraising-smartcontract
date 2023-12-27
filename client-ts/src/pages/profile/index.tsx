import { DisplayCampaigns } from '../../../common/components/DisplayCampaigns/DisplayCampaigns';
import { useContract, useContractRead, useAddress } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS, getProfileDonations } from '../../../common/utils';
import { Loader } from '../../../common/components/misc/Loader';
import DisplayProfileStatistics from '../components/DisplayProfileStatistics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMemo } from 'react';

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
 
  const campaignsDonations = useMemo(() => {
    if (!isLoadingDonations) {
      return getProfileDonations(donations, address);
    } else {
      return [];
    }
  }, [donations, isLoadingDonations, address]);
  return (
    <div className='mx-[90px] '>
      <div className='flex'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-[10rem] h-[10rem]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
        <div className='mx-5 mt-5'>
          <h1 className='font-bold text-[2rem]'>{address}</h1>
        </div>
      </div>

      <Tabs defaultValue='impact' className='w-full mt-10'>
        <TabsList className='rounded-none'>
          <TabsTrigger
            value='impact'
            className='text-[1.2rem]  rounded-none border-b-2 data-[state=active]:text-green-700  data-[state=active]:border-green-700'
          >
            Impact
          </TabsTrigger>
          <TabsTrigger
            value='fundraise'
            className='text-[1.2rem] rounded-none border-b-2 data-[state=active]:text-green-700 data-[state=active]:border-green-700'
          >
            Fundraise
          </TabsTrigger>
        </TabsList>
        <TabsContent value='impact'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='fundraise'>
          {isLoadingCampaigns && isLoadingDonations ? (
            <Loader title='loading campaigns' />
          ) : (
            <div>
              {campaignsDonations.length === 0 ? (
                'no campaigns'
              ) : (
                <div>
                  <DisplayProfileStatistics donations={campaignsDonations} />
                  <DisplayCampaigns
                    campaigns={campaigns}
                    title='your campaigns'
                    type='userCampaign'
                    address={address}
                  />
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
      {/* {isLoadingCampaigns && isLoadingDonations ? (
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
      )} */}
    </div>
  );
}
