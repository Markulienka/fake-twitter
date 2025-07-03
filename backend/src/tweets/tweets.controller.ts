import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { DeleteTweetParams } from './dto/delete-tweet.dto';
import { Tweet } from './tweet.schema';

@Controller('tweets')
@UseGuards(AuthGuard('jwt'))
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get()
  async getAllTweets(): Promise<Tweet[]> {
    return this.tweetsService.getAllTweets();
  }
  
  @Post()
  async createTweet(@Body() createTweetDto: CreateTweetDto): Promise<Tweet> {
    return this.tweetsService.createTweet(createTweetDto);
  }

  @Delete(':id')
  async deleteTweet(@Param() params: DeleteTweetParams) {
    return this.tweetsService.deleteTweet(params.id);
  }
}