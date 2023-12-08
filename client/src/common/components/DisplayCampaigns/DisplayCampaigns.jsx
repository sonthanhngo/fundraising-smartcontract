import { ethers } from 'ethers';
import { Pagination } from './Pagination';

export const DisplayCampaigns = ({ title, campaigns, type, address }) => {
  const parsedCampaigns = (campaigns, type, address) => {
    const parsedData = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      ownerName: campaign.ownerName,
      title: campaign.title,
      description: campaign.description,
      target: campaign.target.toNumber(),
      timeCreated: campaign.timeCreated.toNumber(),
      deadline: campaign.deadline.toNumber(),
      amountCollected: campaign.amountCollected.toNumber(),
      images: campaign.images,
      campaignId: i,
    }));
    const tempCampaigns = [...parsedData];
    const sortedCampaigns = tempCampaigns.sort(
      (a, b) => b.timeCreated - a.timeCreated
    );

    if (type === 'home') {
      return sortedCampaigns;
    } else if (type === 'userCampaign') {
      return sortedCampaigns.filter((campaign) => campaign.owner === address);
    }
    // } else if (type === 'userDonatedCampaign') {
    //   return sortedCampaigns.filter(
    //     (campaign) =>
    //       campaign.donators !== undefined && campaign.donators.includes(address)
    //   );
    // }
  };
  return (
    <div className=''>
      <h1 className='text-[2.4rem] font-bold text-green-700 my-5'>{title}</h1>
      {type === 'admin' ? (
        <Pagination campaigns={campaigns} isAdmin={true} />
      ) : (
        <Pagination campaigns={parsedCampaigns(campaigns, type, address)} />
      )}
    </div>
  );
};
