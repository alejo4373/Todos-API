const { db } = require('./pgp');
const enterWinner = async (username) => {
    try {
      let insertQuery = `INSERT INTO winners(username) VALUES($/username/) RETURNING *`;
      let newWinner = await db.one(insertQuery, { username })
      return newWinner;
    } catch (err) {
      // Username already taken 
      if (err.code === "23505" && err.detail.includes("already exists")) {
        return false;
      }
      throw err;
    }
}

module.exports = {
  enterWinner
}
