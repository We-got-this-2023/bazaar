import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SingleProductController } from './singleProduct.controller';

@Module({
  providers: [ProductService, JwtAuthGuard],
  controllers: [ProductController, SingleProductController],
})
export class ProductModule {}
