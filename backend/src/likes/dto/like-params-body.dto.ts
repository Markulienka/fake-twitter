import { IsMongoId, IsNotEmpty } from 'class-validator';

export class LikeTweetParams {
  @IsNotEmpty()
  @IsMongoId()
  tweetId: string;
}

export class UserIdParams {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}

export class LikeBodyDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}