import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Fake Twitter API')
    .setDescription('API documentation for the Fake Twitter application')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Tweets')
    .addTag('Likes')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
