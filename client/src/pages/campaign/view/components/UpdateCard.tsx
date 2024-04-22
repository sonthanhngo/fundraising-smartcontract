import { useUpdateCreateByCampaignIdMutation } from '@/src/api/update';
import React from 'react';

type UpdateForm = {
  update: string;
};

type UpdateCardProps = {
  id: string;
  onClose: () => void;
};

export const UpdateCard = ({ id, onClose }: UpdateCardProps) => {
  const [updateCreate] = useUpdateCreateByCampaignIdMutation();
  const [form, setForm] = React.useState<UpdateForm>({
    update: '',
  });

  const handleFormFieldChange = (data: string) => {
    setForm({ ...form, update: data });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCreate({
      id,
      body: { update: form.update },
    }).unwrap();
    onClose();
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div className='fixed inset-0 z-10 h-100% flex items-center justify-center flex-col'>
      <div className='bg-white w-1/2 h-[4/10] border-2 rounded-md p-5 flex-col'>
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
        <form onSubmit={handleSubmit}>
          <fieldset className='mb-5'>
            <label
              htmlFor='pdate'
              className='text-center font-semibold text-green-700 text-[1.2rem]'
            >
              enter your update
            </label>
            <textarea
              placeholder='enter update here'
              id='update'
              required
              className='w-full h-[10rem] border-2 rounded-md px-5 py-3 focus:outline-none'
              onChange={(e) => handleFormFieldChange(e.target.value)}
            ></textarea>
            <h1 className='font-semibold text-red-700 h-5'>
              {form.update === '' ? 'required!' : ''}
            </h1>
          </fieldset>
          <button
            type='submit'
            className='text-center w-full border-2 rounded-md h-[3rem] font-semibold bg-gray-100'
          >
            update
          </button>
        </form>
      </div>
    </div>
  );
};
