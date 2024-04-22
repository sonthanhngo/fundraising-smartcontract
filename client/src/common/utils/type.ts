import { BigNumber } from 'ethers';

export type CampaignFromContract = {
  id: string;
  owner: string;
  ownerName: string;
  title: string;
  description: string;
  deadline: BigNumber;
  target: BigNumber;
  timeCreated: BigNumber;
  amountCollected?: BigNumber;
  images: string[];
};

export type CampaignAfterFormat = {
  id: string;
  owner: string;
  ownerName: string;
  title: string;
  description: string;
  deadline: number;
  target: number;
  timeCreated: number;
  amountCollected: number;
  images: string[];
};

export type StatisticsFromContract = BigNumber[];

export type StatisticsAfterFormat = {
  totalCampaigns: number;
  totalDonations: number;
  totalDonators: number;
};

export type DonationFromContract = {
  owner: string;
  donators: string[];
  donationsTime: BigNumber[];
  donations: BigNumber[];
};

export type DonationAfterFormat = {
  owner: string;
  donators: string[];
  donationsTime: number[];
  donations: number[];
};

export type ChartDataItem = {
  donationsTime: string;
  donations: number;
};

export type ChartData = ChartDataItem[];

export type ProfileStatistics = {
  totalDonations: number;
  totalDonators: number;
  totalCampaigns: number;
};

export type Conversation = {
  _id: string;
  recipient1: string;
  recipient2: string;
  messages: Message[];
};
export type Message = {
  to: string;
  time: number;
  content: string;
};
