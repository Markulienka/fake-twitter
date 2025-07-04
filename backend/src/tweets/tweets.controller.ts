import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { DeleteTweetParams } from './dto/delete-tweet.dto';
import { Tweet } from './tweet.schema';

@ApiTags('tweets')
@Controller('tweets')
@UseGuards(AuthGuard('jwt'))
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tweets' })
  @ApiResponse({ status: 200, description: 'Returns a list of all tweets' })
  async getAllTweets(): Promise<Tweet[]> {
    return this.tweetsService.getAllTweets();
  }
  
  @Post()
  @ApiOperation({ summary: 'Create a new tweet' })
  @ApiResponse({ status: 201, description: 'The tweet has been successfully created' })
  @ApiBody({ type: CreateTweetDto })
  async createTweet(@Body() createTweetDto: CreateTweetDto): Promise<Tweet> {
    return this.tweetsService.createTweet(createTweetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tweet by ID' })
  @ApiResponse({ status: 200, description: 'The tweet has been successfully deleted' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the tweet to delete' })
  async deleteTweet(@Param() params: DeleteTweetParams) {
    return this.tweetsService.deleteTweet(params.id);
  }
}