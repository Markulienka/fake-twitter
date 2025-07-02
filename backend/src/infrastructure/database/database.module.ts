import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI') || 'mongodb://localhost:27017/tweets-db',
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
