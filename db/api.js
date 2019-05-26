const db = require("./");

module.exports = {
  getAllTodos: () => db.any("SELECT * FROM todos")
};
