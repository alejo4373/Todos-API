let missingProps = (expected, actual) => {
  let missing = [];
  for (let key of expected) {
    if (!actual[key]) {
      missing.push(key)
    }
  }
  return missing;
}

module.exports = {
  missingProps,
}
