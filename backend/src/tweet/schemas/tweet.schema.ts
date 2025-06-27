import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TweetDocument = HydratedDocument<Tweet>;

@Schema({ timestamps: true })
export class Tweet {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: 0 })
  likesCount: number;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);

TweetSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TweetSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});
