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

const createTag = (name) => {
  return db.one('INSERT INTO tags(name) VALUES($1) RETURNING *', name)
}

module.exports = {
  getAllTodos,
  getTodo,
  removeTodo,
  updateTodo,
  addJournalEntry,
  createTag 
};