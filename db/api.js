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

const addJournalEntry = async (entry) => {
  const { tag_ids } = entry;
  try {
    const journalEntry = await db.one('INSERT INTO journal_entries(text) VALUES(${text}) RETURNING *', entry)
    const values = tag_ids.map(tag_id => ({
        'tag_id': tag_id,
        'je_id': journalEntry.id
    }))

    const columnSet = new helpers.ColumnSet(['je_id', 'tag_id'], { table: 'je_tags' })
    const query = helpers.insert(values, columnSet)

    await db.none(query)

    return {
      ...journalEntry,
      tag_ids: tag_ids
    }
  } catch (err) {
    throw err;
  }
}

const getAllJournalEntries = () => db.any("SELECT * FROM journal_entries");

const createTag = (name) => {
  return db.one('INSERT INTO tags(name) VALUES($1) RETURNING *', name)
}

module.exports = {
  getAllTodos,
  getTodo,
  createTodo, 
  removeTodo,
  updateTodo,
  addJournalEntry,
  getAllJournalEntries,
  createTag 
};
