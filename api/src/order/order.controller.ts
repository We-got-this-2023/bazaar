import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { Post, Get, Body, Param } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  addOrder(
    @Body() productIds: number[],
    orderDto: OrderDto,
  ): Promise<OrderDto> {
    return this.orderService.addOrder(productIds, orderDto);
  }

  @Get('all/:id')
  getOrders(@Param('id') id: number) {
    return this.orderService.getOrders(id);
  }
}
