import { GetConversationsDto } from './dtos/get-conversations.dto';
import { Conversation } from './conversation.schema';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateConversationDto } from './dtos/create-conversation.dto';

@Injectable()
export class ConversationService {
  addressToSocket = {};
  constructor(
    @InjectModel(Conversation.name) private model: Model<Conversation>,
  ) {}

  getUserSocket(address: string): string {
    return this.addressToSocket[address];
  }

  setUserSocket(address: string, socketId: string) {
    this.addressToSocket[address] = socketId;
  }

  async createConversation(createConversationDto: CreateConversationDto) {
    const { recipient1, recipient2, content } = createConversationDto;
    const conversation = await this.model.findOne({
      recipient1: recipient1,
      recipient2: recipient2,
    });
    if (!conversation) {
      await this.model.create({
        recipient1: recipient1,
        recipient2: recipient2,
      });
      const newConversation = await this.model
        .findOneAndUpdate(
          { recipient1: recipient1, recipient2: recipient2 },
          {
            $push: {
              messages: { to: recipient2, time: Date.now(), content: content },
            },
          },
          {
            new: true,
          },
        )
        .select('-__v ');
      return newConversation;
    } else {
      return 'error';
    }
  }

  async getConversations(
    getConversationDto: GetConversationsDto,
    socketId: string,
  ) {
    const { from } = getConversationDto;
    const res = await this.model
      .find({ $or: [{ recipient1: from }, { recipient2: from }] })
      .select(' -__v ');
    this.setUserSocket(from, socketId);
    return res;
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const { id, to, content } = createMessageDto;
    const conversation = await this.model.findOne({
      _id: id,
    });
    if (conversation) {
      const message = { to: to, time: Date.now(), content: content };
      await this.model.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            messages: message,
          },
        },
      );
      return message;
    } else {
      return 'error';
    }
  }

  // identify(name: string, clientId: string) {
  //   this.clientToUser[clientId] = name;
  //   console.log(`clientToUser: ${this.clientToUser}`);
  //   const something = Object.values(this.clientToUser);
  //   console.log(`result ${something}`);
  //   return something;
  // }

  // getClientName(clientId: string) {
  //   return this.clientToUser[clientId];
  // }
}
