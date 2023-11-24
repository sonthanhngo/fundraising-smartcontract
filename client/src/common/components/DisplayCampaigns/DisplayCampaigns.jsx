import { ethers } from 'ethers';
import { Pagination } from './Pagination';

export const DisplayCampaigns = ({ title, campaigns, type, address }) => {
  const parsedCampaigns = (campaigns, type, address) => {
    const parsedData = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      ownerName: campaign.ownerName,
      verified: campaign.verified,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      timeCreated: campaign.timeCreated.toNumber(),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      donators: campaign.donators,
      images: campaign.images,
      campaignId: i,
    }));
    const tempCampaigns = [...parsedData];
    const sortedCampaigns = tempCampaigns.sort(
      (a, b) => b.timeCreated - a.timeCreated
    );
    if (type === 'admin') {
      return sortedCampaigns.filter((campaign) => campaign.verified === 1);
    } else if (type === 'home') {
      return sortedCampaigns.filter((campaign) => campaign.verified === 2);
    } else if (type === 'userCampaign') {
      return sortedCampaigns.filter(
        (campaign) => campaign.owner === address && campaign.verified !== 0
      );
    } else if (type === 'userDonatedCampaign') {
      return sortedCampaigns.filter(
        (campaign) =>
          campaign.verified === 2 &&
          campaign.donators !== undefined &&
          campaign.donators.includes(address)
      );
    }
  };

  return (
    <div className=''>
      <h1 className='text-[2.4rem] font-bold text-green-700 my-5'>{title}</h1>
      {type === 'admin' ? (
        <Pagination
          campaigns={parsedCampaigns(campaigns, type, address)}
          isAdmin={true}
        />
      ) : (
        <Pagination campaigns={parsedCampaigns(campaigns, type, address)} />
      )}
    </div>
  );
};
