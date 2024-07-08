import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Environment from '@src/constants/environment';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AppError } from '@src/other/classes';
import { IDecodedJWT } from '@src/types/misc';

// **** Functions **** //
/**
 * Add JWT to response.
 */
const addSessionToken = async (res: Response, data: IDecodedJWT): Promise<string> => {
  if (!res || !data) {
    throw new AppError(HttpStatusCodes.BAD_REQUEST, 'Param is falsey');
  }

  const token = await _sign(data);

  res.cookie(Environment.CookieProps.Key, token, Environment.CookieProps.Options);

  return token;
};

/**
 * Remove cookie.
 */
const clearCookie = (res: Response): Response =>
  res.clearCookie(Environment.CookieProps.Key, Environment.CookieProps.Options);

/**
 * Get token from headers.
 */
const headerToken = (req: Request): string | null => {
  let token: string | null = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  return token;
};

/**
 * General decode from given token.
 */
const decodeToken = (token: string): Promise<IDecodedJWT | undefined> => _decode(token);

/**
 * Get session data from request object.
 */
const getSessionData = (req: Request): Promise<IDecodedJWT | undefined> => {
  const token = req.signedCookies[Environment.CookieProps.Key];

  return decodeToken(token);
};

// **** Helper functions **** //
/**
 * Encrypt `id` and return jwt.
 */
const _sign = (data: IDecodedJWT): Promise<string> =>
  new Promise((res, rej) => {
    jwt.sign(data, Environment.Jwt.Secret, { expiresIn: Environment.Jwt.Exp }, (err, token) =>
      err
        ? rej(
            new AppError(
              HttpStatusCodes.INTERNAL_SERVER_ERROR,
              'Token signing failed. Please contact system administrator.'
            )
          )
        : res(token || '')
    );
  });

/**
 * Decrypt jwt and extract client data.
 */
const _decode = <T>(token: string): Promise<IDecodedJWT | undefined | T> =>
  new Promise((res, rej) => {
    jwt.verify(token, Environment.Jwt.Secret, (err, decoded) =>
      err ? rej(new AppError(500, 'Token validation failed. Please contact system administrator')) : res(decoded as T)
    );
  });

export default { addSessionToken, clearCookie, getSessionData, decodeToken, headerToken } as const;
