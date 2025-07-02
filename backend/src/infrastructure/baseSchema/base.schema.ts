import { Schema } from 'mongoose';

export function applyBaseSchema<T>(schema: Schema<T>) {
  schema.virtual('id').get(function (this: any) {
    return this._id.toString();
  });

  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_: any, ret: any) => {
      delete ret._id;
      delete ret.__v;
      delete ret.passwordHash;
    },
  });
}