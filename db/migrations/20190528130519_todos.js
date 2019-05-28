
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', (table) => {
    table.increments();
    table.text("text").notNullable();
    table.boolean("completed").defaultTo(false).notNullable();
    table.integer("value").notNullable();
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("todos");
};
