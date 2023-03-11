import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService, JwtAuthGuard],
  controllers: [ProductController],
})
export class ProductModule {}
