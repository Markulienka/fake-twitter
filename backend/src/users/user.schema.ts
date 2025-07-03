import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Exclude } from 'class-transformer';

import { BaseSchema, createSchema } from '../infrastructure/mongoose/base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ 
  timestamps: true,
  collection: 'users'
})
export class User extends BaseSchema {    
    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: [true, "Duplicate email entered"] })
    email: string;

    @Prop({ required: true })
    @Exclude()
    passwordHash: string;
}

export const UserSchema = createSchema(User);
