import { Controller, Post, Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { LikesService } from './likes.service';
import { LikeTweetParams, UserIdParams, LikeBodyDto } from './dto/like-params-body.dto';

@ApiTags('Likes')
@Controller('likes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':tweetId')
  @ApiOperation({ summary: 'Like a tweet' })
  @ApiResponse({ status: 201, description: 'Tweet liked successfully', type: LikeBodyDto })
  @ApiParam({ name: 'tweetId', description: 'The unique identifier of the tweet to like' })
  @ApiBody({ type: LikeBodyDto })
  async likeTweet(@Param() params: LikeTweetParams, @Body() body: LikeBodyDto): Promise<{ success: boolean; message: string }> {
    await this.likesService.likeTweet(params.tweetId, body.userId);
    return { success: true, message: 'Tweet liked successfully' };
  }

  @Delete(':tweetId')
  @ApiOperation({ summary: 'Unlike a tweet' })
  @ApiResponse({ status: 200, description: 'Tweet unliked successfully', type: LikeBodyDto })
  @ApiParam({ name: 'tweetId', description: 'The unique identifier of the tweet to unlike' })
  @ApiBody({ type: LikeBodyDto })
  async unlikeTweet(@Param() params: LikeTweetParams, @Body() body: LikeBodyDto): Promise<{ success: boolean; message: string }> {
    await this.likesService.unlikeTweet(params.tweetId, body.userId);
    return { success: true, message: 'Tweet unliked successfully' };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all liked tweet IDs for a user' })
  @ApiResponse({ status: 200, description: 'List of liked tweet IDs', type: [Types.ObjectId] })
  @ApiParam({ name: 'userId', description: 'The unique identifier of the user' })
  async getUserLikes(@Param() params: UserIdParams): Promise<{ likedTweetIds: Types.ObjectId[] }> {
    const likedTweetIds = await this.likesService.getUserLikes(params.userId);
    return { likedTweetIds };
  }
}
