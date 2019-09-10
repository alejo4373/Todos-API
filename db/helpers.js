const uuidv1 = require('uuid/v1')

let missingProps = (expected, actual) => {
  let missing = [];
  for (let key of expected) {
    if (!actual[key]) {
      missing.push(key)
    }
  }
  return missing;
}

let genId = () => {
  let id = uuidv1();
  return id.split('-')[0];
}

module.exports = {
  missingProps,
  genId
}
