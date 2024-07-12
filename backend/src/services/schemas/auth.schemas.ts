import { JSONSchemaType } from 'ajv';

import ErrorMessages from '@src/constants/ErrorMessages';
import * as AuthTypes from '@src/types/auth.types';

// **** TYPES **** //
type TLoginSchema = JSONSchemaType<AuthTypes.ILogin> & {
  errorMessage: {
    additionalProperties: string;
    required: {
      email: string;
      password: string;
    };
  };
};

// **** SCHEMAS **** //
const loginSchema: TLoginSchema = {
  type: 'object',

  properties: {
    email: {
      type: 'string',

      validateEmail: true,

      errorMessage: {
        type: ErrorMessages.userErrors.email.type,

        validateEmail: ErrorMessages.userErrors.email.valid,
      },
    },

    password: {
      type: 'string',

      // Empty string:
      not: { maxLength: 0 },

      errorMessage: {
        type: ErrorMessages.userErrors.password.type,

        not: ErrorMessages.userErrors.password.required,
      },
    },
  },

  required: ['email', 'password'],

  additionalProperties: false,

  errorMessage: {
    additionalProperties: 'Only email and password are needed.',

    required: {
      email: ErrorMessages.userErrors.email.required,

      password: ErrorMessages.userErrors.password.required,
    },
  },
};

export default { loginSchema } as const;
