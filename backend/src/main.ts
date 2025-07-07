import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { setupPipes } from './infrastructure/setup/setupPipes';
import { setupSwagger } from './infrastructure/setup/setupSwagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  setupPipes(app);
  setupSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '3000');

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/tweets`);
    Logger.log(`===================================`);
  });
}

void bootstrap();