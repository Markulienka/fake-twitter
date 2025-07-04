import { IsString, IsNotEmpty, MinLength, MaxLength, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTweetDto {
    @ApiProperty({
        example: 'Hello, world!',
        description: 'The content of the tweet, must be between 1 and 280 characters and cannot be empty',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(280)
    text: string;

    @ApiProperty({
        example: '60c72b2f9b1d8c001c8e4f3a',
        description: 'The unique identifier of the user who is creating the tweet',
    })
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    userId: string;
}
