import { ErrorRequestHandler, Request, Response } from 'express';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AppError } from '@src/other/classes';

const handleCaseErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}!`;
  return new AppError(HttpStatusCodes.BAD_REQUEST, message);
};

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(HttpStatusCodes.BAD_REQUEST, message);
};

const handleValidationErrorDB = (err: { errors: [{ message: string }] }) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data! ${errors.join('! ')}`;
  return new AppError(HttpStatusCodes.BAD_REQUEST, message);
};

const sendErrorDev = (err: any, req: Request, res: Response) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      success: err.success,
      error: err.message,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err: any, req: Request, res: Response) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: Send message to client.
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        success: err.success,
        error: err.message,
      });
    }

    // Programming or other unknown errors: Don't leak error details
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      status: err.status,
      success: err.success,
      error: err.message,
    });
  }
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') {
      error = handleCaseErrorDB(error);
    } else if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    } else if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }

    sendErrorProd(error, req, res);
  }
};

export default globalErrorHandler;
