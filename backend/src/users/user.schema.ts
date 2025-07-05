import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

import { BaseSchema, createSchema } from '../infrastructure/mongoose/base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ 
  timestamps: true,
  collection: 'users'
})
export class User extends BaseSchema {    
    @ApiProperty({ example: 'Marko', description: 'Username of the user' })
    @Prop({ required: true })
    username: string;

    @ApiProperty({ example: 'marko@gmail.com', description: 'Email of the user' })
    @Prop({ required: true, unique: [true, "Duplicate email entered"] })
    email: string;

    @ApiHideProperty()
    @Prop({ required: true })
    @Exclude()
    passwordHash: string;
}

export const UserSchema = createSchema(User);
