import { Controller, Get, Post, Res, UploadedFile } from '@nestjs/common';
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
    @UploadedFile() file: Array<Express.Multer.File>,
  ) {
    try {
      res.json({
        message: `upload`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
