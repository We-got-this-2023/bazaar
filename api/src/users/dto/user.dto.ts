export class UserDto {
  id: number;

  orderId?: number;

  name: string;

  email: string;

  ratings?: number[];

  password?: string;

  createdAt?: Date;

  updatedAt?: Date;

  //   address?: {
  //     id: number;

  //     userId: number;

  //     addressLine1: string;

  //     addressLine2?: string;

  //     city: string;

  //     region: string;

  //     postalCode: string;

  //     country: string;

  //     createdAt?: Date;

  //     updatedAt?: Date;
  //   };
}
