import {
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  Delete,
  Body, Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me/:id')
  getMyUser(@Param() params: { id: number }, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param() params: { id: number }) {
    return this.usersService.deleteUser(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(@Param() params: { id: number }, @Body() userDto: UserDto) {
    return this.usersService.updateUser(params.id, userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('details/:id')
  getUserDetails(@Param() params: { id: number }) {
    return this.usersService.getUserDetails(params.id);
  }
  @Post('address')
  addAddress(@Body() addressDto) {
    return this.usersService.addAddress(addressDto);
  }
}
