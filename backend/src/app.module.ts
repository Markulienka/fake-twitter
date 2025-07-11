import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config/config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { TweetsModule } from './tweets/tweets.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module'; 

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TweetsModule,
    LikesModule,
    AuthModule,
    UsersModule,
    AdminModule,
  ],
})
export class AppModule {}