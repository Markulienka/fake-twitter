import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':tweetId')
  async likeTweet(@Param('tweetId') tweetId: string, @Body('userId') userId: string): Promise<{ success: boolean; message: string }> {
    try {
        await this.likeService.likeTweet(tweetId, userId);
        return { 
          success: true, message: 'Tweet liked successfully' 
        };
    } catch (error) {
        throw new Error((error as Error).message);
    }
  }

  @Delete(':tweetId')
  async unlikeTweet(@Param('tweetId') tweetId: string, @Body('userId') userId: string): Promise<{ success: boolean; message: string }> {
    try {
        await this.likeService.unlikeTweet(tweetId, userId);
        return { 
          success: true, message: 'Tweet unliked successfully' 
        };
    } catch (error) {
        throw new Error((error as Error).message);
    }
  }

  @Get('user/:userId')
  async getUserLikes(@Param('userId') userId: string): Promise<{ likedTweetIds: string[] }> {
    try {
        const likedTweetIds = await this.likeService.getUserLikes(userId);
        return { likedTweetIds };
    } catch (error) {
        throw new Error((error as Error).message);
    }
  }
}