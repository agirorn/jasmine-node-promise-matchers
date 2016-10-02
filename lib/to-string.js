function toString(object) {
  if (object.jasmineToString) {
    return object.jasmineToString();
  }

  return object.toString();
}

module.exports = toString;
