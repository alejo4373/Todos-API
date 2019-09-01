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

const comparePasswords = (plainPassword, passwordDigest) => { 
  return bcrypt.compare(plainPassword, passwordDigest)
}

const loginRequired = (req, res, next) => {
  if (req.user) return next();
  res.status(401).json({
    payload: {
      msg: "Unauthorized"
    },
    err: true
  })
}

module.exports = {
  genPasswordDigest,
  comparePasswords,
  loginRequired
}
