import React from 'react';
import { useUpdateGetByIdQuery } from '../../api/update';
import { convertUnixTimestamptoDate } from '../../common/utils';
import { useParams } from 'react-router-dom';

export default function DisplayUpdates({ id }) {
  const { data: updates, isLoading } = useUpdateGetByIdQuery({ id });
  const params = useParams();
  console.log(params);
  return (
    <div>
      {updates &&
        updates.map((update) => (
          <div>
            <h1>{convertUnixTimestamptoDate(Number(update.date))}</h1>
            <h1>{update.update}</h1>
          </div>
        ))}
    </div>
  );
}
