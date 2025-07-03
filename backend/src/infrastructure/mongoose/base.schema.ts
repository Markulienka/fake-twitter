import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BaseDocument = BaseSchema & Document;

@Schema()
export class BaseSchema {
  id: string; 
  createdAt: Date;
  updatedAt: Date;
}

export function createSchema<T extends BaseSchema>(schema: new () => T) {
  const createdSchema = SchemaFactory.createForClass(schema);

  createdSchema.set('toJSON', {
    virtuals: true,
    getters: true,
    transform: (_: any, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

  return createdSchema;
}