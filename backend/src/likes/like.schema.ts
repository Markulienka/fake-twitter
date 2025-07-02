import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { applyBaseSchema } from '../infrastructure/baseSchema/base.schema';

export type LikeDocument = HydratedDocument<Like>;

@Schema({
  timestamps: true,
  collection: 'likes'
})
export class Like {  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tweet', required: true })
  tweetId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

applyBaseSchema(LikeSchema);

LikeSchema.index({ tweetId: 1, userId: 1 }, { unique: true });