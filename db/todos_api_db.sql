-- DROP DATABASE IF EXISTS todos_api_db;
-- CREATE DATABASE todos_api_db;

-- \c todos_api_db;

DROP TABLE todos CASCADE;
DROP TABLE users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL 
);

CREATE TABLE todos (
  id VARCHAR PRIMARY KEY,
  owner VARCHAR REFERENCES users(username),
  text VARCHAR NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);
