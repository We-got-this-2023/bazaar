import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, ProductService],
})
export class AppModule {}
