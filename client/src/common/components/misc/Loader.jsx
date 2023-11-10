import { loader } from '../../../assets/index';

export const Loader = ({ title, transactionHash }) => {
  return (
    <div className='fixed inset-0 z-10 h-100% bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col'>
      <img
        src={loader}
        alt='loader'
        className='w-[100px] h-[100px] object-contain'
      />

      <p className='mt-[20px] font-epilogue font-bold text-[1.5rem] text-white text-center'>
        {title}
        {transactionHash && (
          <a
            className='text-green-700'
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            here
          </a>
        )}
      </p>
    </div>
  );
};
