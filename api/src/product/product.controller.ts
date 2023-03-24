import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFile,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { ProductParamsDto } from './dto/productParams.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  addProduct(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 }),
          new FileTypeValidator({ fileType: '(png|jpeg|jpg)' }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body() addProductDto: ProductDto,
  ) {
    console.log(addProductDto);
    return this.productService.addProduct(file, addProductDto);
  }

  @Get('all')
  getProducts(): Promise<ProductDto[]> {
    return this.productService.getProducts();
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

  @Get('params')
  getProductWithParams(@Body() productParamsDto: ProductParamsDto) {
    return this.productService.getProductWithParams(productParamsDto);
  }

  @Get('offset')
  getProductsOffset(@Param('id') id: string): Promise<ProductDto[]> {
    return this.productService.getProductsOffset(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.findOneProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    return this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.deleteProduct(id);
  }
}
