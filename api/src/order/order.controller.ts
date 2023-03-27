import { Controller, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { Post, Get, Body, Param } from '@nestjs/common';
import { AddProductToOrder } from './dto/addProductToOrder.dto';
import { UpdateProductDto } from './dto/updateProductDto.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  addOrder(@Body() orderDto: OrderDto) {
    // async promise shit here too dude
    return this.orderService.addOrder(orderDto);
  }

  @Get('all/:id')
  getOrders(@Param('id') id: number) {
    return this.orderService.getOrders(id);
  }

  @Post('add/:userId/')
  addProductToOrder(
    @Param('userId') userId: number,
    @Body() dto: AddProductToOrder,
  ) {
    return this.orderService.addProductToOrder(userId, dto);
  }

  @Patch('delete')
  removeProductFromOrder(@Body() dto: UpdateProductDto) {
    return this.orderService.updateProduct(dto);
  }
}
