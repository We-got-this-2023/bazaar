import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { ProductParamsDto } from './dto/productParams.dto';
import { Response } from 'express';

// need to change order of controllers to make this work
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('streamable')
  async streamable(@Res({ passthrough: true }) response: Response) {
    const file = await this.productService.downloadFile();
    response.send(file);
    return new StreamableFile(file);
  }

  @Get('all/:id')
  getProducts(@Query() id: any): Promise<ProductDto[]> {
    return this.productService.getProducts(id);
  }

  @Get('cursor')
  getProductsCurosr(
    @Query('take') take: number,
    @Query('cursor') cursor: number,
  ): Promise<ProductDto[]> {
    return this.productService.getProductsCursor({
      take,
      cursor,
    });
  }

  @Get('offset')
  getProductsOffset(@Param('id') id: string): Promise<ProductDto[]> {
    return this.productService.getProductsOffset(id);
  }
  @Get('params')
  getProductWithParams(@Query() query: ProductParamsDto) {
    console.log(query);
    return this.productService.getProductWithParams(query);
  }
}
