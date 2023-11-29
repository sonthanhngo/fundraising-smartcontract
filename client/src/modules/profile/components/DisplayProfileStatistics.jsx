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
    <div className='flex space-x justify-between'>
      <DisplayChart donations={donations} />
      <Statistics stats={getTotalDonations(donations)} />
    </div>
  );
}
