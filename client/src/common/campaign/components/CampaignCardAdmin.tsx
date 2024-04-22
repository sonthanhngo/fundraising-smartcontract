// import { tagType, thirdweb } from '../assets';

import React from 'react';
import { unixTimestampToDateConverter } from '@src/common/utils/type-converter';
import { Carousel } from '@src/common/components/Carousel';
import { Web3Button } from '@thirdweb-dev/react';
import { Loader } from '@src/common/components/Loader';
import { CONTRACT_ADDRESS } from '@src/common/utils/constant';
import {
  useCampaignAcceptMutation,
  useCampaignDeclineMutation,
} from '@src/api/campaign';
import { Campaign as CampaignFromServer } from '@src/api/campaign';

type CampaignCardAminProps = { campaign: CampaignFromServer };
export const CampaignCardAdmin = ({ campaign }: CampaignCardAminProps) => {
  const {
    id,
    owner,
    ownerName,
    title,
    target,
    deadline,
    description,
    images,
    timeCreated,
  } = campaign;
  console.log(id);
  const [campaignAccept] = useCampaignAcceptMutation();
  const [campaignDecline] = useCampaignDeclineMutation();
  const [isWaitingTransaction, setIsWaitingTransaction] = React.useState(false);

  return (
    <div>
      {isWaitingTransaction && <Loader content='confirm your transaction' />}
      <div className='w-full h-[230px] flex border-2 rounded-md '>
        {/* campaign image */}
        <div className='w-2/6 '>
          <Carousel images={images} />
        </div>
        {/* campaign data */}
        <div className='w-3/6 px-5 py-5 text-[1.2rem]'>
          <h1 className=' font-bold  text-green-700'>{title}</h1>
          <h1 className='  mt-3 font-semibold'>
            {description.length > 50
              ? `${description.slice(0, 45)} ...`
              : description}
          </h1>
          <h2 className=' mt-3 overflow-hidden whitespace-nowrap '>
            by{''} <span className='font-semibold'>{ownerName}</span> -{' '}
            <span className='font-semibold'>{owner.slice(0, 25)}...</span>
          </h2>
          <h2 className='mt-3  ]'>
            raise {''}
            <span className='font-bold text-red-700'>
              {target.toLocaleString()}đ
            </span>
          </h2>
          <h2 className=' mt-3 font-bold'>
            {unixTimestampToDateConverter(timeCreated)} -{' '}
            {unixTimestampToDateConverter(deadline)}
          </h2>
        </div>
        <div className='w-1/6 '>
          <Web3Button
            contractAddress={CONTRACT_ADDRESS}
            action={async (contract) => {
              setIsWaitingTransaction(true);
              await contract.call('createCampaign', [
                id,
                owner,
                ownerName,
                title,
                description,
                target,
                timeCreated,
                deadline,
                images,
              ]);
            }}
            onError={() => {
              setIsWaitingTransaction(false);
              window.location.reload();
            }}
            onSuccess={async () => {
              await campaignAccept({ id: id }).unwrap();
              setIsWaitingTransaction(false);
            }}
            className='!my-10 !bg-green-700 !text-white'
          >
            publish campaign
          </Web3Button>
          <button
            className='text-white bg-red-700 h-[50px] w-[155px] font-semibold rounded-lg'
            onClick={async () => {
              const payload = await campaignDecline({ id: id }).unwrap();
              alert(payload);
            }}
          >
            decline campaign
          </button>
        </div>
      </div>
    </div>
  );
};
