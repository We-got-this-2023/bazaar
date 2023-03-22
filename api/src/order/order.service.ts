import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(id: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: id,
      },
      include: {
        products: true,
      },
    });

    return orders;
  }

  async addOrder(productIds: number[], orderDto: OrderDto): Promise<OrderDto> {
    const order = await this.prisma.order.create({
      data: {
        paymentMethodId: orderDto.paymentMethodId,
        orderStatus: orderDto.orderStatus,
        userId: orderDto.userId,
      },
    });

    const products = await this.prisma.product.updateMany({
      where: {
        id: {
          in: productIds,
        },
      },
      data: {
        orderId: order.id,
      },
    });

    return order;
  }
}
