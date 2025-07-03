import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteTweetParams {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}