function toString(object) {
  if (object === null) {
    return 'null';
  }

  if (object === undefined) {
    return 'undefined';
  }

  if (object.jasmineToString) {
    return object.jasmineToString();
  }

  if (object.toString) {
    return object.toString();
  }

  return object;
}

module.exports = toString;
