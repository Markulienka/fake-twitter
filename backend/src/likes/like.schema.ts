import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { BaseSchema, createSchema } from '../infrastructure/mongoose/base.schema';

export type LikeDocument = HydratedDocument<Like>;

@Schema({
  timestamps: true,
  collection: 'likes'
})
export class Like extends BaseSchema {  
  @ApiProperty({ 
    example: '60c72b2f9b1d8c001c8e4f3a', 
    description: 'The unique identifier of the liked tweet - MongoDB ObjectId', 
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tweet', required: true })
  tweetId: Types.ObjectId;

  @ApiProperty({
    example: '60c72b2f9b1d8c001c8e4f3a',
    description: 'The unique identifier of the user who liked the tweet - MongoDB ObjectId',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const LikeSchema = createSchema(Like);

LikeSchema.index({ tweetId: 1, userId: 1 }, { unique: true });