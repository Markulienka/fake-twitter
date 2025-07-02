import { IsString, IsNotEmpty, MinLength, MaxLength, IsMongoId } from 'class-validator';

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(280)
    text: string;

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    userId: string;
}
