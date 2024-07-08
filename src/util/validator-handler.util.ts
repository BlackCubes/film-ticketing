import { NextFunction } from 'express';
import Ajv, { JSONSchemaType, Schema } from 'ajv';
import ajvErrors from 'ajv-errors';
import validator from 'validator';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AppError } from '@src/other/classes';
import * as regex from '@src/util/regex';

// **** Types **** //
interface IValidatorReturn {
  verify: (data: any, next: NextFunction) => any;
}

// **** Validations **** //
const ajv = new Ajv({ allErrors: true, $data: true });

ajv.addKeyword({
  keyword: 'validateAddress',
  validate: (_, data) => regex.mailingAddress.test(data),
});
ajv.addKeyword({
  keyword: 'validateUniqueCode',
  validate: (_, data) => regex.uniqueCode.test(data),
});
ajv.addKeyword({
  keyword: 'validateEmail',
  validate: (_, data) => validator.isEmail(data ?? ''),
});
ajv.addKeyword({
  keyword: 'validatePassword',
  validate: (_, data) => validator.isStrongPassword(data ?? ''),
});
ajv.addKeyword({
  keyword: 'validatePhone',
  validate: (_, data) => regex.phoneNumber.test(data),
});
ajv.addKeyword({
  keyword: 'validateId',
  validate: (_, data) => validator.isMongoId(data),
});

ajvErrors(ajv);

export default <T = unknown>(schema: Schema | JSONSchemaType<T>): IValidatorReturn => {
  const validate = ajv.compile(schema);

  const verify = (data: any, next: NextFunction): any => {
    const isValid = validate(data);

    if (!isValid) {
      const errMessages = validate.errors?.map((err) => err.message ?? '') ?? [];
      const instancePaths = validate.errors?.map((err) => err.instancePath) ?? [];

      const nonDuplicateErrMessages = [...new Set(errMessages)];

      throw next(new AppError(HttpStatusCodes.BAD_REQUEST, nonDuplicateErrMessages.join(' ')));
    }

    return data;
  };

  return { verify };
};
