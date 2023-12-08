import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import {
  useContract,
  useContractRead,
  Web3Button,
  useAddress,
} from '@thirdweb-dev/react';
import {
  daysLeft,
  convertUnixTimestamptoDate,
  CONTRACT_ADDRESS,
  convertVND,
  convertEthers,
} from '../../../common/utils';
import { useState } from 'react';
import { ImageSlider } from '../../../common/components/misc/ImageSlider';
import SendIcon from '@mui/icons-material/Send';
import { Loader } from '../../../common/components/misc/Loader';
import CampaignReviews from '../CampaignReviews';
import CampaignUpdates from '../CampaignUpdates';
import CreateUpdate from './ViewCampaignPage/components/CreateUpdate';
import CreateReview from './ViewCampaignPage/components/CreateReview';

export default function ViewCampaignPage() {
  // donate amount
  const [donateAmount, setDonateAmount] = useState(100000);
  console.log(donateAmount);
  // get campaignId from url params
  const { campaignId } = useParams();
  //get address
  const address = useAddress();
  // get campaign data
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: campaign, isLoading: isLoadingCampaign } = useContractRead(
    contract,
    'getCampaignById',
    [campaignId]
  );
  const { data: donations, isLoading: isLoadingDonation } = useContractRead(
    contract,
    'getDonationById',
    [campaignId]
  );
  if (!isLoadingCampaign) {
    console.log(campaign);
  }
  // console.log(campaign.target.toString());
  // wait for transaction to complete in MetaMask
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false);
  // transaction hash
  const [txHash, setTxHash] = useState('');
  // display tranaction info
  const [isLoadingTransactionInfo, setIsLoadingTransactionInfo] =
    useState(false);
  const [isCreatingReview, setIsCreatingReview] = useState(false);
  const [isCreatingUpdate, setIsCreatingUpdate] = useState(false);
  return (
    <div className='mx-[90px]'>
      {isLoadingCampaign ? (
        <Loader title='loading campaign' />
      ) : (
        <div>
          {isCreatingReview && (
            <CreateReview id={campaign.id} amount={donateAmount} />
          )}
          {isCreatingUpdate && (
            <CreateUpdate
              id={campaign.id}
              setIsCreating={setIsCreatingUpdate}
            />
          )}
          {isWaitingTransaction && (
            <Loader title='please confirm transaction on MetaMask' />
          )}
          {isLoadingTransactionInfo && (
            <Loader title='see your transaction on ' transactionHash={txHash} />
          )}
          {/* title and description */}
          <h1 className=' font-bold text-[2.4rem] text-green-700'>
            {campaign.title}
            <button
              className='float-right'
              onClick={() => setIsCreatingUpdate(true)}
            >
              update
            </button>
          </h1>

          <h2 className=' my-5 text-[1.2rem]'>{campaign.description}</h2>
          {/* container */}
          <div className='flex-col mt-10 h-[80vh]'>
            {/* image slider and campaign info */}
            <div className='flex w-full '>
              {/* Image slider */}
              <div className='w-3/5 h-[400px]'>
                <ImageSlider images={campaign.images} haveDot={true} />
              </div>
              {/* Campaign info */}
              <div className='pl-10 w-2/5  flex-col items-end'>
                <div className='bg-green-700 h-[10px]'></div>
                <div className='h-1/3 '>
                  <h3 className='font-bold text-[3rem] text-green-700 '>
                    đ
                    {campaign.amountCollected
                      .toNumber()
                      .toLocaleString('en-US')}
                  </h3>
                  <h4 className=' text-[1.2rem]'>
                    of target{' '}
                    <span className='font-bold'>
                      đ{campaign.target.toNumber().toLocaleString('en-US')}
                    </span>
                  </h4>
                </div>
                <div className='h-1/4'>
                  <h3 className='mt-[40px] font-bold text-[2.4rem]'>
                    {donations.donators.length}
                  </h3>
                  <h4 className=' text-[1.2rem]'>peoples donated</h4>
                </div>
                <div className='h-1/4'>
                  <h3 className='mt-[40px] font-bold text-[2.4rem]'>
                    {daysLeft(campaign.deadline.toNumber())} days left
                  </h3>
                  <h4 className=' text-[1.2rem]'>
                    ends in {''}
                    <span className='font-bold'>
                      {' '}
                      {convertUnixTimestamptoDate(campaign.deadline.toNumber())}
                    </span>
                  </h4>
                </div>
              </div>
              {/* campaign info */}
            </div>

            {/* campaign owner and address */}
            <h2 className='text-[1rem] font-semibold mt-2'>
              by <span className='text-green-700'>{campaign.ownerName}</span> is
              organizing this fundraise
            </h2>
            <h2 className='text-[1rem] font-bold px-6'>
              <span className='text-green-700'>{campaign.owner}</span>
            </h2>
            {/* campaign owner and address */}

            {/* Donations history and donate to campaign */}
            <div className='flex w-full mt-[20px] '>
              {/* Donators history */}
              <div className='w-3/5'>
                <h3 className='font-semibold text-[2rem]'>latest donators</h3>
                <ul>
                  {donations.donators.map((donator, i) => (
                    <li key={i}>
                      <h4 className='justify-start text-[1.2rem] '>
                        <a
                          href={`https://sepolia.etherscan.io/address/${donator}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='hover:underline hover:text-blue-600'
                        >
                          <span>{donator}</span>
                        </a>
                        <span className='inline-block float-right font-semibold'>
                          {donations.donations[i]
                            .toNumber()
                            .toLocaleString('en-US')}
                          đ
                        </span>
                      </h4>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='w-2/5 pl-10 text-[1.2rem]'>
                {campaign.owner === address ? (
                  <h4 className='font-semibold text-[2rem] text-red-500'>
                    cannot donate to your campaign!
                  </h4>
                ) : (
                  <div>
                    <h3 className='font-semibold text-[2rem]'>
                      support us here
                    </h3>
                    <div className='flex'>
                      <input
                        type='text'
                        className='border-2 rounded-md w-4/5 px-3  '
                        placeholder='Enter your amount'
                        value={donateAmount.toLocaleString()}
                        onChange={(e) => {
                          setDonateAmount(e.target.value);
                          if (e.target.value === '') {
                            setDonateAmount(0);
                          } else {
                            setDonateAmount(
                              parseInt(e.target.value.replace(/,/g, ''))
                            );
                          }
                        }}
                      />
                      <Web3Button
                        contractAddress={CONTRACT_ADDRESS}
                        action={async (contract) => {
                          setIsWaitingTransaction(true);
                          const tx = await contract.call(
                            'donateToCampaign',
                            [campaignId, donateAmount],
                            {
                              value: ethers.utils.parseEther(
                                convertEthers(donateAmount)
                              ),
                            }
                          );
                          setTxHash(tx.receipt.transactionHash);
                          setIsWaitingTransaction(false);
                          setIsLoadingTransactionInfo(true);
                          setTimeout(() => {
                            setIsLoadingTransactionInfo(false);
                          }, 5000);
                          setIsCreatingReview(true);
                        }}
                        onError={() => setIsWaitingTransaction(false)}
                        className='!w-1/5 !min-w-[10px] justify-end !bg-white '
                      >
                        <SendIcon />
                      </Web3Button>
                    </div>
                    {/* Warning */}
                    <div className='font-semibold mt-2'>
                      {donateAmount === '' || donateAmount < 100000 ? (
                        <h4 className='text-red-500 '>
                          donation must larger than đ100,000
                        </h4>
                      ) : (
                        <h4 className=' text-green-700'>
                          that will be ~{convertEthers(donateAmount)} ethers.
                        </h4>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='w-3/5 '>
              <h1 className='font-semibold text-[2rem]'>recent reviews</h1>
              <CampaignReviews id={campaign.id} />
            </div>
            <div className='w-2/5 pl-10'>
              <h1 className='font-semibold text-[2rem]'>recent updates</h1>
              <CampaignUpdates id={campaign.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
