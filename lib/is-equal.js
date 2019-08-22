const equal = require('deep-equal');

const isError = (object) => object instanceof Error;
const isAnAsymmetricMatcher = (obj) => obj && obj.asymmetricMatch;
const haveDiffrentErrorMesages = (actual, expected) => isError(expected)
  && isError(actual)
  && actual.message !== expected.message;

const isEqual = (actual, expected) => {
  if (haveDiffrentErrorMesages(expected, actual)) {
    return false;
  }
  if (isAnAsymmetricMatcher(actual)) {
    return actual.asymmetricMatch(expected);
  }
  if (isAnAsymmetricMatcher(expected)) {
    return expected.asymmetricMatch(actual);
  }
  return equal(actual, expected);
};

module.exports = isEqual;
