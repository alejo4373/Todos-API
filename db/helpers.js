const uuidv1 = require('uuid/v1')

const missingProps = (expected, actual) => {
  const missing = [];
  for (const key of expected) {
    if (!actual.hasOwnProperty(key)) {
      missing.push(key)
    }
  }
  return missing;
}

const genId = () => {
  const id = uuidv1();
  return id.split('-')[0];
}

module.exports = {
  missingProps,
  genId
}
