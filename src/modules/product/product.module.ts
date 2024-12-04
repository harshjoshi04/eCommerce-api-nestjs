import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/config/db/database.module';
import { ProductProvider } from 'src/models/product.schema';
import { CategoryProvider } from 'src/models/category.schema';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...CategoryProvider, ...ProductProvider],
})
export class ProductModule {}
