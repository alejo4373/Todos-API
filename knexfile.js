const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost:5432/production",
    migrations: {
      directory: path.resolve(__dirname, "./db/migrations")
    }
  },

  test: {
    client: "pg",
    connection: "postgres://localhost:5432/production_test",
    migrations: {
      directory: path.resolve(__dirname, "./db/migrations")
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, "./db/migrations")
    }
  }
};
