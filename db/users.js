const { db, errors } = require('./pgp');

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
    if (err instanceof errors.QueryResultError) {
      if (err.code === errors.queryResultErrorCode.noData) {
        return false;
      }
    }
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

const awardPoints = async (userId, points) => {
  try {
    let updateQuery = `UPDATE users SET points = points + $/points/ 
    WHERE id = $/userId/ RETURNING *`

    let user = await db.one(updateQuery, {
      userId,
      points
    })
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  awardPoints
}
