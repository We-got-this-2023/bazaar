import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { ProductParamsDto } from './dto/productParams.dto';
import { addProductDto } from './dto/addProduct.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findOneProduct(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id: Number(id),
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
    try {
      const { userId, categoryName, name, description, price, tags } =
        addProductDto;
      const imagePath = file.path;
      const updatedTags = tags.split(' ');

      const category = await this.prisma.category.findFirst({
        where: {
          categoryName: categoryName,
        },
      });

      if (!category) {
        const category = await this.prisma.category.create({
          data: {
            categoryName: categoryName,
            description: 'description',
          },
        });
      }

      const tagsList = await this.prisma.tags.findMany({
        where: {
          name: {
            in: updatedTags,
          },
        },
      });

      if (tagsList.length !== updatedTags.length) {
        const tagList = [];
        for (const tag of updatedTags) {
          console.log(tag);
          const tagItem = await this.prisma.tags.create({
            data: {
              name: tag,
            },
          });
          tagsList.push(tagItem);
        }
      }

      const product = await this.prisma.product.create({
        data: {
          userId,
          categoryId: category.id,
          name,
          description,
          imagesPath: imagePath,
          price: Number(price),
        },
      });

      const productTags = await this.prisma.productTags.createMany({
        data: tagsList.map((tag) => ({
          productId: product.id,
          tagId: tag.id,
        })),
      });

      return { product, productTags, category, tagsList };
    } catch (error) {
      console.log(error);
    }
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

  async getProductsOffset(id: string) {
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

  async updateProduct(id: string, productDto: ProductDto) {
    try {
      const { name, description, price, categoryName, tags, ratings, orderId } =
        productDto;

      const updatedTags = tags.split(' ');

      const category = await this.prisma.category.findFirst({
        where: {
          categoryName: categoryName,
        },
      });

      if (!category) {
        const category = await this.prisma.category.create({
          data: {
            categoryName: categoryName,
            description: 'description',
          },
        });
      }

      const tagsList = await this.prisma.tags.findMany({
        where: {
          name: {
            in: updatedTags,
          },
        },
      });

      if (tagsList.length !== updatedTags.length) {
        const tagList = [];
        for (const tag of updatedTags) {
          const tagItem = await this.prisma.tags.create({
            data: {
              name: tag,
            },
          });
          tagsList.push(tagItem);
        }
      }

      const product = await this.prisma.product.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          description,
          price,
          categoryId: category.id,
          ratings,
          orderId,
        },
      });

      const productTags = await this.prisma.productTags.createMany({
        data: tagsList.map((tag) => ({
          productId: product.id,
          tagId: tag.id,
        })),
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id: Number(id),
        },
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}
