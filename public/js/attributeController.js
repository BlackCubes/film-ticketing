/* eslint-disable */
import { attributeError } from './errorController';
import { validateRegex } from './regexController';

export const validateAttribute = (e, attribute, test) => {
  var attributeName =
    attribute.id === 'starRating' ? 'starRating' : attribute.name;

  if (!attribute && !test) {
    e.preventDefault();
    attributeError(null, 'There is an error on the Client-Side');
  } else if (!attribute) {
    e.preventDefault();
    attributeError(null, 'Element does not exist');
  } else if (!attributeName) {
    e.preventDefault();
    attributeError(attribute, 'Non-existant');
  }

  if (attributeName) {
    if (!validateRegex('attribute-name', attributeName)) {
      e.preventDefault();
      attributeError(attribute, 'Invalid name');
    }
  }

  if (test && attributeName === 'hexadecimal-btn') {
    if (!validateRegex(attributeName, test)) {
      e.preventDefault();
      attributeError(attribute, 'Invalid encryption');
    }
  }
};
