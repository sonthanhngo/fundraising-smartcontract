import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3Button, useAddress, useStorageUpload } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import {
  convertVND,
  convertEthers,
  convertUnixTimestamptoDate,
} from '../../../common/utils';
import { ImageSlider } from '../../../common/components/misc/ImageSlider';
import { Loader } from '../../../common/components/misc/Loader';
import { CONTRACT_ADDRESS } from '../../../common/utils';
import { useCampaignCreateMutation } from '../../../api/campaign';

export default function CreateCampaignPage() {
  const address = useAddress();
  const navigate = useNavigate();
  // target value
  // form data
  const [form, setForm] = useState({
    ownerName: '',
    title: '',
    description: '',
    target: 10000000,
    deadline: Date.now(),
    images: [],
  });
  const handleFormFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case 'deadline':
        console.log(typeof e);
        setForm({ ...form, deadline: new Date(e).getTime() });
        break;
      case 'images':
        handleUpload(e).then((imageURLs) =>
          setForm({ ...form, images: imageURLs })
        );
        break;
      default:
        setForm({ ...form, fieldName: e });
    }
  };
  console.log(form);
  const [campaignCreate, { isSuccess }] = useCampaignCreateMutation();
  // storage upload
  const { mutateAsync: uploadToIPFS } = useStorageUpload();
  const handleUpload = async (files) => {
    const myFiles = Array.from(files);
    const uploadURLs = await uploadToIPFS({
      data: myFiles,
    });
    const parsedURLs = uploadURLs.map((uploadURL) =>
      uploadURL.replace('ipfs://', 'https://ipfs.io/ipfs/')
    );
    return parsedURLs;
  };
  // temporary image file for preview
  const [imgFiles, setImgFiles] = useState([]);
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false);
  return (
    <div>
      {isWaitingTransaction && <Loader title='success' />}
      {/* container */}
      <div className='mx-[90px]'>
        {/* Title */}
        <h1 className='text-[2.4rem] font-bold text-green-700'>
          create your campaign
        </h1>
        {/* Campaign form */}
        <div className=' flex mt-10 space-x-5'>
          <ul className=' w-2/5 text-[1.2rem] '>
            <li className='mb-10'>
              <h3 className='font-semibold '>who are you?</h3>
              <input
                type='text'
                maxLength='25'
                className='border-2 rounded-md w-[100%] h-[50px] px-5 focus:outline-none  '
                onChange={(e) =>
                  handleFormFieldChange('ownerName', e.target.value)
                }
              />
            </li>
            <li className='my-10'>
              <h3 className='font-semibold'>campaign title?</h3>
              <input
                type='text'
                maxLength='25'
                className='border-2 rounded-md w-[100%] h-[50px] px-5 '
                onChange={(e) => handleFormFieldChange('title', e.target.value)}
              />
            </li>
            <li className='my-10'>
              <h3 className='font-semibold'>campaign description?</h3>
              <textarea
                type='text'
                className='border-2 rounded-md w-[100%] h-[200px] px-5 py-5 focus:outline-none '
                onChange={(e) =>
                  handleFormFieldChange('description', e.target.value)
                }
              ></textarea>
            </li>
            <li className='my-10'>
              <h3 className='font-semibold '>deadline of this campaign?</h3>
              <input
                type='date'
                value={new Date(form.deadline)}
                className='border-2 rounded-md w-[100%] h-[50px] px-5 focus:outline-none'
                onChange={(e) =>
                  handleFormFieldChange('deadline', e.target.value)
                }
              />
            </li>
            <li className='mt-10'>
              <h3 className='font-semibold '>target of this campaign?</h3>
              <div className='flex items-center border-2 rounded-md'>
                <input
                  type='text'
                  pattern='[0-9]*[.]?[0-9]*'
                  className=' w-[100%] h-[50px] px-3 focus:outline-none '
                  value={form.target.toLocaleString()}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      handleFormFieldChange('target', 0);
                    } else {
                      handleFormFieldChange(
                        'target',
                        parseInt(e.target.value.replace(/,/g, ''))
                      );
                    }
                  }}
                />
                <div className='pr-2'>đ</div>
              </div>
            </li>
            <h3 className='text-[1.2rem]'>
              that would be
              <span className='text-red-500 font-semibold'>
                {' '}
                {convertEthers(form.target)} ethers.
              </span>
            </h3>
          </ul>
          {/* right side */}
          <div className='w-3/5 mt-5'>
            {/* image upload */}
            <div className='relative h-[400px] border-2 rounded-md'>
              {imgFiles.length != 0 ? (
                <ImageSlider images={imgFiles} haveDot={true} />
              ) : (
                <div className=''>
                  <input
                    type='file'
                    multiple
                    className='h-full w-full absolute cursor-pointer opacity-0'
                    onChange={(e) => {
                      Array.from(e.target.files).forEach((file) => {
                        setImgFiles((imgFile) => [
                          ...imgFile,
                          URL.createObjectURL(file),
                        ]);
                      });
                      handleFormFieldChange('images', e.target.files);
                    }}
                  />
                  <div className='w-full h-full absolute flex flex-col items-center justify-center z-[-1] font-semibold text-[1.2rem]'>
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
                        d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                      />
                    </svg>

                    <h4>upload images for this campaign</h4>
                  </div>
                </div>
              )}
            </div>
            {/* create campaign button */}
            <button
              onClick={async () => {
                setIsWaitingTransaction(true);
                const payload = await campaignCreate({
                  body: { ...form, owner: address },
                }).unwrap();
                setTimeout(() => {
                  setIsWaitingTransaction(false);
                  navigate('/');
                }, 3000);
              }}
              className='text-[1.2rem] mt-[240px] ml-[500px] min-w-[100px] h-[50px] rounded-lg bg-gray-200'
            >
              Create
            </button>
            {/* <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={async (contract) => {
                setIsWaitingTransaction(true);
                const tx = await contract.call('createCampaign', [
                  form.ownerName,
                  form.title,
                  form.description,
                  form.target,
                  form.deadline,
                  form.images,
                ]);
                setTxHash(tx.receipt.transactionHash);
                setIsWaitingTransaction(false);
                setIsLoadingTransactionInfo(true);
                setTimeout(() => {
                  setIsLoadingTransactionInfo(false);
                  navigate('/profile');
                }, 5000);
              }}
              onError={() => {
                setIsWaitingTransaction(false);
                window.location.reload();
              }}
              className='!text-[1.2rem] !mt-[240px] !ml-[500px] !min-w-[50px] !bg-white'
            >
              publish
            </Web3Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
