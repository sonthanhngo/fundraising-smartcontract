// import { Schema, Prop } from '@nestjs/mongoose';
// import { SchemaFactory } from '@nestjs/mongoose';
// @Schema({ _id: false })
// export class Review {
//   @Prop()
//   address: string;

//   @Prop()
//   review: string;

//   @Prop()
//   amount: number;
// }

// @Schema({ _id: false })
// export class Update {
//   @Prop()
//   date: string;

//   @Prop()
//   update: string;
// }

// @Schema()
// export class Message {
//   @Prop()
//   recipient1: string;

//   @Prop()
//   recipient2: string;

//   @Prop()
//   message: string;

//   @Prop()
//   title: string;

//   @Prop()
//   description: string;

//   @Prop()
//   target: number;

//   @Prop()
//   deadline: string;

//   @Prop()
//   timeCreated: string;

//   @Prop()
//   images: string[];

//   @Prop({ type: [Review] })
//   reviews: Review[];

//   @Prop({ type: [Update] })
//   updates: Update[];
// }
// export const CampaignSchema = SchemaFactory.createForClass(Campaign);
