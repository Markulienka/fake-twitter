import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteTweetParams {
  @ApiProperty({
    example: '60c72b2f9b1d8c001c8e4f3a',
    description: 'The unique identifier of the tweet to delete',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}