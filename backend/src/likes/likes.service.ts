import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './like.schema';
import { Tweet, TweetDocument } from '../tweets/tweet.schema';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
  ) {}
 
  async likeTweet(tweetId: string, userId: string): Promise<void> {
    const existingLike = await this.likeModel.findOne({ tweetId, userId });
    if (existingLike) {
      throw new Error('Tweet already liked');
    }

    await this.likeModel.create({ tweetId, userId });
    
    const tweet = await this.tweetModel.findById(tweetId);
    if (tweet) {
      await this.tweetModel.findByIdAndUpdate(tweetId, { 
        likesCount: tweet.likesCount + 1 
      });
    }
  }

  async unlikeTweet(tweetId: string, userId: string): Promise<void> {
    const existingLike = await this.likeModel.findOne({ tweetId, userId });
    if (!existingLike) {
      throw new Error('Tweet not liked yet');
    }

    await this.likeModel.deleteOne({ tweetId, userId });
    
    const tweet = await this.tweetModel.findById(tweetId);
    if (tweet && tweet.likesCount > 0) {
      await this.tweetModel.findByIdAndUpdate(tweetId, { 
        likesCount: tweet.likesCount - 1
      });
    }
  }

  async getUserLikes(userId: string): Promise<string[]> {
    const likes = await this.likeModel.find({ userId }).exec();
    return likes.map(like => like.tweetId);
  }
}