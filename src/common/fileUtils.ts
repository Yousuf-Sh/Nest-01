import { Request } from 'express';
import { extname } from 'path';

// Generates a unique filename
export const getFilename = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const extension = extname(file.originalname);
  const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
  callback(null, filename);
};

// Validates the file type (example: allow only jpeg and png)
export const checkFileType = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isMimeValid = allowedTypes.test(file.mimetype);
  const isExtValid = allowedTypes.test(extname(file.originalname).toLowerCase());

  if (isMimeValid && isExtValid) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
  }
};
