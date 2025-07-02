import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetDto } from './dto/tweet.dto';
import { isValidObjectId } from 'mongoose';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tweets')
// @UseGuards(JwtAuthGuard)
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get()
  async getAllTweets(): Promise<TweetDto[]> {
    return this.tweetsService.getAllTweets();
  }
  
  @Post()
  async createTweet(@Body() createTweetDto: CreateTweetDto): Promise<TweetDto> {
    return this.tweetsService.createTweet(createTweetDto);
  }

  @Delete(':id')
  async deleteTweet(@Param('id') id: string): Promise<{ success: boolean }> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid MongoId');
    }
    const deleted = await this.tweetsService.deleteTweet(id);
    return { success: deleted };
  }
}