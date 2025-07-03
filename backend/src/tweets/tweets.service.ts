import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';

import { TweetDocument } from './tweet.schema';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweet.schema';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetsModel: Model<TweetDocument>,
    private usersService: UsersService,
  ) {}

  async getAllTweets(): Promise<Tweet[]> {
    const tweets = await this.tweetsModel.find().sort({ createdAt: -1 }).exec();

    return tweets.map((tweet) => plainToInstance(Tweet, tweet.toJSON()));
  }

  async createTweet(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const { text, userId } = createTweetDto;
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newTweet = new this.tweetsModel({ 
      text, 
      authorName: user.username,
      userId: userId,
      likesCount: 0 
    });
    
    const savedTweet = await newTweet.save();
    return plainToInstance(Tweet, savedTweet.toJSON());
  }

  async deleteTweet(id: string): Promise<boolean> {
    const result = await this.tweetsModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Tweet not found');
    }
    return true;
  }
}