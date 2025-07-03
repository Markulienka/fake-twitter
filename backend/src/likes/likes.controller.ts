import { Controller, Post, Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';

import { LikesService } from './likes.service';
import { LikeTweetParams, UserIdParams, LikeBodyDto } from './dto/like-params-body.dto';

@Controller('likes')
@UseGuards(AuthGuard('jwt'))
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':tweetId')
  async likeTweet(@Param() params: LikeTweetParams, @Body() body: LikeBodyDto): Promise<{ success: boolean; message: string }> {
    await this.likesService.likeTweet(params.tweetId, body.userId);
    return { success: true, message: 'Tweet liked successfully' };
  }

  @Delete(':tweetId')
  async unlikeTweet(@Param() params: LikeTweetParams, @Body() body: LikeBodyDto): Promise<{ success: boolean; message: string }> {
    await this.likesService.unlikeTweet(params.tweetId, body.userId);
    return { success: true, message: 'Tweet unliked successfully' };
  }

  @Get('user/:userId')
  async getUserLikes(@Param() params: UserIdParams): Promise<{ likedTweetIds: Types.ObjectId[] }> {
    const likedTweetIds = await this.likesService.getUserLikes(params.userId);
    return { likedTweetIds };
  }
}