import { Controller, Get, Post, Delete, Param, Body, Patch } from "@nestjs/common";

import { CreateTweetDto } from "../tweets/dto/create-tweet.dto";
import { UpdateTweetDto } from "../tweets/dto/update-tweet.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { TweetsService } from "../tweets/tweets.service";
import { Tweet } from "src/tweets/tweet.schema";
import { User } from "src/users/user.schema";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

@Controller('admin')
export class AdminController { 
    constructor(
        private readonly usersService: UsersService,
        private readonly tweetsService: TweetsService
    ) {}

    // USERS MANAGEMENT
    @Get('users')
    async findAllUsers(): Promise<User[]> {
        return await this.usersService.findAllUsers();
    }

    @Get('users/:id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.usersService.findById(id);
    }

    @Post('users')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> { 
        return await this.usersService.create(createUserDto);
    }

    @Patch('users/:id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('users/:id')
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        return await this.usersService.deleteUser(id);
    }

/*--------------------------------------------------------------------------------------*/
    // TWEETS MANAGEMENT
    @Get('tweets')
    async getAllTweets(): Promise<Tweet[]> {
        return await this.tweetsService.getAllTweets();
    }

    @Get('tweets/:id')
    async getTweetById(@Param('id') id: string): Promise<Tweet> {
        return await this.tweetsService.findTweetById(id);
    }

    @Post('tweets')
    async createTweet(@Body() createTweetDto: CreateTweetDto): Promise<Tweet> {
        return await this.tweetsService.createTweet(createTweetDto);
    }
    
    @Patch('tweets/:id')
    async updateTweet(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto): Promise<{ data: Tweet }> {
        const tweet = await this.tweetsService.updateTweet(id, updateTweetDto);
        return { data: tweet };
    }

    @Delete('tweets/:id')
    async deleteTweet(@Param('id') id: string): Promise<{success: boolean, message: string}> {
        await this.tweetsService.deleteTweet(id);
        return {success: true, message: 'Tweet deleted successfully'};
    }
}