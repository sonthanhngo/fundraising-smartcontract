import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import {
  useContract,
  useContractRead,
  Web3Button,
  useAddress,
} from '@thirdweb-dev/react';
import {
  daysLeft,
  convertUnixTimestamptoDate,
  CONTRACT_ADDRESS,
  convertVND,
  convertEthers,
} from '../../../common/utils';
import { useState } from 'react';
import { ImageSlider } from '../../../common/components/misc/ImageSlider';
import SendIcon from '@mui/icons-material/Send';
import { Loader } from '../../../common/components/misc/Loader';
import CampaignReviews from '../CampaignReviews';
import CampaignUpdates from '../CampaignUpdates';

export default function ViewCampaignPage() {
  // donate amount
  // get campaignId from url params
  const { campaignId } = useParams();
  //get address
  // get campaign data
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: campaign, isLoading: isLoadingCampaign } = useContractRead(
    contract,
    'getCampaignById',
    [campaignId]
  );
  const { data: donations, isLoading: isLoadingDonation } = useContractRead(
    contract,
    'getDonationById',
    [campaignId]
  );

  return (
    <div className='mx-[90px]'>
      {isLoadingCampaign ? (
        <Loader title='loading campaign' />
      ) : (
        <div>
          {isCreatingReview && <CreateReview id={campaign.id} />}
          {isCreatingReview && <CreateUpdate id={campaign.id} />}

          {/* title and description */}

          <div className='flex'>
            <div className='w-3/5'>
              <h1 className='font-semibold text-[2rem]'>recent updates</h1>
              <CampaignUpdates id={campaign.id} />
            </div>
            <div className='w-2/5 pl-10'>
              <h1 className='font-semibold text-[2rem]'>recent reviews</h1>
              <CampaignReviews id={campaign.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
