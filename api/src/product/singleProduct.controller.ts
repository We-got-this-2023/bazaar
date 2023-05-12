import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { addProductDto } from './dto/addProduct.dto';
import { Response } from 'express';
import { ProductDto } from './dto/product.dto';
import { updateProductDto } from './dto/updateProduct.dto';

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

  @Patch(':id')
  updateProduct(
    @Body() updatedProduct: updateProductDto,
    @Param('id') id: string,
  ) {
    return this.productService.updateProduct(id, updatedProduct);
  }

  @Post()
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

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.deleteProduct(id);
  }
}
