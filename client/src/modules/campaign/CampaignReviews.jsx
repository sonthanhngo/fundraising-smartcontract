import React from 'react';
import { useReviewGetByIdQuery } from '../../api/review';

export default function CampaignReview({ id }) {
  const { data: reviews, isLoading } = useReviewGetByIdQuery({ id });

  return (
    <div className='h-[50vh]'>
      {reviews &&
        reviews.map((review, id) => (
          <div className='flex mt-3' key={id}>
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
                d='M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
              />
            </svg>

            <div className='ml-5'>
              <h1 className='font-bold'>{review.address}</h1>
              <h1 className='font-bold text-green-700'>
                đ{review.amount.toLocaleString('en-US')}
              </h1>
              <h1>{review.review}</h1>
            </div>
          </div>
        ))}
    </div>
  );
}
