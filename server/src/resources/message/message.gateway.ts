import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { MessageDto } from './dtos/message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3080, { cors: '*' })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: MessageDto) {
    const message = this.messageService.create(createMessageDto);
    this.server.emit('message', message);
    // return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    const messages = this.messageService.findAll();
    return messages;
  }

  //   @SubscribeMessage('join')
  //   join(@MessageBody('name') name: string, @ConnectedSocket() client: Socket) {
  //     return this.messagesService.identify(name, client.id);
  //   }

  //   @SubscribeMessage('typing')
  //   async typing(
  //     @MessageBody('isTyping') isTyping: boolean,
  //     @ConnectedSocket() client: Socket,
  //   ) {
  //     const name = await this.messagesService.getClientName(client.id);
  //     client.broadcast.emit('typing', { name, isTyping });
  //   }

  //   @SubscribeMessage('test')
  //   test() {
  //     // this.server.emit('test', { hello: 'hello' });
  //     return { hello: 'hello' };
  //   }
}
