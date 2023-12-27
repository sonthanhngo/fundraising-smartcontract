import Form from './components/Form';

export const index = () => {
  return (
    <div>
      <div className='mx-[90px]'>
        {/* Title */}
        <h1 className='text-[2.4rem] font-bold text-green-700'>
          create your campaign
        </h1>
        <Form />
      </div>
    </div>
  );
};
