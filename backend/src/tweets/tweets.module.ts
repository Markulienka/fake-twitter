import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { Tweet, TweetSchema } from './tweet.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tweet.name, schema: TweetSchema }
    ]),
    UsersModule,
  ],
  providers: [TweetsService],
  controllers: [TweetsController],
})
export class TweetsModule {}