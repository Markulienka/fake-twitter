import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Types } from 'mongoose';

import { BaseSchema, createSchema } from '../infrastructure/mongoose/base.schema';

export type LikeDocument = HydratedDocument<Like>;

@Schema({
  timestamps: true,
  collection: 'likes'
})
export class Like extends BaseSchema {  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tweet', required: true })
  tweetId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const LikeSchema = createSchema(Like);

LikeSchema.index({ tweetId: 1, userId: 1 }, { unique: true });