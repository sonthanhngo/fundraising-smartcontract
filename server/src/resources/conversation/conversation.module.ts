import { ConversationService } from './conversation.service';
import { Module } from '@nestjs/common';
import { ConversationGateway } from './conversation.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema, Conversation } from './conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  providers: [ConversationGateway, ConversationService],
})
export class ConversationModule {}
