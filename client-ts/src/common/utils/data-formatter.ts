import {
  CampaignAfterFormat,
  ChartData,
  DonationAfterFormat,
  DonationFromContract,
  ProfileStatistics,
} from './type';

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

  const result = Object.keys(summedDonations).map((date) => ({
    donations: summedDonations[date],
    donationsTime: date,
  }));

  return result;
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
  campaigns: CampaignAfterFormat[],
  donations: DonationAfterFormat[] | DonationFromContract[],
  address: string
): CampaignAfterFormat[] => {
  const userDonatedCampaigns: CampaignAfterFormat[] = [];

  campaigns.forEach((campaign, index) => {
    const donators = donations[index].donators;
    donators.forEach((donator) => {
      if (donator === address) {
        userDonatedCampaigns.push(campaign);
      }
    });
  });
  return userDonatedCampaigns;
};
export const getCampaignsSortedByDate = (campaigns: CampaignAfterFormat[]) => {
  const temp = [...campaigns];
  return temp.sort((a, b) => b.timeCreated - a.timeCreated);
};