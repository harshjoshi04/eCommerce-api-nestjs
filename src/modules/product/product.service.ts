import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CategorySchemaEntity,
  ProductSchemaEntity,
} from 'src/interface/product.interface';
import { ResponseEntity } from 'src/interface/server.interface';
import { DatabaseProvider } from 'src/lib/databaseProviderEnum';
import { MESSAGE } from 'src/lib/enum';

@Injectable()
export class ProductService {
  constructor(
    @Inject(DatabaseProvider.CATEGORY)
    private categoryModel: Model<CategorySchemaEntity>,

    @Inject(DatabaseProvider.PRODUCT)
    private productModel: Model<ProductSchemaEntity>,
  ) {}

  // create category
  async createCategory(category: string): Promise<ResponseEntity> {
    try {
      await this.categoryModel.create({ name: category });
      return {
        data: {},
        status: true,
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.createCategory,
      };
    } catch (error) {
      return {
        data: {},
        message: MESSAGE.internalServer,
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
