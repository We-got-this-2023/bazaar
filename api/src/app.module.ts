import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { OrderModule } from './order/order.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({ dest: './uploads' }),
    AuthModule,
    UsersModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductService],
})
export class AppModule {}
