const { db, helpers } = require('./');

const createUser = async (user) => {
  try {
    let insertQuery = `INSERT INTO users(username, password_digest, points)
    VALUES($/username/, $/password_digest/, $/points/) RETURNING *`;
    let newUser = await db.one(insertQuery, user)
    return newUser;
  } catch (err) {
    throw err;
  }
}

const getUserByUsername = async (username) => {
  try {
    let user = await db.one('SELECT * FROM users WHERE username = $/username/', {
      username
    });
    return user;
  } catch (err) {
    throw err;
  }
}

const getUserById = async (id) => {
  try {
    let user = await db.one('SELECT * FROM users WHERE id = $1', id);
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById
}
