import { IsNotEmpty } from 'class-validator';

export class CreateProductDTOEntity {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  discountPrice: number;
  @IsNotEmpty()
  discountPer: number;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  images: string[] | [];
}
