// import { tagType, thirdweb } from '../assets';
import { convertUnixTimestamptoDate, daysLeft } from '../../utils';
import { ImageSlider } from '../misc/ImageSlider';
import { Web3Button } from '@thirdweb-dev/react';
import DoneIcon from '@mui/icons-material/Done';
import { useState, useRef } from 'react';
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
  const buttonRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [campaignAccept, { isLoading: isLoadingCampaignAccept }] =
    useCampaignAcceptMutation();
  const [campaignDecline, { isLoading: isLoadingCampaignDecline }] =
    useCampaignDeclineMutation();
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false);
  return (
    <div>
      {isWaitingTransaction && <Loader title='confirm your transaction' />}
      <div className='w-full h-[230px] flex border-2 rounded-md '>
        {/* campaign image */}
        <div className='w-2/6 '>
          {' '}
          <ImageSlider images={images} />
        </div>
        {/* campaign data */}
        <div className='w-3/6 px-5 py-5'>
          <h1 className=' font-bold text-[1.2rem] text-green-700'>{title}</h1>
          <h1 className=' text-[1.2rem] mt-3'>{description}</h1>

          <h2 className='text-[1rem] mt-3 overflow-hidden whitespace-nowrap '>
            by{''} <span className='font-semibold'>{ownerName}</span> -{' '}
            <span className='font-semibold'>{owner}</span>
          </h2>
          <h2 className='mt-3 font-semibold'>
            raise {target.toLocaleString()}đ{' '}
          </h2>
          <h2 className='text-[1rem] mt-3 font-semibold'>
            {convertUnixTimestamptoDate(timeCreated)} -{' '}
            {convertUnixTimestamptoDate(deadline)}
          </h2>
        </div>
        <div className='w-1/6 '>
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
            className='!my-10'
          >
            publish campaign
          </Web3Button>
          <button
            className='bg-gray-200 h-[50px] w-[155px] font-semibold rounded-lg'
            onClick={async () => {
              const payload = await campaignDecline({ id: id }).unwrap();
            }}
          >
            decline campaign
          </button>
        </div>
      </div>
    </div>
  );
};
