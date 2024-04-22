import { useParams } from 'react-router-dom';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { Loader } from '@src/common/components/Loader';
import { CONTRACT_ADDRESS } from '@/src/common/utils/constant';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shadcn/components/ui/tabs';
import { Layout } from './components/Layout';
import { useReviewGetAllByCampaignIdQuery } from '@/src/api/review';
import { useUpdateGetAllByCampaignIdQuery } from '@/src/api/update';
import { UpdatesTab } from './components/UpdatesTab';
import { DonationsTab } from './components/DonationsTab';
import { ReviewsTab } from './components/ReviewsTab';

export default function ViewCampaignPage() {
  // get campaignId from url params
  const { campaignId } = useParams();
  // get campaign data
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: campaign, isLoading: isLoadingCampaign } = useContractRead(
    contract,
    'getCampaignById',
    [campaignId]
  );
  const { data: donation, isLoading: isLoadingDonation } = useContractRead(
    contract,
    'getDonationById',
    [campaignId]
  );
  const { data: reviews, isLoading: isLoadingReviews } =
    useReviewGetAllByCampaignIdQuery({
      id: campaignId!,
    });
  const { data: updates, isLoading: isLoadingUpdates } =
    useUpdateGetAllByCampaignIdQuery({ id: campaignId! });
  return (
    <div className='mx-[90px] '>
      {isLoadingCampaign ||
      isLoadingDonation ||
      isLoadingReviews ||
      isLoadingUpdates ? (
        <Loader content='loading campaign' />
      ) : (
        <div>
          <Layout campaign={campaign} donation={donation} />
          <Tabs className='w-3/5 h-[50vh]'>
            <TabsList className='grid grid-cols-3 '>
              {['donations', 'updates', 'reviews'].map((tab) => (
                <TabsTrigger
                  value={tab}
                  key={tab}
                  className='data-[state=active]:text-green-700 text-[1.2rem]'
                >
                  {tab === 'reviews' && `${tab} (${reviews!.length})`}
                  {tab === 'updates' && `${tab} (${updates!.length})`}
                  {tab === 'donations' &&
                    `${tab} (${donation.donators.length})`}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value='updates'>
              <UpdatesTab
                updates={updates!}
                owner={campaign.owner}
                ownerName={campaign.ownerName}
              />
            </TabsContent>
            <TabsContent value='donations'>
              <DonationsTab donation={donation} />
            </TabsContent>
            <TabsContent value='reviews'>
              <ReviewsTab reviews={reviews!} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
