import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(280)
    text: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
