import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { ProductParamsDto } from './dto/productParams.dto';
import { addProductDto } from './dto/addProduct.dto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { response } from 'express';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findOneProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) return;

    let imagesPath = product.imagesPath;

    const [one, two, three] = imagesPath;

    const files = [];

    // for (let i = 0; i < imagesPath.length; i++) {
    //   files.push(
    //     readFileSync(join(__dirname, '..', '..', '..', imagesPath[i])),
    //   );
    // }

    // response.send(files);
    if (one) {
      const file1 = readFileSync(join(__dirname, '..', '..', '..', one));
      new StreamableFile(file1);
      response.send(file1);
    } else {
    }
    if (two) {
      const file2 = readFileSync(join(__dirname, '..', '..', '..', two));
      new StreamableFile(file2);
      response.send(file2);
    } else {
    }
    if (three) {
      const file3 = readFileSync(join(__dirname, '..', '..', '..', three));
      new StreamableFile(file3);
      response.send(file3);
    } else {
    }

    return { product };
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
      const {
        userId,
        category: categoryName,
        name,
        description,
        price,
        tags,
      } = addProductDto;
      const imagePath = file.path;
      const updatedTags = tags?.split(' ');

      let category;
      if (categoryName) {
        category =
          (await this.prisma.category.findFirst({
            where: {
              categoryName: categoryName,
            },
          })) ??
          (await this.prisma.category.create({
            data: {
              categoryName: categoryName,
              description: 'description',
            },
          }));
      }

      let tagsList;
      if (tags) {
        tagsList = await this.prisma.tags.findMany({
          where: {
            name: {
              in: updatedTags,
            },
          },
        });
        if (tagsList.length !== updatedTags.length) {
          tagsList = [];
          for (const tag of updatedTags) {
            console.log(tag);
            if (tagsList.includes(tag)) break;
            const tagItem = await this.prisma.tags.create({
              data: {
                name: tag,
              },
            });
            tagsList.push(tagItem);
          }
        }
      }

      const product = await this.prisma.product.create({
        data: {
          userId: Number(userId),
          name,
          categoryId: categoryName ? Number(category.id) : undefined,
          description,
          imagesPath: imagePath,
          price: Number(price),
        },
      });

      console.log(product);
      let productTags;
      if (tags) {
        productTags = await this.prisma.productTags.createMany({
          data: tagsList.map((tag) => ({
            productId: product.id,
            tagId: tag.id,
          })),
        });
      }

      return { product, productTags, category, tagsList };
    } catch (error) {
      console.log(error);
    }
  }

  async getProductWithParams(query: ProductParamsDto) {
    const productParams = query as ProductParamsDto;

    const updatedQuery = productParams.q ?? '',
      page = Number(productParams.p ?? 1),
      costLow = Number(productParams.clo ?? 0),
      costHigh = Number(productParams.chi ?? 999999999),
      sortBy = productParams.s ?? 'createdAt',
      order = productParams.o ?? 'asc',
      // timeSince = productParams.t || 999999999,
      timeSince = 999999999,
      ratingLow = Number(productParams.rlo ?? 0),
      ratingHigh = Number(productParams.rhi ?? 999999999),
      someTags = productParams.stags
        ? productParams.stags.split(',')
        : undefined,
      allTags = productParams.atags ? productParams.atags.split(',') : [],
      notAnyTags = productParams.ntags ? productParams.ntags.split(',') : [];

    console.log(updatedQuery);

    try {
      const tags = await this.prisma.tags.findMany({
        where: {
          name: {
            in: updatedQuery ? [updatedQuery] : [],
          },
        },
      });

      if (tags) {
        const productTags = await this.prisma.productTags.findMany({
          where: {
            tagId: {
              in: tags.map((tag) => tag.id),
            },
          },
        });

        const productIds = productTags.map(
          (productTag) => productTag.productId,
        );

        const products = await this.prisma.product.findMany({
          skip: page - 1,
          take: 10,
          where: {
            AND: [
              {
                id: {
                  in: productIds,
                },
              },
              {
                price: {
                  gte: costLow,
                  lte: costHigh,
                },
                OR: [
                  {
                    name: {
                      contains: updatedQuery,
                      mode: 'insensitive',
                    },
                  },
                  {
                    description: {
                      contains: updatedQuery,
                      mode: 'insensitive',
                    },
                  },
                ],
              },
            ],
            createdAt: {
              gte: new Date(timeSince),
            },
          },
          // orderBy: {
          //   [sortBy]: order,
          // },
        });
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

  async downloadFile() {
    console.log(
      readFileSync(
        join(
          __dirname,
          '..',
          '..',
          '..',
          'uploads',
          '5c110a2bc80da4255e0ea6cf8a7b1cfe',
        ),
      ),
    );

    return readFileSync(
      join(
        __dirname,
        '..',
        '..',
        '..',
        'uploads',
        '5c110a2bc80da4255e0ea6cf8a7b1cfe',
      ),
    );
  }
}
