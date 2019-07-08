const { db, helpers } = require("./");

const optionalCol = col => ({
  name: col, 
  skip: (col) => col.value === null || col.value === undefined || !col.exists
})

const getAllTodos = () => db.any("SELECT * FROM todos");
const getTodo = (id) => db.one("SELECT * FROM todos WHERE id=$/id/", { id });
const removeTodo = id => 
  db.one("DELETE FROM todos WHERE id=$/id/ RETURNING *", 
    { id }
  );

const updateTodo = (id, todoEdits) => {
  const columnSet = new helpers.ColumnSet([
    optionalCol("text"),
    optionalCol("value"),
    optionalCol("completed"),
  ], { table: "todos" })

  const updateQuery = `${helpers.update(todoEdits, columnSet)} 
    WHERE id = $/id/ RETURNING *`;
  return db.one(updateQuery, {id})
}

const addJournalEntry = (entry) => {
  console.log(entry)
  return db.one('INSERT INTO journal_entries(text) VALUES(${text}) RETURNING *', entry)
}

module.exports = {
  getAllTodos,
  getTodo,
  removeTodo,
  updateTodo,
  addJournalEntry
};