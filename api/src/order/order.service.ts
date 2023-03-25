import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { OrderDto } from './dto/order.dto';

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
}
