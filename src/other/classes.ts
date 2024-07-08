import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export class AppError extends Error {
  statusCode: HttpStatusCodes;
  success: boolean;
  status: 'fail' | 'error';
  isOperational: boolean;

  constructor(statusCode: HttpStatusCodes, message: string) {
    super(message);

    this.success = false;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
