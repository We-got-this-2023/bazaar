import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clientUrl } from './utils/constants';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.use(helmet());

  app.use(cookieParser());

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
