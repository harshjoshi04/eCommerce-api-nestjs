import { Connection, model, Schema } from 'mongoose';
import { CollectionName } from 'src/lib/collectionEnum';
import { DatabaseProvider } from 'src/lib/databaseProviderEnum';

const userSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true },
);

export const UserProvider = [
  {
    provide: DatabaseProvider.USER,
    useFactory: (connection: Connection) =>
      connection.model(CollectionName.USER, userSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
