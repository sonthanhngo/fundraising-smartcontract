import {
  CampaignAfterFormat,
  CampaignFromContract,
  DonationAfterFormat,
  DonationFromContract,
  StatisticsFromContract,
  StatisticsAfterFormat,
} from './type';
import { ETH_PRICE } from './constant';
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

export const donationConverter = (
  donation: DonationFromContract
): DonationAfterFormat => {
  return {
    ...donation,
    donationsTime: donation.donationsTime.map((time) => time.toNumber()),
    donations: donation.donations.map((donation) => donation.toNumber()),
  };
};

export const statisticsConverter = (
  statistics: StatisticsFromContract
): StatisticsAfterFormat => {
  return {
    totalCampaigns: statistics[0].toNumber(),
    totalDonations: statistics[1].toNumber(),
    totalDonators: statistics[2].toNumber(),
  };
};

export const unixTimestampToDateConverter = (unixTimestamp: number): string => {
  return new Date(unixTimestamp).toLocaleDateString('en-UK');
};

export const VNDtoEtherConverter = (VND: number): number => {
  const etherPrice: number = ETH_PRICE;
  return Number((VND / (etherPrice * 24635)).toFixed(4));
};
