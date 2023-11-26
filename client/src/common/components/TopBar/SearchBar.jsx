import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export const SearchBar = ({ campaigns, cancelSearch }) => {
  const [searchInput, setSearchInput] = useState();
  const handleSearch = (campaigns, input) => {
    const parsedData = campaigns.map((campaign, i) => ({
      ownerName: campaign.ownerName,
      verified: campaign.verified,
      title: campaign.title,
      image: campaign.images[0],
      campaignId: i,
    }));
    if (input === '' || input === undefined) {
      return [];
    } else {
      return parsedData.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(input) ||
          campaign.title.includes(input)
      );
    }
  };
  return (
    <div>
      {/* Search input */}
      <div className='flex border-b-2 items-center px-5'>
        <input
          type='text'
          onChange={(e) => setSearchInput(e.target.value)}
          className=' w-[100%]  h-[70px]  text-[1.2rem] focus:outline-none '
          placeholder='Search for campaigns...'
        />
        <CloseIcon
          onClick={() => {
            setSearchInput('');
            cancelSearch();
          }}
          sx={{ fontSize: 30 }}
        />
      </div>
      {/* Display search result */}
      <div className=' absolute  bg-white w-[100%] z-10'>
        {handleSearch(campaigns, searchInput).map((search, id) => (
          <a
            key={id}
            className='flex space-x-5 border-b-2 hover:bg-slate-200 hover:cursor-pointer'
            href={`../campaign/${search.campaignId}`}
          >
            <img
              src={search.image}
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
          </a>
        ))}
      </div>
    </div>
  );
};
