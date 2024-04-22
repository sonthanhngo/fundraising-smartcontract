import { DisplayCampaigns } from '@/src/common/campaign';
import {
  CampaignFromContract,
  DonationFromContract,
} from '@/src/common/utils/type';

type ImpactTabProps = {
  campaigns: CampaignFromContract[];
  donations: DonationFromContract[];
};
export const ImpactTab = ({ campaigns, donations }: ImpactTabProps) => {
  return (
    <div>
      <DisplayCampaigns
        campaigns={campaigns}
        donations={donations}
        type='userDonated'
      />
    </div>
  );
};
