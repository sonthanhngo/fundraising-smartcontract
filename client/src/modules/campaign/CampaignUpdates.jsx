import React from 'react';
import { useUpdateGetByIdQuery } from '../../api/update';
import { convertUnixTimestamptoDate } from '../../common/utils';

export default function CampaignUpdates({ id }) {
  const { data: updates, isLoading } = useUpdateGetByIdQuery({ id });

  return (
    <div>
      {updates &&
        updates.map((update, id) => (
          <div key={id} className='mt-3'>
            <h1 className='font-bold'>
              {convertUnixTimestamptoDate(Number(update.date))}
            </h1>
            <h1>{update.update}</h1>
          </div>
        ))}
    </div>
  );
}
