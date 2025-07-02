import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, 
  }));
  
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '3000');
  
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/tweets`);
    Logger.log(`===================================`);
  });
}

void bootstrap();