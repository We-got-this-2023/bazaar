import { Controller, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Param,
  Patch,
  Get,
  Res,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { addProductDto } from './dto/addProduct.dto';
import { Response } from 'express';
import { ProductDto } from './dto/product.dto';

@Controller('single')
export class SingleProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.productService.findOneProduct(id);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  addProduct(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 }),
          new FileTypeValidator({ fileType: '(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body() addProductDto: addProductDto,
  ) {
    return this.productService.addProduct(file, addProductDto);
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