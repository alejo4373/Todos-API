const { db, helpers } = require('./');

const createUser = async (user) => {
  try {
    let insertQuery = `INSERT INTO users(username, password_digest, points)
    VALUES($/username/, $/password_digest/, $/points/)`;
    let newUser = await db.one(insertQuery, user)
    return newUser;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
}
