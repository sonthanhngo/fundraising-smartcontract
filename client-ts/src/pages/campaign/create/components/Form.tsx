import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddress, useStorageUpload } from '@thirdweb-dev/react';
import { VNDtoEtherConverter } from '@src/common/utils/type-converter';
import { Carousel } from '@src/common/components/Carousel';
import { Loader } from '@src/common/components/Loader';
import { useCampaignCreateMutation } from '@src/api/campaign';
type FormSchema = {
  ownerName: string;
  title: string;
  description: string;
  target: number;
  deadline: number;
  images: string[];
};
export default function Form() {
  const address = useAddress();
  const navigate = useNavigate();
  // form data
  const [form, setForm] = React.useState<FormSchema>({
    ownerName: '',
    title: '',
    description: '',
    target: 10000000,
    deadline: Date.now(),
    images: [],
  });
  const handleFormFieldChange = (
    fieldName: string,
    data: string | number | FileList
  ) => {
    switch (fieldName) {
      case 'deadline':
        setForm({ ...form, deadline: new Date(data as string).getTime() });
        break;
      case 'images':
        handleUpload(data as FileList).then((imageURLs) =>
          setForm({ ...form, images: imageURLs })
        );
        break;
      default:
        setForm({ ...form, [fieldName]: data });
    }
  };

  const handleSubmit = async () => {
    if (
      !address &&
      form.ownerName === '' &&
      form.description === '' &&
      form.images.length === 0
    ) {
      alert('Missign fields');
      return;
    }
    setIsWaitingTransaction(true);
    const payload = await campaignCreate({
      body: { ...form, owner: address! },
    }).unwrap();
    alert(JSON.stringify(payload));
    if (isSuccess) {
      setTimeout(() => {
        setIsWaitingTransaction(false);
        navigate('/');
      }, 3000);
    }
  };
  const [campaignCreate, { isSuccess }] = useCampaignCreateMutation();
  // storage upload
  const { mutateAsync: uploadToIPFS } = useStorageUpload();
  const handleUpload = async (files: FileList) => {
    const myFiles = Array.from(files);
    myFiles.forEach((file) => {
      setImgFiles((prev) => [...prev, URL.createObjectURL(file)]);
    });
    const uploadURLs = await uploadToIPFS({
      data: myFiles,
    });
    const parsedURLs = uploadURLs.map((uploadURL) =>
      uploadURL.replace('ipfs://', 'https://ipfs.io/ipfs/')
    );
    return parsedURLs;
  };
  // temporary image file for preview
  const [imgFiles, setImgFiles] = React.useState<string[]>([]);
  const [isWaitingTransaction, setIsWaitingTransaction] = React.useState(false);
  return (
    <form onSubmit={handleSubmit} className=' flex mt-10 space-x-5'>
      {isWaitingTransaction && <Loader content='success' />}

      <fieldset className=' w-2/5 text-[1.2rem] '>
        <div className='mb-10'>
          <label htmlFor='ownerName' className='font-semibold '>
            who are you?
          </label>
          <input
            type='text'
            id='ownerName'
            maxLength={25}
            className='border-2 rounded-md w-[100%] h-[50px] px-5 focus:outline-none  '
            onChange={(e) => handleFormFieldChange('ownerName', e.target.value)}
          />
          {form.ownerName === '' && (
            <h1 className='font-semibold text-red-700'>required!</h1>
          )}
        </div>
        <div className='my-10'>
          <label htmlFor='title' className='font-semibold'>
            campaign title?
          </label>
          <input
            type='text'
            id='title'
            maxLength={25}
            className='border-2 rounded-md w-[100%] h-[50px] px-5 '
            onChange={(e) => handleFormFieldChange('title', e.target.value)}
          />
          {form.title === '' && (
            <h1 className='font-semibold text-red-700'>required!</h1>
          )}
        </div>
        <div className='my-10'>
          <label htmlFor='description' className='font-semibold'>
            campaign description?
          </label>
          <textarea
            id='description'
            className='border-2 rounded-md w-[100%] h-[200px] px-5 py-5 focus:outline-none '
            onChange={(e) =>
              handleFormFieldChange('description', e.target.value)
            }
          ></textarea>
          {form.description === '' && (
            <h1 className='font-semibold text-red-700'>required!</h1>
          )}
        </div>
        <div className='my-10'>
          <label htmlFor='deadline' className='font-semibold '>
            deadline of this campaign?
          </label>
          <input
            type='date'
            id='deadline'
            className='border-2 rounded-md w-[100%] h-[50px] px-5 focus:outline-none'
            onChange={(e) => handleFormFieldChange('deadline', e.target.value)}
          />
          {form.deadline !== Date.now() && (
            <h1 className='font-semibold text-red-700'>required!</h1>
          )}
        </div>
        <div className='mt-10'>
          <label htmlFor='target' className='font-semibold '>
            target of this campaign?
          </label>
          <div className='flex items-center border-2 rounded-md'>
            <input
              type='text'
              id='target'
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
          <h3 className='text-[1.2rem]'>
            that would be
            <span className='text-red-500 font-semibold'>
              {VNDtoEtherConverter(form.target)} ethers.
            </span>
          </h3>
        </div>
      </fieldset>
      {/* right side */}
      <div className='w-3/5 mt-5'>
        {/* image upload */}
        <div className='relative h-[400px] border-2 rounded-md'>
          {imgFiles.length != 0 ? (
            <Carousel images={imgFiles} haveDot={true} />
          ) : (
            <div className=''>
              <input
                type='file'
                id='images'
                multiple
                className='h-full w-full absolute cursor-pointer opacity-0'
                onChange={(e) => {
                  handleFormFieldChange('images', e.target.files!);
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

                <label htmlFor='images'>upload images for this campaign</label>
              </div>
            </div>
          )}
        </div>
        {/* create campaign button */}
        <button
          type='submit'
          className='text-[1.2rem] mt-[240px] ml-[500px] min-w-[100px] h-[50px] rounded-lg bg-gray-200'
        >
          Create
        </button>
      </div>
    </form>
  );
}
