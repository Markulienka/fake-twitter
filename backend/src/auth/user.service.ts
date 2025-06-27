import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, email, password } = createUserDto;
    
    const newUser = new this.userModel({
      username,
      email,
      passwordHash: password, 
    });
    
    const savedUser = await newUser.save();
    
    return {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    };
  }

  async findByUsernameWithPassword(username: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<UserDto | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
