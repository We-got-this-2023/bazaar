import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Patch,
  Delete,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { ProductParamsDto } from './dto/productParams.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor)
  addProduct(
    @Body() productDto: ProductDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg", "image/png' }),
        ],
      }),
    )
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
      file3?: Express.Multer.File[];
      file4?: Express.Multer.File[];
      file5?: Express.Multer.File[];
      // Array<Express.Multer.File> | undefined;
    },
  ): Promise<ProductDto> {
    console.log(files);
    return this.productService.addProduct(productDto);
  }

  @Get('all')
  getProducts(): Promise<ProductDto[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProductDto> {
    return this.productService.findOneProduct(id);
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
  getProductsOffset(@Param('id') id: number): Promise<ProductDto[]> {
    return this.productService.getProductsOffset(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    return this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<ProductDto> {
    return this.productService.deleteProduct(id);
  }
}
