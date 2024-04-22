import { Carousel } from '@/src/common/components/Carousel';
import { getDaysLeft } from '@/src/common/utils/data-formatter';
import {
  CampaignFromContract,
  DonationFromContract,
} from '@/src/common/utils/type';
import {
  campaignConverter,
  donationConverter,
  unixTimestampToDateConverter,
} from '@/src/common/utils/type-converter';
import React from 'react';

import { Progress } from '@shadcn/components/ui/progress';
import { DonationCard } from './DonationCard';
import { UpdateCard } from './UpdateCard';
import { useAddress } from '@thirdweb-dev/react';
type LayoutProps = {
  campaign: CampaignFromContract;
  donation: DonationFromContract;
};
export const Layout = ({ campaign, donation }: LayoutProps) => {
  const address = useAddress();
  const [isCopied, setIsCopied] = React.useState(false);
  const formattedCampaign = React.useMemo(() => {
    return campaignConverter(campaign);
  }, [campaign]);
  const formattedDonation = React.useMemo(() => {
    return donationConverter(donation);
  }, [donation]);
  const {
    id,
    owner,
    ownerName,
    title,
    description,
    amountCollected,
    deadline,
    target,
    images,
  } = formattedCampaign;
  const percentageFund = (amountCollected / target) * 100;
  const { donators } = formattedDonation;
  const [donationCard, setDonationCard] = React.useState(false);
  const handleCloseDonationCard = () => {
    setDonationCard(false);
  };
  const handleOpenDonationCard = () => {
    setDonationCard(true);
  };

  const [updateCard, setUpdateCard] = React.useState(false);
  const handleCloseUpdateCard = () => {
    setUpdateCard(false);
  };
  const handleOpenUpdateCard = () => {
    setUpdateCard(true);
  };
  return (
    <div className='h-[90vh] relative'>
      {/* donation card */}
      {donationCard && (
        <DonationCard id={id} onClose={handleCloseDonationCard} />
      )}
      {updateCard && <UpdateCard id={id} onClose={handleCloseUpdateCard} />}
      {/* title */}
      <h1 className=' font-bold text-[2.4rem] text-green-700'>{title}</h1>
      {/* update button */}
      {address !== undefined && address === owner && (
        <button
          className='absolute right-0 top-5'
          onClick={handleOpenUpdateCard}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
            />
          </svg>
        </button>
      )}
      {/* container */}
      <div className='flex mt-10'>
        {/* left side */}
        <div className='w-3/5'>
          <div className=' h-[50vh]'>
            <Carousel images={images} haveDot={true} />
            <h2 className='text-[1rem] font-semibold mt-2'>
              by <span className='text-green-700'>{ownerName}</span> is
              organizing this fundraise
            </h2>
            <h2 className='text-[1rem] font-bold px-6'>
              <span className='text-green-700'>{owner}</span>
            </h2>
          </div>
          <div className=' mt-20 text-[1.2rem] h-[15vh] '>
            <h1 className='text-green-700 font-bold'>about this campaign:</h1>
            <p className='border-2 h-full rounded-md p-2 font-semibold'>
              {description}
            </p>
          </div>
        </div>
        {/* right side */}
        <div className='w-2/5 pl-10'>
          {/* campaign info */}
          <div className=' h-[50vh]'>
            <div className='h-1/4 py-0'>
              <h3 className='font-bold text-[2.4rem] text-green-700 '>
                đ{amountCollected.toLocaleString('en-US')}
              </h3>
              <h4 className=' text-[1.2rem]'>
                of target{' '}
                <span className='font-bold'>
                  đ{target.toLocaleString('en-US')}
                </span>
              </h4>
              <Progress
                value={percentageFund >= 100 ? 100 : percentageFund}
                className='my-2'
                color={percentageFund >= 100 ? 'bg-green-700' : 'bg-red-700'}
              />
            </div>
            <div className='h-1/4'>
              <h3 className='font-bold text-[2.4rem]'>{donators.length}</h3>
              <h4 className=' text-[1.2rem]'>peoples donated</h4>
            </div>
            <div className='h-1/4'>
              <h3 className='font-bold text-[2.4rem]'>
                {getDaysLeft(deadline) < 0 ? 0 : getDaysLeft(deadline)} days
                left
              </h3>
              <h4 className=' text-[1.2rem]'>
                ends in
                <span className='font-bold'>
                  {' '}
                  {unixTimestampToDateConverter(deadline)}
                </span>
              </h4>
            </div>
            <div className='h-1/4 flex-col space-y-5 mt-5'>
              <button
                className='text-center w-full bg-green-700 text-white rounded-md h-1/3 font-semibold'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.toString());
                  setIsCopied(true);
                }}
              >
                {!isCopied ? 'share this campaign' : 'COPIED URL TO CLIPBOARD'}
              </button>
              <button
                className='text-center w-full h-1/3 bg-red-700 text-white rounded-md font-semibold '
                onClick={handleOpenDonationCard}
              >
                please donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
