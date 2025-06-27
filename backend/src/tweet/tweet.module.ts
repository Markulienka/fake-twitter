import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tweet.name, schema: TweetSchema }
    ]),
    AuthModule,
  ],
  providers: [TweetService],
  controllers: [TweetController],
})
export class TweetModule {}