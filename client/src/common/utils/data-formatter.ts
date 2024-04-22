import {
  CampaignAfterFormat,
  CampaignFromContract,
  ChartData,
  DonationAfterFormat,
  DonationFromContract,
  ProfileStatistics,
} from './type';
import { campaignConverter } from './type-converter';

export const getDaysLeft = (deadline: number): number => {
  const difference: number = deadline - Date.now();
  const daysLeft = difference / (24 * 60 * 60 * 1000);
  return Math.floor(daysLeft);
};

export const getProfileDonations = (
  donations: DonationAfterFormat[],
  address: string
): DonationAfterFormat[] => {
  return donations.filter((donation) => donation.owner === address);
};

export const getToAddress = (
  address1: string,
  address2: string,
  address: string
): string => {
  if (address1 === address) {
    return address2;
  } else {
    return address1;
  }
};
export const getChartData = (donations: DonationAfterFormat[]): ChartData => {
  const mydonations = donations.map((donation) => ({
    ...donation,
    donationsTime: donation.donationsTime.map(
      (time) => `${new Date(time).toLocaleDateString('en-GB')}`
    ),
  }));

  const summedDonations: Record<string, number> = {};

  mydonations.forEach((item) => {
    item.donations.forEach((donation, i) => {
      if (!summedDonations[item.donationsTime[i]]) {
        summedDonations[item.donationsTime[i]] = 0;
      }

      summedDonations[item.donationsTime[i]] += donation;
    });
  });

  const result = Object.keys(summedDonations)
    .map((date) => ({
      donations: summedDonations[date],
      donationsTime: date,
    }))
    .sort((a, b) => {
      const [dayA] = a.donationsTime.split('/');
      const [dayB] = b.donationsTime.split('/');
      console.log(dayA);
      return parseInt(dayA) - parseInt(dayB);
    });
  return result.reverse();
};

export const getProfileStatistics = (
  donations: DonationAfterFormat[]
): ProfileStatistics => {
  let totalDonations = 0;
  let totalDonators = 0;
  let totalCampaigns = 0;
  donations.forEach((donation) => {
    totalCampaigns += 1;
    totalDonators += donation.donations.length;
    donation.donations.forEach((donation) => (totalDonations += donation));
  });
  return { totalDonations, totalDonators, totalCampaigns };
};

export const getUserCreatedCampaigns = (
  campaigns: CampaignAfterFormat[],
  address: string
): CampaignAfterFormat[] => {
  return campaigns.filter((campaign) => campaign.owner === address);
};

export const getUserDonatedCampaigns = (
  campaigns: CampaignFromContract[],
  donations: DonationAfterFormat[] | DonationFromContract[],
  address: string
): CampaignAfterFormat[] => {
  const userDonatedCampaigns: CampaignFromContract[] = [];
  campaigns.forEach((campaign, index) => {
    const donators = donations[index].donators;
    donators.forEach((donator) => {
      if (donator === address && !userDonatedCampaigns.includes(campaign)) {
        userDonatedCampaigns.push(campaign);
      }
    });
  });
  const formattedCampaigns = userDonatedCampaigns.map((campaign) =>
    campaignConverter(campaign)
  );
  return getCampaignsSortedByDate(formattedCampaigns);
};
export const getCampaignsSortedByDate = (campaigns: CampaignAfterFormat[]) => {
  const temp = [...campaigns];
  return temp.sort((a, b) => a.timeCreated - b.timeCreated);
};
