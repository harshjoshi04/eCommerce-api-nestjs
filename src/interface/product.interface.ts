export interface ProductSchemaEntity {
  title: string;
  price: number;
  discountPrice: number;
  discountPer: number;
  category: string;
  description: string;
  quantity: number;
  images: string[] | [];
}
