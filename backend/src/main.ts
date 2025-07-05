import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Fake Twitter API')
    .setDescription('API documentation for the Fake Twitter application')
    .setVersion('1.0')
    .addTag('tweets')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/tweets`);
    Logger.log(`===================================`);
  });
}

void bootstrap();