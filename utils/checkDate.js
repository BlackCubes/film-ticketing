module.exports = (check, test) => {
  return check.some(checkVal => checkVal > test);
};
