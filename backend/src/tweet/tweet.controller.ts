import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { Tweet } from '../types';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  getAllTweets(): Tweet[] {
    return this.tweetService.getAllTweets();
  }

  @Post()
  createTweet(@Body() body: { text: string; name: string }): Tweet {
    return this.tweetService.createTweet(body.text, body.name);
  }

  @Delete(':id')
  deleteTweet(@Param('id') id: string): { success: boolean } {
    const deleted = this.tweetService.deleteTweet(Number(id));
    return { success: deleted };
  }
}