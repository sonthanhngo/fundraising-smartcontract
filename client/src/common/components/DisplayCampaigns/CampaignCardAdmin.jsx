// import { tagType, thirdweb } from '../assets';
import { convertUnixTimestamptoDate, daysLeft } from '../../utils';
import { ImageSlider } from '../misc/ImageSlider';
import { Web3Button } from '@thirdweb-dev/react';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { Loader } from '../misc/Loader';
import { CONTRACT_ADDRESS } from '../../utils';
import {
  useCampaignAcceptMutation,
  useCampaignDeclineMutation,
} from '../../../api/campaign';
export const CampaignCardAdmin = ({ campaign }) => {
  const {
    _id: id,
    owner,
    ownerName,
    title,
    target,
    deadline,
    description,
    images,
    timeCreated,
  } = campaign;

  console.log(campaign);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignAccept, { isLoading: isLoadingCampaignAccept }] =
    useCampaignAcceptMutation();
  const [campaignDecline, { isLoading: isLoadingCampaignDecline }] =
    useCampaignDeclineMutation();
  return (
    <div>
      {isLoading && <Loader title='confirm your transaction' />}
      <div className='w-full h-[230px] flex border-2 rounded-md '>
        {/* campaign image */}
        <div className='w-2/6 '>
          {' '}
          <ImageSlider images={images} />
        </div>
        {/* campaign data */}
        <div className='w-3/6 px-5'>
          <h1 className=' font-bold text-[1.2rem] text-green-700'>{title}</h1>
          <h1 className=' text-[1.2rem] my-3'>{description}</h1>

          <h2 className='text-[1rem] my-3 overflow-hidden whitespace-nowrap '>
            by{''} <span className='font-semibold'>{ownerName}</span> -{' '}
            <span className='font-semibold'>{owner}</span>
          </h2>
          <div className='bg-green-700 h-1 my-3 '></div>
          <h2>{target} </h2>
          {/* 
        <h2 className='text-[1rem]'>
          {percentageFund >= 1 ? (
            <span className='text-green-700 font-semibold'>
              {' '}
              {percentageFund}%{' '}
            </span>
          ) : (
            <span className='text-red-500 font-semibold'>
              {' '}
              {percentageFund}%{' '}
            </span>
          )}
          funded
        </h2> */}
          <h2 className='text-[1rem] mb-3'>
            starts at {convertUnixTimestamptoDate(timeCreated)}
          </h2>
          <h2 className='text-[1rem] mb-3'>
            ends in {convertUnixTimestamptoDate(deadline)}
          </h2>
        </div>
        <div className='w-1/6 my-10'>
          {/* <Web3Button
            contractAddress={CONTRACT_ADDRESS}
            action={async (contract) => {
              setIsLoading(true);
              await contract.call('acceptCampaign', [campaignId]);
              setIsLoading(false);
              window.location.reload();
            }}
            className='!bg-white'
          >
            <DoneIcon />
          </Web3Button> */}
          <Web3Button
            contractAddress={CONTRACT_ADDRESS}
            action={async (contract) => {
              setIsWaitingTransaction(true);
              const tx = await contract.call('createCampaign', [
                id,
                owner,
                ownerName,
                title,
                description,
                target,
                deadline,
                images,
              ]);
              const payload = await campaignAccept({ id: id }).unwrap();
              console.log(payload);
              setIsWaitingTransaction(false);
            }}
            onError={() => {
              setIsWaitingTransaction(false);
              window.location.reload();
            }}
          >
            publish campaign
          </Web3Button>
          <button
            className='bg-gray-400'
            onClick={async () => {
              const payload = await campaignDecline({ id: id }).unwrap();
              console.log(payload);
            }}
          >
            decline campaign
          </button>
        </div>
      </div>
    </div>
  );
};
