import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
  @Prop({ required: true })
  tweetId: string;

  @Prop({ required: true })
  userId: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

LikeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

LikeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

LikeSchema.index({ tweetId: 1, userId: 1 }, { unique: true }); // user can only like once