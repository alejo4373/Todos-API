const db = require("./");

module.exports = {
  getAllTodos: () => db.any("SELECT * FROM todos"),
  removeTodo: id => db.one("DELETE FROM todos WHERE id=$/id/ RETURNING *", { id }),
};
