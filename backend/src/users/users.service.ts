import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { username, email, password } = createUserDto;  
    const newUser = new this.userModel({
      username,
      email,
      passwordHash: password, 
    });
    
    const savedUser = await newUser.save();
    return savedUser;
  }

  async findByUsernameWithPassword(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
     return user;
  }

  async findAllUsers(): Promise<UserDocument[]> {
    return await this.userModel.find().sort({ createdAt: -1 }).exec();
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error('User not found');
    }
    return true;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
