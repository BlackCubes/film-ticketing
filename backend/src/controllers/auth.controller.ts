import { NextFunction } from 'express';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import AuthServices from '@src/services/auth.services';
import * as AuthTypes from '@src/types/auth.types';
import { IReq, IRes } from '@src/types/misc';
import SessionUtil from '@src/util/session.util';

const login = async (req: AuthTypes.ILoginReq, res: IRes, next: NextFunction) => {
  const data = await AuthServices.login(req, next);

  const token = await SessionUtil.addSessionToken(res, {
    ...data,
    id: data.id.toString(),
  });

  return res.status(HttpStatusCodes.CREATED).json({
    status: 'success',
    success: true,
    token,
    data: `Welcome back ${data.username}!`,
  });
};

export default { login } as const;
