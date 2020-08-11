/* eslint-disable */
import { attributeError } from './errorController';
import { validateRegex } from './regexController';

export var attributeStatus = true;

export const validateAttribute = (attribute, ...dataSets) => {
  // attributeStatus = true;

  var attributeName =
    attribute.id === 'starRating' ? 'starRating' : attribute.name;

  if (!attribute && !dataSets) {
    attributeError(null, 'There is an error on the Client-Side');
    attributeStatus = false;
  } else if (!attribute) {
    attributeError(null, 'Element does not exist');
    attributeStatus = false;
  } else if (!attributeName) {
    attributeError(null, 'Non-existant');
    attributeStatus = false;
  }

  if (attributeName) {
    if (!validateRegex('attribute-name', attributeName)) {
      attributeError(attribute, 'Invalid name');
      attributeStatus = false;
    }
  }

  if (attributeName === 'hexadecimal-btn') {
    if (!attribute.dataset) {
      attributeError(attribute, 'Dataset does not exist');
      attributeStatus = false;
    }
    // } else if (attribute.dataset.showId) {
    //   dataTest = attribute.dataset.showId;
    // } else if (attribute.dataset.reviewId) {
    //   dataTest = attribute.dataset.reviewId;
    // } else if (attribute.dataset.theaterId) {
    //   dataTest = attribute.dataset.theaterId;
    // } else if (attribute.dataset.showtimeId) {
    //   dataTest = attribute.dataset.showtimeId;
    // } else if (attribute.dataset.castcrewId) {
    //   dataTest = attribute.dataset.castcrewId;
    // }
  }

  if (dataSets && attributeName === 'hexadecimal-btn') {
    for (var i = 0; i < dataSets.length; i++) {
      if (!validateRegex(attributeName, dataSets[i])) {
        attributeError(attribute, 'Invalid encryption');
        attributeStatus = false;
        break;
      }
    }
    // dataSets.forEach(dataSet => {
    //   if (!validateRegex(attributeName, dataSet)) {
    //     attributeError(attribute, 'Invalid encryption');
    //     attributeStatus = false;
    //     break;
    //   }
    // });
  }
};
