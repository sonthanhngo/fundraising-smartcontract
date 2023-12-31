import { Schema, Prop } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Message {
  @Prop()
  to: string;

  @Prop()
  time: number;

  @Prop()
  content: string;
}

@Schema()
export class Conversation {
  @Prop()
  recipient1: string;

  @Prop()
  recipient2: string;

  @Prop()
  messages: Message[];
}
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
