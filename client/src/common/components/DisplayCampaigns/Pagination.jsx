import { useState } from 'react';
import { CampaignCard } from './CampaignCard';
import { CampaignCardAdmin } from './CampaignCardAdmin';

export const Pagination = ({ campaigns, isAdmin }) => {
  const totalElementsPerPage = 3;
  const totalPages = Math.ceil(campaigns.length / totalElementsPerPage);
  const pageArr = Array.from({ length: totalPages }, (_, index) => index + 1);
  const [currentPage, setCurrentPage] = useState(1);
  const lowerPageRange = (page) => {
    return (page - 1) * totalElementsPerPage;
  };
  const upperPageRange = (page) => {
    return page * totalElementsPerPage;
  };
  const pageElement = (page) => {
    return campaigns.slice(lowerPageRange(page), upperPageRange(page));
  };
  return (
    <div className=' w-full relative group'>
      {isAdmin ? (
        <div className=''>
          {pageElement(currentPage).map((element, id) => (
            <CampaignCardAdmin key={id} campaign={element} />
          ))}
        </div>
      ) : (
        <div className='flex flex-wrap  space-x-2'>
          {pageElement(currentPage).map((element, id) => (
            <CampaignCard key={id} campaign={element} />
          ))}
        </div>
      )}

      {campaigns.length === 0 ? (
        <div className='my-[100px] text-center font-semibold text-[1.2rem]'>
          no campaigns found
        </div>
      ) : (
        <div className='flex mt-5 text-[1rem] font-semibold justify-end'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className='mr-3  disabled:text-gray-500'
          >
            prev
          </button>
          {pageArr.map((page, id) => (
            <button
              key={id}
              className='mx-3'
              onClick={() => setCurrentPage(page)}
            >
              {page === currentPage ? (
                <span className='text-green-700'>{page}</span>
              ) : (
                <span className=''>{page}</span>
              )}
            </button>
          ))}
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className='ml-3 disabled:text-gray-500'
          >
            next
          </button>
        </div>
      )}
    </div>
  );
};
