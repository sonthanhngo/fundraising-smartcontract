import React, { FormEvent } from 'react';
import { Socket } from 'socket.io-client';
import { Message, Conversation as TConversation } from '@src/common/utils/type';
import { unixTimestampToDateConverter } from '../../utils/type-converter';
import { getToAddress } from '../../utils/data-formatter';

type ConversationProps = {
  conversation: TConversation;
  address: string;
  socket: Socket;
  onNewMessage: () => void;
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
  onNewMessage,
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
      onNewMessage();
    });
    return () => {
      socket.off();
    };
  }, [socket, onNewMessage, conversation]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, content: e.target.value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit('createMessage', form, (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
    setForm({ ...form, content: '' });
    onNewMessage();
  };

  return (
    <div className='h-full'>
      <h1 className='text-[1.2rem] font-bold mb-5 text-red-700'>
        {getToAddress(recipient1, recipient2, address)}
      </h1>
      <div className='h-[80%] overflow-y-auto'>
        {messages.map((message, id) => (
          <div className='' key={id}>
            <h1 className='text-center font-semibold'>
              {unixTimestampToDateConverter(message.time)}
            </h1>
            <h1 className='h-10 border-2 rounded-md p-2'>{message.content}</h1>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='absolute w-full bottom-3'>
        <fieldset className=''>
          <input
            type='text'
            onChange={handleInputChange}
            value={form.content}
            className='border-2 w-4/5 rounded-md h-10 px-2 '
          ></input>
          <button type='submit' className='text-center w-1/5 font-semibold'>
            send
          </button>
        </fieldset>
      </form>
    </div>
  );
};
