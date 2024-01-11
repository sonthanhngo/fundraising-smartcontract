import { useContract, useContractRead, useAddress } from '@thirdweb-dev/react';
import { CONTRACT_ADDRESS } from '@src/common/utils/constant';
import { Loader } from '@src/common/components/Loader';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shadcn/components/ui/tabs';
import { FundraisedTab } from './components/FundraisedTab';
import { ImpactTab } from './components/ImpactTab';

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
    <div className='mx-[90px] '>
      {isLoadingCampaigns || isLoadingDonations || !address ? (
        <Loader content='loading campaigns' />
      ) : (
        <div>
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
            <TabsList className='rounded-none w-1/2 grid grid-cols-2'>
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
              <ImpactTab campaigns={campaigns} donations={donations} />
            </TabsContent>
            <TabsContent value='fundraise'>
              <FundraisedTab
                campaigns={campaigns}
                donations={donations}
                address={address!}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
