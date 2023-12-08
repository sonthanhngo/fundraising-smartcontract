import React from 'react';
import { useReviewGetByIdQuery } from '../../api/review';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

export default function CampaignReview({ id }) {
  const { data: reviews, isLoading } = useReviewGetByIdQuery({ id });

  return (
    <div className='h-[50vh]'>
      {reviews &&
        reviews.map((review, id) => (
          <div className='flex mt-3' key={id}>
            <VolunteerActivismIcon className=' mt-5' />
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
