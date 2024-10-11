import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const post = 3000
  await app.listen(post);

  logger.log(`Application running on port ${post}`)
}
bootstrap();
