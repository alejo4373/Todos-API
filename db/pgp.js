const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/production";
module.exports = {
  helpers: pgp.helpers, 
  errors: pgp.errors,
  db: pgp(connectionString)
}
