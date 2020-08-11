/* eslint-disable */
import { attributeError } from './errorController';
import { validateRegex } from './regexController';

export const validateAttribute = (attribute, test) => {
  var attributeName =
    attribute.id === 'starRating' ? 'starRating' : attribute.name;

  if (!attribute && !test) {
    attributeError(null, 'There is an error on the Client-Side');
  } else if (!attribute) {
    attributeError(null, 'Element does not exist');
  } else if (!attributeName) {
    attributeError(attribute, 'Non-existant');
  }

  if (attributeName) {
    if (!validateRegex('attribute-name', attributeName)) {
      attributeError(attribute, 'Invalid name');
    }
  }

  if (test && attributeName === 'hexadecimal-btn') {
    if (!validateRegex(attributeName, test)) {
      attributeError(attribute, 'Invalid encryption');
    }
  }
};
