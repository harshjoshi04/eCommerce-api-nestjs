import { Connection, Schema } from 'mongoose';
import { CollectionName } from 'src/lib/collectionEnum';
import { DatabaseProvider } from 'src/lib/databaseProviderEnum';

const ProductSchema: Schema = new Schema(
  {
    title: String,
    description: String,
    price: String,
    discountPrice: Number,
    discountPer: Number,
    category: String,
    quantity: Number,
    images: [String],
  },
  { timestamps: true },
);

export const ProductProvider = [
  {
    provide: DatabaseProvider.PRODUCT,
    useFactory: (connection: Connection) =>
      connection.model(CollectionName.PRODUCT, ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
