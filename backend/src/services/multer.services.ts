import { NextFunction } from 'express';
import multer from 'multer';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AppError } from '@src/other/classes';
import { IReq, IRes } from '@src/types/misc';
import * as regex from '@src/util/regex';

const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: { fileSize: 1024000 },
  fileFilter: (_, file, cb) => {
    const fileOriginalName = file.originalname.split('.').pop()?.toLowerCase();
    const extName = regex.imageFileTypes.test(fileOriginalName ?? '');
    const mimeType = regex.imageFileTypes.test(file.mimetype);

    if (!file.mimetype.startsWith('image') || !mimeType || !extName) {
      cb(new AppError(HttpStatusCodes.BAD_REQUEST, 'Images should only be uploaded!'));
    }

    return cb(null, true);
  },
});

const singleFileUpload = (key: string) => (req: IReq, res: IRes, next: NextFunction) => {
  const upload = multerUpload.single(key);

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError(HttpStatusCodes.BAD_REQUEST, err.message));
    }

    if (err) {
      return next(new AppError(HttpStatusCodes.BAD_REQUEST, err.message));
    }

    next();
  });
};

export default { singleFileUpload } as const;
