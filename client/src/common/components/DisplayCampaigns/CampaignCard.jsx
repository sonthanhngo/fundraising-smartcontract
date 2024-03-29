import { amountPerTarget, daysLeft } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

export const CampaignCard = ({ campaign }) => {
  const {
    ownerName,
    title,
    target,
    deadline,
    verified,
    amountCollected,
    images,
    campaignId,
  } = campaign;
  const percentageFund = amountPerTarget(amountCollected, target);
  const navigate = useNavigate();

  return (
    <div className='w-[32.7%] border-2 rounded-md '>
      {/* campaign image */}
      <img
        src={images[0]}
        className='w-[100%] h-[250px] rounded-md object-cover cursor-pointer  '
        onClick={() => navigate(`../campaign/${campaignId}`)}
      />
      {/* campaign data */}
      <div className='px-3'>
        <h1 className=' font-bold text-[1.2rem] text-green-700 mt-2 '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-5 h-5 mb-1 inline-block'
          >
            <path
              fillRule='evenodd'
              d='M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
              clipRule='evenodd'
            />
          </svg>
          VERIFIED
        </h1>
        <h1 className=' font-bold text-[1.2rem]'>{title}</h1>
        <h2 className='text-[1rem]'>
          by <span className='font-semibold'>{ownerName}</span>
        </h2>
        <Progress
          value={
            (amountCollected / target) * 100 < 100
              ? (amountCollected / target) * 100
              : 100
          }
          className='my-2'
          indicatorColor={
            (amountCollected / target) * 100 < 100
              ? 'bg-red-700'
              : 'bg-green-700'
          }
        />

        <h2 className='text-[1rem]'>
          {percentageFund >= 1 ? (
            <span className='text-green-700 font-semibold'>
              {' '}
              {percentageFund}%{' '}
            </span>
          ) : (
            <span className='text-red-500 font-semibold'>
              {' '}
              {percentageFund}%{' '}
            </span>
          )}
          funded
        </h2>

        <h2 className='text-[1rem] mb-3'>
          <span className='font-semibold'>
            {daysLeft(deadline) > 0 ? daysLeft(deadline) : 0}{' '}
          </span>{' '}
          days to go
        </h2>
      </div>
    </div>
  );
};
