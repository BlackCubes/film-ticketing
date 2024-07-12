import { NextFunction } from 'express';
import sanitize from 'sanitize-html';

import AuthSchemas from './schemas/auth.schemas';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import User from '@src/models/user.model';
import { AppError } from '@src/other/classes';
import * as AuthTypes from '@src/types/auth.types';
import ValidatorHandlerUtil from '@src/util/validator-handler.util';

// **** SERVICES **** //
const login = async (req: AuthTypes.ILoginReq, next: NextFunction): Promise<AuthTypes.ILoginRes> => {
  const loginValidation = ValidatorHandlerUtil(AuthSchemas.loginSchema);

  const { email, password }: AuthTypes.ILogin = loginValidation.verify(req.body, next);

  const user = await User.findOne({ email: sanitize(email) });

  if (!user || !(await user.correctPassword(sanitize(password), user.password))) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Incorrect email or password.'));
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    photo: user.photo,
    username: user.username,
  };
};

export default { login } as const;
