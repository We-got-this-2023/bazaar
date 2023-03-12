import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  id: number;

  @IsNotEmpty()
  userId: number;

  categoryId?: number;

  orderId: number;

  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  price: number;

  imagesPath?: string[];
}
