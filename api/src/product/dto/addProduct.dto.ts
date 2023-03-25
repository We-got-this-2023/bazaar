import { IsNotEmpty } from 'class-validator';

export class addProductDto {
  id: number;

  @IsNotEmpty()
  userId: number;

  category?: string;

  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  price: number;

  imagesPath?: string[];

  tags?: string;

  ratings?: number[];
}
