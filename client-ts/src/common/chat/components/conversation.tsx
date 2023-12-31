import React, { FormEvent } from 'react';
import { Socket } from 'socket.io-client';
import { Message, Conversation as TConversation } from '@src/common/utils/type';
import { unixTimestampToDateConverter } from '../../utils/type-converter';

type ConversationProps = {
  conversation: TConversation;
  address: string;
  socket: Socket;
};

type FormSchema = {
  id: string;
  to: string;
  content: string;
};
export const Conversation = ({
  conversation,
  address,
  socket,
}: ConversationProps) => {
  const { _id, recipient1, recipient2 } = conversation;
  const to = address === recipient1 ? recipient2 : recipient1;
  const [form, setForm] = React.useState<FormSchema>({
    id: _id,
    to: to,
    content: '',
  });
  const [messages, setMessages] = React.useState<Message[]>([
    ...conversation.messages,
  ]);

  React.useEffect(() => {
    socket.on('newMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, content: e.target.value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit('createMessage', form, (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
  };
  return (
    <div className='border-2 '>
      <h1>chat with {to}</h1>
      {messages.map((message, id) => (
        <div key={id} className='mb-10 border-2'>
          <h1>
            {message.to === recipient1 ? recipient2 : recipient1} at{' '}
            {unixTimestampToDateConverter(message.time)}
          </h1>
          <h1>{message.content}</h1>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <fieldset className=''>
          <input
            type='text'
            onChange={handleInputChange}
            className='border-2'
          ></input>
          <input type='submit'></input>
        </fieldset>
      </form>
    </div>
  );
};
