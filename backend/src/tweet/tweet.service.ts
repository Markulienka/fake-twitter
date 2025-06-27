import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TweetDocument } from './schemas/tweet.schema';
import { TweetDto } from './dto/tweet.dto';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './schemas/tweet.schema';
import { UserService } from '../auth/user.service';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
    private userService: UserService,
  ) {}

  async getAllTweets(): Promise<TweetDto[]> {
    const tweets = await this.tweetModel.find().sort({ createdAt: -1 }).exec();

    const tweetResponses = tweets.map((tweet) => ({
      id: tweet.id,
      text: tweet.text, 
      authorName: tweet.authorName,
      userId: tweet.userId,
      likesCount: tweet.likesCount,
    }));

    return tweetResponses;
  }

  async createTweet(createTweetDto: CreateTweetDto): Promise<TweetDto> {
    const { text, userId } = createTweetDto;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newTweet = new this.tweetModel({ 
      text, 
      authorName: user.username,
      userId: userId,
      likesCount: 0 
    });
    
    const savedTweet = await newTweet.save();
    
    return {
      id: savedTweet.id,
      text: savedTweet.text,
      authorName: savedTweet.authorName,
      userId: savedTweet.userId,
      likesCount: savedTweet.likesCount,
    };
  }

  async deleteTweet(id: string): Promise<boolean> {
    const result = await this.tweetModel.findByIdAndDelete(id);
    return result !== null;
  }
}