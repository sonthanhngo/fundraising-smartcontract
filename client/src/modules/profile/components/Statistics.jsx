import React, { useState, useEffect } from 'react';
import { getTotalDonations } from '../../../common/utils/index';
export default function Statistics({ stats }) {
  return (
    <div className='w-1/5 text-center justify-between'>
      <div className='w-full h-[100px] border-2 rounded-md '>
        <h1 className='font-semibold text-[1.2rem] '>total donators</h1>
        <h1 className='mt-1 font-bold text-[2rem]'>
          đ{stats.totalDonations.toLocaleString('en-US')}
        </h1>
      </div>
      <div className='w-full h-[100px] border-2 mt-[100px]'>
        <h1 className='font-semibold text-[1.2rem] '>total donators</h1>
        <h1 className='mt-1 font-bold text-[2rem]'>{stats.totalDonators}</h1>
      </div>
    </div>
  );
}
