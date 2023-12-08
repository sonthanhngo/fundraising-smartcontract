import React, { useState } from 'react';
import { useReviewCreateByIdMutation } from '../../../../../api/review';
import { useAddress } from '@thirdweb-dev/react';

export default function CreateReview({ id, amount }) {
  const address = useAddress();
  const [review, setReview] = useState('');
  const [reviewCreate] = useReviewCreateByIdMutation();

  return (
    <div>
      <div className='fixed inset-0 z-10 h-100% bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col'>
        <p className='font-epilogue font-bold text-[1.5rem] text-white text-center'>
          please leave a review for supporting
        </p>
        <div>
          <input
            type='text'
            onChange={(e) => setReview(e.target.value)}
          ></input>{' '}
          <button
            onClick={async () => {
              const payload = await reviewCreate({
                id,
                body: { review, amount, address },
              }).unwrap();
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
