import { Connection, Schema } from 'mongoose';
import { CollectionName } from 'src/lib/collectionEnum';
import { DatabaseProvider } from 'src/lib/databaseProviderEnum';

const CategorySchema: Schema = new Schema(
  {
    name: String,
  },
  { timestamps: true },
);

export const CategoryProvider = [
  {
    provide: DatabaseProvider.CATEGORY,
    useFactory: (connection: Connection) =>
      connection.model(CollectionName.CATEGORY, CategorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
