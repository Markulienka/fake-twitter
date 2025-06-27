import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetDto } from './dto/tweet.dto';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  async getAllTweets(): Promise<TweetDto[]> {
    return this.tweetService.getAllTweets();
  }
  
  @Post()
  async createTweet(@Body() createTweetDto: CreateTweetDto): Promise<TweetDto> {
    return this.tweetService.createTweet(createTweetDto);
  }

  @Delete(':id')
  async deleteTweet(@Param('id') id: string): Promise<{ success: boolean }> {
    const deleted = await this.tweetService.deleteTweet(id);
    return { success: deleted };
  }
}