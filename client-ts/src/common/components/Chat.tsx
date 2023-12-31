import React, { FormEvent } from 'react';
import { io } from 'socket.io-client';
import { Conversation } from '@src/common/utils/type';
const socket = io('http://localhost:3080');
type CreateConversationDto = {
  recipient1: string;
  recipient2: string;
  content: string;
};

type ChatProps = {
  address: string;
};
export const Chat = ({ address }: ChatProps) => {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [form, setForm] = React.useState<CreateConversationDto>({
    recipient1: address,
    recipient2: '',
    content: '',
  });
  React.useEffect(() => {
    socket.emit(
      'getConversations',
      { from: address },
      (response: Conversation[]) => {
        setConversations(response);
      }
    );
  }, [address]);

  React.useEffect(() => {
    socket.on('newConversation', (conversation: Conversation) =>
      setConversations((prev) => [...prev, conversation])
    );
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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit('createConversation', { ...form });
  };
  return (
    <div>
      {conversations.map((conversation, id) => (
        <Conversation conversation={conversation} key={id} />
      ))}
      <form onSubmit={handleSubmit}>
        <fieldset className=''>
          <label htmlFor='to'>send message to?</label>
          <input
            type='text'
            id='to'
            onChange={(e) => handleInputChange('to', e.target.value)}
          ></input>
        </fieldset>
        <fieldset className=''>
          <label htmlFor='content'>input your message</label>
          <input
            type='text'
            id='content'
            onChange={(e) => handleInputChange('content', e.target.value)}
          ></input>
        </fieldset>
        <input type='submit'></input>
      </form>
    </div>
  );
};
