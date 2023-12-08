import React from 'react';
import { useReviewGetByIdQuery } from '../../api/review';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

export default function DisplayReviews({ id }) {
  console.log(id);
  const { data: reviews, isLoading } = useReviewGetByIdQuery({ id });
  if (!isLoading) {
    reviews.map((review) => {
      console.log(review.address);
    });
  }
  return (
    <div className='h-[50vh]'>
      {reviews &&
        reviews.map((review) => (
          <div className='flex mt-3'>
            <VolunteerActivismIcon className='ml-5 mt-5' />
            <div className='ml-5'>
              <h1 className='font-bold'>{review.address}</h1>
              <h1 className='font-bold text-green-700'>
                {review.amount.toLocaleString('en-US')}đ
              </h1>
              <h1>{review.review}</h1>
            </div>
          </div>
        ))}
    </div>
  );
}
