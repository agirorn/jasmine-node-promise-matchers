var equal = require('deep-equal');

function isEqual(actual, expected) {
  if (isError(expected)) {
    if (isError(actual)) {
      if (actual.message !== expected.message) {
        return false;
      }
    }
  }
  if (actual && actual.asymmetricMatch) {
    return actual.asymmetricMatch(expected);
  }
  if (expected && expected.asymmetricMatch) {
    return expected.asymmetricMatch(actual);
  }
  return equal(actual, expected);
}

function isError(object) {
  return object instanceof Error;
}

module.exports = isEqual;
