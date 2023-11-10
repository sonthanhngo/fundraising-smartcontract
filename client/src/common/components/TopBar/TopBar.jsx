import {
  ConnectWallet,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { CONTRACT_ADDRESS } from '../../utils';

export const TopBar = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: campaigns } = useContractRead(contract, 'getCampaigns');

  const [searchState, setSearchState] = useState(false);
  return (
    <div className='mb-5 h-[70px]'>
      {searchState === true ? (
        <SearchBar
          campaigns={campaigns}
          cancelSearch={() => setSearchState(false)}
        />
      ) : (
        // Topbar container
        <div className='flex  font-semibold  border-b-[4px] border-green-700'>
          <div className='w-2/6 m-auto '>
            <a className='px-5 hover:text-green-700' href='/campaign/new'>
              start a campaign
            </a>
            <SearchIcon />
            <button
              className=' hover:text-green-700'
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
            <PersonIcon />
            <button className='hover:text-green-700 pr-3'>
              <a href='/profile'>profile</a>
            </button>
            <ConnectWallet
              theme={{
                colors: {
                  primaryButtonBg: '#ffffff',
                  primaryButtonText: '#000000',
                  borderColor: '#ffffff',
                  dropdownBg: '#ffffff',
                },
              }}
              hideTestnetFaucet={true}
              switchToActiveChain={true}
              modalSize={'compact'}
              welcomeScreen={{}}
              modalTitleIconUrl={''}
              className=' hover:text-green-700 !min-h-[70px]'
            />
          </div>
        </div>
      )}
    </div>
  );
};
