const { db, helpers, errors } = require("./pgp");

const addEntry = async (entry) => {
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

const getAllEntries = () => db.any("SELECT * FROM journal_entries");

const createTag = (name) => {
  return db.one('INSERT INTO tags(name) VALUES($1) RETURNING *', name)
}

module.exports = {
  addEntry,
  getAllEntries,
  createTag 
};
