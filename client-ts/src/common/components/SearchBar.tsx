import React from 'react';
import { Link } from 'react-router-dom';
import { CampaignAfterFormat, CampaignFromContract } from '../utils/type';
import { campaignConverter } from '../utils/type-converter';

export type SearchBarProps = {
  campaigns: CampaignFromContract[];
  onCancel: () => void;
};
export const SearchBar = ({ campaigns, onCancel }: SearchBarProps) => {
  const formattedCampaigns: CampaignAfterFormat[] = React.useMemo(() => {
    return campaigns.map((campaign) => campaignConverter(campaign));
  }, [campaigns]);
  const [searchInput, setSearchInput] = React.useState('');
  const searchResults = (): CampaignAfterFormat[] => {
    return formattedCampaigns.filter((campaign) =>
      campaign.title.toLowerCase().includes(searchInput)
    );
  };
  const handleCancel = () => {
    setSearchInput('');
    onCancel();
  };
  const handleInput = (input: string) => {
    setSearchInput(input);
  };
  return (
    <div>
      {/* Search input */}
      <div className='flex border-b-2 items-center px-5'>
        <input
          type='text'
          onChange={(e) => handleInput(e.target.value)}
          className=' w-[100%]  h-[70px]  text-[1.2rem] focus:outline-none '
          placeholder='Search for campaigns...'
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 hover:cursor-pointer'
          onClick={handleCancel}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </div>
      {/* Display search result */}
      <div className=' absolute  bg-white w-[100%] z-10'>
        {searchResults().map((search, id) => (
          <Link
            key={id}
            className='flex space-x-5 border-b-2 hover:bg-slate-200 hover:cursor-pointer'
            to={`../campaign/${search.id}`}
          >
            <img
              src={search.images[0]}
              className='object-cover w-[150px] h-[80px]'
            />
            <div className='my-2'>
              <h1 className='font-semibold text-[1.2rem] text-green-700'>
                {search.title}
              </h1>
              <h1>
                by
                <span className='font-semibold'> {search.ownerName}</span>
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
