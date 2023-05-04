import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import {AddressDto} from "./dto/address.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: number, req: Request): Promise<{ user: UserDto }> {
    const decodedUserInfo = req.user as { id: number; email: string };
    id = Number(id);
    decodedUserInfo.id = Number(decodedUserInfo.id);

    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== decodedUserInfo.id) {
      throw new ForbiddenException();
    }

    delete foundUser.password;

    return { user: foundUser };
  }

  async getUsers(): Promise<{ users: UserDto[] }> {
    const users = await this.prisma.user.findMany({});

    users.map((user) => delete user.password);

    return { users };
  }

  async deleteUser(id: number): Promise<{ user: UserDto }> {
    const deletedUser = await this.prisma.user.delete({ where: { id } });

    if (!deletedUser) {
      throw new NotFoundException();
    }

    delete deletedUser.password;

    return { user: deletedUser };
  }

  async updateUser(id: number, userDto: UserDto): Promise<{ user: UserDto }> {
    id = Number(id);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...userDto,
      },
    });

    if (!updatedUser) {
      throw new NotFoundException();
    }

    delete updatedUser.password;

    return { user: updatedUser };
  }

  //need to test relational query
  async getUserDetails(id: number): Promise<{ user: UserDto }> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    delete foundUser.password;

    return { user: foundUser };
  }
  async addAddress(addressDto: AddressDto) {
    const address = await this.prisma.address.create({
      data: {
        id: addressDto.id,
        addressLine1: addressDto.addressLine1,
        addressLine2: addressDto.addressLine2,
        city: addressDto.city,
        region: addressDto.region,
        postalCode: addressDto.postalCode,
        country: addressDto.country,
      },
    });

    const user = await this.prisma.user.update({
      where: { id: addressDto.userId },
      data: {
        address: {
          connect: {
            id: address.id,
          },
        },
      },
    });
  }
}
