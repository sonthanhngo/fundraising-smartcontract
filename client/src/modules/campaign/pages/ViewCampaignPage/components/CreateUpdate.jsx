import React, { useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useUpdateCreateByIdMutation } from '../../../../../api/update';

export default function CreateUpdate({ id, setIsCreating }) {
  const address = useAddress();
  const [update, setUpdate] = useState('');
  const [updateCreate] = useUpdateCreateByIdMutation();
  console.log(update);
  return (
    <div>
      <div className='fixed inset-0 z-10 h-100% bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col'>
        <p className='font-epilogue font-bold text-[1.5rem] text-white text-center'>
          create an update
        </p>
        <div>
          <input
            type='text'
            onChange={(e) => setUpdate(e.target.value)}
          ></input>
          <button
            onClick={async () => {
              const payload = await updateCreate({
                id,
                body: { update: update },
              }).unwrap();
              setIsCreating(false);
              console.log(payload);
            }}
            className='mt-10'
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
