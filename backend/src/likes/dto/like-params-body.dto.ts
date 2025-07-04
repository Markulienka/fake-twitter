import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeTweetParams {
  @ApiProperty({ 
    example: '60c72b2f9b1d8c001c8e4f3a', 
    description: 'The unique identifier of the tweet to like or unlike', 
  })
  @IsNotEmpty()
  @IsMongoId()
  tweetId: string;
}

export class UserIdParams {
  @ApiProperty({ 
    example: '60c72b2f9b1d8c001c8e4f3a', 
    description: 'The unique identifier of the user', 
  })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}

export class LikeBodyDto {
  @ApiProperty({ 
    example: '60c72b2f9b1d8c001c8e4f3a', 
    description: 'The unique identifier of the user performing the like or unlike action', 
  })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}