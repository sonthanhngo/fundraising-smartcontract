import React, { FormEvent } from 'react';
import { io } from 'socket.io-client';
import { Conversation as TConversation } from '@src/common/utils/type';
import { Conversation } from './conversation';
import { useAddress } from '@thirdweb-dev/react';
const socket = io('http://localhost:3080');
type CreateConversationDto = {
  recipient1: string;
  recipient2: string;
  content: string;
};

export const Conversations = () => {
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
  return (
    <div className='h-full overflow-auto no-scrollbar'>
      <form onSubmit={handleSubmit}>
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
        ))}
    </div>
  );
};
