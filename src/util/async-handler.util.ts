import { NextFunction, RequestHandler } from 'express';

/**
 * Custom async handler with TS to catch any errors in an asynchronous function. Without this, then you would have to
 * keep using the try/catch block in every controller/middleware.
 */
export default <P, ResBody, ReqBody, ReqQuery, LocalsObj extends Record<string, any> = Record<string, any>>(
    fun: (...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery, LocalsObj>>) => void
  ) =>
  (...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery, LocalsObj>>) => {
    const next = args[args.length - 1];
    Promise.resolve(fun(...args)).catch(next as NextFunction);
  };
