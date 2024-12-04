export interface ProductSchemaEntity {
  title: string;
  price: number;
  discountPrice: number;
  discountPer: number;
  category: string | CategorySchemaEntity;
  description: string;
  quantity: number;
  images: string[] | [];
}

export interface CategorySchemaEntity {
  name: string;
}
