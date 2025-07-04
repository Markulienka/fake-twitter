import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { BaseSchema, createSchema } from '../infrastructure/mongoose/base.schema';

export type TweetDocument = HydratedDocument<Tweet>;

@Schema({ 
  timestamps: true,
  collection: 'tweets'
})
export class Tweet extends BaseSchema {
  @ApiProperty({
    example: 'Hello, world!',
    description: 'The content of the tweet, must be between 1 and 280 characters and cannot be empty',
  })
  @Prop({ required: true })
  text: string;

  @ApiProperty({
    example: 'Marko',
    description: 'The unique identifier of the user who is creating the tweet',
  })
  @Prop({ required: true })
  authorName: string;

  @ApiProperty({
    example: '60c72b2f9b1d8c001c8e4f3a',
    description: 'The unique identifier of the user who is creating the tweet - MongoDB ObjectId',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({
    example: 0,
    description: 'The number of likes this tweet has received',
  })
  @Prop({ default: 0 })
  likesCount: number;
}

export const TweetSchema = createSchema(Tweet);

