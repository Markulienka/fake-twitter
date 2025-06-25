import { Module } from '@nestjs/common';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [TweetModule],
})
export class AppModule {}