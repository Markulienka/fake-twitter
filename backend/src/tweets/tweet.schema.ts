import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Types } from 'mongoose';

import { BaseSchema, createSchema } from '../infrastructure/mongoose/base.schema';

export type TweetDocument = HydratedDocument<Tweet>;

@Schema({ 
  timestamps: true,
  collection: 'tweets'
})
export class Tweet extends BaseSchema {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ default: 0 })
  likesCount: number;
}

export const TweetSchema = createSchema(Tweet);

