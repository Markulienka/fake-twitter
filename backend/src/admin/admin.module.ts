import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { TweetsModule } from '../tweets/tweets.module';

@Module({
  imports: [UsersModule, TweetsModule],
  controllers: [AdminController],
})
export class AdminModule {}