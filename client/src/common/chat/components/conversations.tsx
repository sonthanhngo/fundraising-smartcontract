// import { Socket } from 'socket.io-client';
// import { Conversation as TConversation } from '@src/common/utils/type';
// import { Conversation } from './conversation';
// import { useAddress } from '@thirdweb-dev/react';
// import { unixTimestampToDateConverter } from '../../utils/type-converter';
// import React from 'react';
// import { getToAddress } from '../../utils/data-formatter';
// type ConversationsProps = {
//   conversations: TConversation[];
//   socket: Socket;
// };
// export const Conversations = ({
//   conversations,
//   socket,
// }: ConversationsProps) => {
//   const address = useAddress();
//   const [isOpenConversation, setIsOpenConversation] = React.useState(false);
//   const [selectedConversation, setSelectedConversation] = React.useState(0);
//   const handleClick = (id: number) => {
//     setSelectedConversation(id);
//     setIsOpenConversation(true);
//   };
//   // console.log(conversations[0].recipient1);
//   // console.log(
//   //   getToAddress(
//   //     conversations[0].recipient1,
//   //     conversations[0].recipient2,
//   //     address!
//   //   )
//   // );
//   return (
//     <div className='h-full overflow-auto no-scrollbar'>
//       {
//         !isOpenConversation
//           ? address &&
//             conversations &&
//             conversations.map((conversation, id) => (
//               <div
//                 className='border-2 p-2 rounded-md mb-5'
//                 onClick={() => handleClick(id)}
//                 key={id}
//               >
//                 <h1 className='font-semibold text-[1rem] text-red-700'>
//                   {getToAddress(
//                     conversation.recipient1,
//                     conversation.recipient2,
//                     address
//                   )}
//                 </h1>
//                 <h1>
//                   {unixTimestampToDateConverter(
//                     conversation.messages.slice(-1)[0].time
//                   )}
//                 </h1>
//                 <h1>{conversation.messages.slice(-1)[0].content}</h1>
//               </div>
//             ))
//           : address && (
//               <Conversation
//                 conversation={conversations[selectedConversation]}
//                 address={address}
//                 socket={socket}
//               />
//             )

//       }
//     </div>
//   );
// };
