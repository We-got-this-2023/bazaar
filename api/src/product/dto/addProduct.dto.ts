import { IsNotEmpty } from 'class-validator';

export class addProductDto {
  id: number;

  @IsNotEmpty()
  userId: number;

  categoryName?: string;

  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  price: number;

  imagesPath?: string[];

  tags?: string;
}
