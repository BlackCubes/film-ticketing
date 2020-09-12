const sanitizeHtml = require('sanitize-html');

module.exports = data => {
  Object.values(data).forEach(val => sanitizeHtml(val));
};
