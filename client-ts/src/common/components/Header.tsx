import {
  ConnectWallet,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react';

import React from 'react';
import { SearchBar } from './SearchBar';
import { CONTRACT_ADDRESS } from '@src/common/utils/constant';

export const Header = () => {
  const [searchState, setSearchState] = React.useState(false);
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: campaigns, isLoading: isLoadingCampaigns } = useContractRead(
    contract,
    'getCampaigns'
  );
  const handleCancel = () => {
    setSearchState(false);
  };
  return (
    <div className='mb-5 h-[70px] 100vw - 100%'>
      {searchState === true ? (
        <SearchBar campaigns={campaigns} onCancel={handleCancel} />
      ) : (
        // Topbar container
        <div className='flex  font-semibold  border-b-[4px] border-green-700'>
          <div className='w-2/6 m-auto '>
            <a className='mx-5 hover:text-green-700' href='/campaign/new'>
              start a campaign
            </a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 inline'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
            <button
              className=' hover:text-green-700'
              disabled={isLoadingCampaigns}
              onClick={() => setSearchState(true)}
            >
              search
            </button>
          </div>
          <div className='w-2/6 text-center m-auto text-[2.4rem] font-bold text-green-700 hover:cursor-pointer'>
            <a href='/'>
              GayQuy<span className='text-red-500'>Viet</span>
            </a>
          </div>
          <div className='w-2/6 flex m-auto items-center justify-end '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 mt-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            <button className='hover:text-green-700 pl-1 pr-3'>
              <a href='/profile'>profile</a>
            </button>
            <ConnectWallet
              theme={
                'light'
                // colors: {
                //   primaryButtonText: '#000000',
                //   secondaryText: '#15803D',
                //   connectedButtonBg: '#f0f0f0',
                //   borderColor: '#000000',
                //   dropdownBg: '#ffffff',
                //   modalBg: '#ffffff',
                // },
              }
              hideTestnetFaucet={true}
              switchToActiveChain={true}
              modalSize={'compact'}
              welcomeScreen={{}}
              modalTitleIconUrl={''}
              btnTitle='connect wallet'
              className=' hover:text-green-700 !min-h-[60px] !my-2 !py-0 !border-2 !border-green-700 !mx-5 !bg-white !text-green-700'
            />
          </div>
        </div>
      )}
    </div>
  );
};
