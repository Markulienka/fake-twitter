import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Tweet } from './types';

@Controller("tweets")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTweets(): Tweet[] {
    return this.appService.getAllTweets();
  }

  @Post()
  createTweet(@Body() body: { text: string, name: string }): Tweet {
    return this.appService.createTweet(body.text, body.name);
  }

  @Delete(':id')
  deleteTweet(@Param('id') id: string): { success: boolean } {
    const deleted = this.appService.deleteTweet(Number(id));
    return { success: deleted };
  }
}
