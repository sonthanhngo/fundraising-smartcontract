import { amountPerTarget, daysLeft } from '../../utils';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { green } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';

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
  console.log(campaign);
  const percentageFund = amountPerTarget(amountCollected, target);
  const navigate = useNavigate();
  console.log(campaign);
  return (
    <div className='w-[32.7%] border-2 rounded-md '>
      {/* campaign image */}
      {verified === 2}
      <img
        src={images[0]}
        className='w-[100%] h-[250px] rounded-md object-cover cursor-pointer  '
        onClick={() => navigate(`../campaign/${campaignId}`)}
      />
      {/* campaign data */}
      <div className='px-3'>
        <div className='flex flex-wrap items-center mt-3'>
          <h1 className=' font-bold text-[1.2rem] text-green-700 '>{title}</h1>
          <VerifiedIcon sx={{ fontSize: 20, color: green[700] }} />
        </div>
        <h2 className='text-[1rem]'>
          by <span className='font-semibold'>{ownerName}</span>
        </h2>
        <div className='bg-green-700 h-1 my-3 '></div>
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
          <span className='font-semibold'>{daysLeft(deadline)} </span> days to
          go
        </h2>
      </div>
    </div>
  );
};
