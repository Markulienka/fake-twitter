import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { applyBaseSchema } from '../infrastructure/baseSchema/base.schema';

export type TweetDocument = HydratedDocument<Tweet>;

@Schema({ 
  timestamps: true,
  collection: 'tweets'
})
export class Tweet {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ default: 0 })
  likesCount: number;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);

applyBaseSchema(TweetSchema);
