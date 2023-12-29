import loader from '@src/assets/loader.svg';

type LoaderProps = {
  content: string;
};
export const Loader = ({ content }: LoaderProps) => {
  return (
    <div className='fixed inset-0 z-10 h-100% bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col'>
      <img
        src={loader}
        alt='loader'
        className='w-[100px] h-[100px] object-contain'
      />

      <p className='mt-[20px] font-epilogue font-bold text-[1.5rem] text-white text-center'>
        {content}
        {/* {txHash && (
          <a
            className='text-green-700'
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            here
          </a>
        )} */}
      </p>
    </div>
  );
};
