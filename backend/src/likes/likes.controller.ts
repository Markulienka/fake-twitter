import { Controller, Post, Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LikesService } from './likes.service';
import { isValidObjectId } from 'mongoose';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('likes')
// @UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':tweetId')
  async likeTweet(@Param('tweetId') tweetId: string, @Body('userId') userId: string): Promise<{ success: boolean; message: string }> {
    if (!isValidObjectId(tweetId)) {
      throw new Error('Invalid tweetId');
    }
    if (!isValidObjectId(userId)) {
      throw new Error('Invalid userId');
    }
    await this.likesService.likeTweet(tweetId, userId);
    return { success: true, message: 'Tweet liked successfully' };
  }

  @Delete(':tweetId')
  async unlikeTweet(@Param('tweetId') tweetId: string, @Body('userId') userId: string): Promise<{ success: boolean; message: string }> {
    if (!isValidObjectId(tweetId)) {
      throw new Error('Invalid tweetId');
    }
    if (!isValidObjectId(userId)) {
      throw new Error('Invalid userId');
    }
    await this.likesService.unlikeTweet(tweetId, userId);
    return { success: true, message: 'Tweet unliked successfully' };
  }

  @Get('user/:userId')
  async getUserLikes(@Param('userId') userId: string): Promise<{ likedTweetIds: string[] }> {
    if (!isValidObjectId(userId)) {
      throw new Error('Invalid userId');
    }
    const likedTweetIds = await this.likesService.getUserLikes(userId);
    return { likedTweetIds };
  }
}