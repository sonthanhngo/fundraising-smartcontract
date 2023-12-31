import React, { FormEvent } from 'react';
import { io } from 'socket.io-client';
import { Conversation as TConversation } from '@src/common/utils/type';
import { Conversations } from './components/conversations';
import { useAddress } from '@thirdweb-dev/react';
const socket = io('http://localhost:3080');
type CreateConversationDto = {
  recipient1: string;
  recipient2: string;
  content: string;
};

export const Chat = () => {
  const address = useAddress();

  const [conversations, setConversations] = React.useState<TConversation[]>([]);
  const [form, setForm] = React.useState<CreateConversationDto>({
    recipient1: '',
    recipient2: '',
    content: '',
  });
  React.useEffect(() => {
    socket.emit(
      'getConversations',
      { from: address },
      (response: TConversation[]) => {
        setConversations(response);
      }
    );
  }, [address]);

  React.useEffect(() => {
    socket.on('newConversation', (conversation: TConversation) => {
      console.log(conversation);
      setConversations((prev) => [...prev, conversation]);
    });
  }, []);

  const handleInputChange = (fieldName: string, data: string) => {
    switch (fieldName) {
      case 'to':
        setForm({ ...form, recipient2: data });
        break;
      default:
        setForm({ ...form, [fieldName]: data });
    }
  };
  if (address && form.recipient1 === '') {
    setForm({ ...form, recipient1: address! });
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.recipient1 === '' || form.recipient2 === form.recipient1) {
      alert('error');
    } else {
      socket.emit(
        'createConversation',
        { ...form },
        (conversation: TConversation) => {
          setConversations((prev) => [...prev, conversation]);
        }
      );
    }
  };
  const [isNewConversation, setIsNewConversation] = React.useState(false);
  const [isChat, setIsChat] = React.useState(false);
  const handleClose = () => {
    setIsChat(false);
  };
  return (
    <div className=''>
      <button
        className='fixed bottom-10 right-10'
        onClick={() => setIsChat((prev) => !prev)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
          />
        </svg>
      </button>
      {isChat && (
        <div className=' border-2 fixed bottom-[5rem] p-2 right-10 w-[35rem] h-[35rem] rounded-md '>
          <div className='flex justify-between mb-5 '>
            <h1 className='font-bold text-[1rem]'>Chat</h1>
            <button onClick={() => setIsNewConversation(true)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z'
                />
              </svg>
            </button>
            <button onClick={handleClose} className=''>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 justify-end'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='w-full h-[90%]'>
            {/* {isNewConversation ? (
              <div>
                <label>enter address</label>
                <input></input>
              </div>
            ) : ( */}
            <Conversations />
            {/* )} */}
          </div>
        </div>
      )}
      {/* <form onSubmit={handleSubmit}>
        <fieldset className=''>
          <label htmlFor='to'>send message to?</label>
          <input
            type='text'
            id='to'
            className='border-2'
            onChange={(e) => handleInputChange('to', e.target.value)}
          ></input>
        </fieldset>
        <fieldset className=''>
          <label htmlFor='content'>input your message</label>
          <input
            type='text'
            id='content'
            className='border-2'
            onChange={(e) => handleInputChange('content', e.target.value)}
          ></input>
        </fieldset>
        <input type='submit'></input>
      </form>
      {(address || conversations) &&
        conversations.map((conversation, id) => (
          <Conversation
            conversation={conversation}
            address={address!}
            key={id}
            socket={socket}
          />
        ))} */}
    </div>
  );
};
