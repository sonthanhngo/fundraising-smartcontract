import React, { useState, useEffect } from 'react';
import {
  convertUnixTimestamptoDate,
  getProfileDonations,
  getTotalDonations,
} from '../../../common/utils';
import Statistics from './Statistics';
import { useAddress } from '@thirdweb-dev/react';
import DisplayChart from './DisplayChart';
export default function DisplayProfileStatistics({ donations }) {
  return (
    <div className=''>
      {donations.length == 0 ? (
        <h1 className='text-center'> User haven't created any campaign</h1>
      ) : (
        <div>
          <h1 className='text-[2.4rem] font-bold text-green-700 my-5'>
            campaigns statistics
          </h1>
          <div className='flex space-x justify-between'>
            <DisplayChart donations={donations} />
            <Statistics stats={getTotalDonations(donations)} />
          </div>
        </div>
      )}
    </div>
  );
}
