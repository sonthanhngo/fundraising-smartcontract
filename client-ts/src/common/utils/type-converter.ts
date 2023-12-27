import { CampaignAfterFormat, CampaignFromContract } from './type';

export const campaignConverter = (
  campaign: CampaignFromContract
): CampaignAfterFormat => {
  return {
    ...campaign,
    deadline: campaign.deadline.toNumber(),
    target: campaign.target.toNumber(),
    amountCollected: campaign.amountCollected!.toNumber(),
    timeCreated: campaign.timeCreated.toNumber(),
  };
};

export const unixTimestampToDateConverter = (unixTimestamp: number): string => {
  return new Date(unixTimestamp).toLocaleDateString('en-UK');
};

export const VNDtoEtherConverter = (VND: number): number => {
  const etherPrice: number = 44519009;
  return Number((VND / etherPrice).toFixed(4));
};
