DROP DATABASE IF EXISTS todos_api_db;
CREATE DATABASE todos_api_db;

\c todos_api_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL 
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  owner VARCHAR REFERENCES users(username),
  text VARCHAR NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE journal_entries (
  id SERIAL PRIMARY KEY,
  owner VARCHAR REFERENCES users(username),
  text VARCHAR NOT NULL,
  ts TIMESTAMPTZ DEFAULT NOW()
);
