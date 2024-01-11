import React from 'react';
import {
  CampaignAfterFormat,
  CampaignFromContract,
  DonationFromContract,
} from '../utils/type';
import { useAddress } from '@thirdweb-dev/react';
import { campaignConverter } from '../utils/type-converter';
import {
  getCampaignsSortedByDate,
  getUserCreatedCampaigns,
  getUserDonatedCampaigns,
} from '../utils/data-formatter';
import { Pagination } from './components/Pagination';
import { Campaign as CampaignFromServer } from '@src/api/campaign';

type DisplayCampaignsProps = {
  campaigns: CampaignFromContract[] | CampaignFromServer[];
  donations?: DonationFromContract[];
  type: 'admin' | 'userDonated' | 'userCreated' | 'home';
};

export const DisplayCampaigns = ({
  campaigns,
  donations,
  type,
}: DisplayCampaignsProps) => {
  const address = useAddress();
  const sortedCampaigns: CampaignAfterFormat[] = React.useMemo(() => {
    if (type !== 'admin') {
      const formattedCampaigns = campaigns.map((campaign) =>
        campaignConverter(campaign as CampaignFromContract)
      );
      return getCampaignsSortedByDate(formattedCampaigns);
    } else {
      return [];
    }
  }, [campaigns, type]);

  const userCreatedCampaigns: CampaignAfterFormat[] = React.useMemo(() => {
    if (address && type === 'userCreated') {
      return getUserCreatedCampaigns(sortedCampaigns, address);
    } else {
      return [];
    }
  }, [address, type, sortedCampaigns]);

  const userDonatedCampaigns: CampaignAfterFormat[] = React.useMemo(() => {
    if (address && type === 'userDonated') {
      return getUserDonatedCampaigns(
        campaigns as CampaignFromContract[],
        donations!,
        address
      );
    } else {
      return [];
    }
  }, [address, type, campaigns, donations]);

  return (
    <div className=''>
      <h1 className='text-[2.4rem] font-bold text-green-700 my-5'>
        {type === 'admin' && 'waiting for verified'}
        {type === 'home' && 'all'}
        {type === 'userCreated' && 'your'}
        {type === 'userDonated' && 'donated'} campaigns
      </h1>
      {type === 'admin' && (
        <Pagination
          campaigns={campaigns as CampaignFromServer[]}
          isAdmin={true}
        />
      )}
      {type === 'userDonated' && (
        <Pagination campaigns={userDonatedCampaigns} />
      )}
      {type === 'userCreated' && (
        <Pagination campaigns={userCreatedCampaigns} />
      )}
      {type === 'home' && <Pagination campaigns={sortedCampaigns} />}
    </div>
  );
};
