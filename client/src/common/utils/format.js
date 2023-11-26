const parsedCampaigns = (campaigns, type, address) => {
  const parsedData = campaigns.map((campaign, i) => ({
    owner: campaign.owner,
    ownerName: campaign.ownerName,
    title: campaign.title,
    description: campaign.description,
    target: campaign.target,
    timeCreated: campaign.timeCreated.toNumber(),
    deadline: campaign.deadline.toNumber(),
    amountCollected: ethers.utils.formatEther(
      campaign.amountCollected.toString()
    ),
    images: campaign.images,
    campaignId: i,
  }));
  const tempCampaigns = [...parsedData];
  const sortedCampaigns = tempCampaigns.sort(
    (a, b) => b.timeCreated - a.timeCreated
  );
};
