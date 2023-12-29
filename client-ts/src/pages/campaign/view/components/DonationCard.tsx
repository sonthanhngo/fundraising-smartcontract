import { Web3Button, useAddress } from '@thirdweb-dev/react';
import React from 'react';
import { CONTRACT_ADDRESS } from '@/src/common/utils/constant';
import { ethers } from 'ethers';
import { VNDtoEtherConverter } from '@/src/common/utils/type-converter';
import { useReviewCreateByCampaignIdMutation } from '@/src/api/review';
import { Loader } from '@/src/common/components/Loader';

type DonationForm = {
  amount: number;
  review: string;
};

type DonationCardProps = {
  id: string;
  onClose: () => void;
};

export const DonationCard = ({ id, onClose }: DonationCardProps) => {
  const [reviewCreate] = useReviewCreateByCampaignIdMutation();
  const address = useAddress();
  const [isWaitingTransaction, setIsWaitingTransaction] = React.useState(false);
  const [form, setForm] = React.useState<DonationForm>({
    amount: 100000,
    review: '',
  });

  const handleFormFieldChange = (fieldName: string, data: string) => {
    switch (fieldName) {
      case 'amount':
        if (data === '') {
          setForm({ ...form, amount: 0 });
        } else {
          setForm({
            ...form,
            amount: parseInt(data.replace(/,/g, '')),
          });
        }
        break;
      case 'review':
        setForm({ ...form, review: data });
        break;
    }
  };
  const handleSubmit = async () => {
    await reviewCreate({
      id,
      body: { review: form.review, amount: form.amount, address: address! },
    }).unwrap();
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div>
      {isWaitingTransaction && (
        <Loader content='confirm your transaction on MetaMask' />
      )}
      <div className='fixed inset-0 z-10 h-100% flex items-center justify-center flex-col'>
        <div className='bg-white w-1/2 h-1/2 border-2 rounded-md p-5 flex-col'>
          <div className='flex justify-end'>
            <button onClick={handleClose}>
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
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          {!address ? (
            <h1 className='w-full h-[90%] flex justify-center items-center font-bold text-[2rem] text-red-700'>
              connect wallet to donate
            </h1>
          ) : (
            <div>
              <form>
                <fieldset className='mb-5'>
                  <label
                    htmlFor='amount'
                    className='text-center font-semibold text-green-700 text-[1.2rem]'
                  >
                    enter your amount
                  </label>
                  <div className='flex'>
                    <input
                      type='text'
                      id='amount'
                      className='border-2 rounded-md w-full h-[50px] px-5 focus:outline-none '
                      placeholder='Enter your amount'
                      value={form.amount.toLocaleString()}
                      required
                      onChange={(e) =>
                        handleFormFieldChange('amount', e.target.value)
                      }
                    />
                  </div>
                  <h1 className='font-semibold'>
                    {form.amount < 100000 ? (
                      <span className='text-red-700'>
                        donation must larger than đ100,000
                      </span>
                    ) : (
                      <span className='text-green-700'>
                        that will be {VNDtoEtherConverter(form.amount)} ethers.
                      </span>
                    )}
                  </h1>
                </fieldset>
                <fieldset className='mb-5'>
                  <label
                    htmlFor='review'
                    className='text-center font-semibold text-green-700 text-[1.2rem]'
                  >
                    consider leaving some kind words
                  </label>
                  <textarea
                    placeholder='enter some kind words here'
                    id='review'
                    required
                    className='w-full h-[10rem] border-2 rounded-md px-5 py-3 focus:outline-none'
                    onChange={(e) =>
                      handleFormFieldChange('review', e.target.value)
                    }
                  ></textarea>
                  <h1 className='font-semibold text-red-700 h-5'>
                    {form.review === '' ? 'required!' : ''}
                  </h1>
                </fieldset>
                <Web3Button
                  contractAddress={CONTRACT_ADDRESS}
                  action={async (contract) => {
                    setIsWaitingTransaction(true);
                    await contract.call(
                      'donateToCampaign',
                      [id, form.amount, Date.now()],
                      {
                        value: ethers.utils.parseEther(
                          VNDtoEtherConverter(form.amount).toString()
                        ),
                      }
                    );
                  }}
                  onSubmit={() => {
                    setTimeout(() => {
                      setIsWaitingTransaction(false);
                    }, 3000);
                    handleSubmit();
                  }}
                  onError={() => setIsWaitingTransaction(false)}
                  className='!w-full'
                >
                  donate to campaign
                </Web3Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
