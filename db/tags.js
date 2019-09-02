const { db } = require("./pgp");

const createTag = (name) => {
  return db.one('INSERT INTO tags(name) VALUES($1) RETURNING *', name)
}

module.exports = {
  createTag 
};
