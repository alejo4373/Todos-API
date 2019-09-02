const { db, helpers, errors } = require("./");

const optionalCol = col => ({
  name: col, 
  skip: (col) => col.value === null || col.value === undefined || !col.exists
})

const getAllTodos = (owner_id) => db.any("SELECT * FROM todos WHERE owner_id = $1", owner_id);

const getTodo = async (id, owner_id) => { 
  let todo;

  try {
    todo = await db.one("SELECT * FROM todos WHERE id = $/id/ AND owner_id = $/owner_id/", { 
      id,
      owner_id
    });
    return todo;
  } catch (err) {
    if (err instanceof errors.QueryResultError &&
        err.code === errors.queryResultErrorCode.noData) {
        todo = {}
        return todo;
    }
    throw (err)
  }
}

const createTodo = (todo) => db.one(
  `INSERT INTO todos(owner_id, text, value) VALUES($/owner_id/, $/text/, $/value/) 
    RETURNING *`, todo
)

const removeTodo = async (id, owner_id) => { 
  let todo;
  try {
    todo = await db.one(`DELETE FROM todos WHERE id = $/id/ AND owner_id = $/owner_id/ 
      RETURNING *`, { id, owner_id });
    return todo;
  } catch (err) {
    if (err instanceof errors.QueryResultError &&
        err.code === errors.queryResultErrorCode.noData) {
        todo = false 
        return todo;
    }
    throw (err)
  }
}

const updateTodo = async (id, owner_id, todoEdits) => {
  const columnSet = new helpers.ColumnSet([
    optionalCol("text"),
    optionalCol("value"),
    optionalCol("completed"),
  ], { table: "todos" })

  const updateQuery = `${helpers.update(todoEdits, columnSet)} 
    WHERE id = $/id/ AND owner_id = $/owner_id/ RETURNING *`;
  
  let todo;
  try {
    todo = await db.one(updateQuery, {id, owner_id})
    return todo
  } catch (err) {
    if (err instanceof errors.QueryResultError &&
        err.code === errors.queryResultErrorCode.noData) {
        todo = false 
        return todo;
    }
    throw (err)
  }
}

module.exports = {
  getAllTodos,
  getTodo,
  createTodo, 
  removeTodo,
  updateTodo,
};
