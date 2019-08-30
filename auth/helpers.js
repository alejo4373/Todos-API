const bcrypt = require('bcrypt');

const genPasswordDigest = async (plainPassword) => {
  try {
    let passwordDigest = await bcrypt.hash(plainPassword, 10);
    return passwordDigest;
  }
  catch (err) {
    throw(err)
  }
}

module.exports = {
  genPasswordDigest
}
