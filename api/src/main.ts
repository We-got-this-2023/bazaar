import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clientUrl } from './utils/constants';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:5173',
  });

  await app.listen(3000);
}
bootstrap();
