const { db, helpers } = require("./");

const optionalCol = col => ({
  name: col, 
  skip: (col) => col.value === null || col.value === undefined || !col.exists
})

const updateTodo = (id, todoEdits) => {
  const columnSet = new helpers.ColumnSet([
    optionalCol("text"),
    optionalCol("value"),
    optionalCol("completed"),
  ], { table: "todos" })

  const updateQuery = helpers.update(todoEdits, columnSet) + "WHERE id = $/id/ RETURNING *";
  return db.one(updateQuery, {id})

}

module.exports = {
  getAllTodos: () => db.any("SELECT * FROM todos"),
  removeTodo: id => db.one("DELETE FROM todos WHERE id=$/id/ RETURNING *", { id }),
  updateTodo
};
