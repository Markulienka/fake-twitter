import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { Like, LikeSchema } from './like.schema';
import { Tweet, TweetSchema } from '../tweets/tweet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Tweet.name, schema: TweetSchema },
    ]),
  ],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}