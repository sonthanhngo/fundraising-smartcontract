// import { Injectable } from '@nestjs/common';
// import { MessageDto } from './dtos/message.dto';

// @Injectable()
// export class MessageService {
//   messages = [{ from: 'son', to: 'mi', message: 'hello' }];
//   clientToUser = {};
//   create(createMessageDto: MessageDto) {
//     const message = { ...createMessageDto };
//     this.messages.push(message);
//     return message;
//   }

//   findAll() {
//     return this.messages;
//   }

//   //   identify(name: string, clientId: string) {
//   //     this.clientToUser[clientId] = name;
//   //     console.log(`clientToUser: ${this.clientToUser}`);
//   //     const something = Object.values(this.clientToUser);
//   //     console.log(`result ${something}`);
//   //     return something;
//   //   }

//   //   getClientName(clientId: string) {
//   //     return this.clientToUser[clientId];
//   //   }
// }
