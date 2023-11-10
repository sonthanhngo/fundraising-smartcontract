import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3Button, useStorageUpload } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { convertVND } from '../../../common/utils';
import ImageIcon from '@mui/icons-material/Image';
import { ImageSlider } from '../../../common/components/misc/ImageSlider';
import { Loader } from '../../../common/components/misc/Loader';
import { CONTRACT_ADDRESS } from '../../../common/utils';

export default function CreateCampaignPage() {
  const navigate = useNavigate();
  // target value
  const [value, setValue] = useState();
  // waiting for transaction execute in MetaMask
  const [isWaitingTransaction, setIsWaitingTransaction] = useState(false);
  // transaction hash
  const [txHash, setTxHash] = useState('');
  // display transaction info
  const [isLoadingTransactionInfo, setIsLoadingTransactionInfo] =
    useState(false);
  // form data
  const [form, setForm] = useState({
    ownerName: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    images: [],
  });
  const handleFormFieldChange = (fieldName, e) => {
    switch (fieldName) {
      case 'deadline':
        setForm({ ...form, deadline: new Date(e).getTime() });
        break;
      case 'target':
        setForm({
          ...form,
          target: ethers.utils.parseEther(e),
        });
        break;
      default:
        setForm({ ...form, [fieldName]: e });
    }
  };
  // storage upload
  const { mutateAsync: upload } = useStorageUpload();
  const uploader = async (files) => {
    const myFiles = Array.from(files);
    await uploadToIPFS(myFiles);
  };
  const uploadToIPFS = async (files) => {
    const uploadURLs = await upload({
      data: files,
    });
    const parsedURLs = uploadURLs.map((uploadURL) =>
      uploadURL.replace('ipfs://', 'https://ipfs.io/ipfs/')
    );
    setForm({
      ...form,
      ['images']: parsedURLs,
    });
  };
  // temporary image file for preview
  const [imgFiles, setImgFiles] = useState([]);
  console.log(form.images);

  return (
    <div>
      {/* container */}
      {isWaitingTransaction && (
        <Loader title='please confirm transaction on MetaMask' />
      )}
      {isLoadingTransactionInfo && (
        <Loader title='see your transaction ' transactionHash={txHash} />
      )}
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
                  onChange={(e) => {
                    setValue(e.target.value);
                    handleFormFieldChange('target', e.target.value);
                  }}
                />
                <div className='pr-2'>ethers</div>
              </div>
            </li>
            {value && (
              <h3 className='text-[1.2rem]'>
                that would be
                <span className='text-red-500 font-semibold'>
                  {' '}
                  {convertVND(value)} VND.
                </span>
              </h3>
            )}
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
                    onChange={async (e) => {
                      Array.from(e.target.files).forEach((file) => {
                        setImgFiles((imgFile) => [
                          ...imgFile,
                          URL.createObjectURL(file),
                        ]);
                      });
                      await uploader(e.target.files);
                    }}
                  />
                  <div className='w-full h-full absolute flex flex-col items-center justify-center z-[-1] font-semibold text-[1.2rem]'>
                    <ImageIcon />
                    <h4>upload images for this campaign</h4>
                  </div>
                </div>
              )}
            </div>
            {/* create campaign button */}
            <Web3Button
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
            </Web3Button>
          </div>
        </div>
      </div>
    </div>
  );
}
