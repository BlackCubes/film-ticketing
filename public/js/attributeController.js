/* eslint-disable */
import { attributeError } from './errorController';
import { validateRegex } from './regexController';

export const validateAttribute = async (attribute, test) => {
  try {
    var attributeName =
      attribute.id === 'starRating' ? 'starRating' : attribute.name;

    if (!attribute && !test) {
      throw attributeError(null, 'There is an error on the Client-Side');
    } else if (!attribute) {
      throw attributeError(null, 'Element does not exist');
    } else if (!attributeName) {
      throw attributeError(attribute, 'Non-existant');
    }

    if (attributeName) {
      if (!validateRegex('attribute-name', attributeName)) {
        throw attributeError(attribute, 'Invalid name');
      }
    }

    if (test && attributeName === 'hexadecimal-btn') {
      if (!validateRegex(attributeName, test)) {
        throw attributeError(attribute, 'Invalid encryption');
      }
    }
  } catch (err) {
    return false;
  }
};
