// file-upload.decorator.ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export function FileUpload(
  fieldName: string,
  destination: string,
  maxFiles: number = 5, // Default maximum number of files
) {
  return applyDecorators(
    UseInterceptors(
      FilesInterceptor(fieldName, maxFiles, {
        storage: diskStorage({
          destination: destination, // Directory for storing files
          filename: (req, file, callback) => {
            const uniqueName = `${uuid()}${extname(file.originalname)}`;
            callback(null, uniqueName);
          },
        }),
        fileFilter: (req, file, callback) => {
          if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Unsupported file type'), false);
          }
          callback(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024, // Limit file size to 5MB per file
        },
      }),
    ),
  );
}
