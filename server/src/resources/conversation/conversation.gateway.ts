import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { ConversationService } from './conversation.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Server, Socket } from 'socket.io';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { GetConversationsDto } from './dtos/get-conversations.dto';

@WebSocketGateway(3080, { cors: '*' })
export class ConversationGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly conversationService: ConversationService) {}

  @SubscribeMessage('createConversation')
  async createConversation(
    @MessageBody()
    createConversationDto: CreateConversationDto,
  ) {
    const { recipient2 } = createConversationDto;
    const conversation = await this.conversationService.createConversation(
      createConversationDto,
    );
    const toSocket = this.conversationService.getUserSocket(recipient2);
    this.server.to(toSocket).emit('newConversation', conversation);
    return conversation;
  }

  @SubscribeMessage('getConversations')
  getConversations(
    @MessageBody() getConversationDto: GetConversationsDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.conversationService.getConversations(
      getConversationDto,
      client.id,
    );
  }

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const { to } = createMessageDto;
    const message =
      await this.conversationService.createMessage(createMessageDto);
    const toSocket = this.conversationService.getUserSocket(to);
    console.log(this.conversationService.addressToSocket);
    this.server.to(toSocket).emit('newMessage', message);
    return message;
  }

  @SubscribeMessage('test')
  test() {
    return this.conversationService.addressToSocket;
  }
}
