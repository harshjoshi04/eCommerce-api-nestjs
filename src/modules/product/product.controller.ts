import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';
import { FileUpload } from 'src/decorator/file-upload.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @FileUpload('image', './upload')
  async createProduct(
    @Res() res: Response,
    @UploadedFiles() file: Express.Multer.File[],
  ) {
    try {
      console.log(file);
      res.json({
        message: `upload`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Post('category')
  async createCategory(
    @Res() res: Response,
    @Body() reqBody: { name: string },
  ) {
    const result = await this.productService.createCategory(reqBody.name);
    res.status(result.statusCode).json(result);
  }
}
