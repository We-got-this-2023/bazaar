export class ProductDto {
  id: number;

  categoryId?: number;

  orderId: number;

  name: string;

  description: string;

  price: number;

  imagesPath?: string;

  tags?: string;

  ratings?: number[];

  categoryName?: string;
}
