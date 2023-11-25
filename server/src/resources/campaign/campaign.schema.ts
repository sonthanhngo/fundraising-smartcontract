import { Schema, Prop } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Review {
  @Prop()
  address: string;

  @Prop()
  review: string;
}

@Schema({ _id: false })
export class Update {
  @Prop({ type: Date, default: Date.now() })
  date: Date;

  @Prop()
  update: string;
}

enum Status {
  DECLINE,
  PENDING,
  ACCEPT,
}
@Schema()
export class Campaign {
  @Prop({ enum: Status, default: Status.PENDING })
  status: boolean;

  @Prop({ default: crypto.randomUUID() })
  smartContractId: string;

  @Prop()
  owner: string;

  @Prop()
  ownerName: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  target: string;

  @Prop()
  deadline: string;

  @Prop()
  timeCreated: string;

  @Prop()
  images: string[];

  @Prop({ type: [Review] })
  reviews: Review[];

  @Prop({ type: [Update] })
  updates: Update[];
}
export const CampaignSchema = SchemaFactory.createForClass(Campaign);
