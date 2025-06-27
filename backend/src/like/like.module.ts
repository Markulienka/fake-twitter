import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { Like, LikeSchema } from './schemas/like.schema';
import { Tweet, TweetSchema } from '../tweet/schemas/tweet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Tweet.name, schema: TweetSchema },
    ]),
  ],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}