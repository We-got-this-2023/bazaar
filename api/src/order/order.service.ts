import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { OrderDto } from './dto/order.dto';
import { AddProductToOrder } from './dto/addProductToOrder.dto';
import { UpdateProductDto } from './dto/updateProductDto.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(id: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        products: true,
      },
    });

    return orders;
  }

  // Product can't be linked to the order after another order is created.
  // First product gets linked fine, but the ones after that don't.
  async addOrder(orderDto: OrderDto) {
    console.log(orderDto);
    const order = await this.prisma.order.create({
      data: {
        // paymentMethodId: orderDto.paymentMethodId,
        orderStatus: orderDto.orderStatus,
        userId: Number(orderDto.userId),
      },
    });

    const products = await this.prisma.product.updateMany({
      where: {
        id: {
          in: orderDto.productIds,
        },
      },
      data: {
        orderId: Number(order.id),
      },
    });

    // convert to async promise shit
    return order;
  }

  async addProductToOrder(userId: number, dto: AddProductToOrder) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: Number(dto.orderId),
        },
      });

      if (!order) {
        const order = await this.prisma.order.create({
          data: {
            orderStatus: dto.orderStatus || 'pending',
            userId: Number(userId),
          },
        });
      }

      const product = await this.prisma.product.update({
        where: {
          id: Number(dto.productId),
        },
        data: {
          orderId: Number(order.id),
        },
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(dto: UpdateProductDto) {
    try {
      const order = await this.prisma.order.update({
        where: {
          id: Number(dto.orderId),
        },
        data: {
          orderStatus: dto.orderStatus || 'cancelled',
        },
      });

      const product = await this.prisma.product.update({
        where: {
          id: Number(dto.productId),
        },
        data: {
          orderId: Number(order.id) || null,
        },
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }
}
