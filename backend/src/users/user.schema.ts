import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Exclude } from 'class-transformer';
import { applyBaseSchema } from '../infrastructure/baseSchema/base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ 
  timestamps: true,
  collection: 'users'
})
export class User {    
    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: [true, "Duplicate email entered"] })
    email: string;

    @Prop({ required: true })
    @Exclude()
    passwordHash: string;
}

export type PublicUser = {
  id: string;
  username: string;
  email: string;
};

export const UserSchema = SchemaFactory.createForClass(User);

applyBaseSchema(UserSchema);
