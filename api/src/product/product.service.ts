import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { ProductParamsDto } from './dto/productParams.dto';
import { addProductDto } from './dto/addProduct.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findOneProduct(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async getProducts() {
    return this.prisma.product.findMany();
  }

  async getProductsCursor({ take, cursor }) {
    return this.prisma.product.findMany({
      take,
      skip: cursor,
    });
  }

  async addProduct(file: any, addProductDto: addProductDto) {
    const { id, userId, categoryName, name, description, price } =
      addProductDto;

    const imagePath = file.path;

    // need to add category table to reference category or to create new one

    const product = await this.prisma.product.create({
      data: {
        id,
        userId,
        name,
        description,
        imagesPath: imagePath,
        price: Number(price),
      },
    });
    return product;
  }

  // async getProductWithParams(productParamsDto: ProductParamsDto) {
  //   const products = await this.prisma.product.findMany({
  //     skip: Number(productParamsDto.p) - 1,
  //     take: 10,
  //     where: {
  //       AND: [
  //         {
  //           name: {
  //             contains: productParamsDto.q,
  //             mode: 'insensitive',
  //           },
  //         },
  //         {
  //           price: {
  //             gte: Number(productParamsDto.clo),
  //             lte: Number(productParamsDto.chi),
  //           },
  //         },
  //       ],
  //     },
  //   });

  //   return products;
  // }

  async getProductWithParams(req: ProductParamsDto) {
    const productParams = req as ProductParamsDto;

    // we removed ratings from product and user has now ratings      we can change that if needed
    const query = productParams.q ?? '',
      page = Number(productParams.p ?? 1),
      costLow = Number(productParams.clo ?? 0),
      costHigh = Number(productParams.chi ?? 999999999),
      sortBy = productParams.s ?? 'createdAt',
      order = productParams.o ?? 'asc',
      timeSince = productParams.t || 999999999,
      ratingLow = Number(productParams.rlo ?? 0),
      ratingHigh = Number(productParams.rhi ?? 999999999),
      someTags = productParams.stags
        ? productParams.stags.split(',')
        : undefined,
      allTags = productParams.atags ? productParams.atags.split(',') : [],
      notAnyTags = productParams.ntags ? productParams.ntags.split(',') : [];

    try {
      const products = await this.prisma.product.findMany({
        skip: page - 1,
        take: 10,
        where: {
          AND: [
            {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                // { tags: { has: query } },
              ],
            },
          ],
          NOT: {
            price: {
              gte: costLow,
              lte: costHigh,
            },
            createdAt: {
              gte: new Date(timeSince),
            },
          },
        },
        orderBy: {
          [sortBy]: order,
        },
      });

      const productsbyTags = await this.prisma.product.findMany({
        skip: page - 1,
        take: 10,
        where: {
          name: { contains: query, mode: 'insensitive' },
          // tags: { has: someTags },
        },
      });
      if (!productsbyTags) {
        return products;
      } else {
        return productsbyTags;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsOffset(id: number) {
    try {
      const products = await this.prisma.product.findMany({
        skip: Number(id) - 1,
        take: 6,
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id: number, productDto: ProductDto) {
    try {
      //might need to deconstruct productDto from body
      const product = await this.prisma.product.update({
        where: {
          id,
        },
        data: {
          ...productDto,
        },
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id,
        },
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}
