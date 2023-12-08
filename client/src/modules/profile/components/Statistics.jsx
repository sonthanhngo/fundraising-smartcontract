import React, { useState, useEffect } from 'react';
import { getTotalDonations } from '../../../common/utils/index';
export default function Statistics({ stats }) {
  return (
    <div className='w-1/4 text-center justify-between'>
      <div className='w-full h-[100px] '>
        <h1 className='font-semibold text-[1.2rem] '>total donations</h1>
        <h1 className='mt-1 font-bold text-[2rem] text-green-700'>
          đ{stats.totalDonations.toLocaleString('en-US')}
        </h1>
      </div>
      <div className='w-full h-[100px]  mt-[100px]'>
        <h1 className='font-semibold text-[1.2rem] '>total donators</h1>
        <h1 className='mt-1 font-bold text-[2rem] text-green-700'>
          {stats.totalDonators}
        </h1>
      </div>
    </div>
  );
}
