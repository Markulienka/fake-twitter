import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TweetDocument } from './tweet.schema';
import { TweetDto } from './dto/tweet.dto';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweet.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetsModel: Model<TweetDocument>,
    private usersService: UsersService,
  ) {}

  async getAllTweets(): Promise<TweetDto[]> {
    const tweets = await this.tweetsModel.find().sort({ createdAt: -1 }).exec();

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
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newTweet = new this.tweetsModel({ 
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
    const result = await this.tweetsModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Tweet not found');
    }
    return true;
  }
}